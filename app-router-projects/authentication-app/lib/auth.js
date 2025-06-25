import { cookies } from "next/headers";

import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";
import db from "./db";

const adapter = new BetterSqlite3Adapter(db, {
	user: 'users',
	session: 'sessions'
});

const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === 'production'
		}
	}
});

export async function createAuthSession(userId) {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id); 4

	// If using NextJS 15 do (await cookies()).set()
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}


/**
 * Verifies the current user's authentication status by validating the session cookie.
 * If the session is valid and fresh, it refreshes the session cookie.
 * Returns an object containing the user and session info (or null if not authenticated).
 */
export async function verifyAuth() {

	// Get the session cookie from the request using Next.js's server-side cookies API
	const sessionCookie = cookies().get(lucia.sessionCookieName);

	// If no session cookie is found, return null user and session (unauthenticated)
	if (!sessionCookie) {
		return {
			user: null,
			session: null
		};
	}

	// Extract the session ID from the cookie value
	const sessionId = sessionCookie.value;

	// If the session ID is missing, treat it as unauthenticated
	if (!sessionId) {
		return {
			user: null,
			session: null
		};
	}

	/*
		The result includes:

			result.user → user info if valid
			result.session → session info if valid (null otherwise)
			result.session.fresh → true if session was just created/refreshed
	*/

	const result = await lucia.validateSession(sessionId);

	try {
		// If the session is valid and "fresh", re-issue the session cookie to extend its lifetime
		if (result.session && result.session.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		// If the session is invalid (e.g. expired, revoked), clear the cookie
		if (!result.session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
	} catch {} // Silent catch: if there's an unexpected error updating cookies, continue anyway

	return result;
}

export async function destroySession() {
	const { session } = await verifyAuth();
	if (!session) {
		return {
			error: 'Unauthorized!'
		};
	}
	await lucia.invalidateSession(session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}