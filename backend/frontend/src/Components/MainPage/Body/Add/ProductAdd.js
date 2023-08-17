import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";
import { FaScroll } from "react-icons/fa";

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
		<div className="body-mrgn">
      <h2><FaScroll className="fa-style" /> Add Product</h2>
			<Form onSubmit={handleSubmit} className="white-bg">
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
                  </Col>
                  <Col sm={12}>
                  <Form.Group>
                     <div className="pt-4 submit text-end">
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

export default ProductAddFunc;
