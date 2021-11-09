console.log("successfully connected");
const bill = document.querySelector('#bill');
const input = document.getElementsByClassName("input-bar");
const people = document.getElementById('people');
const tippad = Array.from(document.getElementsByClassName('percent-button'));

const custom = document.getElementById('cus-percent');
const tipAmount = document.getElementById("tipAmount");
const total = document.getElementById("total");
const reset = document.getElementById("reset");
let exp ={
    "bill" : null, 
    "people" : null, 
    "percent" : null
}
console.log(input);
let lastChoice = 0; //Last choice of tippad

bill.addEventListener('change', function(e){
    exp.bill = parseFloat(bill.value);
    checkExp(exp);
});

people.addEventListener('change', function(e){
    exp.people = parseInt(people.value);
    checkExp(exp);
});

//custom tip
custom.addEventListener("change", function(e){
    if(tippad[lastChoice].classList.contains("percent-button__target")){
        tippad[lastChoice].classList.remove("percent-button__target");
    }
    lastChoice = 0;
    exp.percent = parseFloat(custom.value)/100;
    checkExp(exp);
})

//percent of tip
tippad.forEach( function(percent, idx) {
    percent.addEventListener('click', function(e){
        //Remove last choice and update current choice
        if(tippad[lastChoice].classList.contains("percent-button__target")){
            tippad[lastChoice].classList.remove("percent-button__target");
        }
        e.target.classList.add("percent-button__target");
        exp.percent = parseInt(e.target.innerText)/100;
        lastChoice = idx;
        checkExp(exp);
    })
    
})



function checkExp(exp){
    console.log(exp);
    for (let el in exp) {
        if (exp[el] == null || exp[el] == NaN){
            return 0;
        }
    }
    if (exp.bill != 0){
        input[0].classList.add('input-bar__invalid');
        return 0
    }else{

    };
    if (exp.people <= 0){return 0};
    caculate(exp);
}

function caculate(exp){
    let tip = exp.bill * exp.percent / exp.people; //Tip per people
    // let total = exp.bill/exp.people + tip; //total per people
    //fetch API when the exp is full
    tipAmount.innerText = tip.toFixed(2); //Tip per people
    totalperP = parseFloat((exp.bill / exp.people) + tip);
    total.innerText = totalperP.toFixed(2);
    console.log(tip, total);
}

reset.addEventListener('click', function(e){
    total.innerText = "0.00";
    tipAmount.innerText = "0.00";
    exp.bill = null;
    exp.people = null;
    exp.percent = null;
    people.value = null;
    bill.value = null;
})