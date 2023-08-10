import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button, ButtonToolbar } from "react-bootstrap";
import "../../../../CSS/View.css";
import axios from "axios";
import dynamic_urls from "../../../../env";

const UserViewFunc = ({ callback }) => {
	const [users, setUsers] = useState([]);
	const [editModalShow, setEditModalShow] = useState(false);
	const [editEmployee, setEditEmployee] = useState([]);
	const [isDeleted, setIsDeleted] = useState(0);



	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.users,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				setUsers(response.data)
			} catch (e) {
				console.log("not auth");
			}

		})();

	}, [isDeleted]);


	const handleDeleteState = () => {
		setIsDeleted(isDeleted + 1)
	}


	const handleDelete = (e, id) => {
		if (window.confirm("Are you sure ?")) {
			e.preventDefault();
			handleDeleteState();
			axios.delete(dynamic_urls.SERVER_URL+dynamic_urls.users + id + "/", {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}).then(
				(result) => {
					alert("Successfully deleted");
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
			<h2><FaFileAlt className="fa-style" /> User Details</h2>
			<div className="row">
				
				<p id="before-table"></p>
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
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Username</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{users &&
							users.map((stu) => (
								<tr key={stu.id}>
									<td>{stu.id}</td>
									<td>{stu.first_name}</td>
									<td>{stu.last_name}</td>
									<td>{stu.email}</td>
									<td>{stu.username}</td>
									<td>
										<Button className="mr-2" variant="danger" onClick={event => handleDelete(event, stu.employeeId)}>
											<RiDeleteBin5Line />
										</Button>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};
export default UserViewFunc;
