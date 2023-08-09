import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button, ButtonToolbar } from "react-bootstrap";
import "../../../../CSS/View.css";
import EmployeeUpdateFunc from "../Update/EmployeeUpdate";
import axios from "axios";
import dynamic_urls from "../../../../env";

const EmployeeViewFunc = ({ callback }) => {
	const [employees, setEmployees] = useState([]);
	const [editModalShow, setEditModalShow] = useState(false);
	const [editEmployee, setEditEmployee] = useState([]);
	const [isUpdated, setIsUpdated] = useState(0);
	const [isDeleted, setIsDeleted] = useState(0);

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
				setEmployees(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [isUpdated, isDeleted]);

	const handleUpdate = (e, stu) => {
		e.preventDefault();
		setEditModalShow(true);
		setEditEmployee(stu);
	};
	const handleUpdateState = () => {
		setIsUpdated(isUpdated + 1);
	};
	const handleDeleteState = () => {
		setIsDeleted(isDeleted + 1);
	};

	const handleDelete = (e, employeeId) => {
		if (window.confirm("Are you sure ?")) {
			e.preventDefault();
			handleDeleteState();
			axios
				.delete(dynamic_urls.SERVER_URL+dynamic_urls.employees + employeeId + "/", {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
				.then(
					(result) => {
						if (
							result.message ===
							"Request failed with status code 500"
						)
							alert(
								"Employee cannot be deleted as an incident is assigned to it"
							);
						else alert("Successfully deleted");
					},
					(error) => {
						alert("Failed to Delete");
					}
				);
		}
	};

	let EditModalClose = () => {
		setEditModalShow(false);
	};
	return (
		<div className="body-mrgn">
		<h2><FaFileAlt className="fa-style" /> Employee Details</h2>
			<div className="row side-row">
				<div
					class="tableFixHead"
					style={{ paddingLeft: 0, paddingRight: 0 }}
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
								<th>Name</th>
								<th>Address</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Skill</th>
								<th>Level</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{employees &&
								employees.map((stu) => (
									<tr key={stu.employeeId}>
										<td>{stu.employeeId}</td>
										<td>{stu.name}</td>
										<td>{stu.address}</td>
										<td>{stu.email}</td>
										<td>{stu.phone}</td>
										<td>{stu.skill.name}</td>
										<td>{stu.level.name}</td>
										<td>
											<Button
												className="mr-2"
												variant="danger"
												onClick={(event) =>
													handleDelete(
														event,
														stu.employeeId
													)
												}
											>
												<RiDeleteBin5Line />
											</Button>
											<span>&nbsp;&nbsp;&nbsp;</span>
											<Button
												className="mr-2"
												variant="success"
												onClick={(event) =>
													handleUpdate(event, stu)
												}
											>
												<FaEdit />
											</Button>
											<EmployeeUpdateFunc
												show={editModalShow}
												employee={editEmployee}
												setupdated={handleUpdateState}
												onHide={EditModalClose}
											></EmployeeUpdateFunc>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				</div>
			</div>
		</div>
	);
};
export default EmployeeViewFunc;
