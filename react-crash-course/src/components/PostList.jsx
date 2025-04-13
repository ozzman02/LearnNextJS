import { Fragment, useEffect, useState } from "react";
import Post from "./post";
import classes from './PostList.module.css';
import NewPost from "./NewPost";
import Modal from "./Modal";

export default function PostList({ isPosting, onStopPosting }) {
	
	const [posts, setPosts] = useState([]);

	const [isFetching, setIsFetching] = useState();

	function addPostHandler(postData) {
		
		fetch('http://localhost:8080/posts', {
			method: 'POST',
			body: JSON.stringify(postData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		/* this is the correct method of updating state since it depends of previous snapshot */
		setPosts((existingPosts) => [postData, ...existingPosts]);
	}

	function renderModal() {
		return (
			<Modal onClose={onStopPosting}>
				<NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
			</Modal>
		);
	}

	useEffect(() => {
		async function fetchPosts() {
			setIsFetching(true);
			const response = await fetch('http://localhost:8080/posts');
			const responseData = await response.json();
			setPosts(responseData.posts);
			setIsFetching(false);
		}
		fetchPosts();
	}, []);
	
	return (
		<Fragment>
			{isPosting && renderModal()}
			{!isFetching && posts.length > 0 && (
				<ul className={classes.posts}>
					{posts.map((post) => 
						<Post key={post.body} author={post.author} body={post.body} />
					)}
				</ul>
			)}
			{!isFetching && posts.length === 0 && (
				<div style={{ textAlign: 'center', color: 'white' }}>
					<h2>There are no posts yet.</h2>
					<p>Start adding some!</p>
				</div>
			)}
			{isFetching && (
				<div style={{ textAlign: 'center', color: 'white' }}>
					<p>Loading posts...</p>
				</div>
			)}
		</Fragment>	
	);
}