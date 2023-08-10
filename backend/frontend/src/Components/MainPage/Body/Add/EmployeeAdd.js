import React, { useEffect, useState, useCallback } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import axios from "axios";
import { FaUserTie } from "react-icons/fa";
import dynamic_urls from "../../../../env";

const EmployeeAddFunc = () => {
	const [levels, setLevels] = useState([]);
	const [skills, setSkills] = useState([]);
	const [skillsErr, setSkillsErr] = useState(0);
	const [levelsErr, setLevelsErr] = useState(0);
	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.levels,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if(response.name==="AxiosError")
					setLevelsErr(levelsErr+1)
				else
					setLevels(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [levelsErr]);
	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.skills,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if(response.name==="AxiosError")
					setSkillsErr(skillsErr+1)
				else
					setSkills(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [skillsErr]);


	const handleSubmit = (e) => {
		e.preventDefault();
		let JSONdata = {
			name: e.target.name.value,
			address: e.target.address.value,
			email: e.target.email.value,
			phone: e.target.phone.value,
			levelId: e.target.level.value,
			skillId: e.target.skill.value,
		};
		axios
			.post(dynamic_urls.SERVER_URL+dynamic_urls.employees, JSONdata, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then(
				(result) => {
					alert("Employee Added Successfully");
					e.target.name.value = "";
					e.target.address.value = "";
					e.target.email.value = "";
					e.target.phone.value = "";
				},
				(error) => {
					alert("Failed to Add Employee");
				}
			);
	};

	return (
		<div className="body-mrgn">
			<h2><FaUserTie className="fa-style" /> Add Employee</h2>
			<Form onSubmit={handleSubmit} className="white-bg">
				<Row>
					<Col sm={6}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								name="name"
								required
								placeholder=""
							/>
						</Form.Group>

						<Form.Group controlId="address">
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								name="address"
								required
								placeholder=""
							/>
						</Form.Group>
						<Form.Group controlId="skill">
							<Form.Label>Skill</Form.Label>
							<select
								className="form-select"
								name="skill"
								aria-label="Default select example"
							>
								<option disabled value selected>Select skill</option>
								{skills &&
									skills.map((stu) => (
										<option
											value={stu.skillId}
											key={stu.skillId}
										>
											{stu.name}
										</option>
								))}
							</select>
						</Form.Group>
					</Col>
					<Col sm={6}>
						<Form.Group controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name="email"
								pattern=".+\.com"
								title="Only well formed e-mail addresses belonging to .com servers are accepted"
								required
								placeholder=""
							/>
						</Form.Group>
						<Form.Group controlId="phone">
							<Form.Label>Phone</Form.Label>
							<Form.Control
								type="number"
								name="phone"
								required
								min="1000000000"
								max="9999999999"
							/>
						</Form.Group>
						<Form.Group controlId="level">
							<Form.Label>Level</Form.Label>
							<select
								className="form-select"
								name="level"
								aria-label="Default select example"
							>
								<option disabled value selected>Select level</option>
								{levels &&
									levels.map((stu) => (
										<option
											value={stu.levelId}
											key={stu.levelId}
										>
											{stu.name}
										</option>
								))}
							</select>
						</Form.Group>
						</Col>
						<Col sm={12}>
						<Form.Group>
							<div className="pt-4 submit">
							<Button variant="primary" type="submit">
								Submit
							</Button>
							</div>
						</Form.Group>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default EmployeeAddFunc;
