let myBalance = document.getElementById("income");
let balanceValueNum = 0;
const transactionTable = document.getElementById("transactionTable") ;
const entrySubmit = document.getElementById("entrySubmit")



function addBudgetEntry () {


    const entryName = document.getElementById("entryName");
    const entryValue = document.getElementById("entryValue");
    const entryType = document.getElementById("entryType");

    if (entryName.value === "" || entryValue.value === "" || entryType.value === "") {
        alert("Please complete all fields before submitting an entry.")
    } else {

   
    // Add new row
    const row = transactionTable.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.innerHTML = entryName.value;
    cell3.innerHTML = "£" + entryValue.value;

    // switch 
    switch (entryType.value){
        case "1":
            cell2.innerHTML = "Income";
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
            cell2.innerHTML = "Bill";
             row.style.backgroundColor = "#a7d7fc"
            console.log("New bills row added");
            balanceValueNum -= parseFloat(entryValue.value);
            document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
            console.log(`New balance £${balanceValueNum}`);
            break
        case "3":
            cell2.innerHTML = "Expense";
            row.style.backgroundColor = "#f6fc9a"
            console.log("New expenses row added");
            balanceValueNum -= parseFloat(entryValue.value);
            document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
            console.log(`New balance £${balanceValueNum}`);
            break;
        default:
            console.log("There has been an error - a new item could not be added!")
    }
}}



entrySubmit.addEventListener("click", addBudgetEntry);

