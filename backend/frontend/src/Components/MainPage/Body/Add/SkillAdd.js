import React from "react";
import {Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";
import { FaElementor } from "react-icons/fa";

const SkillAddFunc = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		let JSONdata = {
			name: e.target.name.value,
		};
		axios.post(dynamic_urls.SERVER_URL+dynamic_urls.skills, JSONdata, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then(
			(result) => {
				alert("Successfully updated");
				e.target.name.value=""
			},
			(error) => {
				alert("Failed to Add Skill");
			}
		); 
	};

	return (
		<div className="body-mrgn">
			<h2><FaElementor className="fa-style" /> Add Employee Skill</h2>
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

export default SkillAddFunc;
