/* Error fallbacks must be handled on both ends (client and server) */
'use client';

export default function FilterError({ error }) {
	return (
		<div id="error">
			<h2>An error occurred!</h2>
			<p>{error.message}</p>
		</div>
	);
}