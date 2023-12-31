import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line, RiFileZipFill } from "react-icons/ri";
import { Button, ButtonToolbar } from "react-bootstrap";
import "../../../../CSS/View.css";
import ServiceUpdateFunc from "../Update/ServiceUpdate";
import axios from "axios";
import dynamic_urls from "../../../../env";
import { FaFileAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'

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
		<div className="body-mrgn">
		 <h2><FaFileAlt className="fa-style" /> Service Details</h2>
			<div className="row side-row" style={{ padding: 15 }}>
			<Link to="/services/add" className="link">
					<div className="submit float-end" style={{ paddingLeft: 0, paddingRight: 0, position: "relative", bottom: "100%" }}>	
					<Button variant="primary" type="submit" className="float-end">
						Add Services
					</Button>
					</div>
				</Link>
				<div
					class="tableFixHead"
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
												variant="success"
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
