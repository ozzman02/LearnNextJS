import { Fragment } from "react";
import classes from './PostList.module.css';
import { useLoaderData } from "react-router-dom";
import Post from './Post';

export default function PostList() {
	
	const posts = useLoaderData();
	
	return (
		<Fragment>
			
			{posts.length > 0 && (
				<ul className={classes.posts}>
					{posts.map((post) => 
						<Post key={post.id} id={post.id} author={post.author} body={post.body} />
					)}
				</ul>
			)}
			{posts.length === 0 && (
				<div style={{ textAlign: 'center', color: 'white' }}>
					<h2>There are no posts yet.</h2>
					<p>Start adding some!</p>
				</div>
			)}
		</Fragment>	
	);
}