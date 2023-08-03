import React from "react";
import {Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";

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
		<div className="container">
			<p></p>
			<h2 style = {{paddingLeft : 520 }}>Add Skill</h2>
			<br/>
			<Form onSubmit={handleSubmit} >
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
								<br/>
								<Form.Group>
									<p></p>
									<Button variant="primary" type="submit">
										Submit
									</Button>
								</Form.Group>
							</Col>
					</Row>
					</Form>
		</div>
	);
};

export default SkillAddFunc;
