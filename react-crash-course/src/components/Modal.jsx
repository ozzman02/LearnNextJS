import { Fragment } from "react";
import classes from './Modal.module.css';
import { useNavigate } from "react-router-dom";

export default function Modal({ children }) {

	const navigate = useNavigate();

	function closeHandler() {
		// navigate('/');
		
		/* relative path, go to the parent */	
		navigate('..');
	}

	return (
		<Fragment>
			<div className={classes.backdrop} onClick={closeHandler}></div>
			<dialog open className={classes.modal}>{children}</dialog>
		</Fragment>
	);
}