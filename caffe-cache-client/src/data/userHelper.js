// import firebase from 'firebase/app';
import auth from './auth/firebaseConfig';

const getCurrentUserUid = () => auth.currentUser?.uid;

export default getCurrentUserUid;