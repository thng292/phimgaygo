import axios from 'axios'
import config from './config'
    
const DatasourceInstance = axios.create({
    baseURL: config.baseUrl,
    timeout: 2000,
})

export default DatasourceInstance