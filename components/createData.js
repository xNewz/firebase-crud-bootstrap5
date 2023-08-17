import { db } from "./firebaseSetup.js";
import {
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import {
  ref as storageRef, // Rename the storage reference import
  uploadBytes,
  getDownloadURL,
  getStorage,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";

const storage = getStorage();

function createData(studentId, name, faculty, major, profileImageUrl) {
  // TODO: เพิ่มข้อมูลนักศึกษาลงใน Realtime Database
}

async function uploadProfileImage(profileImageFile, studentId) {
  // TODO: อัพโหลดรูปภาพโปรไฟล์ขึ้น Cloud Storage
}

export { createData, uploadProfileImage };
