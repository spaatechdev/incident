import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button, ButtonToolbar } from "react-bootstrap";
import "../../../../CSS/View.css";
import IncidentUpdateFunc from "../Update/IncidentUpdate";
import IncidentUpdateHistoryFunc from "../Update/IncidentUpdateHistory";
import axios from "axios";
import { useLongPress } from "use-long-press";
import dynamic_urls from "../../../../env.js"
import { Link } from 'react-router-dom'

const IncidentViewFunc = () => {
	const [incidents, setIncidents] = useState([]);
	const [incidentsErr, setIncidentsErr] = useState(0);
	// const [employees, setEmployees] = useState([]);
	const [editModalShow, setEditModalShow] = useState(false);
	const [editHistoryModalShow, setEditHistoryModalShow] = useState(false);
	const [editHistory, setEditHistory] = useState([]);
	const [editIncident, setEditIncident] = useState({});
	const [isUpdated, setIsUpdated] = useState(0);
	const [isDeleted, setIsDeleted] = useState(0);
	const [isSuperuser, setIsSuperuser] = useState(false);
	useEffect(() => {
		if (localStorage.getItem("is_superuser") === "true") {
			setIsSuperuser(true);
		}
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL + dynamic_urls.incidents,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.name === "AxiosError")
					setIncidentsErr(incidentsErr + 1);
				else setIncidents(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [isUpdated, isDeleted, incidentsErr]);

	let clickHoldTimer = null;

	const handleMouseDown = (e, stu) => {
		if (!editModalShow) {
			clickHoldTimer = setTimeout(() => {
				e.preventDefault();
				setEditHistoryModalShow(true);
				setEditHistory(stu.editHistory);
				//Action to be performed after holding down mouse
			}, 2000)
		} //Change 1000 to number of milliseconds required for mouse hold
	};

	const handleMouseUp = () => {
		clearTimeout(clickHoldTimer);
	};

	const handleUpdate = (e, stu) => {
		e.preventDefault();
		setEditModalShow(true);
		setEditIncident(stu);
	};

	const handleUpdateState = () => {
		setIsUpdated(isUpdated + 1);
	};

	const handleDeleteState = () => {
		setIsDeleted(isDeleted + 1);
	};

	const handleDelete = (e, incidentId) => {
		if (window.confirm("Are you sure ?")) {
			e.preventDefault();
			handleDeleteState();
			axios
				.delete(dynamic_urls.SERVER_URL + dynamic_urls.incidents + incidentId + "/", {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
				.then(
					(result) => {
						alert("Successfully deleted");
					},
					(error) => {
						alert("Failed to Delete");
					}
				);
		}
	};

	const uniqueEmployeeID = (id) => {
		if (id < 10) return `EMP-100${id}`;
		else return `EMP-10${id}`;
	};

	const uniqueCustomerID = (id) => {
		if (id < 10) return `CUST-100${id}`;
		else return `CUST-10${id}`;
	};

	const date = (d) => {
		let arr = d.split("-");
		let newDate = arr[2] + "-" + arr[1] + "-" + arr[0];
		return newDate;
	};

	const time = (t) => {
		let hr = Number(t.split(":")[0])
		if (hr >= 12) {
			if (hr > 12)
				return String(hr - 12) + ":" + t.split(":")[1] + ":" + t.split(":")[2] + " PM"
			else
				return String(hr) + ":" + t.split(":")[1] + ":" + t.split(":")[2] + " PM"
		}
		else {
			if (hr < 1)
				return "12" + ":" + t.split(":")[1] + ":" + t.split(":")[2] + " AM"
			else
				return String(hr) + ":" + t.split(":")[1] + ":" + t.split(":")[2] + " AM"
		}

	}
	let EditModalClose = () => setEditModalShow(false);
	let EditHistoryModalClose = () => setEditHistoryModalShow(false);

	let userEmail = localStorage.getItem("user_email");
	return (
		<div className="body-mrgn">
			<h2><FaFileAlt className="fa-style" /> Incident Details</h2>
			<div className="row side-row" style={{ padding: 15 }}>
				{/* <h3 align="center">Incident Details</h3> */}
				{/* <p id="before-table"></p> */}

				<Link to="/incidents/add" className="link">
					<div className="submit float-end" style={{ paddingLeft: 0, paddingRight: 0, position: "relative", bottom: "100%" }}>
						<Button variant="primary" type="submit" className="float-end">
							Add Incident
						</Button>
					</div>
				</Link>
				<div
					className="tableFixHead"
					style={{ paddingLeft: 0, paddingRight: 0, marginTop: "-30px" }}
				>
					<Table
						striped
						bordered
						hover
						className="react-bootstrap-table"
						id="dataTable"
					>
						<thead>
							<tr>
								<th>ID</th>
								<th>Incident Description</th>
								<th style={{ width: 99 }}>Incident Date</th>
								<th style={{ width: 99 }}>Incident Time</th>
								<th>Customer Name</th>
								<th style={{ width: 97 }}>Customer ID</th>
								<th>Product Name</th>
								<th>Employee Name</th>
								<th>Employee ID</th>
								<th>Severity</th>
								<th>Complexity</th>
								<th>Level</th>
								{/* <th>Total Allotted Time(in hrs)</th> */}
								<th>Incident Remark</th>
								<th>Incident Status</th>
								<th>Estimated completion date</th>
								<th>Estimated completion time</th>
								<th>Amount</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{incidents &&
								incidents.map((stu) =>
									isSuperuser ? (
										<tr
											key={stu.incidentId}
											onMouseDown={(event) =>
												handleMouseDown(event, stu)
											}
											onMouseUp={handleMouseUp}
										>
											<td>{stu.customIncidentId}</td>
											{/* <td><div dangerouslySetInnerHTML={{__html: stu.incidentDescription}}></div></td> */}
											<td>{stu.incidentDescription}</td>
											<td>{date(stu.incidentDate)}</td>
											<td>{time(stu.incidentTime)}</td>

											<td>{stu.customer.name}</td>
											<td>
												{uniqueCustomerID(
													stu.customer.customerId
												)}
											</td>
											<td>{stu.product?stu.product.name:null}</td>
											<td>{stu.employee?stu.employee.name:null}</td>
											<td>
												{stu.employee?
												uniqueEmployeeID(
													stu.employee.employeeId
												):null}
											</td>
											<td style={{ textAlign: "center" }}>
												{stu.severity?stu.severity.name:null}
											</td>
											<td style={{ textAlign: "center" }}>
												{stu.complexity?stu.complexity.name:null}
											</td>
											<td>{stu.level?stu.level.name:null}</td>
											{/* <td>{stu.level.tat}</td> */}
											<td>{stu.incidentRemark}</td>
											<td>{stu.incidentStatus.name}</td>
											<td>{stu.expectedCompletionDate?date(stu.expectedCompletionDate):null}</td>
											<td>{stu.expectedCompletionTime?time(stu.expectedCompletionTime):null}</td>
											<td>{stu.amount ? `₹${stu.amount}` : null}</td>
											<td width="110rem">
												{isSuperuser && (
													<Button
														className="mr-2"
														variant="danger"
														onClick={(event) =>
															handleDelete(
																event,
																stu.incidentId
															)
														}
													>
														<RiDeleteBin5Line />
													</Button>
												)}
												<span>&nbsp;&nbsp;</span>
												<Button
													className="mr-2"
													variant="success"
													onClick={(event) =>
														handleUpdate(event, stu)
													}
												>
													<FaEdit />
												</Button>

												<IncidentUpdateFunc
													show={editModalShow}
													incident={editIncident}
													setupdated={handleUpdateState}
													onHide={EditModalClose}
												></IncidentUpdateFunc>
												<IncidentUpdateHistoryFunc
													show={editHistoryModalShow}
													edit={editHistory}
													onHide={EditHistoryModalClose}
												></IncidentUpdateHistoryFunc>
											</td>
										</tr>
									) : stu.employee && stu.employee.email === userEmail ? (
										<tr
											key={stu.incidentId}
											onMouseDown={(event) =>
												handleMouseDown(event, stu)
											}
											onMouseUp={handleMouseUp}
										>
											<td>{stu.incidentId}</td>
											<td>{stu.incidentDescription}</td>
											<td>{date(stu.incidentDate)}</td>
											<td>{time(stu.incidentTime)}</td>
											<td>{stu.customer?stu.customer.name:null}</td>
											<td>
												{stu.customer && uniqueCustomerID(
													stu.customer.customerId
												)}
											</td>
											<td>{stu.product?stu.product.name:null}</td>
											<td>{stu.employee?stu.employee.name:null}</td>
											<td>
												{stu.employee && uniqueEmployeeID(
													stu.employee.employeeId
												)}
											</td>
											<td style={{ textAlign: "center" }}>
												{stu.severity?stu.severity.name:null}
											</td>
											<td style={{ textAlign: "center" }}>
												{stu.complexity?stu.complexity.name:null}
											</td>
											<td>{stu.level?stu.level.name:null}</td>
											{/* <td>{stu.level.tat}</td> */}
											<td>{stu.incidentRemark}</td>
											<td>{stu.incidentStatus.name}</td>
											<td>{stu.expectedCompletionDate?date(stu.expectedCompletionDate):null}</td>
											<td>{stu.expectedCompletionTime?time(stu.expectedCompletionTime):null}</td>
											<td>{stu.amount ? `₹${stu.amount}` : null}</td>
											<td>
												<Button
													className="mr-2"
													variant="success"
													onClick={(event) =>
														handleUpdate(event, stu)
													}
												>
													<FaEdit />
												</Button>
												<IncidentUpdateFunc
													show={editModalShow}
													incident={editIncident}
													setupdated={
														handleUpdateState
													}
													onHide={EditModalClose}
												></IncidentUpdateFunc>
											</td>
											<IncidentUpdateHistoryFunc
												show={editHistoryModalShow}
												edit={editHistory}
												onHide={EditHistoryModalClose}
											></IncidentUpdateHistoryFunc>
										</tr>
									) : null
								)}
						</tbody>
					</Table>
				</div>
			</div>
		</div>
	);
};
export default IncidentViewFunc;
