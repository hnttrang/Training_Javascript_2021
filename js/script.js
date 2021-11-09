console.log("successfully connected");
//
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//Input Values
const inputBill = $('#bill');
const input = $$(".input-bar");
const inputPeople = $('#people');

//Tip
const tippad = Array.from(document.getElementsByClassName('percent-button'));
const custom = $('#cus-percent');

//Display
const tipAmount = $("#tipAmount");
const total = $("#total");
const btnReset = $("#reset");
const btnCalc = $("#calculate");

const api = "https://plitter-server.vercel.app/api/calculate"

const app = {
    bill : null,
    people : null,
    percent : null,
    lastChoice : 0,

    reset: function(){
        //Buttons will always be disable
        this.disableButton(btnReset);
        this.disableButton(btnCalc);
        //Reset the app value
        this.bill = null;
        this.people = null;
        this.percent = null;
        if(tippad[this.lastChoice].classList.contains("percent-button__target")){
            tippad[this.lastChoice].classList.remove("percent-button__target");
        }
        lastChoice = 0;
        //Reset the display
        total.innerText = "0.00";
        tipAmount.innerText = "0.00";
        inputBill.value = null;
        inputPeople.value = null;
        custom.value = null;
    },

    //Update tippad target
    updateTarget: function(target, e){
        if(tippad[this.lastChoice].classList.contains("percent-button__target")){
            tippad[this.lastChoice].classList.remove("percent-button__target");
        }
        this.lastChoice = target;
        e.target.classList.add("percent-button__target");
        this.percent = parseFloat(e.target.innerText)/100;
        this.isValid();
        console.log(this);
    },

    disableButton: function(btn){
        if(!btn.classList.contains("btn-disable")){
            btn.classList.add("btn-disable");
        }
    },

    enableButton: function(btn){
        if(btn.classList.contains("btn-disable")){
            btn.classList.remove("btn-disable");
        }
    },

    //Button will be able to click
    isValid: function(){
        //Enable Reset button
        this.enableButton(btnReset);
        //Disable the submit button
        //Check bill value
        if(this.bill != null){
            //Check negative here
            //input[0].classList.add("input-bar__invalid");
        } else{
            return false;
        }
        //Check people input
        if(this.people != null){
            //check negative + float
            //input[1].classList.add("input-bar__invalid");
        } else{
            return false;
        }

        //Check percent
        if(this.percent != null && !isNaN(this.percent)){
            // custom.classList.add('input-bar__invalid')
        } else{
            return false;
        }
        //Enble the submit button when the form is valid
        this.enableButton(btnCalc);
    },

    display: function(result){
        tipAmount.innerText = result.amount.toFixed(2);
        total.innerText = result.total.toFixed(2);
        this.disableButton(btnCalc);
    },

    //call API
    calculate: async function(){
        try {
            let result = await fetch(
                `${api}?bill=${app.bill}&people=${app.people}&tipPercent=${app.percent}`
            );

            app.display(await result.json());

        } catch (error) {
            
        }

    },

    handleEvents: function(){
        inputBill.addEventListener('change', function(e){
            app.bill = parseFloat(inputBill.value);
            app.isValid();
        });
        //Add target for button
        tippad.forEach( function(percent, idx) {
            percent.addEventListener('click', function(e){
                //Remove last choice and update current choice
                app.updateTarget(idx, e); //
                //app.percent = parseInt(e.target.innerText)/100;
            })
        }),
        //Custom tip button
        custom.addEventListener('change', function(e){
            //app.updateTarget(0, e);
            app.percent = parseFloat(custom.value)/100;
        }),

        
        btnReset.addEventListener('click', function(e){
            //console.log("onClicked");
            app.reset();
        }),
        
        inputPeople.addEventListener('change', function(e){
            app.people = parseInt(inputPeople.value);
            app.isValid();
        }),

        btnCalc.addEventListener('click', function(e){
            console.log("onClicked");
            app.calculate();
        })

    },

    start: function() {
        this.reset();
        this.handleEvents();
    }
}
app.start();