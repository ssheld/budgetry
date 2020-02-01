// Budget Controller
 var budgetController = (function() {
    
// Some code

 })();




 // UI Controller
 var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function() {

            return {
                // Will be either inc (for income) or exp (for expense)
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }

 })();




 // Global APP Controller
 var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {

        var DOM = UICtrl.getDOMstrings(); 

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e) {
    
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
    
        });

    };


    var ctrlAddItem = function() {
                
        // 1. Get the field input data
        var input = UIController.getInput();
        console.log(input);

        
        // 2. Add the item to the budget controller

        // 3. Add the new item to the UI
        
        // 4. Calculate the budget 

        // 5. Display the budget on the UI

    }

 })(budgetController, UIController);



