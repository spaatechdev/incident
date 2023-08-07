import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";

const LevelUpdateFunc = (props) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		props.onHide();
		let JSONdata = {
			name: e.target.name.value,
			tat: Number(e.target.tat.value),
		};
		axios.put(dynamic_urls.SERVER_URL+dynamic_urls.levels + props.level.levelId + "/", JSONdata, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then(
			(result) => {
				props.setupdated();
				alert("Sucessfully updated!");
			},
			(error) => {
				alert("Failed to Update Level");
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
						Update Level Information
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<Form onSubmit={handleSubmit} >
					<Row>
							<Col sm={6}>
								<Form.Group controlId="name">
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										name="name"
										required
										defaultValue={props.level.name}
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
							<Col sm={6}>
							<Form.Group controlId="tat">
									<Form.Label>Total allocated time(in hrs)</Form.Label>
									<Form.Control
										type="number"
										name="tat"
										required
										defaultValue={props.level.tat}
										placeholder=""
									/>
								</Form.Group> 
							</Col>
					</Row>
					</Form>
				</Modal.Body>
				{/* <Modal.Footer>
					<Button variant="primary" type="submit" >
						Submit
					</Button>
				</Modal.Footer> */}
			</Modal>
		</div>
	);
};

export default LevelUpdateFunc;
