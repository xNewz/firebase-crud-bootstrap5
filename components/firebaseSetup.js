// firebaseSetup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCP-fAfaJ4z_lJKdqU9ETV-DQaWhe3par0",
  authDomain: "students-c8e78.firebaseapp.com",
  databaseURL:
    "https://students-c8e78-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "students-c8e78",
  storageBucket: "students-c8e78.appspot.com",
  messagingSenderId: "633160919265",
  appId: "1:633160919265:web:6971727db38249f75eafa0",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, app };
