import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

async function getStudentData(db) {
  // TODO: ดึงข้อมูลนักศึกษาจาก Realtime Database
}

async function createTable(db, tableBody) {
  // TODO: ดึงข้อมูลนักศึกษาจาก Realtime Database มาแสดงในตาราง
}

function generateTableHTML(snapshot) {
  let tableHTML = "";
  let row = 1;

  snapshot.forEach((data) => {
    const { stuid, profileImageUrl, name, faculty, major } = data.val();

    tableHTML += `
    <tr>
      <th data-title="ลำดับ" scope="row">${row}</th>
      <td data-title="รหัสนักศึกษา" class="align-middle">${stuid}</td>
      <td data-title="ชื่อ-นามสกุล" class="align-middle">
        <img src="${profileImageUrl}" class="img rounded-circle me-2" alt="profile" width="35" height="35">
        ${name}
      </td>
      <td data-title="คณะ" class="align-middle">${faculty}</td>
      <td data-title="สาขา" class="align-middle">${major}</td>
      <td data-title="อัพเดท/ลบ" class="align-middle">
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editModal" data-key="${data.key}">
          <i class="fas fa-user-edit"></i> อัพเดท
        </button>
        <button type="button" class="btn btn-danger" id="delete-data">
          <i class="fas fa-user-minus"></i> ลบ
        </button>
      </td>
    </tr>
    `;

    row++;
  });

  return tableHTML;
}

export { createTable };
