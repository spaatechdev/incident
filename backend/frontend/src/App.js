import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import HeaderFunc from "./Components/MainPage/Header";
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
	const[isSuperuser, setIsSuperuser] = useState(false)
	// const [isAuth, setIsAuth] = useState(false);
	// useEffect(() => {
	// 	if (localStorage.getItem("access_token") !== null) {
	// 		setIsAuth(true);
	// 	}
	// }, []);
	let isAuth = localStorage.getItem("access_token")
	let refresh = localStorage.getItem("refresh_token")

	return(
		<BrowserRouter>
			{isAuth && <HeaderFunc/>}
        <Routes>
				<Route path="/" element={isAuth? <ImageFunc/>:<LoginFunc/>}/> 
				<Route path="/login" element={isAuth? <Navigate to="/"/>:<LoginFunc/>}/>
				<Route path="/signup" element={isAuth? <Navigate to="/"/>:<SignUpFunc/>}/>
				{/* <Route path="/logout" element={<LogoutFunc/>}/> */}

				<Route path="/incidents/add" element={isAuth?<IncidentAddFunc/>:<LoginFunc/>} />
				<Route path="/incidents/view" element={isAuth?<IncidentViewFunc/>:<LoginFunc/>}/>
				
				<Route path="/customers/add" element={isAuth?<CustomerAddFunc/>:<LoginFunc/>} />
				<Route path="/customers/view" element={isAuth? <CustomerViewFunc/>:<LoginFunc/>}/> 
				
				<Route path="/employees/add" element={isAuth?<EmployeeAddFunc/>:<LoginFunc/>} />
				<Route path="/employees/view" element={<EmployeeViewFunc/>}/>

				<Route path="/services/add" element={isAuth?<ServiceAddFunc/>:<LoginFunc/>} /> 
				<Route path="/services/view" element={isAuth?<ServiceViewFunc/>:<LoginFunc/>} /> 

				<Route path="/products/add" element={isAuth?<ProductAddFunc/>:<LoginFunc/>} /> 
				<Route path="/products/view" element={isAuth?<ProductViewFunc/>:<LoginFunc/>}/>

				<Route path="/skills/add" element={isAuth?<SkillAddFunc/>:<LoginFunc/>} /> 
				<Route path="/skills/view" element={isAuth?<SkillViewFunc/>:<LoginFunc/>}/>

				<Route path="/spareParts/add" element={isAuth?<SparePartAddFunc/>:<LoginFunc/>} /> 
				<Route path="/spareParts/view" element={isAuth?<SparePartViewFunc/>:<LoginFunc/>}/>

				<Route path="/query" element={isAuth?<QueryFunc/>:<LoginFunc/>}/>

				<Route path="/users/view" element={isAuth?<UserViewFunc/>:<LoginFunc/>}/>

				<Route path="/levels/view" element={isAuth?<LevelViewFunc/>:<LoginFunc/>}/>
				<Route path="/incidentStatus/view" element={isAuth?<IncidentStatusViewFunc/>:<LoginFunc/>}/>
				<Route path="/degrees/view" element={isAuth?<DegreeViewFunc/>:<LoginFunc/>}/>

        </Routes>
      </BrowserRouter>
	)
}

export default App;
