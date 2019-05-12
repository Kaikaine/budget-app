// BUDGET CONTROLLER
let budgetController = (function() {
  let Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //
  let Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //
  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  // Public
  return {
    addItem: function(type, desc, val) {
      let id, newItem;
      // Create ID
      data.allItems[type].length > 0
        ? (id = data.allItems[type][data.allItems[type].length - 1].id + 1)
        : (id = 0);

      // Create new item
      if (type === "exp") {
        newItem = new Expense(id, desc, val);
      } else if (type === "inc") {
        newItem = new Income(id, desc, val);
      }
      // pushed into data structure
      data.allItems[type].push(newItem);
      return newItem;
    }
  };
})();

// UI CONTROLLER
let UIController = (function() {
  let DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"
  };

  // Public
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //inc == income. exp == expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    },
    addListItem: function(obj, type) {
      let html, newHTml, element;
      // create html string w/ placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        html = `<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline" /></button></div></div></div>`;
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html = `<div class="item clearfix" id="expense-%id%"><div class="item__description"%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline" /></button></div></div></div>`;
      }

      // replace placeholder text with data
      newHTml = html
        .replace("%id%", obj.id)
        .replace("%description%", obj.description)
        .replace("%value%", obj.value);
      // insert html into dom
      document.querySelector(element).insertAdjacentHTML("beforeend", newHTml);
    }
  };
  //
})();

// GLOBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl) {
  let setupEventListeners = function() {
    let DOM = UICtrl.getDOMstrings();
    //
    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);
    //
    document.addEventListener("keypress", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
    //
  };
  //
  let ctrlAddItem = function() {
    let input, newItem;
    // get input data
    input = UICtrl.getInput();
    console.log(input);
    // add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // add the item to UI
    UICtrl.addListItem(newItem, input.type);
    // calculate the budget
    // display budget on the UI
  };
  //
  return {
    init: function() {
      console.log("started");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
