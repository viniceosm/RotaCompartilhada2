import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyAQGSfDuK_J_g0d2ae2-wPe-PlgATszRas",
    authDomain: "rotacompartilhada-58ae8.firebaseapp.com",
    databaseURL: "https://rotacompartilhada-58ae8-default-rtdb.firebaseio.com",
    projectId: "rotacompartilhada-58ae8",
    storageBucket: "rotacompartilhada-58ae8.appspot.com",
    messagingSenderId: "294644297677",
    appId: "1:294644297677:web:e5d0aebe853237890c1e84",
    measurementId: "G-JEHCXER6HH"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;