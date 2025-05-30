'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meal";
import { revalidatePath } from "next/cache";


function isInvalidText(text) {
	return !text || text.trim() === '';
}

/* Server Action */
export async function shareMeal(prevState, formData) {
	/* form.get('') is using the name attribute of the input element */
	const meal = {
		title: formData.get('title'),
		summary: formData.get('summary'),
		instructions: formData.get('instructions'),
		image: formData.get('image'),
		creator: formData.get('name'),
		creator_email: formData.get('email'),
	}

	//console.log(meal);

	if (
		isInvalidText(meal.title) ||
		isInvalidText(meal.summary) ||
		isInvalidText(meal.instructions) ||
		isInvalidText(meal.creator) ||
		isInvalidText(meal.creator_email) ||
		!meal.creator_email.includes('@') ||
		!meal.image || meal.image.size === 0
	) {
		return {
			message: 'Invalid input.'
		}
	}

	await saveMeal(meal);
	revalidatePath('/meals');
	redirect('/meals');
}