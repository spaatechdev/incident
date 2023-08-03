import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";

const ProductUpdateFunc = (props) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		props.onHide();
		let JSONdata = {
			name: e.target.name.value,
			modelNumber:e.target.modelNumber.value,
			warrantyPeriod: Number(e.target.warrantyPeriod.value),
		};
		axios.put(dynamic_urls.SERVER_URL+dynamic_urls.products + props.product.productId + "/", JSONdata, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then(
			(result) => {
				props.setupdated();
				alert("Sucessfully updated Product!");
			},
			(error) => {
				alert("Failed to Update Product ");
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
						Update Product Information
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<Form onSubmit={handleSubmit} >
					<Row>
                  <Col sm={6}>
                     <Form.Group controlId="name">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                           type="text"
                           name="name"
                           required
                           defaultValue={props.product.name}
                           placeholder=""
                        />
                     </Form.Group>
                     <Form.Group controlId="modelNumber">
                        <Form.Label>Model Number</Form.Label>
                        <Form.Control
                           type="text"
                           name="modelNumber"
                           required
                           defaultValue={props.product.modelNumber}
                           placeholder=""
                        />
                     </Form.Group>
                  </Col>
                  <Col sm={6}>
                     <Form.Group controlId="warrantyPeriod">
                        <Form.Label>Warranty Period</Form.Label>
                        <Form.Control
                           type="number"
                           name="warrantyPeriod"
                           required
                           defaultValue={props.product.warrantyPeriod}
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

export default ProductUpdateFunc;
