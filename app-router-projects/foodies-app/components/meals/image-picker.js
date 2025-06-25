'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {

	const [pickedImage, setPickedImage] = useState();

	function handleImageChange(event) {
		const file = event.target.files[0];
		if (!file) {
			setPickedImage(null);
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPickedImage(fileReader.result);	
		};
		fileReader.readAsDataURL(file);
	}

	/* Reference to the input element */
	const imageInputRef = useRef();

	/* Triggers a click on the input element */
	function handlePickClick() {
		imageInputRef.current.click();
	}

	return (
		<div className={classes.picker}>
			<label htmlFor={name}>{label}</label>
			<div className={classes.controls}>
				<div className={classes.preview}>
					{!pickedImage && <p>No image picked yet.</p>}
					{pickedImage && (
						<Image src={pickedImage} alt='The image selected by the user.' fill />
					)}	
				</div>
				{/* This input is hidden since we want to use a custom button */}
				<input 
					className={classes.input}
					type='file'
					id={name}
					accept='image/png, image/jpeg'
					name={name}
					ref={imageInputRef}
					onChange={handleImageChange}
					required
				/>
				{/* We want to fordward the click event to the hidden input */}
				<button className={classes.button} type='button' onClick={handlePickClick}>
					Pick an Image
				</button>
			</div>
		</div>
	);
}