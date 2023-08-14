import React from "react";
import axios from "axios";
import { useState } from "react";
import '../CSS/SignUp.css'
import dynamic_urls from "../env";

const SignUpFunc = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	const [email, setEmail] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		let JSONdata = {
			username: e.target.username.value,
			first_name: e.target.first_name.value,
			last_name: e.target.last_name.value,
			email: e.target.email.value,
			password: e.target.password.value,
		};
		axios
			.post(dynamic_urls.SERVER_URL+dynamic_urls.users, JSONdata, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then(
				(result) => {
					window.location.href = "/login";
				},
				(error) => {
					alert("Enter the details correctly");
				}
			);
	};

   return(
      <div>
         {/* <nav className="navbar navbar-dark bg-dark variant-dark">
				<a className="navbar-brand" href="/">
					<h2>Incident Management System</h2>
				</a>
			</nav> */}
			<div className="row" id="row">
				<div className="col-md-4 offset-md-4" >
					<div className="Auth-form-container">
						<form className="Auth-form" onSubmit={handleSubmit}>
							<div className="Auth-form-content">
								<h3 className="Auth-form-title">Sign Up</h3>
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
						<div className="row">
							<div className="col-lg-6 form-group mt-2">
							<label>First Name</label>
									<input
										name="first_name"
										type="text"
										className="form-control mt-1"
										placeholder="Enter first name"
										value={first_name}
										required
										onChange={(e) =>
											setFirst_name(e.target.value)
										}
									/>			
							</div>
							<div className="col-lg-6 form-group mt-2">
							<label>Last Name</label>
									<input
										name="last_name"
										type="text"
										className="form-control mt-1"
										placeholder="Enter last name"
										value={last_name}
										required
										onChange={(e) =>
											setLast_name(e.target.value)
										}
									/>
							</div>
						</div>
                        <div className="form-group mt-3">
									<label>Email</label>
									<input
										name="email"
										type="email"
                              pattern=".+\.com" 
										title="Only well formed e-mail addresses belonging to .com servers are accepted"
										className="form-control mt-1"
										placeholder="Enter email"
										value={email}
										required
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
                        <div className="form-group mt-3">
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
								<div className="d-grid gap-2 mt-3">
									<button
										type="submit"
										className="btn btn-info"
									>
										Sign Up
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
      </div>
   )
}

export default SignUpFunc;