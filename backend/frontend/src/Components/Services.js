// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const ServicesFunc = (objectName) => {
// 	const [objects, setObjects] = useState([]);
// 	let x=0
// 	useEffect(() => {
// 		if (localStorage.getItem("access_token") === null) {
// 			window.location.href = "/login";
// 		} else {
// 			(async () => {
// 				try {
// 					const response = await axios.get(
// 						dynamic_urls.SERVER_URL+"" + objectName,
// 						{
// 							headers: {
// 								"Content-Type": "application/json",
// 							},
// 						}
// 					);
// 					setObjects(response.data)
// 				} catch (e) {
// 					console.log("not auth");
// 				}

// 			})();
// 		}
// 	}, []);
// 	console.log(objects)
// 	return objects;
// }
// // 	return axios
// // 		.get(dynamic_urls.SERVER_URL+"" + objectName, {
// // 			headers: {
// // 				"Content-Type": "application/json",
// // 			},
// // 		})
// // 		.then((response) => response.data);
// // };

// const DeleteFunc = (objectId, objectName) => {
// 	return axios
// 		.delete(dynamic_urls.SERVER_URL+"" + objectName + objectId + "/", {
// 			headers: {
// 				Accept: "application/json",
// 				"Content-Type": "application/json",
// 			},
// 		})
// 		.then((response) => response.data);
// };

// const UpdateFunc = (objectId, objectData, object) => {
// 	return axios
// 		.put(dynamic_urls.SERVER_URL+"" + object + objectId + "/", objectData, {
// 			headers: {
// 				Accept: "application/json",
// 				"Content-Type": "application/json",
// 			},
// 		})
// 		.then((response) => response.data);
// };

// const AddFunc = (objectData, object) => {
// 	return axios
// 		.post(dynamic_urls.SERVER_URL+"" + object, objectData, {
// 			headers: {
// 				Accept: "application/json",
// 				"Content-Type": "application/json",
// 			},
// 		})
// 		.then((response) => response.data);
// };

// export { ServicesFunc, DeleteFunc, UpdateFunc, AddFunc };
