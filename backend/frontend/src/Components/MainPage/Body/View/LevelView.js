import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line, RiFileZipFill } from "react-icons/ri";
import { Button, ButtonToolbar } from "react-bootstrap";
import "../../../../CSS/View.css";
import LevelUpdateFunc from "../Update/LevelUpdate";
import axios from "axios";
import dynamic_urls from "../../../../env";

const LevelViewFunc = () => {
	const [levels, setLevels] = useState([]);
	const [editModalShow, setEditModalShow] = useState(false);
	const [editLevel, setEditLevel] = useState([]);
	const [isUpdated, setIsUpdated] = useState(0);
	const [isDeleted, setIsDeleted] = useState(0);

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
				setLevels(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [isUpdated, isDeleted]);

	const handleUpdate = (e, stu) => {
		e.preventDefault();
		setEditModalShow(true);
		setEditLevel(stu);
	};

	const handleUpdateState = () => {
		setIsUpdated(isUpdated + 1);
	};
	const handleDeleteState = () => {
		setIsDeleted(isDeleted + 1);
	};

	const handleDelete = (e, levelId) => {
		if (window.confirm("Are you sure ?")) {
			e.preventDefault();
			handleDeleteState();
			axios
				.delete(dynamic_urls.SERVER_URL+dynamic_urls.levels + levelId + "/", {
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
	// let levels = ServicesFunc(dynamic_urls.levels)
	return (
		<div className="body-mrgn">
			<h2>Level Details</h2>
			<div className="row side-row" style={{ padding: 15 }}>
				<h3 align="center">Level Details</h3>
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
								<th>Total Allocated Time(in hrs)</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{levels &&
								levels.map((stu) => (
									<tr key={stu.levelId}>
										<td>{stu.levelId}</td>
										<td>{stu.name}</td>
										<td>{stu.tat}</td>
										<td>
											<Button
												className="mr-2"
												variant="danger"
												onClick={(event) =>
													handleDelete(
														event,
														stu.levelId
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
											<LevelUpdateFunc
												show={editModalShow}
												level={editLevel}
												setupdated={handleUpdateState}
												onHide={EditModalClose}
											></LevelUpdateFunc>
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
export default LevelViewFunc;
