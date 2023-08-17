import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";

const CustomerUpdateFunc = (props) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		props.onHide()
		let JSONdata = {
			name: e.target.name.value,
			address: e.target.address.value,
			email: e.target.email.value,
			phone: e.target.phone.value
		};
		axios.put(dynamic_urls.SERVER_URL+dynamic_urls.customers + props.customer.customerId + "/", JSONdata, {
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
				alert("Failed to Update Customer");
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
						Update Customer Information
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
										defaultValue={props.customer.name}
										placeholder=""
									/>
								</Form.Group>

								<Form.Group controlId="address">
									<Form.Label>Address</Form.Label>
									<Form.Control
										type="text"
										name="address"
										required
										defaultValue={props.customer.address}
										placeholder=""
									/>
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
										defaultValue={props.customer.email}
										placeholder=""
									/>
								</Form.Group>
								<Form.Group controlId="phone">
									<Form.Label>Phone</Form.Label>
									<Form.Control
										type="number"
										name="phone"
										required
										defaultValue={props.customer.phone}
										min="1000000000"
										max="9999999999"
									/>
								</Form.Group>
								<br/>
								<div className="col-lg-12 text-end submit">
								<Form.Group>
									<p></p>
									<Button variant="primary" type="submit">
										Submit
									</Button>
								</Form.Group>
								</div>
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

export default CustomerUpdateFunc;
