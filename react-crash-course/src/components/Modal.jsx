import { Fragment } from "react";
import classes from './Modal.module.css';

export default function Modal({ children, onClose }) {
	return (
		<Fragment>
			<div className={classes.backdrop} onClick={onClose}></div>
			<dialog open className={classes.modal}>{children}</dialog>
		</Fragment>
	);
}