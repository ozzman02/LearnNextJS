import { Fragment } from "react";
import classes from './Modal.module.css';

export default function Modal({ children }) {
	return (
		<Fragment>
			<div className={classes.backdrop}></div>
			<dialog open className={classes.modal}>{children}</dialog>
		</Fragment>
	);
}