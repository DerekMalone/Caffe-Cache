import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbUrl = databaseConfig.databaseURL;

const getMachinesByUid = async (userUID) => {
 const machinesArray = await axios.get(`${dbUrl}/Machine/${userUID}`);
 const machinesData = machinesArray.data;
 return machinesData;
};

const getMachineById = (uid) => new Promise ((resolve, reject) => {

})

export { getMachinesByUid , getMachineById }