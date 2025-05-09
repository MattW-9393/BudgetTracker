let myBalance = document.getElementById("income");
let balanceValueNum = 0

function getBalance () {
    balanceValueNum = myBalance.value
    document.getElementById("balanceValue").innerHTML = "Balance: £" + balanceValueNum
    console.log("Balance set to £" + balanceValueNum)
    //save balance to memory
}