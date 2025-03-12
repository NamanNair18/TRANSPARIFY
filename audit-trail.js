const apiKey = "YOUR_API_KEY";

async function fetchGoogleTime(location, timestamp) {
  // Mock function (replace with actual API call if needed)
  return new Date(timestamp * 1000).toLocaleString();
}

function addAuditLog(action, id, quantity) {
  const timestamp = Math.floor(Date.now() / 1000);
  const location = "39.6034810,-119.6822510"; // Example location

  fetchGoogleTime(location, timestamp).then((localTime) => {
    const logEntry = document.createElement("li");
    logEntry.textContent = `${localTime} - ${action} - GSTIN: ${id} - Quantity: ${quantity}`;
    document.getElementById("audit-log").appendChild(logEntry);
  });
}

// Expose addAuditLog to global scope so it can be used by other scripts
window.addAuditLog = addAuditLog;
