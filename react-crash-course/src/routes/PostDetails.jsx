/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, Link } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './PostDetails.module.css';

export default function PostDetails() {

  const post = useLoaderData();

  if (!post) {
	return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }

  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
      </main>
    </Modal>
  );
}

export async function postDetailsLoader({params}) {
	const response = await fetch('http://localhost:8080/posts/' + params.id);
	const responseData = await response.json();
	return responseData.post;
}