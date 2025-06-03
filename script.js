let myBalance = document.getElementById("income");
let balanceValueNum = 0;
let totalNumRows = 0
const transactionTable = document.getElementById("transactionTable");
const entrySubmit = document.getElementById("entrySubmit")
const clearAllBtn = document.getElementById("clearAllBtn")
const budgetForm = document.getElementById("budgetForm")
const entryArray = [];


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
  

    if (entryName.value === "" || entryValue.value === "" || entryType.value === "") {
        alert("Please complete all fields before submitting an entry.")
    } else {

   
    // Add new row
    const row = transactionTable.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.textContent = date;
    cell2.textContent = entryName.value;
    cell4.textContent = "£" + entryValue.value;

    // switch 
    switch (entryType.value){
        case "1":
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
        case "2":
            cell3.innerHTML = "Bill";
             row.style.backgroundColor = "#a7d7fc"
            console.log("New bills row added");
            balanceValueNum -= parseFloat(entryValue.value);
            localStorage.removeItem("balanceValueNum");
            localStorage.setItem("balanceValueNum", balanceValueNum);
            document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
            console.log(`New balance £${balanceValueNum}`);
            break
        case "3":
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



    totalNumRows ++
    console.log(`The total number of rows are: ${totalNumRows}`)

    const entryNameValue = entryName.value;
    const entryTypeValue = entryType.value;
    const entryValueValue = entryValue.value;

    entryArray.push([date, entryNameValue, entryTypeValue, entryValueValue]);

    const stringifiedEntryArray = JSON.stringify(entryArray);
    localStorage.setItem("Entry values", stringifiedEntryArray);

    console.log(stringifiedEntryArray);

}}

const savedEntries = JSON.parse(localStorage.getItem("Entry values")) || [];

entrySubmit.addEventListener("click", addBudgetEntry);

function clearBalance(){
    const rows = transactionTable.rows
    const exampleRow = document.getElementById("exampleRow")

    localStorage.removeItem("balanceValueNum");
    balanceValueNum = 0;
    document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
     for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];

        // Check if the row contains any <th> (header) cells, skip it
        if (row.querySelector('th')) continue;

        transactionTable.deleteRow(i);
    }
    

    console.log("All transactions cleared and balance reset to £0.00. Total number of rows reset to 0.");
}


clearAllBtn.addEventListener("click", clearBalance);



savedEntries.forEach((entry) => {
    const row = transactionTable.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.textContent = entry[0];
    cell2.textContent = entry[1]
    cell3.textContent = entry[2]
    cell4.textContent = "£" + entry[3];
    console.log(`New Row added with following values: ${entry[0]}, ${entry[1]}, ${entry[2]}, ${entry[3]}`)

});
