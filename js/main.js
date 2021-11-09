console.log("successfully connected");
let bill = document.querySelector('#bill');
let people = document.getElementById('people');
let tippad = Array.from(document.getElementsByClassName('percent-button'));

let custom = document.getElementById('cus-percent');
let tipAmount = document.getElementById("tipAmount");
let total = document.getElementById("total");
let reset = document.getElementById("reset");
let exp ={
    "bill" : null, 
    "people" : null, 
    "percent" : null
}
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
    // if(tippad[lastChoice].classList.contains("percent-button__target")){
    //     tippad[lastChoice].classList.remove("percent-button__target");
    // }
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
        if (exp[el] == null){
            return 0;
        }
    }
    if (exp.bill < 0){return 0};
    if (exp.people <= 0){return 0};
    caculate(exp);
}

function caculate(exp){
    let tip = exp.bill * exp.percent / exp.people; //Tip per people
    // let total = exp.bill/exp.people + tip; //total per people
    
    tipAmount.innerText = tip; //Tip per people
    total.innerText = exp.bill / exp.people + tip;
    console.log(tip, total);
}

reset.addEventListener('click', function(e){
    total.innerText = 0.0;
    tipAmount.innerText = 0.0;
    exp.bill = null;
    exp.people = null;
    exp.percent = null;
    people.value = null;
    bill.value = null;
    console.log(exp);
})