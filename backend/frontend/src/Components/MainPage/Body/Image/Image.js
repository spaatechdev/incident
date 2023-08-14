import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import incidentpic from "../../../../Images/IncidentPic.jpeg";
import "../../../../CSS/Image.css";
import { Chart } from "react-google-charts";
import dynamic_urls from "../../../../env";
import axios from "axios";
import { FaBuromobelexperte } from "react-icons/fa";

const ImageFunc = () => {
	const [picVisible, setPicVisible] = useState(false)
	const [year, setYear] = useState(new Date().getFullYear())
	const [incidents, setIncidents] = useState([]);
	const [incidentsErr, setIncidentsErr] = useState(0);
	
	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.incidents,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.name === "AxiosError")
					setIncidentsErr(incidentsErr + 1);
				else setIncidents(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [incidentsErr]);
	useEffect(() => {
		const timer = setTimeout(() => {
			setPicVisible(false)
		}, 3000);
		return () => clearTimeout(timer);
	}, [])

	const years = Array.from({ length: 2100 - 1900 + 1 }, (_, i) => 1900 + i)
	const months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];

	const IncidentData = [
		["Month", "Incidents Registered", "Incidents resolved"],
		[months[0], 10, 5],
		[months[1], 20, 9],
		[months[2], 15, 10],
	];
	var IncidentOptions = {
		title: "Incidents registered vs Incidents resolved month-wise",
		titleTextStyle: {
			fontSize: 14,
			color: "#FFFFFFF",
			bold: true,
			italic: false,
			fontName: "Sans-Serif"
		},
		hAxis: {
			title: "Months",
			textStyle: {
				fontSize: 13,
				color: "#FFFFFFF",
				bold: false,
				italic: false,
				fontName: "Sans-Serif"
			},
			titleTextStyle: {
				fontSize: 12,
				color: "#FFFFFFF",
				bold: true,
				italic: false,
				fontName: "Sans-Serif"
			}
		},
		vAxis: {
			title: "Number of Incidents",
			textStyle: {
				fontSize: 12,
				color: "#000",
				bold: false,
				italic: false,
				fontName: "Sans-Serif"
			},
			titleTextStyle: {
				fontSize: 12,
				color: "#000",
				bold: true,
				italic: false,
				fontName: "Sans-Serif"
			}
		},
		backgroundColor:{
			stroke:"#e0e0e0",
			strokeWidth:2
		},
		width: 600,
		height:350,
		chartArea: { left: 70, top: 65, width: "70%",height:"60%" },
	};

	const ComplexityData = [
		["Complexities", "Incidents"],
		["High", 5],
		["Mid", 10],
		["Low", 15]
	];
	const ComplexityOptions = {
		title: "Incident Complexities Data",
		titleTextStyle: {
			fontSize: 14,
			color: "#000",
			bold: true,
			italic: false,
			fontName: "Sans-Serif",
		},
		is3D: true,
		width: "100%",
		height: 350,
		backgroundColor:{
			stroke:"#e0e0e0",
			strokeWidth:2
		},
		chartArea: { width: "90%", height: "70%", top: 40, left: 15 },
		legend: {
			position: "bottom",
			textStyle: {
				fontSize: 16,
				bold: false,
				italic: false,
				fontName: "Sans-Serif",
			},
		},
		pieSliceTextStyle: {
			fontSize: 16,
			bold: false,
			italic: false,
			fontName: "Sans-Serif",
		},
		// backgroundColor:"#efefef",
	};

	const EmployeeData = [
		["Employee Name", "Incident resolved"],
		["Rajiv Singh", 10],
		["Karunesh Talwar", 20],
		["Saurav Joshi", 15],
		["Samay Raina", 18],
		["Biswa Kalyan", 10],
	];
	var EmployeeOptions = {
		title: "Top 5 technicians in terms of number of incidents resolved",
		titleTextStyle: {
			fontSize: 13,
			color: "#000",
			bold: true,
			italic: false,
			fontName: "Sans-Serif"
		},
		hAxis: {
			title: "Employee names",
			textStyle: {
				fontSize: 11,
				color: "#000",
				bold: false,
				italic: false,
				fontName: "Sans-Serif"
			},
			titleTextStyle: {
				fontSize: 12,
				color: "#000",
				bold: true,
				italic: false,
				fontName: "Sans-Serif"
			}
		},
		vAxis: {
			title: "No. of Incidents Resolved",
			textStyle: {
				fontSize: 12,
				color: "#000",
				bold: false,
				italic: false,
				fontName: "Sans-Serif"
			},
			titleTextStyle: {
				fontSize: 12,
				color: "#000",
				bold: true,
				italic: false,
				fontName: "Sans-Serif"
			}
		},
		backgroundColor:{
			stroke:"#e0e0e0",
			borderRadius: 6,
			strokeWidth:2
		},
		height:300,
		chartArea: { 
			left: 80, 
			top: 50, 
			width: "80%",
			height:"55%",
			backgroundColor:"#efefef"
		},
		legend: { position: 'none' }
	};

	let date = new Date()
	let yr_month = date.toISOString().substring(0, 7)
	return (
		<div className="body-mrgn">
			<h2><FaBuromobelexperte className="fa-style" /> Dashboard</h2>
			<div className="row mt-5">
			{picVisible &&
				<img src={incidentpic} />
			}
			{!picVisible &&
				<div class="container">
					<div class="row">
						<div class="col-lg-7">
							<div class="row mb-3">
								<div class="col-lg-3">Select Year :</div>
								<div class="col-lg-3 px-0">
									<select
										className="form-select"
										name="year"
										aria-label="Default select example"
										defaultValue={year}
										onChange={(e) => {
											setYear(Number(e.target.value));
										}}
									>
										{years.map((num) => (
											<option
												value={num}
												key={num}
											>
												{num}
											</option>
										))}
									</select>
								</div>
							</div>



							<Chart
								options={IncidentOptions}
								chartType="ColumnChart"
								data={IncidentData}
							/>
						</div>

						<div class="col-lg-5">
							<div class="row mb-3">
								<div class="col-lg-4">Select Month:</div>
								<div class="col-lg-6">
									<input 
										className="form-control" 
										type="month" 
										id="start" 
										name="start" 
										min="1900-01" 
										onChange={(e) => {
											console.log(e.target.value);
										}}
										defaultValue={yr_month} />
								</div>
							</div>
							<Chart
								chartType="PieChart"
								data={ComplexityData}
								options={ComplexityOptions}
							// width={"100%"}
							// height={"400px"}
							/>
						</div>
						<div class="col my-5">
							<Chart
								options={EmployeeOptions}
								chartType="ColumnChart"
								width={"100%"}
								height={"300px"}
								data={EmployeeData}
							/>
						</div>
						<div class="col my-5">Column-4</div>
					</div>
				</div>
			}
		</div>
	</div>
	);
};
export default ImageFunc;
