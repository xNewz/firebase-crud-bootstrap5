import {
  remove,
  ref,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

async function deleteData(db, id) {
  try {
    await remove(ref(db, "RecStudent/" + id));
    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}

export { deleteData };
