// firebaseSetup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "************************************",
  authDomain: "************************************",
  databaseURL: "************************************",
  projectId: "************************************",
  storageBucket: "************************************",
  messagingSenderId: "************************************",
  appId: "************************************",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, app };
