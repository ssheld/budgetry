// Budget Controller
 var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value; 
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value; 
    };
    
    var data = {

        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {

            var newItem, ID;
            
            // Create new ID
            // Retrieve the last ID and increment by one
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push new item to appropriate stack
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    };

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

        var newItem;
                
        // 1. Get the field input data
        var input = UIController.getInput();
        
        // 2. Add the item to the budget controller
        var newItem = budgetController.addItem(input.type, input.description, input.value);

        // 3. Add the new item to the UI
        
        // 4. Calculate the budget 

        // 5. Display the budget on the UI

    };

    return {
        init: function() {
            console.log('Initializing');
            setupEventListeners();
        }
    };

 })(budgetController, UIController);


 controller.init();



