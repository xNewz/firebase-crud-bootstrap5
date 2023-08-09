// editModalHandler.js
import { onValue, ref } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

function handleEditModal(
  db,
  dataKey,
  editStudentIdInput,
  editNameInput,
  editFacultySelect,
  editMajorInput,
  idInput
) {
  const studentRef = ref(db, "RecStudent/" + dataKey); // Use ref instead of getDatabase

  onValue(studentRef, (snapshot) => {
    const { stuid, name, faculty, major } = snapshot.val();

    // Update input values
    editStudentIdInput.val(stuid);
    editNameInput.val(name);
    editFacultySelect.val(faculty);
    editMajorInput.val(major);

    // Set data key
    idInput.val(dataKey);
  });
}

export { handleEditModal };
