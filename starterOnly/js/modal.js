function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formReserve = document.getElementById("reserve");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const city = document.getElementById("location");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal event
closeBtn.addEventListener("click", closeModal);

//Close modal form and reset datas
function closeModal() {
  modalbg.style.display = "none";
  formReserve.reset();
}

// Submit form when "Fermer" button is clicked
document.querySelector(".btn-send").addEventListener("click", submitForm);

// Submit form function
function submitForm(){
  //formReserve.submit();
  HTMLFormElement.prototype.submit.call(formReserve);
}

// Validation message when form is validated
function validateMessage() {
  document.getElementById("validation-message").style.display = "block";
  formReserve.style.display = "none";
}

// Validate form
document.querySelector(".btn-submit").addEventListener("click", validateForm);

// Check inputs
function validateForm(event) {
  event.preventDefault();
  event.stopPropagation();
  const conditions = [
    validateFirstLastName(),
    validateEmail(),
    validateNumber(),
    validateAge(),
    validateCity(),
    validateConditions()
  ]
  if (conditions.filter((cond) => !cond).length) {
      return false;
    }
    validateMessage();
  }

  function validateFirstLastName() {
    const regexName = /^[A-zÀ-ÿ]{2,25}$/;
    const parentFirstName = firstName.parentNode;
    const parentLastName = lastName.parentNode;

    let validFirstName = true;
    let validLastName = true;

    if (firstName.value == "" || !regexName.test(firstName.value)) {
      parentFirstName.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
      parentFirstName.setAttribute("data-error-visible", "true");
      validFirstName = false;
    } else {
      parentFirstName.setAttribute("data-error-visible", "false");
      firstName.style.border = "3px solid #279e7a";
    }

    if (lastName.value == "" || !regexName.test(lastName.value)) {
      parentLastName.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
      parentLastName.setAttribute("data-error-visible", "true");
      validLastName = false;
    } else {
      parentLastName.setAttribute("data-error-visible", "false");
      lastName.style.border = "3px solid #279e7a";
    }

    return validFirstName && validLastName;
  }

  // Validate email
  function validateEmail() {
    const regexEmail =
    /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;
    const parent = document.getElementById("email").parentNode;

    if (email.value == "" || !regexEmail.test(email.value)) {
      parent.setAttribute("data-error", "Veuillez saisir une adresse e-mail valide.");
      parent.setAttribute("data-error-visible", "true");
      return false;
    }
    parent.setAttribute("data-error-visible", "false");
    email.style.border = "3px solid #279e7a";
    return true;
  }

  // Validate date of birth
  function validateAge() {
    const today = new Date();
    // Date entered in the input
    const selectedDate = new Date(birthDate.value);
    const parent = birthDate.parentNode;
    // Define today's date minus 18 years
    today.setFullYear(today.getFullYear() - 18);

    // If the date entered is superior to today minus 18y
    if (selectedDate > today) {
      parent.setAttribute("data-error", "Vous devez avoir au moins 18 ans.");
      parent.setAttribute("data-error-visible", "true");
      return false;

    } else if (birthDate.value == null || birthDate.value == "") {
      parent.setAttribute("data-error", "Vous devez renseigner une date de naissance.");
      parent.setAttribute("data-error-visible", "true");
      return false;

    } else {
      parent.setAttribute("data-error-visible", "false");
      return true;
    }
  }

  // Validate number of tournaments
  function validateNumber() {
    const quantityTournament = document.querySelector("input[name='quantity']");
    const parent = document.querySelector("input[name='quantity']").closest('.formData');

    if (quantityTournament.value == "" || null) {
      parent.setAttribute("data-error", "Vous devez entrer un nombre.");
      parent.setAttribute("data-error-visible", "true");
      return false;
    }
    parent.setAttribute("data-error-visible", "false");
    quantityTournament.style.border = "3px solid #279e7a";
    return true;
  }

  // Validate city (input type radio)
  function validateCity() {
    const checkedRadio = document.querySelector("input[name='location']:checked");
    const parent = document.querySelector("input[name='location']").closest(".formData");

    if (checkedRadio != null) {
      parent.setAttribute("data-error-visible", "false");
      return true;
    }
    parent.setAttribute("data-error", "Vous devez choisir une option.");
    parent.setAttribute("data-error-visible", "true");
    return false;
  }

  // Validate terms and conditions (input type checkbox)
  function validateConditions() {
    const checkedCheckbox = document.querySelector("input[name='checkbox1']:checked");
    const parent = document.querySelector("input[name='checkbox1']").closest(".formData");

    if (checkedCheckbox != null) {
      parent.setAttribute("data-error-visible", "false");
      return true;
    }
    parent.setAttribute("data-error", "Vous devez accepter les termes et conditions.");
    parent.setAttribute("data-error-visible", "true");
    return false;
  }
