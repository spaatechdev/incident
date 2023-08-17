import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";
import { FaSimCard } from "react-icons/fa";

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
		<div className="body-mrgn">
		<h2><FaSimCard className="fa-style" /> Add Service</h2>
		
			<Form onSubmit={handleSubmit} className="white-bg">
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

export default ServiceAddFunc;
