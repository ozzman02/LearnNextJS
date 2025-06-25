"use client";

import { Fragment } from "react";
import { useFormStatus } from "react-dom";

export default function FormSubmit() {
	
	const status = useFormStatus();

	console.log(status);

	if (status.pending) {
		return <p>Creating post ...</p>
	}
	
	return (
		<Fragment>
			<button type="reset">Reset</button>
			<button>Create Post</button>
		</Fragment>
	);
}