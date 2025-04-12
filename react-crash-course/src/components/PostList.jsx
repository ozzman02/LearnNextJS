import { Fragment, useState } from "react";
import Post from "./post";
import classes from './PostList.module.css';
import NewPost from "./NewPost";
import Modal from "./Modal";

export default function PostList() {
	
	const [body, setBody] = useState("");

	const [author, setAuthor] = useState("");

	function bodyChangeHandler(event) {
		setBody(event.target.value);
	}

	function authorChangeHandler(event) {
		setAuthor(event.target.value)
	}

	return (
		<Fragment>
			<Modal>
				<NewPost onBodyChange={bodyChangeHandler} onAuthorChange={authorChangeHandler} />
			</Modal>
			<ul className={classes.posts}>
				<Post author={author} body={body} />
				<Post author={author} body={body} />
				<Post author={author} body={body} />
				<Post author={author} body={body} />
			</ul>
		</Fragment>
		
	);
}