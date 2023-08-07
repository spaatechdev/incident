import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";

const LevelAddFunc = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		let JSONdata = {
			name: e.target.name.value,
			tat: e.target.tat.value,
		};
		axios.post(dynamic_urls.SERVER_URL+dynamic_urls.levels, JSONdata, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then(
			(result) => {
				alert("Successfully updated");
				e.target.name.value = ""
				e.target.tat.value = ""
			},
			(error) => {
				alert("Failed to Add Level");
			}
		);
	};

	return (
		<div className="container">
			<p></p>
			<h2 style={{ paddingLeft: 520 }}>Add Level</h2>
			<br />
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
						<Form.Group controlId="tat">
							<Form.Label>Total allocated time(in hrs)</Form.Label>
							<Form.Control
								type="number"
								name="tat"
								required
								placeholder=""
							/>
						</Form.Group>
						<br />
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

export default LevelAddFunc;
