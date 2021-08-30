// DOM Elements
const contactForm = document.getElementById("form-contact");
const confirmationModal = document.getElementById("form-sent");

const contactBtn = document.getElementById("contact-me");
const closeBtn = document.getElementById("close-form");
const submitBtn = document.getElementById("form-btn");
const okBtn = document.getElementById("ok-btn");

// display photographer name in form title
function displayTitle() {
    document.getElementById("form-title").innerHTML = "Contactez-moi </br>" + document.querySelector(".photographer-profile__heading").innerHTML;
}

// sorts formDatas as objects

const formDatas = [
    {
        location: document.getElementById("form-firstname"),
        errorMsg: "Veuillez entrer un prénom d'au moins 2 caractères",
    },
    {
        location: document.getElementById("form-lastname"),
        errorMsg: "Veuillez entrer un nom d'au moins 2 caractères",
    },
    {
        location: document.getElementById("form-email"),
        errorMsg: "Veuillez entrer un email valide",
    },
    {
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

