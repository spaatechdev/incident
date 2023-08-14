import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import dynamic_urls from "../env";
import HeaderFunc from "./MainPage/Header";

import "../CSS/Login.css";
// Define the Login function.
const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// Create the submit method.
	const submit = async (e) => {
		e.preventDefault();
		const user = { username: username, password: password };
		// Create the POST requuest
		try {
			const { data } = await axios.post(
				dynamic_urls.SERVER_URL+"token/",
				user,
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
				{ withCredentials: true }
			);
			localStorage.clear();
			localStorage.setItem("access_token", data.access);
			localStorage.setItem("refresh_token", data.refresh);
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${data["access"]}`;

			if (localStorage.getItem("access_token")) {
			const response = await axios.get(
				dynamic_urls.SERVER_URL+"api/superuser/" + username + "/",
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response)
			localStorage.setItem("is_superuser", response.data[0].is_superuser);
			localStorage.setItem("user_email", response.data[0].email);
			}
				// console.log(localStorage.getItem("user_email"))
				// console.log( data[0].email)
			// }
			
			window.location.href = "/";
		} catch (e) {
			alert("Entered wrong credentials");
			setPassword("")
		}
		// Initialize the access & refresh token in localstorage.
	};
	return (
		<div>
			{/* <nav className="navbar navbar-dark bg-dark variant-dark">
				<a className="navbar-brand" href="/">
					<h2>Incident Management System</h2>
				</a>
			</nav> */}
			<div className="col-lg-12">
				<div className="col-md-4 offset-md-4" id="card">
					<div className="Auth-form-container">
						<form className="Auth-form" onSubmit={submit}>
							<div className="Auth-form-content">
								<h3 className="Auth-form-title" align="center">
									Log In
								</h3>
								<div className="form-group mt-3">
									<label>Username</label>
									<input
										className="form-control mt-1"
										placeholder="Enter Username"
										name="username"
										type="text"
										value={username}
										required
										onChange={(e) =>
											setUsername(e.target.value)
										}
									/>
								</div>
								<div className="form-group mt-3" id="password">
									<label>Password</label>
									<input
										name="password"
										type="password"
										className="form-control mt-1"
										placeholder="Enter password"
										value={password}
										required
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</div>
								<div className="submit d-grid gap-2 mt-5">
									<button
										type="submit"
										className="btn btn-primary"
									>
										Log In
									</button>
								</div>
								<div className="d-grid gap-2 mt-3">
									<Link
										to="/signup"
										className="btn btn-info"
										role="button"
									>
										Sign Up
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
