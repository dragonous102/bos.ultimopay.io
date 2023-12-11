// import axios from '/lib/axios';
import Axios from 'axios';
import fetch from 'node-fetch';
import os from 'os';
import { serialize, parse } from 'cookie';
import getConfig from 'next/config';


const { publicRuntimeConfig } = getConfig();
const baseURL = `${publicRuntimeConfig.apiUrl}`;

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}
const axios = Axios.create({
    baseURL: `${publicRuntimeConfig.apiUrl}`,
    headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${publicRuntimeConfig.apitoken}`,
    },

})
export default async (req, res) => {

    // // check through cookie weather user authenticated or notZ
    // const cookies = parse(req.headers.cookie || '');
    // const encodedData = cookies.user;
    // if (!encodedData) {
    //     res.status(401).json({ error: 'User not authenticated' });
    //     return;
    // }
    // const decodedData = decodeURIComponent(encodedData);
    // const user = JSON.parse(decodedData);
    // // Check if the user is authenticated
    // if (!user) {
    //     res.status(401).json({ error: 'User not authenticated' });
    //     return;
    // }

    // // Get the server web address
    // const serverIP = req.headers.host; // This assumes you want the IP from the host header

    // // Get the server IP address
    // const interfaces = os.networkInterfaces();
    // const addresses = [];

    // for (const key in interfaces) {
    //     for (const entry of interfaces[key]) {
    //         if (!entry.internal && entry.family === 'IPv4') {
    //             addresses.push(entry.address);
    //         }
    //     }
    // }
    // // For simplicity, assuming the first IP address is the server's IP
    // const serverIP = addresses.length > 0 ? addresses[0] : 'Unknown';


    let reqbody = JSON.parse(req.body);
    let sendbody = { ...reqbody };
    delete sendbody.url;
    // res.status(200).json({ data: sendbody });


    // Headers for the request
    let headers = {
        "Accept": "*/*",
        "Authorization": `Bearer ${publicRuntimeConfig.apitoken}`,
        "Content-Type": "application/json",
    };
    // sleep(1000);
    // let jsonbody = JSON.stringify(sendbody);
    // var finalData = jsonbody.replace(/\\/g, '');
    // res.status(200).json({ data: finalData });


    try {


        // let data = await axios.post(reqbody.url, reqbody, { headers: { 'X-Server-Ip': serverIP } });


        // let response = await axios.post(reqbody.url, sendbody);
        // let responseData = response.json();
        // res.status(500).json({ error: 'Nothing', data: responseData, data2: response });


        let responseData;
        await fetch(baseURL + reqbody.url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(sendbody),
        })
            .then(response => {
                // Check if the request was successful (status code 2xx)
                if (response.ok) {
                    // Parse the JSON data from the response
                    responseData = response.json();

                    // Respond with the data
                    res.status(200).json({ data: responseData, data2: response });

                } else {
                    // throw new Error(`HTTP error! Status: ${response.status}`);

                    res.status(500).json({ error: 'Network response was not ok', data: response });
                }
            })
            // .then(data => {
            //     // Handle the parsed data
            //     res.status(500).json({ error: '2nd then Received data: ', data: data });
            // })
            .catch(error => {
                // Handle errors
                res.status(500).json({ error: 'Fetch error:', data: error });
            });


        res.status(500).json({ error: 'Nothing', data: responseData });

    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Internal Server Error', data: error });
    }
};
