import axios from 'axios'
import ApiKey from './ApiKey'
    
const DatasourceInstance = axios.create({
    baseURL: ApiKey.baseUrl,
    timeout: 2000,
})

export default DatasourceInstance