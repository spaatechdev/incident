import axios from "axios";
import dynamic_urls from "../env";

// axios.defaults.baseURL = 'http://localhost:8000/api/';

let refresh = false;

axios.interceptors.response.use(
	(resp) => resp,
	async (error) => {
		if (error.response.status === 401 && !refresh) {
			refresh = true;

			// console.log(localStorage.getItem('refresh_token'))
            // console.log("before getting refresh token")
			const response = await axios.post(
				dynamic_urls.SERVER_URL+"token/refresh/",
				{
					refresh: localStorage.getItem("refresh_token"),
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
				{ withCredentials: true }
			);
            // console.log("after getting refresh token")
			if (response.status === 200) {
                // console.log("before getting access token")
				axios.defaults.headers.common[
					"Authorization"
				] = `Bearer ${response.data["access"]}`;
				localStorage.setItem("access_token", response.data.access);
				localStorage.setItem("refresh_token", response.data.refresh);
                // console.log("after getting access token")
				return axios(error.config);
			}
		}
		refresh = false;
		return error;
	}
);
