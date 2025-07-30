import axios from "axios";

const BACKEND_URL =
  "https://expensetracker-react-nat-f83c7-default-rtdb.firebaseio.com";

export async function storeExpenses(expenseData) {
  try {
    const response = await axios.post(
      BACKEND_URL + "/expenses.json",
      expenseData
    );
    const id = response.data.name;
    return id;
  } catch (error) {
    console.error("Error storing expense:", error.message);
    throw error; // So you can handle it in the calling function
  }
}
export async function fetchExpenses() {
  try {
    const response = await axios.get(BACKEND_URL + "/expenses.json");
    const expenses = [];
    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }

    return expenses;
  } catch (error) {
    console.error("Error storing expense:", error.message);
    throw error; // So you can handle it in the calling function
  }
}

export async function updateExpenses(id, expenseData) {
  try {
    const response = await axios.put(
      BACKEND_URL + `/expenses/${id}.json`,
      expenseData
    );
    return response;
  } catch (error) {
    console.error("Error storing expense:", error.message);
    throw error; // So you can handle it in the calling function
  }
}
export async function deleteExpenses(id) {
  try {
    const response = await axios.delete(BACKEND_URL + `/expenses/${id}.json`);
    return response;
  } catch (error) {
    console.error("Error storing expense:", error.message);
    throw error; // So you can handle it in the calling function
  }
}
