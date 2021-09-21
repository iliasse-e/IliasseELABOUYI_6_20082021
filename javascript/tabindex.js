/**
 * Sets a tabindex for all elements of a attribute and joins a keyboard listener
 * (class attribute has to be set in HTML file first)
 * For a modal, it's recommanded to set the function up at launch and recall with different param at the closing
 * @param {string} attribute tag of the HTML targeted elements (ex: ".tab-element")
 */

export function tabindexAdder(attribute) {

  /* removes unecessary tabindex */
  const links = document.querySelectorAll("a, button, select, link, input, textarea, [tabindex]");
  for( let i = 0, j =  links.length; i < j; i++ ) {
      links[i].setAttribute( 'tabindex', '-1' );
  };

  /* sets tabindex */
  let tabElements = document.querySelectorAll(attribute);
  tabElements.forEach((element, index) => {
    element.setAttribute("tabindex", index + 1);
  });

 
  resetTabFocus();


  /* keyboard Enter listener */
  tabElements.forEach((element) =>  element.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      element.click();
    }
  })) 
}

/**
 * Cycles keyboard focus from last element to first element and vice versa
 */
function resetTabFocus() {
  const allElements = document.querySelectorAll("[tabindex]");
  let activeElement = [];
  for (let i = 0; i < allElements.length; i++) {
    if (allElements[i].getAttribute("tabindex") > 0) {
      activeElement.push(allElements[i])
    }
  }

  // last tabindex sets focus to first tab element on keybord event
  activeElement[activeElement.length-1].addEventListener("keydown", function(event) {
    if (event.keyCode === 9) {
      event.preventDefault();
      activeElement[0].focus()
    }
  }) 

  // last tabindex sets focus to first tab element on keybord event
  activeElement[0].addEventListener("keydown", function(event) {
    if (event.shiftKey && event.keyCode === 9) {
      event.preventDefault();
      activeElement[activeElement.length-1].focus();
    }
  })
  
}