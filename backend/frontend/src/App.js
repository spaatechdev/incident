import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "./CSS/MainPage.css"

import HeaderFunc from "./Components/MainPage/Header";
import SidebarFunc from "./Components/MainPage/Sidebar";
import BodyFunc from "./Components/MainPage/Body";
import ImageFunc from "./Components/MainPage/Body/Image/Image";

import LoginFunc from "./Components/Login.js"
import SignUpFunc from "./Components/SignUp";

import IncidentAddFunc from "./Components/MainPage/Body/Add/IncidentAdd";
import IncidentViewFunc from "./Components/MainPage/Body/View/IncidentView";

import EmployeeAddFunc from "./Components/MainPage/Body/Add/EmployeeAdd";
import EmployeeViewFunc from "./Components/MainPage/Body/View/EmployeeView";

import CustomerAddFunc from "./Components/MainPage/Body/Add/CustomerAdd";
import CustomerViewFunc from "./Components/MainPage/Body/View/CustomerView";

import ServiceAddFunc from "./Components/MainPage/Body/Add/ServiceAdd";
import ServiceViewFunc from "./Components/MainPage/Body/View/ServiceView";

import ProductAddFunc from "./Components/MainPage/Body/Add/ProductAdd";
import ProductViewFunc from "./Components/MainPage/Body/View/ProductView";

import SkillAddFunc from "./Components/MainPage/Body/Add/SkillAdd";
import SkillViewFunc from "./Components/MainPage/Body/View/SkillView";

import SparePartAddFunc from "./Components/MainPage/Body/Add/SparePartAdd";
import SparePartViewFunc from "./Components/MainPage/Body/View/SparePartView";

import QueryFunc from "./Components/MainPage/Body/View/Query";

import UserViewFunc from "./Components/MainPage/Body/View/UserView";

import LevelViewFunc from "./Components/MainPage/Body/View/LevelView";
import IncidentStatusViewFunc from "./Components/MainPage/Body/View/IncidentStatusView";
import DegreeViewFunc from "./Components/MainPage/Body/View/DegreeView";


function App() {
	const [isAuth, setIsAuth] = useState(false);
	useEffect(() => {
		if (localStorage.getItem("access_token") !== null) {
			setIsAuth(true);
		}
	}, []);
	// let isAuth = localStorage.getItem("access_token")
	let refresh = localStorage.getItem("refresh_token")

	return (
		<BrowserRouter>
			{/* {!isAuth&&
			<Routes>
				<Route path="/" element={<LoginFunc />} />
			</Routes>
			} */}
			<div>
				<div class="container-fluid px-0">
					<HeaderFunc isAuth={isAuth}/>
				</div>
				{isAuth ?
					<div class="container-fluid">
						<div class="row">
							<div class="col-lg-2 px-0"><SidebarFunc /></div>
							<div class="col-lg-10">
								<Routes>
									<Route path="/" element={<BodyFunc comp="Image"/>} />
									<Route path="/login" element={<Navigate to="/" />} />
									<Route path="/signup" element={<Navigate to="/" />} />
									{/* <Route path="/logout" element={<LogoutFunc/>}/> */}

									<Route path="/incidents/add" element={<BodyFunc comp="IncidentAdd" />} />
									<Route path="/incidents/view" element={<BodyFunc comp="IncidentView" />} />

									<Route path="/customers/add" element={<BodyFunc comp="CustomerAdd" />} />
									<Route path="/customers/view" element={<BodyFunc comp="CustomerView" />} />

									<Route path="/employees/add" element={<BodyFunc comp="EmployeeAdd" />} />
									<Route path="/employees/view" element={<BodyFunc comp="EmployeeView" />} />

									<Route path="/services/add" element={<BodyFunc comp="ServiceAdd" />} />
									<Route path="/services/view" element={<BodyFunc comp="ServiceView" />} />

									<Route path="/products/add" element={<BodyFunc comp="ProductAdd" />} />
									<Route path="/products/view" element={<BodyFunc comp="ProductView" />} />

									<Route path="/skills/add" element={<BodyFunc comp="SkillAdd" />} />
									<Route path="/skills/view" element={<BodyFunc comp="SkillView" />} />

									<Route path="/spareParts/add" element={<BodyFunc comp="SparePartAdd" />} />
									<Route path="/spareParts/view" element={<BodyFunc comp="SparePartView" />} />

									<Route path="/query" element={<BodyFunc comp="Query" />} />

									<Route path="/users/view" element={<BodyFunc comp="UserView" />} />

									<Route path="/levels/view" element={<BodyFunc comp="LevelView" />} />
									<Route path="/incidentStatus/view" element={<BodyFunc comp="IncidentStatusView" />} />
									<Route path="/degrees/view" element={<BodyFunc comp="DegreeView" />} />

								</Routes>
							</div>
						</div>
					</div>
					:
					<div>
						<Routes>
							<Route path="/" element={<LoginFunc />} />
							<Route path="/login" element={<Navigate to="/" />} />
							<Route path="/signup" element={<SignUpFunc />} />
							{/* <Route path="/logout" element={<LogoutFunc/>}/> */}

							<Route path="/incidents/add" element={<LoginFunc />} />
							<Route path="/incidents/view" element={<LoginFunc />} />

							<Route path="/customers/add" element={<LoginFunc />} />
							<Route path="/customers/view" element={<LoginFunc />} />

							<Route path="/employees/add" element={<LoginFunc />} />
							<Route path="/employees/view" element={<LoginFunc />} />

							<Route path="/services/add" element={<LoginFunc />} />
							<Route path="/services/view" element={<LoginFunc />} />

							<Route path="/products/add" element={<LoginFunc />} />
							<Route path="/products/view" element={<LoginFunc />} />

							<Route path="/skills/add" element={<LoginFunc />} />
							<Route path="/skills/view" element={<LoginFunc />} />

							<Route path="/spareParts/add" element={<LoginFunc />} />
							<Route path="/spareParts/view" element={<LoginFunc />} />

							<Route path="/query" element={<LoginFunc />} />

							<Route path="/users/view" element={<LoginFunc />} />

							<Route path="/levels/view" element={<LoginFunc />} />
							<Route path="/incidentStatus/view" element={<LoginFunc />} />
							<Route path="/degrees/view" element={<LoginFunc />} />
						</Routes>
					</div>}
				{/* <div class="container-fluid">
					<div class="row">
						<div class="col-lg-2 px-0"><SidebarFunc /></div>
						<div class="col-lg-10">
							<Routes>
								<Route path="/" element={isAuth ? <ImageFunc /> : <LoginFunc />} />
								<Route path="/login" element={isAuth ? <Navigate to="/" /> : <LoginFunc />} />
								<Route path="/signup" element={isAuth ? <Navigate to="/" /> : <SignUpFunc />} />
								

								<Route path="/incidents/add" element={isAuth ? <BodyFunc comp="IncidentAdd" /> : <LoginFunc />} />
								<Route path="/incidents/view" element={isAuth ? <BodyFunc comp="IncidentView" /> : <LoginFunc />} />

								<Route path="/customers/add" element={isAuth ? <BodyFunc comp="CustomerAdd" /> : <LoginFunc />} />
								<Route path="/customers/view" element={isAuth ? <BodyFunc comp="CustomerView" /> : <LoginFunc />} />

								<Route path="/employees/add" element={isAuth ? <BodyFunc comp="EmployeeAdd" /> : <LoginFunc />} />
								<Route path="/employees/view" element={isAuth ? <BodyFunc comp="EmployeeView" /> : <LoginFunc />} />

								<Route path="/services/add" element={isAuth ? <BodyFunc comp="ServiceAdd" /> : <LoginFunc />} />
								<Route path="/services/view" element={isAuth ? <BodyFunc comp="ServiceView" /> : <LoginFunc />} />

								<Route path="/products/add" element={isAuth ? <BodyFunc comp="ProductAdd" /> : <LoginFunc />} />
								<Route path="/products/view" element={isAuth ? <BodyFunc comp="ProductView" /> : <LoginFunc />} />

								<Route path="/skills/add" element={isAuth ? <BodyFunc comp="SkillAdd" /> : <LoginFunc />} />
								<Route path="/skills/view" element={isAuth ? <BodyFunc comp="SkillView" /> : <LoginFunc />} />

								<Route path="/spareParts/add" element={isAuth ? <BodyFunc comp="SparePartAdd" /> : <LoginFunc />} />
								<Route path="/spareParts/view" element={isAuth ? <BodyFunc comp="SparePartView" /> : <LoginFunc />} />

								<Route path="/query" element={isAuth ? <BodyFunc comp="Query" /> : <LoginFunc />} />

								<Route path="/users/view" element={isAuth ? <BodyFunc comp="UserView" /> : <LoginFunc />} />

								<Route path="/levels/view" element={isAuth ? <BodyFunc comp="LevelView" /> : <LoginFunc />} />
								<Route path="/incidentStatus/view" element={isAuth ? <BodyFunc comp="IncidentStatusView" /> : <LoginFunc />} />
								<Route path="/degrees/view" element={isAuth ? <BodyFunc comp="DegreeView" /> : <LoginFunc />} />

							</Routes>
						</div>
					</div>
				</div> */}
			</div>


		</BrowserRouter>
	)
}

export default App;
