import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";

const ServiceUpdateFunc = (props) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		props.onHide();
		let JSONdata = {
			name: e.target.name.value,
			price: Number(e.target.price.value),
		};
		axios.put(dynamic_urls.SERVER_URL+dynamic_urls.services + props.service.serviceId + "/", JSONdata, {
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
				alert("Failed to Update Service");
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
						Update Service Information
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<Form onSubmit={handleSubmit} >
					<Row>
							<Col sm={6}>
								<Form.Group controlId="name">
									<Form.Label>Service</Form.Label>
									<Form.Control
										type="text"
										name="name"
										required
										defaultValue={props.service.name}
										placeholder=""
									/>
								</Form.Group>
								<br/>
							
							</Col>
							<Col sm={6}>
							<Form.Group controlId="price">
									<Form.Label>Price</Form.Label>
									<Form.Control
										type="number"
										name="price"
										required
										defaultValue={props.service.price}
										placeholder=""
									/>
								</Form.Group> 
							</Col>
							<div className="col-lg-12 text-end submit">
								<Form.Group>
									<p></p>
									<Button variant="primary" type="submit">
										Submit
									</Button>
								</Form.Group>
								</div>
					</Row>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default ServiceUpdateFunc;
