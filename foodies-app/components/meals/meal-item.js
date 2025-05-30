import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export default function MealItem({ title, slug, image, summary, creator }) {

	const s3BucketUrl = 'https://ossant-nextjs-demo-users-image.s3.us-east-2.amazonaws.com';
	
	return (
    	<article className={classes.meal}>
      		<header>
        		<div className={classes.image}>
          			<Image src={`${s3BucketUrl}/${image}`} alt={title} fill />
        		</div>
        		<div className={classes.headerText}>
          			<h2>{title}</h2>
          			<p>by {creator}</p>
        		</div>
      		</header>
      		<div className={classes.content}>
        		<p className={classes.summary}>{summary}</p>
        		<div className={classes.actions}>
          			<Link href={`/meals/${slug}`}>View Details</Link>
        		</div>
      		</div>
    	</article>
  	);
}