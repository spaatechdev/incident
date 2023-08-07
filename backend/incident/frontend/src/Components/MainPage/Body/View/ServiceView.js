import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line, RiFileZipFill } from "react-icons/ri";
import { Button, ButtonToolbar } from "react-bootstrap";
import "../../../../CSS/View.css";
import ServiceUpdateFunc from "../Update/ServiceUpdate";
import axios from "axios";
import dynamic_urls from "../../../../env";

const ServiceViewFunc = () => {
	const [services, setServices] = useState([]);
	const [editModalShow, setEditModalShow] = useState(false);
	const [editService, setEditService] = useState([]);
	const [isUpdated, setIsUpdated] = useState(0);
	const [isDeleted, setIsDeleted] = useState(0);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.services,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				setServices(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [isUpdated, isDeleted]);

	const handleUpdate = (e, stu) => {
		e.preventDefault();
		setEditModalShow(true);
		setEditService(stu);
	};

	const handleUpdateState = () => {
		setIsUpdated(isUpdated + 1);
	};
	const handleDeleteState = () => {
		setIsDeleted(isDeleted + 1);
	};

	const handleDelete = (e, serviceId) => {
		if (window.confirm("Are you sure ?")) {
			e.preventDefault();
			handleDeleteState();
			axios
				.delete(dynamic_urls.SERVER_URL+dynamic_urls.services + serviceId + "/", {
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
	// let services = ServicesFunc(dynamic_urls.services)
	return (
		<div
			className="container-fluid side-container"
			id="Container"
			style={{ paddingRight: 0 }}
		>
			<div className="row side-row" style={{ padding: 15 }}>
				<h3 align="center">Service Details</h3>
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
								<th>Service</th>
								<th>Price</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{services &&
								services.map((stu) => (
									<tr key={stu.serviceId}>
										<td>{stu.serviceId}</td>
										<td>{stu.name}</td>
										<td>{stu.price}</td>
										<td>
											<Button
												className="mr-2"
												variant="danger"
												onClick={(event) =>
													handleDelete(
														event,
														stu.serviceId
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
											<ServiceUpdateFunc
												show={editModalShow}
												service={editService}
												setupdated={handleUpdateState}
												onHide={EditModalClose}
											></ServiceUpdateFunc>
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
export default ServiceViewFunc;
