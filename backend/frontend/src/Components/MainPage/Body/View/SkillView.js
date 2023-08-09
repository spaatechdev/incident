import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line, RiFileZipFill } from "react-icons/ri";
import { Button, ButtonToolbar } from "react-bootstrap";
import "../../../../CSS/View.css";
import SkillUpdateFunc from "../Update/SkillUpdate";
import axios from "axios";
import dynamic_urls from "../../../../env";

const SkillViewFunc = () => {
	const [skills, setSkills] = useState([]);
	const [editModalShow, setEditModalShow] = useState(false);
	const [editSkill, setEditSkill] = useState([]);
	const [isUpdated, setIsUpdated] = useState(0);
	const [isDeleted, setIsDeleted] = useState(0);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.skills,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				setSkills(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [isUpdated, isDeleted]);

	const handleUpdate = (e, stu) => {
		e.preventDefault();
		setEditModalShow(true);
		setEditSkill(stu);
	};

	const handleUpdateState = () => {
		setIsUpdated(isUpdated + 1);
	};
	const handleDeleteState = () => {
		setIsDeleted(isDeleted + 1);
	};

	const handleDelete = (e, skillId) => {
		if (window.confirm("Are you sure ?")) {
			e.preventDefault();
			handleDeleteState();
			axios
				.delete(dynamic_urls.SERVER_URL+dynamic_urls.skills + skillId + "/", {
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
	// let skills = ServicesFunc("skills/")
	return (
		<div className="body-mrgn">
			<h2>Skill Details</h2>
			<div className="row side-row" style={{ padding: 15 }}>
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
							{skills &&
								skills.map((stu) => (
									<tr key={stu.skillId}>
										<td>{stu.skillId}</td>
										<td>{stu.name}</td>
										<td>
											<Button
												className="mr-2"
												variant="danger"
												onClick={(event) =>
													handleDelete(
														event,
														stu.skillId
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
											<SkillUpdateFunc
												show={editModalShow}
												skill={editSkill}
												setupdated={handleUpdateState}
												onHide={EditModalClose}
											></SkillUpdateFunc>
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
export default SkillViewFunc;
