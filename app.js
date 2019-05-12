// BUDGET CONTROLLER
let budgetController = (function() {
  // some code
})();

// UI CONTROLLER
let UIController = (function() {
  let DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn"
  };

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
    }
  };
})();

// GLOBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl) {
  let DOM = UICtrl.getDOMstrings();

  let ctrlAddItem = function() {
    // get input data
    let input = UICtrl.getInput();
    console.log(input);
    // add the item to the budget controller
    // add the item to UI
    // calculate the budget
    // display budget on the UI
  };

  document
    .querySelector(DOM.inputButton)
    .addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", function(e) {
    if (e.keyCode === 13 || e.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
