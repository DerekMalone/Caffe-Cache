import { async } from '@firebase/util';
import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbUrl = databaseConfig.databaseURL;

const getMachinesByUid = async (userUID) => {
 const machinesArray = await axios.get(`${dbUrl}/Machine/${userUID}`);
 const machinesData = machinesArray.data;
 return machinesData;
};

const getMachineById = async (uid) => {
  const machineObj = await axios.get(`${dbUrl}/Machine/Detail/${uid}`)
  const machineData = machineObj.data;
  return machineData;
};

const addMachine = (machineObj) => new Promise ((resolve, reject) => {
    axios.post(`${dbUrl}/Machine`, machineObj)
    .then((response) => {
        if (response.status > 300 || response.status < 200) {
            throw new Error(response.status);
        } else {
            resolve();
        }
    })
    .catch(reject);
})

const editMachine = (machineId, machineObj) => new Promise ((resolve, reject) => {
    axios.put(`${dbUrl}/Machine/Edit/${machineId}`, machineObj)
    .then(() => getMachinesByUid(machineObj.userId).then(resolve))
    .catch(reject);
});

const deleteMachine = (machineId, uid) => new Promise ((resolve, reject) => {
    axios.delete(`${dbUrl}/Machine/Delete/${machineId}`)
    .then(() => getMachinesByUid(uid).then(resolve))
    .catch(reject);
});

export { getMachinesByUid , getMachineById, addMachine, editMachine, deleteMachine }