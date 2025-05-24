import { Fragment } from "react";

/* modal prop comes from the @modal */
export default function NewsDetailLayout({ children, modal }) {
	return (
		<Fragment>
			{modal}
			{children}
		</Fragment>
	);
}