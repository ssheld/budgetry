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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    };

    return {
        getInput: function() {

            return {
                // Will be either inc (for income) or exp (for expense)
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            
            var html, newHtml, element;

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div>' +
                '<div class="right clearfix"><div class="item__value">%value%</div>' +
                '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline">' +
                '</i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div>' +
                '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div>' +
                '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                '</div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() {
            var fields;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + 
            DOMstrings.inputValue);

            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current) {
                current.value = "";
            });

            fieldsArr[0].focus();

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
    
    var updateBudget = function() {


        // 1. Calculate the budget 


        // 2. Return the budget


        // 3. Display the budget on the UI


    };

    var ctrlAddItem = function() {

        var newItem;
                
        // 1. Get the field input data
        var input = UIController.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
        
            // 2. Add the item to the budget controller
            var newItem = budgetController.addItem(input.type, input.description, input.value);

            // 3. Add the new item to the UI
            UIController.addListItem(newItem, input.type);
            
            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Update the budget
            updateBudget();
        } 
    };

    return {
        init: function() {
            console.log('Initializing');
            setupEventListeners();
        }
    };

 })(budgetController, UIController);


 controller.init();



