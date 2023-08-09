import { db } from "./firebaseSetup.js";
import {
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

function createData(studentId, name, faculty, major) {
  const data = {
    stuid: studentId,
    name: name,
    faculty: faculty,
    major: major,
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

export { createData };
