// localhost:3000/meals/something

import { Fragment } from 'react';
import classes from './page.module.css';
import Image from 'next/image';
import { getMeal } from '@/lib/meal';
import { notFound } from 'next/navigation';

/* Dynamic metadata */
export async function generateMetadata({ params }) {
	const meal = await getMeal(params.mealSlug);
	if (!meal) {
		notFound();
	}
	return {
		title: meal.title,
		description: meal.summary,
	};
}

export default async function MealDetailsPage({ params }) {

	const s3BucketUrl = 'https://ossant-nextjs-demo-users-image.s3.us-east-2.amazonaws.com';

	const meal = await getMeal(params.mealSlug);

	if (!meal) {
		notFound();
	}

	console.log('Meal image:', meal.image);

	
	meal.instructions = meal.instructions.replace(/\n/g, '<br />');

	return (
		<Fragment>
			<header className={classes.header}>
				<div className={classes.image}>
					<Image src={`${s3BucketUrl}/${meal.image}`} alt={meal.title} fill />
				</div>
				<div className={classes.headerText}>
					<h1>{meal.title}</h1>
					<p className={classes.creator}>
						by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
					</p>
					<p className={classes.summary}>{meal.summary}</p>
				</div>
			</header>
			<main>
				{/* here there is a vulnerability to cross site scripting attacks */}
				<p className={classes.instructions} dangerouslySetInnerHTML={{
					__html: meal.instructions,
				}}
				></p>
			</main>
		</Fragment>
	);	
}