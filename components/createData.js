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
  const data = {
    stuid: studentId,
    name: name,
    faculty: faculty,
    major: major,
    profileImageUrl: profileImageUrl,
  };

  set(ref(db, "RecStudent/" + studentId), data)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        text: "ข้อมูลของคุณถูกบันทึกแล้ว",
        confirmButtonText: "ตกลง",
      }).then(() => {
        window.location.href = "index.html";
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function uploadProfileImage(profileImageFile, studentId) {
  try {
    const imageStorageRef = storageRef(
      storage,
      `profile_images/${studentId}/${profileImageFile.name}`
    ); // Use a different name for the storage reference variable
    const uploadTask = uploadBytes(imageStorageRef, profileImageFile);
    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

export { createData, uploadProfileImage };
