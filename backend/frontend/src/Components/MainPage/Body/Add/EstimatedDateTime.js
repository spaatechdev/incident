import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { format } from "date-fns";
import dynamic_urls from "../../../../env";

const EstimatedDateTimeFunc = (props) => {
	let addHours = (date, hours) => {
		let h = hours ? hours : 0;
		let dateCopy = new Date(date);
		dateCopy.setHours(dateCopy.getHours() + h);
		return dateCopy;
	};
	const [edt, setEdt] = useState(addHours(new Date(), props.level["tat"]));
	const tick=()=> {
		setEdt(addHours(new Date(), props.level["tat"]));
	}
	useEffect(() => {
		var timerID = setInterval(() => tick(), 500);
		return function cleanup() {
			clearInterval(timerID);
		};
	});

	return (
		<Row>
			<Col sm={6}>
				<Form.Group controlId="estimatedCompletionDate">
					<Form.Label>Estimated Completion Date</Form.Label>
					<Form.Control
						type="text"
						name="estimatedCompletionDate"
						disabled
						placeholder={Object.keys(props.level).length? format(edt, "dd-MM-yyyy"): ""
						}
					/>
				</Form.Group>
			</Col>
			<Col sm={6}>
				<Form.Group controlId="estimatedCompletionTime">
					<Form.Label>Estimated Completion Time</Form.Label>
					<Form.Control
						type="text"
						name="estimatedCompletionTime"
						disabled
						placeholder={
							Object.keys(props.level).length ? edt.toLocaleTimeString() : ""
						}
					/>
				</Form.Group>
			</Col>
		</Row>
	);
};

export default EstimatedDateTimeFunc;
