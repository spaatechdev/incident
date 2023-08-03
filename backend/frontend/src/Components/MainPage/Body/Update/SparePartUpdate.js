import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";

const SparePartUpdateFunc = (props) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		props.onHide();
		let JSONdata = {
			name: e.target.name.value,
			price:Number(e.target.price.value),
			totalQuantity: Number(e.target.totalQuantity.value),
			reorderLevel:Number(e.target.reorderLevel.value)
		};
		axios.put(dynamic_urls.SERVER_URL+dynamic_urls.spareParts + props.sparePart.sparePartId + "/", JSONdata, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then(
			(result) => {
				props.setupdated();
				alert("Sucessfully updated Spare part!");
			},
			(error) => {
				alert("Failed to Update Spare part");
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
						Update Spare part Information
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
										defaultValue={props.sparePart.name}
										placeholder=""
									/>
								</Form.Group>
								<Form.Group controlId="totalQuantity">
									<Form.Label>Total Quantity</Form.Label>
									<Form.Control
										type="number"
										name="totalQuantity"
										required
										defaultValue={props.sparePart.totalQuantity}
										placeholder=""
									/>
								</Form.Group>
							</Col>
							<Col sm={6}>
								<Form.Group controlId="price">
									<Form.Label>Price</Form.Label>
									<Form.Control
										type="number"
										name="price"
										required
										defaultValue={props.sparePart.price}
									/>
								</Form.Group>
								<Form.Group controlId="reorderLevel">
									<Form.Label>Reorder Level</Form.Label>
									<Form.Control
										type="number"
										name="reorderLevel"
										required
										defaultValue={props.sparePart.reorderLevel}
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

export default SparePartUpdateFunc;
