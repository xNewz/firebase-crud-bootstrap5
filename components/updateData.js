import {
  update,
  ref,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

async function updateData(db, dataKey, updatedData) {
  try {
    await update(ref(db, "RecStudent/" + dataKey), updatedData);
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}

export { updateData };
