/* eslint-disable react-refresh/only-export-components */
import { Fragment } from "react"
import PostList from "../components/PostList"
import { Outlet } from "react-router-dom";

function Posts() {
	return (
		<Fragment>
			<Outlet />
			<main>
				<PostList />
			</main>
		</Fragment>
	);
}

export default Posts;

export async function postsLoader() {
	const response = await fetch('http://localhost:8080/posts');
	const responseData = await response.json();
	return responseData.posts;
}
