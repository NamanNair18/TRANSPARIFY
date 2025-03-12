const firebaseConfig = {
    apiKey: "AIzaSyCGx9ZjJUyuWnbVgy4moncjjdyoh6uEdlg",
    authDomain: "tpify-3bd37.firebaseapp.com",
    databaseURL: "https://tpify-3bd37-default-rtdb.firebaseio.com",
    projectId: "tpify-3bd37",
    storageBucket: "tpify-3bd37.appspot.com",
    messagingSenderId: "697535070824",
    appId: "1:697535070824:web:1c0174dc07837b20fef1dd",
    measurementId: "G-Z8M1XXD9K7",
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const salesDB = firebase.database().ref("sales-form");
  
  // Add event listener to the sales form
  document.getElementById("sales-form").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    // Get input values
    const id = getElementVal("id");
    const amount = getElementVal("amount");
    const quantity = getElementVal("quantity");
    const company = getElementVal("name");
    const transaction = getElementVal("trans");
  
    // Validate inputs
    if (!id || !amount || !quantity || !company || !transaction) {
      alert("Please fill out all fields before submitting.");
      return;
    }
  
    // Check if revenue stamp is required
    const revenueStampRequired =
      transaction === "cash" && parseFloat(amount) > 10000 ? "Yes" : "No";
    // Save data to Firebase
    saveMessages(id, amount, quantity, company, transaction, revenueStampRequired);
    // Update the table
    addToTable(id, amount, quantity, company, transaction, revenueStampRequired);
    // Reset the form
    document.getElementById("sales-form").reset();
    // Log the action
    console.log("ID:", id);
console.log("Quantity:", quantity);
        addAuditLog(`Sale added`, id, quantity);
  }
  
  const saveMessages = (id, amount, quantity, company, transaction, revenueStamp) => {
    const newSalesRef = salesDB.push();
  
    newSalesRef.set({
      id,
      amount,
      quantity,
      company,
      transaction,
      revenueStampRequired: revenueStamp,
    });
  };
  const addToTable = (id, amount, quantity, company, transaction, revenueStamp) => {
    const tableBody = document.getElementById("sales-table-body");
    const newRow = document.createElement("tr");
  
    newRow.innerHTML = `
      <td>${tableBody.children.length + 1}</td>
      <td>${id}</td>
      <td>${amount}</td>
      <td>${quantity}</td>
      <td>${company}</td>
      <td>${transaction}</td>
      <td>${revenueStamp}</td>
    `;
  
    tableBody.appendChild(newRow);

  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };