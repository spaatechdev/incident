import React, { useState, useEffect } from "react";
import "../../CSS/Header.css";
import SidebarFunc from "./Sidebar.js";
import axios from "axios";
import dynamic_urls from "../../env";

const HeaderFunc = (props) => {
	const [isAuth, setIsAuth] = useState(props.isAuth);
	// useEffect(() => {
	// 	if (localStorage.getItem("access_token") === null) {
	// 		window.location.href = "/";
	// 	}
	// }, []);
	// useEffect(() => {
	// 	if (localStorage.getItem("access_token") !== null) {
	// 		setIsAuth(true);
	// 	}
	// }, [isAuth]);
	const logout = () => {
		axios
			.post(
				dynamic_urls.SERVER_URL + "logout/",
				{
					refresh_token: localStorage.getItem("refresh_token"),
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
				{ withCredentials: true }
			)
			.then(
				(result) => {
					localStorage.clear();
					axios.defaults.headers.common["Authorization"] = null;
					window.location.href = "/";
				},
				(error) => {
					alert("Failed to logout");
				}
			);
	};
	return (
		<div>
			<nav className="navbar header-bg">
				<a className="navbar-brand" href="/">
					<h2>Incident Management System</h2>
				</a>
				{/* <nav className="mx-auto">
					<a className="nav-link" id="home" href="/">
						Home
					</a>
				</nav> */}
				
				{props.isAuth &&
				<nav className="nav nav-pills nav-justified" id="logout">
				<a
					className="nav-link text-white"
					role="button"
					// href="/logout"
					onClick={logout}
				>
					Logout
				</a>
				</nav>}
			</nav>
			{/* <div className="container-fluid" id="container">
				<div className="row">
					<div className="col-md-2" id="sidebar">
						<SidebarFunc />
					</div>
				</div>
			</div> */}
			{/* <SidebarFunc /> */}
		</div>
	);
};

export default HeaderFunc;
