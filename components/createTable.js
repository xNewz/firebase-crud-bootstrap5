import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

async function getStudentData(db) {
  return new Promise((resolve, reject) => {
    const getStudentDataRef = ref(db, "RecStudent");
    onValue(
      getStudentDataRef,
      (snapshot) => {
        resolve(snapshot);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

async function createTable(db, tableBody) {
  try {
    const snapshot = await getStudentData(db);
    const tableHTML = generateTableHTML(snapshot);
    tableBody.html(tableHTML);
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

function generateTableHTML(snapshot) {
  let tableHTML = "";
  let row = 1;

  snapshot.forEach((data) => {
    const { stuid, name, faculty, major } = data.val();

    tableHTML += `
      <tr>
        <th data-title="ลำดับ" scope="row">${row}</th>
        <td data-title="รหัสนักศึกษา">${stuid}</td>
        <td data-title="ชื่อ-นามสกุล">${name}</td>
        <td data-title="คณะ">${faculty}</td>
        <td data-title="สาขา">${major}</td>
        <td data-title="อัพเดท/ลบ">
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
