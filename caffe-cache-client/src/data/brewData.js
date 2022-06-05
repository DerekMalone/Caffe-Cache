import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbUrl = databaseConfig.databaseURL;

const getBrewsByUid = async (userUID) => {
 const brewsArray = await axios.get(`${dbUrl}/Brew/${userUID}`);
 const brewsData = brewsArray.data;
 return brewsData;
};

const getBrewById = async (uid) => {
  const brewObj = await axios.get(`${dbUrl}/Brew/Detail/${uid}`)
  const brewData = brewObj.data;
  return brewData;
};

const addBrew = (brewObj) => new Promise ((resolve, reject) => {
    axios.post(`${dbUrl}/Brew`, brewObj)
    .then((response) => {
        if (response.status > 300 || response.status < 200) {
            throw new Error(response.status);
        } else {
            resolve();
        }
    })
    .catch(reject);
})

const editBrew = (brewId, brewObj) => new Promise ((resolve, reject) => {
    axios.put(`${dbUrl}/Brew/Edit/${brewId}`, brewObj)
    .then(() => getBrewsByUid(brewObj.userId).then(resolve))
    .catch(reject);
});

const deleteBrew = (brewId, uid) => new Promise ((resolve, reject) => {
    axios.delete(`${dbUrl}/Brew/Delete/${brewId}`)
    .then(() => getBrewsByUid(uid).then(resolve))
    .catch(reject);
});

export { getBrewsByUid , getBrewById, addBrew, editBrew, deleteBrew }