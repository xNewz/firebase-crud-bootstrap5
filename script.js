import { db } from "./components/firebaseSetup.js";
import { createData, uploadProfileImage } from "./components/createData.js";
import { createTable } from "./components/createTable.js";
import { handleEditModal } from "./components/editModalHandler.js";
import { updateData } from "./components/updateData.js";
import { deleteData } from "./components/deleteData.js";

const studentIdInput = $("#stuid");
const nameInput = $("#name");
const facultySelect = $("#faculty");
const majorInput = $("#major");
const tableBody = $("#tbody");
const searchInput = $("#searchBar");

// Search Data
searchInput.on("keyup", function () {
  const value = $(this).val().toLowerCase();
  $("#tbody tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

// Create Data
$("#create-data").click(async function () {
  try {
    // Validation check
    if (
      studentIdInput.val() === "" ||
      nameInput.val() === "" ||
      facultySelect.val() === "" ||
      majorInput.val() === ""
    ) {
      // Display an error message using sweetalert
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบ",
      });
    } else {
      const profileImageFile = $("#profileImage")[0].files[0];

      if (profileImageFile) {
        try {
          const profileImageUrl = await uploadProfileImage(
            profileImageFile,
            studentIdInput.val()
          );
          if (profileImageUrl) {
            createData(
              studentIdInput.val(),
              nameInput.val(),
              facultySelect.val(),
              majorInput.val(),
              profileImageUrl
            );
            studentIdInput.val("");
            nameInput.val("");
            facultySelect.val("");
            majorInput.val("");
            $("#profileImage").val("");
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ",
            });
          }
        } catch (uploadError) {
          console.error("Error uploading profile image:", uploadError);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ",
          });
        }
      } else {
        createData(
          studentIdInput.val(),
          nameInput.val(),
          facultySelect.val(),
          majorInput.val()
        );
        studentIdInput.val("");
        nameInput.val("");
        facultySelect.val("");
        majorInput.val("");
      }
    }
  } catch (error) {
    console.error("Error creating data:", error);
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
    });
  }
});

// Create Table
createTable(db, tableBody);

// Edit Modal
$("#editModal").on("show.bs.modal", function (event) {
  const button = event.relatedTarget; // Button that triggered the modal
  const dataKey = button.getAttribute("data-key"); // Retrieve the data-key attribute

  // Use the edit modal handler function
  handleEditModal(
    db,
    $("#editImagePreview"),
    dataKey,
    $("#editstuid"),
    $("#editname"),
    $("#editfaculty"),
    $("#editmajor"),
    $("#id")
  );
});

$("#edit-data").click(async function () {
  const updatedData = {
    stuid: $("#editstuid").val(),
    name: $("#editname").val(),
    faculty: $("#editfaculty").val(),
    major: $("#editmajor").val(),
  };

  try {
    const result = await Swal.fire({
      title: "อัพเดทข้อมูล",
      text: "คุณต้องการอัพเดทข้อมูลใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, อัพเดทข้อมูล",
      cancelButtonText: "ไม่",
    });

    if (result.isConfirmed) {
      const updateResult = await updateData(db, updatedData.stuid, updatedData);

      if (updateResult.success) {
        await Swal.fire({
          title: "อัพเดทข้อมูลเรียบร้อย",
          text: "คลิกปุ่ม OK เพื่อกลับสู่หน้าหลัก",
          icon: "success",
        });
        window.location.href = "index.html";
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: updateResult.message || "ไม่สามารถอัพเดทได้ โปรดลองอีกครั้ง",
          icon: "error",
        });
      }
    }
  } catch (error) {
    Swal.fire({
      title: "เกิดข้อผิดพลาด",
      text: "ไม่สามารถอัพเดทได้ โปรดลองอีกครั้ง",
      icon: "error",
    });
  }
});

$("#tbody").on("click", "#delete-data", async function () {
  const dataKey = $(this).closest("tr").find(".btn-success").attr("data-key");
  const result = await Swal.fire({
    title: "คุณต้องการลบข้อมูลนี้ใช่หรือไม่?",
    text: `คุณจะไม่สามารถกู้คืนข้อมูลของ ${dataKey} ได้`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ใช่, ลบข้อมูลนี้!",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    try {
      const deleteSuccessful = await deleteData(db, dataKey);
      if (deleteSuccessful) {
        await Swal.fire(
          "ลบข้อมูลเรียบร้อยแล้ว!",
          "ข้อมูลของคุณถูกลบแล้ว",
          "success"
        );
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถลบข้อมูลได้ โปรดลองอีกครั้ง",
        icon: "error",
      });
    }
  }
});
