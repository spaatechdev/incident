import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import dynamic_urls from "../env";

const Logout = () => {

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(dynamic_urls.SERVER_URL +"logout/",{
                    refresh_token:localStorage.getItem('refresh_token')
                } ,{headers: {
                    'Content-Type': 'application/json'
                }}, {withCredentials: true});
                console.log(response)
                console.log('logout', response.data)
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/'
            } catch (e) {
                alert('logout not working')
            }
        })();
    }, []);
        // console.log(data)
        // localStorage.clear();
        // localStorage.setItem('token', data.access);
        // localStorage.setItem('refresh_token', data.refresh);
        // axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        // window.location.href = '/'  
    return (
        <div></div>
    )
}

export default Logout;