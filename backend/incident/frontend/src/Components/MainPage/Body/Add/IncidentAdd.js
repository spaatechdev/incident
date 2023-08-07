import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import { format } from "date-fns";
import EstimatedDateTimeFunc from "./EstimatedDateTime";
import dynamic_urls from "../../../../env";

const IncidentAddFunc = () => {
	const [employees, setEmployees] = useState([]);
	const [employeesErr, setEmployeesErr] = useState(0);

	const [customers, setCustomers] = useState([]);
	const [customersErr, setCustomersErr] = useState(0);

	const [degrees, setDegrees] = useState([]);
	const [degreesErr, setDegreesErr] = useState(0);

	const [levels, setLevels] = useState([]);
	const [levelsErr, setLevelsErr] = useState(0);

	const [products, setProducts] = useState([]);
	const [productsErr, setProductsErr] = useState(0);

	const [severity, setSeverity] = useState(0);
	const [complexity, setComplexity] = useState(0);
	const [level, setLevel] = useState({});
	
	useEffect(() => {
		if (severity && complexity && levels.length) {
			let avg_id = (severity + complexity) / 2;
			let level_count = Math.round(levels.length / 2);
			if (avg_id < level_count)
				setLevel(levels.find((obj) => obj["levelId"] === 1));
			else if (avg_id > level_count)
				setLevel(levels.find((obj) => obj["levelId"] === 3));
			else setLevel(levels.find((obj) => obj["levelId"] === 2));
		}
	}, [severity, complexity]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.employees,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.name === "AxiosError")
					setEmployeesErr(employeesErr + 1);
				else setEmployees(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [employeesErr]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.customers,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.name === "AxiosError")
					setCustomersErr(customersErr + 1);
				else setCustomers(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [customersErr]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.degrees,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.name === "AxiosError")
					setDegreesErr(degreesErr + 1);
				else setDegrees(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [degreesErr]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.levels,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.name === "AxiosError") setLevelsErr(levelsErr + 1);
				else setLevels(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [levelsErr]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.products,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.name === "AxiosError") setProductsErr(productsErr + 1);
				else setProducts(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [productsErr]);

	const uniqueEmployeeName = (name, id) => {
		if (id < 10) return `${name} (EMP-100${id})`;
		else return `${name} (EMP-10${id})`;
	};

	const uniqueCustomerName = (name, id) => {
		if (id < 10) return `${name} (CUST-100${id})`;
		else return `${name} (CUST-10${id})`;
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		let JSONdata = {
			customerId: Number(e.target.customer.value),
			employeeId: Number(e.target.employee.value),
			incidentDescription: e.target.incidentDescription.value,
			incidentRemark: e.target.incidentRemark.value,
			severity: Number(e.target.severity.value),
			complexity: Number(e.target.complexity.value),
		};
		console.log(JSONdata);
		axios
			.post(dynamic_urls.SERVER_URL+dynamic_urls.incidents, JSONdata, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then(
				(result) => {
					alert("Incident Added Successfully");
					window.location.href = "/incidents/add";
				},
				(error) => {
					alert("Failed to Add Incident");
				}
			);
	};
	const buttonStyle = {
		lineHeight:"10px",
		paddingLeft: "4px",
		paddingRight: "4px",
		paddingTop: "2px",
   }
	return (
		<div className="container">
			<p></p>
			<h2 style={{ paddingLeft: 520 }}>Add Incident</h2>
			<Form onSubmit={handleSubmit}>
				<Row>
					<Form.Group controlId="incidentDescription">
						<Form.Label>Incident Description</Form.Label>
						<textarea
							className="form-control"
							rows="3"
							name="incidentDescription"
							required
							placeholder=""
						></textarea>
					</Form.Group>
					<Col sm={6}>
						<Form.Group controlId="customer">
							<Form.Label>Customer</Form.Label>	
							<span> </span>					
							<Button variant="success"  style={buttonStyle} href="/customers/add">
								+
							</Button>
							<select
								className="form-select"
								name="customer"
								aria-label="Default select example"
							>
								<option disabled value selected>
									Select customer
								</option>
								{customers &&
									customers.map((stu) => (
										<option
											value={stu.customerId}
											key={stu.customerId}
										>
											{uniqueCustomerName(
												stu.name,
												stu.customerId
											)}

										</option>
									))}
							</select>
						</Form.Group>

						<Form.Group controlId="employee">
							<Form.Label>Employee</Form.Label>
							<select
								className="form-select"
								name="employee"
								aria-label="Default select example"
							>
								<option disabled value selected>
									Select employee
								</option>
								{employees && Object.keys(level).length &&
									employees.filter(x=>x["level"]["levelId"] === level["levelId"]).map((stu) => (
										<option
											value={stu.employeeId}
											key={stu.employeeId}
										>
											{uniqueEmployeeName(
												stu.name,
												stu.employeeId
											)}
										</option>
									))}
							</select>
						</Form.Group>
						<Form.Group controlId="product">
							<Form.Label>Product</Form.Label>	
							<select
								className="form-select"
								name="product"
								aria-label="Default select example"
							>
								<option disabled value selected>
									Select Product
								</option>
								{products &&
									products.map((stu) => (
										<option
											value={stu.productId}
											key={stu.productId}
										>
											{stu.name}
										</option>
									))}
							</select>
						</Form.Group>
					</Col>
					<Col sm={6}>
						<Form.Group controlId="severity">
							<Form.Label>Severity</Form.Label>
							<select
								className="form-select"
								name="severity"
								aria-label="Default select example"
								onChange={(e) => {
									setSeverity(Number(e.target.value));
								}}
							>
								<option disabled value selected>
									Select severity
								</option>
								{degrees &&
									degrees.map((stu) => (
										<option
											value={stu.degreeId}
											key={stu.degreeId}
										>
											{stu.name}
										</option>
									))}
							</select>
						</Form.Group>
						<Form.Group controlId="complexity">
							<Form.Label>Complexity</Form.Label>
							<select
								className="form-select"
								name="complexity"
								aria-label="Default select example"
								onChange={(e) => {
									setComplexity(Number(e.target.value));
								}}
							>
								<option disabled value selected>
									Select complexity
								</option>
								{degrees &&
									degrees.map((stu) => (
										<option
											value={stu.degreeId}
											key={stu.degreeId}
										>
											{stu.name}
										</option>
									))}
							</select>
						</Form.Group>
						<Form.Group controlId="productPurchaseDate">
                     <Form.Label>Product Purchase Date</Form.Label>
                     <Form.Control
                        type="date"
                        name="modelNumber"
                        required
                        placeholder=""
                  />
                  </Form.Group>
					</Col>
				</Row>
				<EstimatedDateTimeFunc
					level={level}
				/>
				<Row>
					<Form.Group controlId="incidentRemark">
						<Form.Label>Incident Remark</Form.Label>
						<textarea
							className="form-control"
							rows="3"
							name="incidentRemark"
							required
							placeholder=""
						></textarea>
					</Form.Group>
					<Col sm={10}></Col>
					<Col sm={2}>
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
export default IncidentAddFunc;
