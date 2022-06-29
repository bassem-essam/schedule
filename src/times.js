let slotted = ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"];

let tableslots = ["اليوم", "المكان"];
let gridslots = [];
for (let i = 0; i < slotted.length - 1; i++) {
  tableslots.push(`${slotted[i + 1]} - ${slotted[i]}`);
  gridslots.push(`${slotted[i+1]} - ${slotted[i]}`);
}


export { tableslots, gridslots };