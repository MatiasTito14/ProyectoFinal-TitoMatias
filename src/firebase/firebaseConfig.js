import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy3EjwLqYeRrwSOXoY4X37jd1H9pPqUng",
  authDomain: "ecommerce-react-7d4b5.firebaseapp.com",
  projectId: "ecommerce-react-7d4b5",
  storageBucket: "ecommerce-react-7d4b5.appspot.com",
  messagingSenderId: "481276057188",
  appId: "1:481276057188:web:56e546071c934e26383171"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;