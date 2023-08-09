import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import dynamic_urls from "../../../../env";

const CustomerAddFunc = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		let JSONdata = {
			name: e.target.name.value,
			address: e.target.address.value,
			email: e.target.email.value,
			phone: e.target.phone.value
		};
		axios.post(dynamic_urls.SERVER_URL+dynamic_urls.customers, JSONdata, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then(
			(result) => {
				alert("Successfully updated");
				e.target.name.value=""
				e.target.address.value=""
				e.target.email.value=""
				e.target.phone.value=""
			},
			(error) => {
				alert("Failed to Add Customer");
			}
		);
	};

	return (
		<div className="body-mrgn">
			<h2><FaUserAlt className="fa-style" /> Add Customer</h2>

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

						<Form.Group controlId="address">
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								name="address"
								required
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
								placeholder=""
							/>
						</Form.Group>
						<Form.Group controlId="phone">
							<Form.Label>Phone</Form.Label>
							<Form.Control
								type="number"
								name="phone"
								required
								min="1000000000"
								max="9999999999"
							/>
						</Form.Group>
					</Col>
					<Col sm={12}>
						<Form.Group>
							<div className="pt-4 submit">
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

export default CustomerAddFunc;
