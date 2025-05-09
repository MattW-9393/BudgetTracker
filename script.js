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

