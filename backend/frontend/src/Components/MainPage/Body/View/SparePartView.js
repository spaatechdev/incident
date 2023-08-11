import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line, RiFileZipFill } from "react-icons/ri";
import { Button, ButtonToolbar } from "react-bootstrap";
import "../../../../CSS/View.css";
import SparePartUpdateFunc from "../Update/SparePartUpdate";
import axios from "axios";
import dynamic_urls from "../../../../env";
import { FaFileAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'

const SparePartViewFunc = () => {
	const [spareParts, setSpareParts] = useState([]);
	const [editModalShow, setEditModalShow] = useState(false);
	const [editSparePart, setEditSparePart] = useState([]);
	const [isUpdated, setIsUpdated] = useState(0);
	const [isDeleted, setIsDeleted] = useState(0);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.spareParts,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				setSpareParts(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [isUpdated, isDeleted]);

	const handleUpdate = (e, stu) => {
		e.preventDefault();
		setEditModalShow(true);
		setEditSparePart(stu);
	};

	const handleUpdateState = () => {
		setIsUpdated(isUpdated + 1);
	};
	const handleDeleteState = () => {
		setIsDeleted(isDeleted + 1);
	};

	const handleDelete = (e, sparePartId) => {
		if (window.confirm("Are you sure ?")) {
			e.preventDefault();
			handleDeleteState();
			axios
				.delete(dynamic_urls.SERVER_URL+dynamic_urls.spareParts + sparePartId + "/", {
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
	// let spareParts = ServicesFunc(dynamic_urls.spareParts)
	return (
		<div className="body-mrgn">
			<h2><FaFileAlt className="fa-style" /> Spare Part Details</h2>
			<div className="row side-row" style={{ padding: 15 }}>
			<Link to="/spareparts/add" className="link">
					<div className="submit float-end" style={{ paddingLeft: 0, paddingRight: 0, position: "relative", bottom: "100%" }}>	
					<Button variant="primary" type="submit" className="float-end">
						Add Spare Part
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
								<th>Total Quantity</th>
								<th>Reorder Level</th>
								<th style={{textAlign:"center"}}>Price</th>
								<th style={{textAlign:"center"}}>Action</th>
							</tr>
						</thead>
						<tbody>
							{spareParts &&
								spareParts.map((stu) => (
									<tr key={stu.sparePartId}>
										<td>{stu.sparePartId}</td>
										<td>{stu.name}</td>
										<td>{parseFloat(stu.totalQuantity)}</td>
										<td>{parseFloat(stu.reorderLevel)}</td>
										<td style={{textAlign:"right"}}>₹{stu.price}</td>
										<td style={{textAlign:"center"}}>
											<Button
												className="mr-2"
												variant="danger"
												onClick={(event) =>
													handleDelete(
														event,
														stu.sparePartId
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
											<SparePartUpdateFunc
												show={editModalShow}
												sparePart={editSparePart}
												setupdated={handleUpdateState}
												onHide={EditModalClose}
											></SparePartUpdateFunc>
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
export default SparePartViewFunc;
