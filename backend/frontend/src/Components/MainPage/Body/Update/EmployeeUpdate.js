import React, { useState, useEffect } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";

const EmployeeUpdateFunc = (props) => {
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
		props.onHide();
		let JSONdata = {
			name: e.target.name.value,
			address: e.target.address.value,
			email: e.target.email.value,
			phone: e.target.phone.value,
			levelId: Number(e.target.level.value),
			skillId: Number(e.target.skill.value),
		};
		console.log(JSONdata)
		axios
			.put(
				dynamic_urls.SERVER_URL+dynamic_urls.employees +
					props.employee.employeeId +
					"/",
				JSONdata,
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				}
			)
			.then(
				(result) => {
					props.setupdated();
					alert("Successfully updated");
				},
				(error) => {
					alert("Failed to Update Employee");
				}
			);
	};
	return (
		<div className="container">
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Update Employee Information
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col sm={6}>
								<Form.Group controlId="name">
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										name="name"
										required
										defaultValue={props.employee.name}
										placeholder=""
									/>
								</Form.Group>

								<Form.Group controlId="address">
									<Form.Label>Address</Form.Label>
									<Form.Control
										type="text"
										name="address"
										required
										defaultValue={props.employee.address}
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
										{props.employee.skill !==
											undefined &&
											skills.map((stu) =>
												props.employee.skill.skillId ===stu.skillId ? (
													<option
														value={stu.skillId}
														key={stu.skillId}
														selected
													>
														{stu.name}
													</option>
												) : (
													<option
														value={stu.skillId}
														key={stu.skillId}
													>
														{stu.name}
													</option>
												)
											)}
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
										defaultValue={props.employee.email}
										placeholder=""
									/>
								</Form.Group>
								<Form.Group controlId="phone">
									<Form.Label>Phone</Form.Label>
									<Form.Control
										type="number"
										name="phone"
										required
										defaultValue={props.employee.phone}
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
										{props.employee.level !==
											undefined &&
											levels.map((stu) =>
												props.employee.level.levelId ===stu.levelId ? (
													<option
														value={stu.levelId}
														key={stu.levelId}
														selected
													>
														{stu.name}
													</option>
												) : (
													<option
														value={stu.levelId}
														key={stu.levelId}
													>
														{stu.name}
													</option>
												)
											)}
									</select>
								</Form.Group>
								<br />
								<Form.Group>
									<p></p>
									<Button
										variant="primary"
										type="submit"
									>
										Submit
									</Button>
								</Form.Group>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				{/* <Modal.Footer>
					<Button variant="primary" type="submit" form="abcd">
						Submit
					</Button>
				</Modal.Footer> */}
			</Modal>
		</div>
	);
};

export default EmployeeUpdateFunc;
