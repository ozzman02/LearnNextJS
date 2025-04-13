import { Fragment, useState } from "react"
import PostList from "./components/PostList"
import MainHeader from "./components/MainHeader";

function App() {

	const [modalIsVisible, setModalIsVisible] = useState(false);

	function hideModalHandler() {
		setModalIsVisible(false);
	}

	function showModalHandler() {
		setModalIsVisible(true);
	}

	return (
		<Fragment>
			<MainHeader onCreatePost={showModalHandler} />
			<main>
				<PostList isPosting={modalIsVisible} onStopPosting={hideModalHandler} />
			</main>
		</Fragment>
	);
}

export default App
