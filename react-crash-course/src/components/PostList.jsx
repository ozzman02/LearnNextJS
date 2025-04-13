import { Fragment, useState } from "react";
import Post from "./post";
import classes from './PostList.module.css';
import NewPost from "./NewPost";
import Modal from "./Modal";

export default function PostList({ isPosting, onStopPosting }) {
	
	const [posts, setPosts] = useState([]);

	function addPostHandler(postData) {
		/* 
			adding post at the beginning 
			setPosts([postData, ...posts]);
		*/
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
	
	return (
		<Fragment>
			{isPosting && renderModal()}
			{posts.length > 0 && (
				<ul className={classes.posts}>
					{posts.map((post) => 
						<Post key={post.body} author={post.author} body={post.body} />
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