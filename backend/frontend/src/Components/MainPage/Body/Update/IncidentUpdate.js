import React, { useState, useEffect } from "react";
import { Modal, Col, Row, Form, Button, Container } from "react-bootstrap";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { UpdateFunc, ServicesFunc } from "../../../Services";
import _ from "lodash";
import axios from "axios";
import dynamic_urls from "../../../../env";

const IncidentUpdateFunc = (props) => {
	const [employees, setEmployees] = useState([]);
	const [employeesErr, setEmployeesErr] = useState(0);

	const [incidentStatuses, setIncidentStatuses] = useState([]);
	const [incidentStatusesErr, setIncidentStatusesErr] = useState(0);

	const [degrees, setDegrees] = useState([]);
	const [degreesErr, setDegreesErr] = useState(0);

	const [levels, setLevels] = useState([]);
	const [levelsErr, setLevelsErr] = useState(0);

	const [spareParts, setSpareParts] = useState([]);
	const [sparePartsErr, setSparePartsErr] = useState(0);
	const [sparePartsUsed, setSparePartsUsed] = useState({});

	const [services, setServices] = useState([]);
	const [servicesErr, setServicesErr] = useState(0);
	const [servicesUsed, setServicesUsed] = useState({});

	const [isSuperuser, setIsSuperuser] = useState(false);

	const [totalAmount, setTotalAmount] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [grossAmount, setGrossAmount] = useState(0);

	const [rowsDataSparePart, setRowsDataSparePart] = useState([]);
	const [rowsDataService, setRowsDataService] = useState([]);

	const [severity, setSeverity] = useState(0);
	const [complexity, setComplexity] = useState(0)
	const [level, setLevel] = useState(Object.keys(props.incident).length ? props.incident.level : {});

	useEffect(() => {
		if (props.show) {
			if(props.incident.severity)
				setSeverity(props.incident.severity.degreeId)
			if(props.incident.complexity)
				setComplexity(props.incident.complexity.degreeId)
			if(props.incident.level)
				setLevel(props.incident.level)
			setRowsDataSparePart(props.incident.spareParts)
			setRowsDataService(props.incident.services)

			if (props.incident.amount != null || props.incident.amount != undefined)
				setTotalAmount(props.incident.amount)
		}
	}, [props.show]);

	const addTableRowsSparePart = () => {
		const rowsInput = {
			sparePart: "",
			quantity: "",
			totalPrice: ""
		}
		setRowsDataSparePart([...rowsDataSparePart, rowsInput])
	}

	const deleteTableRowsSparePart = (index) => {
		const rows = [...rowsDataSparePart];
		if (rows[index].totalPrice)
			setTotalAmount(totalAmount - rows[index].totalPrice)
		rows.splice(index, 1);
		setSparePartsUsed(
			x => {
				let ob = { ...x }
				delete ob[index]
				return ob
			}
		)
		setRowsDataSparePart(rows);
	}

	const handleChangeSparePart = (index, evnt) => {
		const { name, value } = evnt.target;
		const rowsInput = [...rowsDataSparePart];
		rowsInput[index][name] = value ? Number(value) : value;
		const sparePartInfo = (spareParts.find(
			(x) => x.sparePartId == rowsInput[index].sparePart))
		if (rowsInput[index].sparePart && rowsInput[index].quantity && sparePartInfo)
			rowsInput[index].totalPrice = Number((sparePartInfo.price * rowsInput[index].quantity).toFixed(2))
		else
			rowsInput[index].totalPrice = ""
		if (name == "sparePart" && value != '') {
			setSparePartsUsed(
				x => {
					let ob = { ...x }
					ob[index] = value
					return ob
				}
			)
		}
		setRowsDataSparePart(rowsInput)
	}

	const addTableRowsService = () => {
		const rowsInput = {
			service: "",
			price: ""
		}
		setRowsDataService([...rowsDataService, rowsInput])
	}

	const deleteTableRowsService = (index) => {
		const rows = [...rowsDataService];
		setTotalAmount(totalAmount - rows[index].price)
		rows.splice(index, 1);
		setServicesUsed(
			x => {
				let ob = { ...x }
				delete ob[index]
				return ob
			}
		)
		setRowsDataService(rows);
	}

	const handleChangeService = (index, evnt) => {
		const { name, value } = evnt.target;
		const rowsInput = [...rowsDataService];
		rowsInput[index][name] = value ? Number(value) : value;
		const serviceInfo = (services.find(
			(x) => x.serviceId == rowsInput[index].service))
		if (rowsInput[index].service && serviceInfo)
			rowsInput[index].price = serviceInfo.price
		else
			rowsInput[index].price = ""
		if (name == "service" && value) {
			setServicesUsed(
				x => {
					let ob = { ...x }
					ob[index] = value
					return ob
				}
			)
		}
		setRowsDataService(rowsInput)
	}

	useEffect(() => {
		setSparePartsUsed(
			x => {
				let ob = { ...x }
				rowsDataSparePart.map((stu, i) => ob[i] = stu.sparePart)
				return ob
			}
		)
		setServicesUsed(
			x => {
				let ob = { ...x }
				rowsDataService.map((stu, i) => ob[i] = stu.service)
				return ob
			}
		)
		let sparePartTotalAmount = 0
		rowsDataSparePart.map(x => sparePartTotalAmount += x.totalPrice ? x.totalPrice : 0)
		let serviceTotalAmount = 0
		rowsDataService.map(x => serviceTotalAmount += x.price ? x.price : 0)
		setGrossAmount(Number((sparePartTotalAmount + serviceTotalAmount).toFixed(2)))
		if (props.show && props.incident.productPurchaseDate && props.incident.product) {
			let productPurchaseDate = new Date(props.incident.productPurchaseDate)
			let incidentDate = new Date(props.incident.incidentDate)
			let timeDiff = (incidentDate.getTime() - productPurchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
			if (timeDiff < props.incident.product.warrantyPeriod)
				setDiscount(Number(serviceTotalAmount.toFixed(2)))
		}
		else
			setDiscount(0)
		// if(grossAmount)
		// 	setTotalAmount(grossAmount-discount)
	}, [rowsDataService, rowsDataSparePart, props.show]);

	useEffect(() => {
		setTotalAmount(grossAmount - discount)
	}, [grossAmount, discount]);

	useEffect(() => {
		if (localStorage.getItem("is_superuser") === "true") {
			setIsSuperuser(true);
		}
	}, []);

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
					dynamic_urls.SERVER_URL + dynamic_urls.employees,
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
					dynamic_urls.SERVER_URL + dynamic_urls.incidentStatuses,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.name === "AxiosError")
					setIncidentStatusesErr(incidentStatusesErr + 1);
				else setIncidentStatuses(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [incidentStatusesErr]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL + dynamic_urls.degrees,
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
					dynamic_urls.SERVER_URL + dynamic_urls.spareParts,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.name === "AxiosError")
					setSparePartsErr(sparePartsErr + 1);
				else setSpareParts(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [sparePartsErr]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL + dynamic_urls.services,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.name === "AxiosError")
					setServicesErr(servicesErr + 1);
				else setServices(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [servicesErr]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL + dynamic_urls.levels,
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

	const uniqueEmployeeID = (id) => {
		if (id < 10) return `(EMP-100${id})`;
		else return `(EMP-10${id})`;
	};
	const uniqueCustomerID = (id) => {
		if (id < 10) return `(CUST-100${id})`;
		else return `(CUST-10${id})`;
	};

	const uniqueEmployeeName = (name, id) => {
		if (id < 10) return `${name} (EMP-100${id})`;
		else return `${name} (EMP-10${id})`;
	};
	const uniqueCustomerName = (name, id) => {
		if (id < 10) return `${name} (CUST-100${id})`;
		else return `${name} (CUST-10${id})`;
	};

	const getCurrentDate = () => {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = "0" + dd;
		}
		if (mm < 10) {
			mm = "0" + mm;
		}
		var today = dd + "-" + mm + "-" + yyyy;
		return today;
	};

	const getCurrentTime = () => {
		var today = new Date();
		var hours = today.getHours();
		var minutes = today.getMinutes();
		var ampm = hours >= 12 ? "PM" : "AM";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		var strTime = hours + ":" + minutes + " " + ampm;
		return strTime;
	};

	const date = (d) => {
		let arr = d.split("-");
		let newDate = arr[2] + "-" + arr[1] + "-" + arr[0];
		return newDate;
	};

	const time = (t) => {
		let hr = Number(t.split(":")[0]);
		if (hr > 12)
			return (
				String(hr - 12) +
				":" +
				t.split(":")[1] +
				":" +
				t.split(":")[2] +
				" PM"
			);
		else
			return (
				String(hr) +
				":" +
				t.split(":")[1] +
				":" +
				t.split(":")[2] +
				" AM"
			);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.onHide();
		let submitData = {
			employeeId: Number(e.target.employee.value),
			incidentStatus: Number(e.target.incidentStatus.value),
			severity: Number(e.target.severity.value),
			complexity: Number(e.target.complexity.value),
			incidentRemark: e.target.incidentRemark.value,
		};
		let originalData = {
			employeeId: props.incident.employee?props.incident.employee.employeeId:null,
			incidentStatus: props.incident.incidentStatus.incidentStatusId,
			severity: props.incident.severity?props.incident.severity.degreeId:null,
			complexity: props.incident.complexity?props.incident.complexity.degreeId:null,
			incidentRemark: props.incident.incidentRemark,
		};

		let editHistory = props.incident.editHistory;
		if (!_.isEqual(submitData, originalData)) {
			editHistory.push({
				date: getCurrentDate(),
				time: getCurrentTime(),
				incidentDescription: props.incident.incidentDescription,
				incidentDate: props.incident.incidentDate,
				incidentTime: props.incident.incidentTime,
				employee: props.incident.employee,
				customer: props.incident.customer,
				severity: props.incident.severity,
				complexity: props.incident.complexity,
				level: props.incident.level,
				incidentRemark: props.incident.incidentRemark,
				incidentStatus: props.incident.incidentStatus,
				expectedCompletionDate: props.incident.expectedCompletionDate,
				expectedCompletionTime: props.incident.expectedCompletionTime,
			})
		};
		let JSONdata = {
			incidentDescription:e.target.incidentDescription.value,
			employeeId: Number(e.target.employee.value),
			incidentStatus: Number(e.target.incidentStatus.value),
			severity: Number(e.target.severity.value),
			complexity: Number(e.target.complexity.value),
			incidentRemark: e.target.incidentRemark.value,
			editHistory: editHistory,
			spareParts: rowsDataSparePart,
			services: rowsDataService,
			amount: totalAmount
		};
		console.log(JSONdata)
		axios.put(
			dynamic_urls.SERVER_URL + dynamic_urls.incidents +
			props.incident.incidentId +
			"/",
			JSONdata,
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		).then(
			(result) => {
				props.setupdated();
				alert("Sucessfully updated!");
			},
			(error) => {
				alert("Failed to Update Incident");
			}
		);
		
	};

	return (
		<div className="container">
			{Object.keys(props.incident).length != 0 &&
				<Modal
					{...props}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					scrollable
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">
							Update Incident Information
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleSubmit}>
							{/* Incident Info edit */}
							<Row>
								<Form.Group controlId="incidentDescription">
									<Form.Label>Incident Description</Form.Label>
									{isSuperuser ? (
										<textarea
											className="form-control"
											rows="3"
											name="incidentDescription"
											required
											defaultValue={
												props.incident.incidentDescription
											}
											placeholder=""
										></textarea>
									) : (
										<textarea
											className="form-control"
											rows="3"
											name="incidentDescription"
											required
											disabled
											defaultValue={
												props.incident.incidentDescription
											}
											placeholder=""
										></textarea>
									)}
								</Form.Group>

								<Col sm={6}>
									<Form.Group controlId="incidentStatus">
										<Form.Label>Incident Status</Form.Label>
										<select
											className="form-select"
											name="incidentStatus"
											aria-label="Default select example"
										>
											{incidentStatuses.map((stu) =>
												props.incident.incidentStatus.incidentStatusId == stu.incidentStatusId ? (
													<option
														value={
															stu.incidentStatusId
														}
														key={
															stu.incidentStatusId
														}
														selected
													>
														{stu.name}
													</option>
												) : (
													<option
														value={
															stu.incidentStatusId
														}
														key={
															stu.incidentStatusId
														}
													>
														{stu.name}
													</option>
												)
											)}
										</select>
									</Form.Group>

									<Form.Group controlId="employee">
										<Form.Label>Employee</Form.Label>
										{props.incident.level == null ?
											<select
												className="form-select"
												name="employee"
												aria-label="Default select example"
											>
												<option value="" required>
													Select employee
												</option>
												{employees && Object.keys(level).length &&
													employees.filter(x => x["level"]["levelId"] === level["levelId"]).map((stu) => (
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
											:
											<select
												className="form-select"
												name="employee"
												aria-label="Default select example"
											>
												{level.levelId != props.incident.level.levelId ?
													<option disabled value selected>
														Select employee
													</option>
													: null}
												{
													employees.filter((x) => x["level"]["levelId"] === level["levelId"]).map((stu) =>
														props.incident.employee.employeeId == stu.employeeId ? (
															<option
																value={stu.employeeId}
																key={stu.employeeId}
																selected
															>
																{uniqueEmployeeName(stu.name, stu.employeeId)}
															</option>
														) : (
															<option
																value={stu.employeeId}
																key={stu.employeeId}
															>
																{uniqueEmployeeName(stu.name, stu.employeeId)}
															</option>
														)
													)
												}
											</select>
										}

									</Form.Group>
								</Col>
								<Col sm={6}>
									<Form.Group controlId="severity">
										<Form.Label>Severity</Form.Label>
										{props.incident.severity == null ?
											<select
												className="form-select"
												name="severity"
												aria-label="Default select example"
												onChange={(e) => {
													setSeverity(Number(e.target.value));
												}}
												required
											>
												<option value="" required>
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
											:
											<select
												className="form-select"
												name="severity"
												aria-label="Default select example"
												onChange={(e) => { setSeverity(Number(e.target.value)) }}
											>
												{degrees.map((stu) => props.incident.severity.degreeId == stu.degreeId ? (
													<option
														value={stu.degreeId}
														key={stu.degreeId}
														selected
													>
														{stu.name}
													</option>
												) : (
													<option
														value={stu.degreeId}
														key={stu.degreeId}
													>
														{stu.name}
													</option>
												)
												)}
											</select>
										}

									</Form.Group>
									<Form.Group controlId="complexity">
										<Form.Label>Complexity</Form.Label>
										{props.incident.complexity == null ?
											<select
												className="form-select"
												name="complexity"
												aria-label="Default select example"
												onChange={(e) => {
													setComplexity(Number(e.target.value));
												}}
											>
												<option value="" required>
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
											:
											<select
												className="form-select"
												name="complexity"
												aria-label="Default select example"
												onChange={(e) => { setComplexity(Number(e.target.value)) }}
											>
												{degrees.map((stu) => props.incident.complexity.degreeId == stu.degreeId ? (
													<option
														value={stu.degreeId}
														key={stu.degreeId}
														selected
													>
														{stu.name}
													</option>
												) :
													(
														<option
															value={stu.degreeId}
															key={stu.degreeId}
														>
															{stu.name}
														</option>
													))}
											</select>
										}

									</Form.Group>
								</Col>
								<Form.Group controlId="incidentRemark">
									<Form.Label>Incident Remark</Form.Label>
									<textarea
										className="form-control"
										rows="3"
										name="incidentRemark"
										required
										defaultValue={props.incident.incidentRemark}
										placeholder=""
									></textarea>
								</Form.Group>
							</Row>

							{/* Spare part Info */}
							<div>
								<hr
									style={{
										marginTop: "20px",
										marginBottom: "15px",
										opacity: "0.5",
									}}
								></hr>
								<h5
									style={{
										textAlign: "center",
										marginBottom: "20px",
									}}
								>
									Spare parts info
									<span> </span>
								</h5>

								<Container>
									<table >
										<thead>
											<tr>
												<Row>
													<Col sm={5}><th>Spare parts</th></Col>
													<Col sm={3}><th>Total quantity(or metres)</th></Col>
													<Col sm={3}><th>Total price</th></Col>
													{!isSuperuser &&
														<Col sm={1}><th style={{ paddingRight: "0px" }}>
															<Button variant="success" onClick={addTableRowsSparePart}>
																<b>+</b>
															</Button>
														</th></Col>}
												</Row>
											</tr>
										</thead>
										<tbody>
											<TableRowsSparePart
												rowsData={rowsDataSparePart}
												deleteTableRows={deleteTableRowsSparePart}
												handleChange={handleChangeSparePart}
												spareParts={spareParts}
												sparePartsUsed={sparePartsUsed}
												isSuperuser={isSuperuser}
											/>
										</tbody>
									</table>
								</Container>
							</div>

							{/* Services Info */}
							<div>
								<hr
									style={{
										marginTop: "20px",
										marginBottom: "15px",
										opacity: "0.5",
									}}
								></hr>
								<h5
									style={{
										textAlign: "center",
										marginBottom: "20px",
									}}
								>
									Services info
									<span> </span>
								</h5>

								<Container>
									<table >
										<thead>
											<tr>
												<Row>
													<Col sm={8}><th>Services</th></Col>
													<Col sm={3}><th>Price</th></Col>
													{!isSuperuser &&
														<Col sm={1}><th style={{ paddingRight: "0px" }}>
															<Button variant="success" onClick={addTableRowsService}>
																<b>+</b>
															</Button>
														</th></Col>}
												</Row>
											</tr>
										</thead>
										<tbody>
											<TableRowsService
												rowsData={rowsDataService}
												deleteTableRows={deleteTableRowsService}
												handleChange={handleChangeService}
												services={services}
												servicesUsed={servicesUsed}
												isSuperuser={isSuperuser}
											/>
										</tbody>
									</table>
								</Container>
							</div>

							{/* Billing */}
							<div>
								<hr
									style={{
										marginTop: "20px",
										marginBottom: "15px",
										opacity: "0.5",
									}}
								></hr>
								<Container style={{ marginTop: "15px" }}>
									<Row>
										<Col sm={5}></Col>
										<Col sm={3} style={{ paddingLeft: "28px", fontSize: "13px" }}>
											<p>
												Gross Amount :
											</p>
											<p>
												Discount :
											</p>
										</Col>
										<Col sm={3} style={{ paddingLeft: "33px", fontSize: "13px", textAlign: "right", paddingRight: "40px" }}>
											<p
											>
												{`₹${grossAmount}`}
											</p>
											<p
											>
												{`-₹${discount}`}
											</p>
										</Col>
										<Col sm={1} ></Col>

										<Col sm={5} ></Col>
										<Col sm={6} style={{ paddingLeft: "28px" }}>
											<hr
												style={{
													marginTop: "0px",
													marginBottom: "9px",
													opacity: "0.5",
												}}
											></hr>
										</Col>
										<Col sm={1}></Col>

										<Col sm={5}></Col>
										<Col sm={3} style={{ paddingLeft: "28px", fontSize: "13px" }}>
											Total Amount :
										</Col>
										<Col sm={3} style={{ paddingLeft: "33px", fontSize: "13px", textAlign: "right", paddingRight: "40px" }}>{`₹${totalAmount}`}</Col>
									</Row>
								</Container>
							</div>

							<Container>


								<div className="col-lg-12 text-end submit">
									<Form.Group>
										<p></p>
										<Button
											variant="primary"
											type="submit"
										>
											Submit
										</Button>
									</Form.Group>
								</div>

							</Container>

						</Form>
					</Modal.Body>
				</Modal>}
		</div>
	);
};

const TableRowsSparePart = ({ rowsData, deleteTableRows, handleChange, spareParts, sparePartsUsed, isSuperuser }) => {
	return rowsData.map((data, index) => {
		const { sparePart, quantity, totalPrice } = data;
		let max = 0, threshold = 0
		let sparePartInfo = (spareParts.find(
			(x) => x.sparePartId == sparePart))
		if (sparePartInfo) {
			max = sparePartInfo.totalQuantity
			threshold = sparePartInfo.reorderLevel
		}
		// if (max < threshold)
		// 	alert(sparePartInfo.name + " stock is less than reorder level")

		let filteredSparePart = spareParts.filter(x =>
			!((Object.values(sparePartsUsed).filter(y =>
				y != sparePartsUsed[index.toString()])
			).includes(x.sparePartId)))

		return (
			<tr key={index}>
				<Row>
					<Col sm={5}>
						<td>
							<Form.Group controlId="sparePart">
								{isSuperuser ?
									<select
										className="form-select"
										name="sparePart"
										aria-label="Default select example"
										required
										value={sparePart}
										onChange={(evnt) =>
											handleChange(index, evnt)
										}
										disabled
									>
										<option
											disabled
											value=""
											selected
										>
											Select Spare part
										</option>
										{filteredSparePart &&
											filteredSparePart.map(
												(stu) => (
													<option
														value={stu.sparePartId}
														key={stu.sparePartId}
													>
														{stu.name}
													</option>
												)
											)}
									</select>
									:
									<select
										className="form-select"
										name="sparePart"
										aria-label="Default select example"
										required
										value={sparePart}
										onChange={(evnt) =>
											handleChange(index, evnt)
										}
									>
										<option
											disabled
											value=""
											selected
										>
											Select Spare part
										</option>
										{filteredSparePart &&
											filteredSparePart.map(
												(stu) => (
													<option
														value={stu.sparePartId}
														key={stu.sparePartId}
													>
														{stu.name}
													</option>
												)
											)}
									</select>
								}
							</Form.Group>
						</td>
					</Col>
					<Col sm={3}>
						<td>
							<Form.Group controlId="quantity">
								{isSuperuser ?
									<Form.Control
										type="number"
										value={quantity}
										name="quantity"
										className="form-control"
										pattern="^\s*(?=.*[1-9])\d*(?:\.\d{1,3})?\s*$"
										disabled
									/>
									:
									<Form.Control
										type="number"
										value={quantity}
										required
										onChange={(evnt) => handleChange(index, evnt)}
										name="quantity"
										className="form-control"
										pattern="^\s*(?=.*[1-9])\d*(?:\.\d{1,3})?\s*$"
										step="0.001"
										min="0"
										max={max}
									/>
								}
							</Form.Group>
						</td>
					</Col>
					<Col sm={3}>
						<td>
							<Form.Group controlId="totalPrice">
								{isSuperuser ?
									<Form.Control
										type="text"
										value={totalPrice ? totalPrice.toFixed(2) : totalPrice}
										required
										name="totalPrice"
										className="form-control"
										style={{ textAlign: "right" }}
										disabled
									/>
									:
									<Form.Control
										type="text"
										value={totalPrice ? totalPrice.toFixed(2) : totalPrice}
										required
										name="totalPrice"
										className="form-control"
										style={{ textAlign: "right" }}
									/>
								}
							</Form.Group>
						</td>
					</Col>
					<Col sm={1}>
						{!isSuperuser &&
							<td>
								<Button variant="danger" onClick={() => deleteTableRows(index)}>
									<b>x</b>
								</Button>
							</td>}
					</Col>
				</Row>
			</tr>
			// <TableRow
			// 	data={data}

			// />
		);
	});
};

const TableRowsService = ({ rowsData, deleteTableRows, handleChange, services, servicesUsed, isSuperuser }) => {
	return rowsData.map((data, index) => {
		const { service, price } = data;

		let filteredService = services.filter(x =>
			!((Object.values(servicesUsed).filter(y =>
				y != servicesUsed[index.toString()])
			).includes(x.serviceId)))

		return (
			<tr key={index}>
				<Row>
					<Col sm={8}>
						<td>
							<Form.Group controlId="service">
								{isSuperuser ?
									<select
										className="form-select"
										name="service"
										aria-label="Default select example"
										required
										value={service}
										onChange={(evnt) =>
											handleChange(index, evnt)
										}
										disabled
										style={{ width: "400px" }}
									>
										<option
											disabled
											value=""
											selected
										>
											Select Service
										</option>
										{filteredService &&
											filteredService.map(
												(stu) => (
													<option
														value={stu.serviceId}
														key={stu.serviceId}
													>
														{stu.name}
													</option>
												)
											)}
									</select>
									:
									<select
										className="form-select"
										name="service"
										aria-label="Default select example"
										required
										value={service}
										onChange={(evnt) =>
											handleChange(index, evnt)
										}
										style={{ width: "400px" }}
									>
										<option
											disabled
											value=""
											selected
										>
											Select Service
										</option>
										{filteredService &&
											filteredService.map(
												(stu) => (
													<option
														value={stu.serviceId}
														key={stu.serviceId}
													>
														{stu.name}
													</option>
												)
											)}
									</select>
								}
							</Form.Group>
						</td>
					</Col>
					<Col sm={3}>
						<td>
							<Form.Group controlId="price">
								<Form.Control
									type="number"
									value={price ? price.toFixed(2) : price}
									required
									name="price"
									className="form-control"
									disabled
									style={{ textAlign: "right", borderRightWidth: "0px", paddingRight: "0px" }}
								/>
							</Form.Group>
						</td>
					</Col>
					<Col sm={1}>
						{!isSuperuser &&
							<td>
								<Button variant="danger" onClick={() => deleteTableRows(index)}>
									<b>x</b>
								</Button>
							</td>}
					</Col>
				</Row>
			</tr>
		);
	});
};
export default IncidentUpdateFunc;