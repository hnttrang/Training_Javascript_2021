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
        if(!btnCalc.classList.contains("btn-disable")){
            btnCalc.classList.add("btn-disable");
        }
        if(!btnReset.classList.contains("btn-disable")){
            btnReset.classList.add("btn-disable");
        }
        this.bill = null;
        this.people = null;
        this.percent = null;
        if(tippad[this.lastChoice].classList.contains("percent-button__target")){
            tippad[this.lastChoice].classList.remove("percent-button__target");
        }
        lastChoice = 0;
        //Reset display
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

    //Button will be able to click
    isValid: function(){
        //
        if(btnReset.classList.contains('btn-disable')){
            btnReset.classList.remove('btn-disable');
        }
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
        //Able the submit button
        if(btnCalc.classList.contains('btn-disable')){
            btnCalc.classList.remove('btn-disable');
        }
    },

    //call API
    calculate: async function(){

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
        })

    },

    start: function() {
        this.reset();
        this.handleEvents();
    }
}
app.start();