let myBalance = document.getElementById("income");
let balanceValueNum = 0

function getBalance () {
    // get balance from income input and display in Transaction Table 
    balanceValueNum = myBalance.value
    document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum
    //save balance to memory
    localStorage.removeItem("balanceValueNum")
    localStorage.setItem("balanceValueNum", balanceValueNum)

    //Check balance saved to memory
    const getBalance = localStorage.getItem("balanceValueNum")
    console.log("balance is £" + getBalance)
}

function addBill(){
    // add bill entry to transaction table
    //subtract value from balance
    // turn BG colour to [blue]
}

function addExpense(){
    // add bill entry to transaction table
    //subtract value from balance
    // turn BG colour to [yellow]
}

