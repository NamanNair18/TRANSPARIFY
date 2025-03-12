
document
  .getElementById("checksum-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form inputs
    const vehicleNumber = document.getElementById("vehicle-number").value;
    const transactionDate = document.getElementById("transaction-date").value;
    const quantity = document.getElementById("quantity").value;


    if (vehicleNumber === "" || transactionDate === "" || quantity === "") {
      alert("All fields are required to generate a checksum.");
      return;
    }

    document.getElementById(
      "checksum-output"
    ).innerText = `Generated Checksum: ${checksum}`;
  });