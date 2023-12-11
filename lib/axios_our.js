import Axios from 'axios'
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const axios_our = Axios.create({
    baseURL: `https://www.webwiders.com/WEB01/bos_pdf_api`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/x-www-form-urlencoded",
       
       
    },
    
})

export default axios_our