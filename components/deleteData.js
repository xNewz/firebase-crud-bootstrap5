import {
  remove,
  ref,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

async function deleteData(db, id) {
  try {
    await remove(ref(db, "RecStudent/" + id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting data:", error);
    return { success: false, message: error.message};
  }
}

export { deleteData };
