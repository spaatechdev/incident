import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line, RiFileZipFill } from "react-icons/ri";
import { Button, ButtonToolbar } from "react-bootstrap";
import "../../../../CSS/View.css";
import ProductUpdateFunc from "../Update/ProductUpdate";
import axios from "axios";
import dynamic_urls from "../../../../env";
import { FaFileAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'

const ProductViewFunc = () => {
	const [products, setProducts] = useState([]);
	const [editModalShow, setEditModalShow] = useState(false);
	const [editProduct, setEditProduct] = useState([]);
	const [isUpdated, setIsUpdated] = useState(0);
	const [isDeleted, setIsDeleted] = useState(0);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.products,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				setProducts(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, [isUpdated, isDeleted]);

	const handleUpdate = (e, stu) => {
		e.preventDefault();
		setEditModalShow(true);
		setEditProduct(stu);
	};

	const handleUpdateState = () => {
		setIsUpdated(isUpdated + 1);
	};
	const handleDeleteState = () => {
		setIsDeleted(isDeleted + 1);
	};

	const handleDelete = (e, productId) => {
		if (window.confirm("Are you sure ?")) {
			e.preventDefault();
			handleDeleteState();
			axios
				.delete(dynamic_urls.SERVER_URL+dynamic_urls.products + productId + "/", {
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
	return (
		<div className="body-mrgn">
		<h2><FaFileAlt className="fa-style" /> Product Details</h2>
			<div className="row side-row" style={{ padding: 15 }}>
			<Link to="/products/add" className="link">
					<div className="submit float-end" style={{ paddingLeft: 0, paddingRight: 0, position: "relative", bottom: "100%" }}>	
					<Button variant="primary" type="submit" className="float-end">
						Add Product
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
								<th>Product Name</th>
								<th>Model number</th>
								<th>Warranry Period(in years)</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
                  {products && products.map((stu) => (
                     <tr key={stu.productId}>
                        <td>{stu.productId}</td>
                        <td>{stu.name}</td>
                        <td>{stu.modelNumber}</td>
                        <td>{stu.warrantyPeriod}</td>
                        <td>
                           <Button
                              className="mr-2"
                              variant="danger"
                              onClick={(event) =>handleDelete(event,stu.productId)}
                           >
                              <RiDeleteBin5Line />
                           </Button>
                           <span>&nbsp;&nbsp;&nbsp;</span>
                           <Button
                              className="mr-2"
							  variant="success"
                              onClick={(event) =>handleUpdate(event, stu)}
                           >
                              <FaEdit />
                           </Button>
                           <ProductUpdateFunc
                              show={editModalShow}
                              product={editProduct}
                              setupdated={handleUpdateState}
                              onHide={EditModalClose}
                           ></ProductUpdateFunc>
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
export default ProductViewFunc;
