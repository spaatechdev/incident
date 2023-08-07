import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";

const ProductAddFunc = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		let JSONdata = {
			name: e.target.name.value,
			modelNumber:e.target.modelNumber.value,
			warrantyPeriod: Number(e.target.warrantyPeriod.value),
		};
		axios.post(dynamic_urls.SERVER_URL+dynamic_urls.products, JSONdata, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then(
			(result) => {
				alert("Successfully added");
				e.target.name.value=""
				e.target.modelNumber.value=""
				e.target.warrantyPeriod.value=""
			},
			(error) => {
				alert("Failed to Add Product");
			}
		);
	};

	return (
		<div className="container">
			<p></p>
			<h2 style = {{paddingLeft : 520 }}>Add Spare Part</h2>
			<br/>
			<Form onSubmit={handleSubmit} >
            <Row>
               <Col sm={6}>
                  <Form.Group controlId="name">
                     <Form.Label>Product Name</Form.Label>
                     <Form.Control
                        type="text"
                        name="name"
                        required
                        placeholder=""
                     />
                  </Form.Group>
                  <Form.Group controlId="modelNumber">
                     <Form.Label>Model Number</Form.Label>
                     <Form.Control
                        type="text"
                        name="modelNumber"
                        required
                        placeholder=""
                     />
                  </Form.Group>
               </Col>
               <Col sm={6}>
                  <Form.Group controlId="warrantyPeriod">
                     <Form.Label>Warranty Period(in years)</Form.Label>
                     <Form.Control
                        type="number"
                        name="warrantyPeriod"
                        required
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

export default ProductAddFunc;
