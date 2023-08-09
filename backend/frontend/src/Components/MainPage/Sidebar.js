import React, { useState, useEffect } from "react";
import "../../CSS/Sidebar.css";
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom'
const SidebarFunc = () => {
	const [isSuperuser, setIsSuperuser] = useState(false);
	useEffect(() => {
		if (localStorage.getItem("is_superuser") === "true") {
			setIsSuperuser(true);
		}
	}, []);

	const buttons=document.getElementsByTagName("button")
	const [buttonClickedId,setButtonClickedId]=useState()
	const clickFunc= (id)=>{
		if(id!=buttonClickedId && buttonClickedId!=undefined)
		{	
			for(let i=0;i<buttons.length;i++){
				if(buttons[i].id==buttonClickedId)
					console.log(document.getElementById(buttonClickedId+"-collapse").setAttribute("class","collapse"))
			}
		}
		setButtonClickedId(id)
	}

	return (
		<div>
			<main>
				<div className="flex-shrink-0 p-3">
					<ul className="list-unstyled ps-0">
						<li className="mb-1">
							<button
								className="btn btn-toggle align-items-center rounded collapsed"
								id="incidents"
								data-bs-toggle="collapse"
								data-bs-target="#incidents-collapse"
								aria-expanded="false"
								onClick={(e)=>{clickFunc(e.target.id)}}
							>
								Incidents
							</button>
							<div className="collapse" id="incidents-collapse">
								<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
									{isSuperuser &&
										<li>
											<Link to="/incidents/add" className="link">
												Add
											</Link>
										</li>}
									<li>
										<Link to="/incidents/view" className="link">
											View
										</Link>
									</li>
								</ul>
							</div>
						</li>
						{isSuperuser &&
							<li className="mb-1">
								<button
									id="customers"
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#customers-collapse"
									aria-expanded="false"
									onClick={(e)=>{clickFunc(e.target.id)}}
								>
									Customers
								</button>
								<div className="collapse" id="customers-collapse">
									<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
										<li>
											<Link to="/customers/add" className="link">
												Add
											</Link>
										</li>
										<li>
											<Link to="/customers/view" className="link">
												View
											</Link>
										</li>
									</ul>
								</div>
							</li>}
						{isSuperuser &&
							<li className="mb-1">
								<button
									id="employees"
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#employees-collapse"
									aria-expanded="false"
									onClick={(e)=>{clickFunc(e.target.id)}}
								>
									Employees
								</button>
								<div className="collapse" id="employees-collapse">
									<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
										<li>
											<Link to="/employees/add" className="link">
												Add
											</Link>
										</li>
										<li>
											<Link to="/employees/view" className="link">
												View
											</Link>
										</li>
									</ul>
								</div>
							</li>}
						{isSuperuser &&
							<li className="mb-1">
								<button
								id="services"
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#services-collapse"
									aria-expanded="false"
									onClick={(e)=>{clickFunc(e.target.id)}}
								>
									Services
								</button>
								<div className="collapse" id="services-collapse">
									<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
										<li>
											<Link to="/services/add" className="link">
												Add
											</Link>
										</li>
										<li>
											<Link to="/services/view" className="link">
												View
											</Link>
										</li>
									</ul>
								</div>
							</li>}
						{isSuperuser &&
							<li className="mb-1">
								<button
								id="products"
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#products-collapse"
									aria-expanded="false"
									onClick={(e)=>{clickFunc(e.target.id)}}
								>
									Products
								</button>
								<div className="collapse" id="products-collapse">
									<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
										<li>
											<Link to="/products/add" className="link">
												Add
											</Link>
										</li>
										<li>
											<Link to="/products/view" className="link">
												View
											</Link>
										</li>
									</ul>
								</div>
							</li>}
						{isSuperuser &&
							<li className="mb-1">
								<button
								id="spareParts"
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#spareParts-collapse"
									aria-expanded="false"
									onClick={(e)=>{clickFunc(e.target.id)}}
								>
									Spare Parts
								</button>
								<div className="collapse" id="spareParts-collapse">
									<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
										<li>
											<Link to="/spareParts/add" className="link">
												Add
											</Link>
										</li>
										<li>
											<Link to="/spareParts/view" className="link">
												View
											</Link>
										</li>
									</ul>
								</div>
							</li>}
						{isSuperuser &&
							<li className="mb-1">
								<button
									id="skills"
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#skills-collapse"
									aria-expanded="false"
									onClick={(e)=>{clickFunc(e.target.id)}}
								>
									Employee Skills
								</button>
								<div className="collapse" id="skills-collapse">
									<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
										<li>
											<Link to="/skills/add" className="link">
												Add
											</Link>
										</li>
										<li>
											<Link to="/skills/view" className="link">
												View
											</Link>
										</li>
									</ul>
								</div>
							</li>}
						{isSuperuser &&
							<li className="mb-1">
								<button
									id="users"
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#users-collapse"
									aria-expanded="false"
									onClick={(e)=>{clickFunc(e.target.id)}}
								>
									Users
								</button>
								<div className="collapse" id="users-collapse">
									<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
										<li>
											<Link to="/users/view" className="link">
												View
											</Link>
										</li>
									</ul>
								</div>
							</li>}
						{isSuperuser &&
							<li className="mb-1">
								<button
								    id="miscellaneous"
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#miscellaneous-collapse"
									aria-expanded="false"
									onClick={(e)=>{clickFunc(e.target.id)}}
								>
									Miscellaneous
								</button>
								<div className="collapse" id="miscellaneous-collapse">
									<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
										<li>
											<Link to="/levels/view" className="link">
												Levels
											</Link>
										</li>
										<li>
											<Link to="/incidentStatus/view" className="link">
												Incident Status
											</Link>
										</li>
										<li>
											<Link to="/degrees/view" className="link">
												Degrees
											</Link>
										</li>
									</ul>
								</div>
							</li>}
						{isSuperuser &&
							<li className="mb-1">
								<Link to="/query" className="link">
									Query
								</Link>
							</li>}
					</ul>
				</div>
				{/* <div className="dropdown">
					<div className="form">
						Add dropdown
						<button class="button" 
						onClick={(e) =>toggle(e)
						}> <FaAngleDown className="FaAngleDown" /></button>
					</div>
					<ul className="dropdownList">
						<li><a href="#">option one</a></li>
						<li><a href="#">option two</a></li>
					</ul>
				</div> */}
			</main>
		</div>
	);
};

export default SidebarFunc;
