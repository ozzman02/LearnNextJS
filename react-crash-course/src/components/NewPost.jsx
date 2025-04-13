import { useState } from 'react';
import classes from './NewPost.module.css';

function NewPost({ onCancel, onAddPost }) {

	const [body, setBody] = useState("");
	
	const [author, setAuthor] = useState("");
	
	function bodyChangeHandler(event) {
		setBody(event.target.value);
	}
	
	function authorChangeHandler(event) {
		setAuthor(event.target.value)
	}

	function submitHandler(event) {
		event.preventDefault();
		const postData = {
			body,
			author
		};
		console.log(postData);
		onAddPost(postData);
		onCancel();
	}

	return (
    	<form className={classes.form} onSubmit={submitHandler}>
			<p>
        		<label htmlFor="body">Text</label>
        		<textarea id="body" required rows={3} onChange={bodyChangeHandler} />
      		</p>
			<p></p>
      		<p>
        		<label htmlFor="name">Your name</label>
        		<input type="text" id="name" required onChange={authorChangeHandler} />
      		</p>
			<p className={classes.actions}>
				<button type='button' onClick={onCancel}>Cancel</button>
				<button>Submit</button>
			</p>
    	</form>
  	);
}

export default NewPost;