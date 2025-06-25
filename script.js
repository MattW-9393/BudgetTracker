let myBalance = document.getElementById("income");
let balanceValueNum = 0;
let totalNumRows = 0;
const transactionTable = document.getElementById("transactionTable");
const entrySubmit = document.getElementById("entrySubmit")
const clearAllBtn = document.getElementById("clearAllBtn")
const budgetForm = document.getElementById("budgetForm")
let allEntries = JSON.parse(localStorage.getItem("Entry values")) || [];
const filterMeBtn = document.getElementById('filterMeBtn')



// Load balance from local storage on page load
const savedBalance = localStorage.getItem("balanceValueNum");
if (savedBalance !== null) {
    balanceValueNum = parseFloat(savedBalance);
    document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
}

function addBudgetEntry () {


    const entryName = document.getElementById("entryName");
    const entryValue = document.getElementById("entryValue");
    const entryType = document.getElementById("entryType");
    const date = new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
    });
  

    if (entryName.value === "" || entryValue.value === "" || entryType.value === "" || entryValue.value <= 0) {
        alert("Please complete all fields before submitting an entry.")
    } else {

   
    // Add new row
    const row = transactionTable.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.textContent = date;
    cell2.textContent = entryName.value;
    cell4.textContent = "£" + entryValue.value;

    // switch 
    switch (entryType.value){
        case "Income":
            cell3.innerHTML = "Income";
            row.style.backgroundColor = "#b6de92"
            console.log("New income row added");
            balanceValueNum += parseFloat(entryValue.value);
            document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
            //save balance to memory
            localStorage.removeItem("balanceValueNum");
            localStorage.setItem("balanceValueNum", balanceValueNum);
            //Check balance saved to memory
            const getBalance = localStorage.getItem("balanceValueNum");
            console.log("Income added - balance is £" + getBalance);
            break
        case "Bill":
            cell3.innerHTML = "Bill";
             row.style.backgroundColor = "#a7d7fc"
            console.log("New bills row added");
            balanceValueNum -= parseFloat(entryValue.value);
            localStorage.removeItem("balanceValueNum");
            localStorage.setItem("balanceValueNum", balanceValueNum);
            document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
            console.log(`New balance £${balanceValueNum}`);
            break
        case "Expense":
            cell3.innerHTML = "Expense";
            row.style.backgroundColor = "#f6fc9a"
            console.log("New expenses row added");
            balanceValueNum -= parseFloat(entryValue.value);
            localStorage.removeItem("balanceValueNum");
            localStorage.setItem("balanceValueNum", balanceValueNum);
            document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
            console.log(`New balance £${balanceValueNum}`);
            break;
        default:
            console.log("There has been an error - a new item could not be added!")
    }

    const entryNameValue = entryName.value;
    const entryTypeValue = entryType.value;
    const entryValueValue = entryValue.value;

    allEntries.push([date, entryNameValue, entryTypeValue, entryValueValue]);

    const stringifiedEntryArray = JSON.stringify(allEntries);
    localStorage.setItem("Entry values", stringifiedEntryArray);

    // Add data-index attribute to the edit/delete buttons
    const entryIndex = allEntries.length - 1;
    cell5.innerHTML =
        `<button onclick="editData(this)" data-index="${entryIndex}">Edit</button>` +
        `<button onclick="deleteData(this)" data-index="${entryIndex}">Delete</button>`;

    alert("New entry added!");

}}

function renderTable (arr) {
	const rows = transactionTable.rows;
	const entryName = document.getElementById("entryName");
    	const entryValue = document.getElementById("entryValue");
    	const entryType = document.getElementById("entryType");
    	const date = new Date().toLocaleDateString("en-GB", {
        	year: "2-digit",
        	month: "2-digit",
        	day: "2-digit"
    		});

	for (let i = rows.length - 1; i >= 0; i--) {
        	const row = rows[i];

        // Check if the row contains any <th> (header) cells, skip it
        	if (row.querySelector('th')) continue;

        	transactionTable.deleteRow(i);
	}
	
	arr.forEach((entry, idx) => {
        const row = transactionTable.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        cell1.textContent = entry[0]
        cell2.textContent = entry[1]
        cell3.textContent = entry[2]
        cell4.textContent = "£" + entry[3];
        cell5.innerHTML =
            `<button onclick="editData(this)" data-index="${idx}">Edit</button>` +
            `<button onclick="deleteData(this)" data-index="${idx}">Delete</button>`;
	
	if (entry[2] === "Income") {
		row.style.background = "#b6de92";
	} else if (entry[2] === "Bill") {
		row.style.backgroundColor = "#a7d7fc"
	} else if (entry[2] === "Expense") {
		row.style.backgroundColor = "#f6fc9a"}
	else {console.log("Error - No formatting added");
}
});

};


allEntries = JSON.parse(localStorage.getItem("Entry values")) || [];

entrySubmit.addEventListener("click", addBudgetEntry);

function clearBalance(){
    const rows = transactionTable.rows
    const exampleRow = document.getElementById("exampleRow")

    localStorage.removeItem("balanceValueNum");
    localStorage.removeItem("Entry values");
    balanceValueNum = 0;
    document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
     for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];

        // Check if the row contains any <th> (header) cells, skip it
        if (row.querySelector('th')) continue;

        transactionTable.deleteRow(i);
    }

    console.log("All transactions cleared and balance reset to £0.00. Total number of rows reset to " + index + ".");
}


clearAllBtn.addEventListener("click", clearBalance);

function filterItems(){

   const filterByType = document.getElementById("filterByType");

   const filterByIncome = allEntries.filter((entry) => entry[2] === "Income");
   const filterByBills = allEntries.filter((entry) => entry[2] === "Bill");
   const filterByExpense = allEntries.filter((entry) => entry[2] === "Expense");
   // do I need this? --> const filterOff = allEntries    
   
   if (filterByType === "Income"){
    renderTable(filterByIncome)
   } else if ( filterByType.value === "Bill"){
    renderTable(filterByBills)
   } else if ( filterByType.value === "Expense"){
    renderTable(filterByExpense)
   } else if (filterByType.value === "All"){
    renderTable(allEntries)
   }

   //Better way to do this in future ----->> const filtered = (type === "All") ? allEntries : allEntries.filter(entry => entry[2] === type);


}

// filterMeBtn.addEventListener('click', filterItems);
document.getElementById("filterByType").addEventListener("change", filterItems);



// Fix: Ensure all Edit/Delete buttons have data-index after reload
// Remove the old allEntries.forEach that does not set data-index
// Instead, after loading allEntries, call renderTable(allEntries) to render the table with correct buttons
renderTable(allEntries);

function clearBalance(){
    const rows = transactionTable.rows
    const exampleRow = document.getElementById("exampleRow")

    localStorage.removeItem("balanceValueNum");
    localStorage.removeItem("Entry values");
    balanceValueNum = 0;
    document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
     for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];

        // Check if the row contains any <th> (header) cells, skip it
        if (row.querySelector('th')) continue;

        transactionTable.deleteRow(i);
    }

    console.log("All transactions cleared and balance reset to £0.00. Total number of rows reset to " + index + ".");
}


clearAllBtn.addEventListener("click", clearBalance);

function filterItems(){

   const filterByType = document.getElementById("filterByType");

   const filterByIncome = allEntries.filter((entry) => entry[2] === "Income");
   const filterByBills = allEntries.filter((entry) => entry[2] === "Bill");
   const filterByExpense = allEntries.filter((entry) => entry[2] === "Expense");
   // do I need this? --> const filterOff = allEntries    
   
   if (filterByType === "Income"){
    renderTable(filterByIncome)
   } else if ( filterByType.value === "Bill"){
    renderTable(filterByBills)
   } else if ( filterByType.value === "Expense"){
    renderTable(filterByExpense)
   } else if (filterByType.value === "All"){
    renderTable(allEntries)
   }

   //Better way to do this in future ----->> const filtered = (type === "All") ? allEntries : allEntries.filter(entry => entry[2] === type);


}

// filterMeBtn.addEventListener('click', filterItems);
document.getElementById("filterByType").addEventListener("change", filterItems);



function editData(button) {
    // Get the index from data-index
    const idx = parseInt(button.getAttribute('data-index'));
    if (isNaN(idx) || !allEntries[idx]) return;
    let entry = allEntries[idx];
    // Prompt the user to enter updated values
    let nameInput = prompt("Enter the updated name:", entry[1]);

    // Create a dropdown for type selection
    let typeOptions = ["Income", "Bill", "Expense"];
    let typeSelect = document.createElement("select");
    typeOptions.forEach(opt => {
        let option = document.createElement("option");
        option.value = opt;
        option.text = opt;
        if (opt === entry[2]) option.selected = true;
        typeSelect.appendChild(option);
    });
    // Show the dropdown in a modal-like prompt
    let typeInput = window.prompt(
        `Enter the updated entry type (Income, Bill, Expense):\n(Current: ${entry[2]})\nType one of: Income, Bill, Expense`,
        entry[2]
    );
    // Fallback to prompt if not in browser context
    // Prompt for value
    let valueInput = prompt("Enter the updated value (number only):", entry[3]);

    // Validate and update only if all fields are provided and value is a valid number
    if (
        nameInput !== null &&
        typeInput !== null &&
        valueInput !== null &&
        nameInput.trim() !== '' &&
        typeInput.trim() !== '' &&
        !isNaN(parseFloat(valueInput)) &&
        parseFloat(valueInput) > 0
    ) {
        // Update balanceValueNum based on the difference
        let oldType = entry[2];
        let oldValue = parseFloat(entry[3]);
        let newType = typeInput.trim();
        let newValue = parseFloat(valueInput);

        // Remove old value from balance
        if (oldType === "Income") {
            balanceValueNum -= oldValue;
        } else if (oldType === "Bill" || oldType === "Expense") {
            balanceValueNum += oldValue;
        }
        // Add new value to balance
        if (newType === "Income") {
            balanceValueNum += newValue;
        } else if (newType === "Bill" || newType === "Expense") {
            balanceValueNum -= newValue;
        }

        // Update entry
        allEntries[idx][1] = nameInput.trim();
        allEntries[idx][2] = newType;
        allEntries[idx][3] = newValue;
        localStorage.setItem("Entry values", JSON.stringify(allEntries));
        localStorage.setItem("balanceValueNum", balanceValueNum);
        document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
        renderTable(allEntries);
    } else {
        alert("Invalid input. Please enter valid values.");
    }
}
