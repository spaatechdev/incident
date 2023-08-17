import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";

const IncidentStatusUpdateFunc = (props) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		let JSONdata = {
			name: e.target.name.value,
		};
		axios.put(dynamic_urls.SERVER_URL + dynamic_urls.incidentStatuses + props.incidentStatus.incidentStatusId + "/", JSONdata, {
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
				alert("Failed to Update Incident Status");
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
						Update Incident Status Information
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
										defaultValue={props.incidentStatus.name}
										placeholder=""
									/>
								</Form.Group>
								<br />
							</Col>
							<div className="col-lg-12 text-end submit">
								<Form.Group>
									<p></p>
									<Button variant="primary" type="submit" onClick={props.onHide}>
										Submit
									</Button>
								</Form.Group>
							</div>
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

export default IncidentStatusUpdateFunc;
