import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";

const ServiceAddFunc = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		let JSONdata = {
			name: e.target.name.value,
			price: Number(e.target.price.value),
		};
		axios.post(dynamic_urls.SERVER_URL+dynamic_urls.services, JSONdata, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then(
			(result) => {
				alert("Successfully added");
				e.target.name.value=""
				e.target.price.value=""
			},
			(error) => {
				alert("Failed to Add Service");
			}
		);
	};

	return (
		<div className="container">
			<p></p>
			<h2 style = {{paddingLeft : 520 }}>Add Service</h2>
			<br/>
			<Form onSubmit={handleSubmit} >
            <Row>
               <Col sm={6}>
                  <Form.Group controlId="name">
                     <Form.Label>Service Name</Form.Label>
                     <Form.Control
                        type="text"
                        name="name"
                        required
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

export default ServiceAddFunc;
