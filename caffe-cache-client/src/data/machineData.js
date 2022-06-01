import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbUrl = databaseConfig.databaseURL;

const getMachinesByUid = (uid) => new Promise ((resolve, reject) => {
 axios.get(`${dbUrl}/`)
})

const getMachineById = (uid) => new Promise ((resolve, reject) => {

})

export { getMachinesByUid , getMachineById }