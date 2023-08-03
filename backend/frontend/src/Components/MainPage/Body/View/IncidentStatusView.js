import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line, RiFileZipFill } from "react-icons/ri";
import { Button, ButtonToolbar } from "react-bootstrap";
import "../../../../CSS/View.css";
import IncidentStatusUpdateFunc from "../Update/IncidentStatusUpdate";
import axios from "axios";
import dynamic_urls from "../../../../env";

const IncidentStatusViewFunc = () => {
	const [incidentStatuses, setIncidentStatuses] = useState([]);
	const [editModalShow, setEditModalShow] = useState(false);
	const [editIncidentStatus, setEditIncidentStatus] = useState([]);
	const [isUpdated, setIsUpdated] = useState(0);
	const [isDeleted, setIsDeleted] = useState(0);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.incidentStatuses,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				setIncidentStatuses(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [isUpdated, isDeleted]);

	const handleUpdate = (e, stu) => {
		e.preventDefault();
		setEditModalShow(true);
		setEditIncidentStatus(stu);
	};

	const handleUpdateState = () => {
		setIsUpdated(isUpdated + 1);
	};
	const handleDeleteState = () => {
		setIsDeleted(isDeleted + 1);
	};

	const handleDelete = (e, incidentStatusId) => {
		if (window.confirm("Are you sure ?")) {
			e.preventDefault();
			handleDeleteState();
			axios
				.delete(dynamic_urls.SERVER_URL+dynamic_urls.incidentStatuses + incidentStatusId + "/", {
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

	let EditModalClose = () => setEditModalShow(false);
	// let incidentStatuss = ServicesFunc("incidentStatuss/")
	return (
		<div
			className="container-fluid side-container"
			id="Container"
			style={{ paddingRight: 0 }}
		>
			<div className="row side-row" style={{ padding: 15 }}>
				<h3 align="center">Incident Status Details</h3>
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
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{incidentStatuses &&
								incidentStatuses.map((stu) => (
									<tr key={stu.incidentStatusId}>
										<td>{stu.incidentStatusId}</td>
										<td>{stu.name}</td>
										<td>
											<Button
												className="mr-2"
												variant="danger"
												onClick={(event) =>
													handleDelete(
														event,
														stu.incidentStatusId
													)
												}
											>
												<RiDeleteBin5Line />
											</Button>
											<span>&nbsp;&nbsp;&nbsp;</span>
											<Button
												className="mr-2"
												onClick={(event) =>
													handleUpdate(event, stu)
												}
											>
												<FaEdit />
											</Button>
											<IncidentStatusUpdateFunc
												show={editModalShow}
												incidentStatus={editIncidentStatus}
												setupdated={handleUpdateState}
												onHide={EditModalClose}
											></IncidentStatusUpdateFunc>
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
export default IncidentStatusViewFunc;
