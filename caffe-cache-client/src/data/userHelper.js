// import firebase from 'firebase/app';
import auth from './data/auth/firebaseConfig';

const getCurrentUserUid = () => auth.currentUser?.uid;

export default getCurrentUserUid;