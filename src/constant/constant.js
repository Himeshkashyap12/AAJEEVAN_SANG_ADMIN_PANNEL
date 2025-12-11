export function isoToIST(isoString) {
  const date = new Date(isoString); // Convert ISO string to Date object
  return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}
export function isoToISTTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  });
}


 
export function getChangedData({oldObj, newObj}) {
  const changed = {};

  for (const key in newObj) {
    // If value is different or key doesn't exist in oldObj
    if (oldObj[key] !== newObj[key]) {
      changed[key] = newObj[key];
    }
  }

  return changed;
}

export function formatDayjsToYMD(dateObj) {
  const year = dateObj.$y;
  const month = String(dateObj.$M + 1).padStart(2, "0"); // month is 0-based
  const day = String(dateObj.$D).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

