import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";
import { FaTools } from "react-icons/fa";

const SparePartAddFunc = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		let JSONdata = {
			name: e.target.name.value,
			price:Number(e.target.price.value),
			totalQuantity: Number(e.target.totalQuantity.value),
			reorderLevel:Number(e.target.reorderLevel.value)
		};
		axios.post(dynamic_urls.SERVER_URL+dynamic_urls.spareParts, JSONdata, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then(
			(result) => {
				alert("Successfully added");
				e.target.name.value=""
				e.target.price.value=""
				e.target.totalQuantity.value=""
				e.target.reorderLevel.value=""
			},
			(error) => {
				alert("Failed to Add Spare Part");
			}
		);
	};

	return (
		<div className="body-mrgn">
		<h2><FaTools className="fa-style" /> Add Spare Part</h2>
			<Form onSubmit={handleSubmit} className="white-bg">
					<Row>
							<Col sm={6}>
								<Form.Group controlId="name">
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										name="name"
										required
										placeholder=""
									/>
								</Form.Group>
								<Form.Group controlId="totalQuantity">
									<Form.Label>Total Quantity</Form.Label>
									<Form.Control
										type="number"
										name="totalQuantity"
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
								<Form.Group controlId="reorderLevel">
									<Form.Label>Reorder Level</Form.Label>
									<Form.Control
										type="number"
										name="reorderLevel"
										required
									/>
								</Form.Group>
								</Col>
							<Col sm={12}>
								<Form.Group>
									<div class="pt-4 submit">
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

export default SparePartAddFunc;
