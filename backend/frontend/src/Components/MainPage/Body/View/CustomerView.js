import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { RiDeleteBin5Line, RiFileZipFill } from "react-icons/ri";
import { Button, ButtonToolbar } from "react-bootstrap";
import "../../../../CSS/View.css";
import CustomerUpdateFunc from "../Update/CustomerUpdate";
import axios from "axios";
import dynamic_urls from "../../../../env";
import { Link } from 'react-router-dom'

const CustomerViewFunc = () => {
	const [customers, setCustomers] = useState([]);
	const [editModalShow, setEditModalShow] = useState(false);
	const [editCustomer, setEditCustomer] = useState([]);
	const [isUpdated, setIsUpdated] = useState(0);
	const [isDeleted, setIsDeleted] = useState(0);

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
				setCustomers(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [isUpdated, isDeleted]);

	const handleUpdate = (e, stu) => {
		e.preventDefault();
		setEditModalShow(true);
		setEditCustomer(stu);
	};

	const handleUpdateState = () => {
		setIsUpdated(isUpdated + 1);
	};
	const handleDeleteState = () => {
		setIsDeleted(isDeleted + 1);
	};

	const handleDelete = (e, customerId) => {
		if (window.confirm("Are you sure ?")) {
			e.preventDefault();
			handleDeleteState();
			axios
				.delete(dynamic_urls.SERVER_URL+dynamic_urls.customers + customerId + "/", {
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
	// let customers = ServicesFunc(dynamic_urls.customers)
	return (
		<div className="body-mrgn">
			<h2><FaFileAlt className="fa-style" /> Customer Details</h2>
			<div className="row side-row" style={{ padding: 15 }}>
			<Link to="/customers/add" className="link">
					<div className="submit float-end" style={{ paddingLeft: 0, paddingRight: 0, position: "relative", bottom: "100%" }}>	
					<Button variant="primary" type="submit" className="float-end">
						Add Customer
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
								<th>Name</th>
								<th>Address</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{customers &&
								customers.map((stu) => (
									<tr key={stu.customerId}>
										<td>{stu.customerId}</td>
										<td>{stu.name}</td>
										<td>{stu.address}</td>
										<td>{stu.email}</td>
										<td>{stu.phone}</td>
										<td>
											<Button
												className="mr-2"
												variant="danger"
												onClick={(event) =>
													handleDelete(
														event,
														stu.customerId
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
											<CustomerUpdateFunc
												show={editModalShow}
												customer={editCustomer}
												setupdated={handleUpdateState}
												onHide={EditModalClose}
											></CustomerUpdateFunc>
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
export default CustomerViewFunc;
