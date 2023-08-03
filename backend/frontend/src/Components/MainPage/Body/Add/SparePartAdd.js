import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import dynamic_urls from "../../../../env";

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
		<div className="container">
			<p></p>
			<h2 style = {{paddingLeft : 520 }}>Add Spare Part</h2>
			<br/>
			<Form onSubmit={handleSubmit} >
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

export default SparePartAddFunc;
