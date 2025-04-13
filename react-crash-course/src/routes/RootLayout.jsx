import { Fragment } from "react";
import MainHeader from "../components/MainHeader";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
	return (
		<Fragment>
			<MainHeader />
			<Outlet />
		</Fragment>
	)
}