import axios from 'axios';
import os from 'os';

export default async (req, res) => {
    try {

        // Get the server IP address
        // const serverIP = req.headers.host; // This assumes you want the IP from the host header

        const interfaces = os.networkInterfaces();
        const addresses = [];

        for (const key in interfaces) {
            for (const entry of interfaces[key]) {
                if (!entry.internal && entry.family === 'IPv4') {
                    addresses.push(entry.address);
                }
            }
        }

        // For simplicity, assuming the first IP address is the server's IP
        const serverIP = addresses.length > 0 ? addresses[0] : 'Unknown';


        // Respond with the data
        res.status(200).json({ data: serverIP });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Internal Server Error', data: "Unknown" });
    }
};
