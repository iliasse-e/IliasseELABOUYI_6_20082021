// DOM Elements
const contactForm = document.getElementById("form-contact");
const form = document.querySelector(".form-contact, form")
const confirmationModal = document.getElementById("form-sent");

const contactBtn = document.getElementById("contact-me");
const closeBtn = document.getElementById("close-form");
const submitBtn = document.getElementById("form-btn");
const closeBtnConfirmation = document.getElementById("close-confirmation");
const confirmationMsgContainer = document.getElementById("confirmation-msg")

// display photographer name in form title
function displayTitle() {
    document.getElementById("form-title").innerHTML = "Contactez-moi </br>" + document.querySelector(".photographer-profile__heading").innerHTML;
}

// sorts formDatas as objects
const formFields = [
    {
        container: document.getElementById("form-firstname-container"),
        location: document.getElementById("form-firstname"),
        errorMsg: "Veuillez entrer un prénom d'au moins 2 caractères",
    },
    {
        container: document.getElementById("form-lastname-container"),
        location: document.getElementById("form-lastname"),
        errorMsg: "Veuillez entrer un nom d'au moins 2 caractères",
    },
    {
        container: document.getElementById("form-email-container"),
        location: document.getElementById("form-email"),
        errorMsg: "Veuillez entrer un email valide",
    },
    {
        container: document.getElementById("form-msg-container"),
        location: document.getElementById("form-msg"),
        errorMsg: "Votre message doit contenir un minimum de 50 caractères",
    },
]

// launch modal
contactBtn.addEventListener( "click", () => {
    displayTitle()
    contactForm.style.display= "block";
})

// close modal
closeBtn.addEventListener( "click", () => {
    contactForm.style.display= "none";
})

closeBtnConfirmation.addEventListener( "click", () => {
    confirmationModal.style.display= "none";
})

// error message
function ErrorMsgDisplay(formField) {

    if (!formField.location.validity.valid || formField.location.validity.valueMissing) {
      formField.container.setAttribute("data-error", formField.errorMsg);
      formField.container.setAttribute("data-error-visible", "true")
    }
    else {
      formField.container.setAttribute("data-error", "");
      formField.container.setAttribute("data-error-visible", "")
    }
}

formFields.forEach(field => {
    field.location.addEventListener("change", () => { ErrorMsgDisplay(field)})
   }
)

// validation
const validationMsg = "Merci, votre message a bien été envoyé";
submitBtn.onclick = validate;

// inspects if form is fully filled
function formIsValid() {

    for (let i = 0; i < formFields.length; i++) {  
      if (formFields[i].input.ErrorMsgDisplay() == false) {
        return false}
    }
    return true
}

function validate() {
    
    if (formIsValid) {
        contactForm.style.display="none";
        confirmationModal.style.display="block";
        form.reset();
        confirmationMsgContainer.innerHTML = validationMsg;
    }
    else {
        formFields.forEach(field => {
            field.location.addEventListener("change", () => { ErrorMsgDisplay(field)})
           }
        )
    }
}