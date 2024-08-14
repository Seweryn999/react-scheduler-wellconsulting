import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDUnXuzhuFDSKjXH45fBXwmbHYfJPPUiA",
  authDomain: "react-scheduler-wellmarketing.firebaseapp.com",
  projectId: "react-scheduler-wellmarketing",
  storageBucket: "react-scheduler-wellmarketing.appspot.com",
  messagingSenderId: "825732343599",
  appId: "1:825732343599:web:52abe4659a04857aa1a3da",
  measurementId: "G-2C9SS4LK5W",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };
