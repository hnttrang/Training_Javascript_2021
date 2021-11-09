console.log("successfully connected");
//
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//Input Values
const inputBill = $('#bill');
const input = $$(".input-bar");
//console.log(input);
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
        this.validateInput(input[0]);
        this.validateInput(input[1]);
        this.validateInput(custom);

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
        //console.log(this);
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

    //Check the new value
    validateInput: function(inp){
        if(inp.classList.contains('input-bar__invalid')){
            inp.classList.remove('input-bar__invalid')
        }
    },

    invalidateInput: function(inp){
        if(!inp.classList.contains('input-bar__invalid')){
            inp.classList.add('input-bar__invalid')
        }
    },
//Check bill
    checkBill: function(){
        //Enable the reset
        this.enableButton(btnReset);
        //Disable the submit button
        this.disableButton(btnCalc);
        if(this.bill != null && !isNaN(this.bill)){
            if(this.bill < 0){
                app.invalidateInput(input[0]);
                return false;
            }
        } 
        else{
            app.invalidateInput(input[0]);
            return false;
        }
        app.validateInput(input[0]);
        return true;
    },
//Check custom percent
checkPercent: function(){
    //Enable the reset
    this.enableButton(btnReset);
    //Disable the submit button
    this.disableButton(btnCalc);
    if(this.percent != null && !isNaN(this.percent)){
        if(this.percent < 0){
            app.invalidateInput(custom);
            return false;
        }
    } 
    else{
        app.invalidateInput(custom);
        return false;
    }
    app.validateInput(custom);
    return true;
},
//Check people
    checkPeople: function(){
        //Enable the reset
        this.enableButton(btnReset);
        //Disable the submit button
        this.disableButton(btnCalc);
        if(this.people != null && Number.isInteger(this.people)){
            //check negative + float
            if(this.people <= 0){
                app.invalidateInput(input[1]);
                return false;
            }
        } 
        else{
                app.invalidateInput(input[1]);
                return false;
        }
        app.validateInput(input[1]);
        return true;
    },

    //Button will be able to click
    isValid: function(){
        if(!(this.checkBill() && this.checkPeople() && this.checkPercent())){
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
            alert('We have some problems :(');
        }

    },

    //Operator + negative
    preventOperator: function(e){
        if (e.which == 43 || e.which == 45){
            e.preventDefault();
        }
    },
    //Int value
    preventFloat: function(e){
        if (e.which == 46){
            e.preventDefault();
        }
    },

    handleEvents: function(){
        inputBill.addEventListener('change', function(e){
            app.bill = parseFloat(inputBill.value);
            //Enable Reset button
            if(app.checkBill()){
                app.isValid();
            }
        });
        //Limit input value
        inputBill.addEventListener('keypress', function(e){
            app.preventOperator(e);
        }),

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
            if(app.checkPercent()){
                app.isValid();
            }
        }),
        //Limit input value
        custom.addEventListener('keypress', function(e){
            app.preventOperator(e);
        }),

        
        btnReset.addEventListener('click', function(e){
            //console.log("onClicked");
            app.reset();
        }),
        
        inputPeople.addEventListener('change', function(e){
            app.people = parseInt(inputPeople.value);
            if(app.checkPeople()){
                app.isValid();
            }
        }),
        //Limit input value
        inputPeople.addEventListener('keypress', function(e){
            app.preventOperator(e);
            app.preventFloat(e);
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