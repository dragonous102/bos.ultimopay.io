import Axios from 'axios';
import fetch from 'node-fetch';
import os from 'os';
import { serialize, parse } from 'cookie';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseURL = `${publicRuntimeConfig.apiUrl}`;

function sleep(milliseconds) {
    const currentTime = new Date().getTime();
    while (currentTime + milliseconds >= new Date().getTime()) {
    }
}

const axios = Axios.create({
    baseURL: `${publicRuntimeConfig.apiUrl}`,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicRuntimeConfig.apitoken}`,
    },
});

export default async (req, res) => {
    try {
        let reqbody = JSON.parse(req.body);
        let sendbody = { ...reqbody };

        let headers = {
            Accept: '*/*',
            Authorization: `Bearer ${publicRuntimeConfig.apitoken}`,
            'Content-Type': 'application/json',
        };

        let responseData;

        const response = await fetch(baseURL + reqbody.url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(sendbody),
        });

        if (response.ok) {
            responseData = await response.json();
            res.status(200).json({ data: responseData, data2: response });
        } else {
            res.status(500).json({ error: 'Network response was not ok', data: response });
        }
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Internal Server Error', data: error.message });
    }
};
