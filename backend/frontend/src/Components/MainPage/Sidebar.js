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
	const toggle = (e) => {
		e.preventDefault();
		document.getElementsByClassName('dropdownList')[0].slideToggle(500);
		document.getElementsByClassName('FaAngleDown')[0].toggleClass("active");
	}
	return (
		<div>
			<main>
				<div className="flex-shrink-0 p-3">
					<ul className="list-unstyled ps-0">
						<li className="mb-1">
							<button
								className="btn btn-toggle align-items-center rounded collapsed"
								data-bs-toggle="collapse"
								data-bs-target="#incidents-collapse"
								aria-expanded="false"
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
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#customers-collapse"
									aria-expanded="false"
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
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#employees-collapse"
									aria-expanded="false"
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
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#services-collapse"
									aria-expanded="false"
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
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#products-collapse"
									aria-expanded="false"
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
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#spareParts-collapse"
									aria-expanded="false"
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
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#skills-collapse"
									aria-expanded="false"
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
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#users-collapse"
									aria-expanded="false"
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
									className="btn btn-toggle align-items-center rounded collapsed"
									data-bs-toggle="collapse"
									data-bs-target="#miscellaneous-collapse"
									aria-expanded="false"
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
