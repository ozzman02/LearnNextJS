import { redirect } from 'next/navigation';

import { addMessage } from '@/lib/messages';
import { revalidateTag } from 'next/cache';

export default function NewMessagePage() {
	async function createMessage(formData) {
		'use server';

		const message = formData.get('message');
		addMessage(message);
		revalidateTag('msg');
		/*
			All the data and route cache related to this path will be deleted.
			Any nested paths and nested pages will not have their data deleted or revalidated unless you specify a second argument.
		*/
		//revalidatePath('/messages', 'layout');
		redirect('/messages');
	}

	return (
		<>
			<h2>New Message</h2>
			<form action={createMessage}>
				<p className="form-control">
					<label htmlFor="message">Your Message</label>
					<textarea id="message" name="message" required rows="5" />
				</p>

				<p className="form-actions">
					<button type="submit">Send</button>
				</p>
			</form>
		</>
	);
}
