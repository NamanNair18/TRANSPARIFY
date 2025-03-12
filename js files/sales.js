const salesForm = document.getElementById("sales-form");
const salesTableBody = document.getElementById("sales-table-body");
const auditLog = document.getElementById("audit-log");
let invoiceCounter = 1;
const apiKey = "YOUR_API_KEY";

//  fetch time from Google API
async function fetchGoogleTime(location, timestamp) {
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${location}&timestamp=${timestamp}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.status === "OK") {
    const localTime = new Date(
      (timestamp + data.dstOffset + data.rawOffset) * 1000
    );
    return localTime.toLocaleString();
  } else {
    console.error("Error fetching time from Google Time Zone API");
    return new Date().toLocaleString();
  }
}

function addAuditLog(action) {
  const timestamp = Math.floor(Date.now() / 1000)
  const location = "39.6034810,-119.6822510";
  // Fetch time from Google Time Zone API 

  fetchGoogleTime(location, timestamp).then((localTime) => {
    const logEntry = document.createElement("li");
    logEntry.textContent = `${localTime} - ${action}`;
    auditLog.appendChild(logEntry);
  });
}

salesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const salesId = document.getElementById("sales-id").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const quantity = parseInt(document.getElementById("quantity").value);
  const companyName = document.getElementById("company-name").value;

  const row = document.createElement("tr");

  row.innerHTML = `
              <td>${invoiceCounter}</td>
              <td>${salesId}</td>
              <td>${amount}</td>
              <td>${quantity}</td>
              <td>${companyName}</td>
          `;

  if (amount > 20000) {
    row.classList.add("highlight");
  }

  salesTableBody.appendChild(row);

  addAuditLog(`Added sale with ID: ${salesId}, Amount: ${amount}`);

  invoiceCounter++;


  salesForm.reset();
});