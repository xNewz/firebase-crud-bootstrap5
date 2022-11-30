// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "********************************",
  authDomain: "********************************",
  databaseURL:
    "********************************",
  projectId: "********************************",
  storageBucket: "********************************",
  messagingSenderId: "********************************",
  appId: "********************************",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let stuidV = document.getElementById("stuid");
let nameV = document.getElementById("name");
let facultyV = document.getElementById("faculty");
let majorV = document.getElementById("major");
let tbody = document.getElementById("tbody");
let editstuid = document.getElementById("editstuid");
let editname = document.getElementById("editname");
let editfaculty = document.getElementById("editfaculty");
let editmajor = document.getElementById("editmajor");
let idV = document.getElementById("id");

let searchBar = document.getElementById("searchBar");
// let searchBtn = document.getElementById("searchBtn");

//Create Data
function createData() {
  // check validation
  if (
    stuidV.value == "" ||
    nameV.value == "" ||
    facultyV.value == "" ||
    majorV.value == ""
  ) {
    // alert("Please fill all the fields");
    // use sweetalert
    Swal.fire({
      icon: "error",
      title: "กรุณากรอกข้อมูลให้ครบ",
    });
  } else {
    let data = {
      stuid: stuidV.value,
      name: nameV.value,
      faculty: facultyV.value,
      major: majorV.value,
    };
    database.ref("RecStudent").push(data);
    stuidV.value = "";
    nameV.value = "";
    facultyV.value = "";
    majorV.value = "";

    // when data is created use sweetalert then redirect to index.html
    Swal.fire(
      "บันทึกข้อมูลเรียบร้อยแล้ว",
      "คลิกปุ่ม OK เพื่อกลับสู่หน้าหลัก",
      "success"
    ).then(() => {
      window.location.href = "index.html";
    });
  }
}

searchBar.addEventListener("keyup", (e) => {
  readData();
});

function readData() {
  let search = searchBar.value;
  tbody.innerHTML = "";
  database.ref("RecStudent").on("value", (data) => {
    let student = data.val();
    let n = 1;
    Object.keys(student).forEach((key) => {
      if (
        student[key].stuid.includes(search) ||
        student[key].name.includes(search) ||
        student[key].faculty.includes(search) ||
        student[key].major.includes(search)
      ) {
        tbody.innerHTML += `
        <tr>
          <th data-title="ลำดับ" scope="row">${n}</th>
          <td data-title="รหัสนักศึกษา">${student[key].stuid}</td>
          <td data-title="ชื่อ-นามสกุล">${student[key].name}</td>
          <td data-title="คณะ">${student[key].faculty}</td>
          <td data-title="สาขา">${student[key].major}</td>
          <td>
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editRow('${key}')">
          แก้ไข
          </button>
            <button class="btn btn-danger" onclick="deleteRow('${key}')">ลบ</button>
          </td>
        </tr>
      `;
        n++;
      }
    });
  });
}

// read data
database.ref("RecStudent").on("value", ambildata);
function ambildata(snapshoot) {
  let table = "";
  let no = 1;
  snapshoot.forEach((data) => {
    // console.log(data.val());
    table += `
          <tr>   
            <th data-title="ลำดับ" scope="row">${no}</th>
            <td data-title="รหัสนักศึกษา">${data.val().stuid}</td>
            <td data-title="ชื่อ-นามสกุล">${data.val().name}</td>
            <td data-title="คณะ">${data.val().faculty}</td>
            <td data-title="สาขา">${data.val().major}</td>
            <td data-title="แก้ไข/ลบ"><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editRow('${
              data.key
            }')">
            แก้ไข
            </button>
            <button type="button" class="btn btn-danger" onclick="deleteRow('${
              data.key
            }') ">ลบ</button>        
            </td>
          </tr>
    `;
    no++;
  });
  tbody.innerHTML = table;
}
//show data edit
function editRow(id) {
  searchBar.value = "";
  database.ref("RecStudent/" + id).on("value", function (snapshoot) {
    editstuid.value = snapshoot.val().stuid;
    editname.value = snapshoot.val().name;
    editfaculty.value = snapshoot.val().faculty;
    editmajor.value = snapshoot.val().major;
    idV.value = id;
  });
}

//update data
function updateData() {
  // let updateData = document.getElementById("updateData");
  let data = {
    stuid: editstuid.value,
    name: editname.value,
    faculty: editfaculty.value,
    major: editmajor.value,
  };
  // use sweetalert
  Swal.fire({
    title: "แก้ไขข้อมูล",
    text: "คุณต้องการแก้ไขข้อมูลใช่หรือไม่",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ใช่",
    cancelButtonText: "ไม่",
  }).then((result) => {
    if (result.isConfirmed) {
      database.ref("RecStudent/" + idV.value).update(data);
      Swal.fire(
        "แก้ไขข้อมูลเรียบร้อยแล้ว",
        "คลิกปุ่ม OK เพื่อกลับสู่หน้าหลัก",
        "success"
      );
      window.location.href = "index.html";
    }
  });
}

function deleteRow(id) {
  Swal.fire({
    title: "คุณต้องการลบข้อมูลนี้ใช่หรือไม่?",
    text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้หากลบแล้ว",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ใช่, ลบข้อมูลนี้!",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      database.ref("RecStudent/" + id).remove();
      Swal.fire("ลบข้อมูลเรียบร้อยแล้ว!", "ข้อมูลของคุณถูกลบแล้ว", "success");
      window.location.href = "index.html";
    }
  });
}
