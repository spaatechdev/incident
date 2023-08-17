import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import _ from "lodash";
import "../../../../CSS/View.css";
import dynamic_urls from "../../../../env";
import { FaWeight } from "react-icons/fa";

const IncidentUpdateHistoryFunc = (props) => {
	const uniqueEmployeeID = (id) => {
		if (id < 10) return `EMP-100${id}`;
		else return `EMP-10${id}`;
	};
	const uniqueCustomerID = (id) => {
		if (id < 10) return `CUST-100${id}`;
		else return `CUST-10${id}`;
	};
	
	const date = (d) =>{
		let arr = d.split('-')
		let newDate = arr[2]+'-'+arr[1]+'-'+arr[0];
		return newDate
	}
	const time =(t) =>{
		let hr=Number(t.split(":")[0])
		if(hr>12)
			return String(hr-12)+":"+t.split(":")[1]+":"+t.split(":")[2]+" PM"
		else
			return String(hr)+":"+t.split(":")[1]+":"+t.split(":")[2]+" AM"
  	}
	return (
		<div className="container">
			<Modal
				{...props}
				size="xl"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Edit History
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="tableFixHead"
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
									<th>Update Date</th>
									<th>Update Time</th>
									<th>Incident Description</th>
									<th>Incident Date</th>
									<th>Incident Time</th>
									<th>Customer Name</th>
									<th>Customer ID</th>
									<th>Employee Name</th>
									<th>Employee ID</th>
									<th>Severity</th>
									<th>Complexity</th>
									<th>Level</th>
									<th>Total Allotted Time</th>
									<th>Incident Remark</th>
									<th>Incident Status</th>
									<th>Estimated completion date</th>
									<th>Estimated completion time</th>
									<th>Amount</th>
								</tr>
							</thead>
							<tbody>
								{props.edit &&
									props.edit.map((stu) => (
										<tr key={props.edit.indexOf(stu)}>
											<td>{stu.date}</td>
											<td>{stu.time}</td>
											<td>{stu.incidentDescription}</td>
											<td>{date(stu.incidentDate)}</td>
											<td>{time(stu.incidentTime)}</td>
											<td>{stu.customer.name}</td>
											<td>
												{uniqueCustomerID(
													stu.customer.customerId
												)}
											</td>
											<td>{stu.employee.name}</td>
											<td>
												{uniqueEmployeeID(
													stu.employee.employeeId
												)}
											</td>
											<td style={{ textAlign: "center" }}>
												{stu.severity.name}
											</td>
											<td style={{ textAlign: "center" }}>
												{stu.complexity.name}
											</td>
											<td>{stu.level.name}</td>
											<td>{stu.level.tat}</td>
											<td>{stu.incidentRemark}</td>
											<td>{stu.incidentStatus.name}</td>
											<td>{date(stu.expectedCompletionDate)}</td>
											<td>{time(stu.expectedCompletionTime)}</td>
											<td>{stu.amount}</td>
										</tr>
									))}
							</tbody>
						</Table>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default IncidentUpdateHistoryFunc;
