import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbUrl = databaseConfig.databaseURL;

const getCoffeesByUid = async (userUID) => {
 const coffeesArray = await axios.get(`${dbUrl}/Coffee/${userUID}`);
 const coffeesData = coffeesArray.data;
 return coffeesData;
};

const getCoffeeById = async (uid) => {
  const coffeeObj = await axios.get(`${dbUrl}/Coffee/Detail/${uid}`)
  const coffeeData = coffeeObj.data;
  return coffeeData;
};

const addCoffee = (coffeeObj) => new Promise ((resolve, reject) => {
    axios.post(`${dbUrl}/Coffee`, coffeeObj)
    .then((response) => {
        if (response.status > 300 || response.status < 200) {
            throw new Error(response.status);
        } else {
            resolve();
        }
    })
    .catch(reject);
})

const editCoffee = (coffeeId, coffeeObj) => new Promise ((resolve, reject) => {
    axios.put(`${dbUrl}/Coffee/Edit/${coffeeId}`, coffeeObj)
    .then(() => getCoffeesByUid(coffeeObj.userId).then(resolve))
    .catch(reject);
});

const deleteCoffee = (coffeeId, uid) => new Promise ((resolve, reject) => {
    axios.delete(`${dbUrl}/Coffee/Delete/${coffeeId}`)
    .then(() => getCoffeesByUid(uid).then(resolve))
    .catch(reject);
});

export { getCoffeesByUid , getCoffeeById, addCoffee, editCoffee, deleteCoffee }