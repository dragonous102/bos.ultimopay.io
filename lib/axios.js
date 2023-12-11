import Axios from 'axios'
import getConfig from 'next/config';


const { publicRuntimeConfig } = getConfig();
const axios = Axios.create({
    baseURL: `${publicRuntimeConfig.apiUrl}`,
    headers: {
       
        "Accept": "*/*",
        "Content-Type": "text/plain",
        "Authorization": `Bearer ${publicRuntimeConfig.apitoken}`,
    },
   
})
const axios_our = Axios.create({
    baseURL: `https://www.webwiders.com/WEB01/agora_setup/curl_check.php`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/x-www-form-urlencoded",
       
       
    },
    
})

export default axios