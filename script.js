let myBalance = document.getElementById("income");
let balanceValueNum = 0;
const transactionTable = document.getElementById("transactionTable") ;

function getBalance () {
    // get balance from income input and display in Transaction Table 
    balanceValueNum = myBalance.value;
    document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
    //save balance to memory
    localStorage.removeItem("balanceValueNum");
    localStorage.setItem("balanceValueNum", balanceValueNum);

    //Check balance saved to memory
    const getBalance = localStorage.getItem("balanceValueNum");
    console.log("Income added - balance is £" + getBalance);
}

function addBill(){
    // add bill entry to transaction table
    //subtract value from balance
    // turn BG colour to [blue]

    // Create an empty <tr> element and add it to the last position of the table:
    const row = transactionTable.insertRow(-1);
    const billsName = document.getElementById("billsName");
    const billsFigure = document.getElementById("billsFigure");
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    // Add some text to the new cells:
    cell1.innerHTML = billsName.value;
    cell2.innerHTML = "Bill";
    cell3.innerHTML = "£" + billsFigure.value;
    row.style.backgroundColor = "#a7d7fc"

    console.log("New bills row added");

    balanceValueNum -= billsFigure.value;
    document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
    console.log(`New balance £${balanceValueNum}`);
}

function addExpense(){

    const row = transactionTable.insertRow(-1);
    const expenseName = document.getElementById("expenseName");
    const expenseFigure = document.getElementById("expenseFigure");

    if (typeof expenseFigure.value === "string") {
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    // Add some text to the new cells:
    cell1.innerHTML = expenseName.value;
    cell2.innerHTML = "Expense";
    cell3.innerHTML = "£" + expenseFigure.value;
    row.style.backgroundColor = "#f6fc9a"
    console.log("New expenses row added");

    balanceValueNum -= expenseFigure.value;
    document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum;
    console.log(`New balance £${balanceValueNum}`);}
    else{
        console.log("Expense value needs to be a number")
    }
}

