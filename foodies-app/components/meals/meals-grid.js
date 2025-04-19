import { Fragment } from "react";
import classes from './meals-grid.module.css';
import MealItem from "./meal-item";

export default function MealsGrid({ meals }) {
	return (
		<Fragment>
			<ul className={classes.meals}>
				{meals.map(meal => <li key={meal.id}>
					{/* 
						With the syntax <MealItem {...meal} /> we are pulling out all the properties of 
						the meal object and spread them as key value pairs
					*/}
					<MealItem {...meal} />
				</li>)}
			</ul>
		</Fragment>

	);

}