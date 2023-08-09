import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import incidentpic from "../../../../Images/IncidentPic.jpeg";
import "../../../../CSS/Image.css";
import {Chart as chartJSChart} from "chart.js/auto";
import { Chart as GoogleChart} from "react-google-charts";
// import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
const ImageFunc = () => {
	const [picVisible, setPicVisible] = useState(true)
	const[year, setYear] = useState(new Date().getFullYear())
	
	useEffect(() => {
		const timer = setTimeout(() => {
			setPicVisible(false)
		}, 3000);
		return () => clearTimeout(timer);
	}, [])
	
	const years = Array.from({ length: 2100 - 1900 + 1 }, (_, i) => 1900 + i)
	const months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
	
	const incidentStatusdata = {
		labels: months,
		datasets: [
			{
				label: "Incident Registered",
				backgroundColor: "red",
				borderColor: "darkred",
				borderWidth: 1,
				data: [10, 20, 15, 18, 10, 5],
			},
			{
				label: "Incident Resolved",
				backgroundColor: "green",
				borderColor: "darkgreen",
				borderWidth: 1,
				data: [5, 10, 3, 9, 10, 11],
			},
		],
	};
	
	const data = [
		["Complexities", "Incidents"],
		["High", 5],
		["Mid", 10],
		["Low", 15]
	];
	const options = {
		title: "Incident Complexities Data",
		is3D: true,
	};


	return (
		<div>
			{picVisible &&
				<img src={incidentpic} />
			}
			{!picVisible &&
				<div class="container">
					<div class="row">

						<div class="col-lg-6">
							Select Year
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
							<Bar data={incidentStatusdata} />
						</div>

						<div class="col-lg-6">
						<GoogleChart
							chartType="PieChart"
							data={data}
							options={options}
							width={"100%"}
							height={"300px"}
						/>
						</div>

						<div class="w-100"></div>
						<div class="col">Column-3</div>
						<div class="col">Column-4</div>
					</div>
				</div>
			}
		</div>
	);
};
export default ImageFunc;
