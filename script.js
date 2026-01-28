const form = document.getElementById(`form`);
const fullname = document.getElementById(`fullname`);
const nameError = document.getElementById(`nameError`);
const email = document.getElementById(`email`);
const emailError = document.getElementById(`emailError`);
const password = document.getElementById(`password`);
const pLength = document.getElementById(`length`);
const pUpperCase = document.getElementById(`uppercase`);
const pLowerCase = document.getElementById(`lowercase`);
const pNumber = document.getElementById(`number`);
const pSpecial = document.getElementById(`special`);
const pError = document.getElementById(`msg-password`);
const button = document.getElementById(`btn`);

const validationState = {
  fullname: false,
  email: false,
  password: false,
};

// Helper functions - work with STRINGS (no .value here)
function hasTwoWords(text) {
  let fullnameValue = text.trim().split(" ");
  let firstName = fullnameValue[0];
  let surName = fullnameValue[fullnameValue.length - 1];
  return {
    firstName: firstName,
    surName: surName,
  };
}

// has 3 or more characters
function hasThreeChar(text) {
  return text.length >= 3;
}

// name has 2 words and not empty
function hasFirstandSurName(text) {
  let nameparts = text.trim().split(" ");
  return nameparts.length >= 2 && nameparts[0] !== "" && nameparts[1] !== "";
}

// Full name Validation - get .value HERE, then pass strings to helpers
function checkFullName(fullname) {
  const fullnameValue = fullname.value; // Get the string value from the input element

  if (!hasFirstandSurName(fullnameValue)) {
    // Pass the STRING
    nameError.textContent = "Enter a Valid Fullname";
    fullname.className = "input invalid";
    validationState.fullname = false;
    return false;
  }

  const namesValue = hasTwoWords(fullnameValue); // Pass the STRING
  if (
    !hasThreeChar(namesValue.firstName) ||
    !hasThreeChar(namesValue.surName)
  ) {
    nameError.textContent = "Each name must be at least 3 characters";
    fullname.className = "input invalid";
    validationState.fullname = false;
    return false;
  }

  nameError.textContent = "";
  fullname.className = "input valid";
  validationState.fullname = true;
  return true;
}

fullname.addEventListener("input", function () {
  checkFullName(fullname);
  updateButton();
});

// email Helpers
// To get valid emails - so get @
function validEmail(text) {
  let emailValue = text.trim();
  if (emailValue.indexOf(`@`) === -1) {
    return false;
  }
  return true;
}

// validate blocked list
function blockedList(text) {
  const blockedEmailList = [
    `tempmail.com`,
    `mailinator.com`,
    `10minutemail.com`,
  ];
  let isBlocked = false;
  blockedEmailList.forEach((domain) => {
    if (text.includes(domain)) {
      isBlocked = true;
    }
  });

  return isBlocked;
}

// Validate Email
function checkEmail(email) {
  let emailValue = email.value;

  if (validEmail(emailValue) === false) {
    emailError.textContent = "Enter a Valid Email Address";
    email.className = "input invalid";
    validationState.email = false;
    return false;
  }
  if (blockedList(emailValue)) {
    emailError.textContent = "This Email Address is not Supported";
    email.className = "input invalid";
    validationState.email = false;
    return false;
  }

  emailError.textContent = "";
  email.className = "input valid";
  validationState.email = true;
  return true;
}
email.addEventListener("input", function () {
  checkEmail(email);
  updateButton();
});

// Password Helpers
// 8 characters
function eightChar(text) {
  let passwordValue = text.trim();
  if (passwordValue.length < 8) {
    return false;
  }
  return true;
}
// has uppercase
function hasUpperCase(text) {
  let passwordValue = text.trim();
  if (passwordValue.toLowerCase() === passwordValue) {
    return false;
  }
  return true;
}
// lowercase
function hasLowerCase(text) {
  let passwordValue = text.trim();
  if (passwordValue.toUpperCase() === passwordValue) {
    return false;
  }
  return true;
}
// hasNumber
function hasNumber(text) {
  let i = 0;

  while (i < text.length) {
    let char = text[i];
    if (char >= "0" && char <= "9") {
      return true;
    }
    i++;
  }

  return false;
}
// password validation
function checkPassword(password) {
  const passwordValue = password.value;
  let allValid = true;
  if (eightChar(passwordValue)) {
    pLength.className = "req-item valid";
  } else {
    pLength.className = "req-item";
    allValid = false;
  }
  if (hasUpperCase(passwordValue)) {
    pUpperCase.className = "req-item valid";
  } else {
    pUpperCase.className = "req-item";
    allValid = false;
  }
  if (hasLowerCase(passwordValue)) {
    pLowerCase.className = "req-item valid";
  } else {
    pLowerCase.className = "req-item";
    allValid = false;
  }
  if (hasNumber(passwordValue)) {
    pNumber.className = "req-item valid";
  } else {
    pNumber.className = "req-item";
    allValid = false;
  }
  validationState.password = allValid;
  return allValid;
}

password.addEventListener("input", function () {
  checkPassword(password);
  updateButton();
});

function updateButton() {
  if (
    validationState.fullname &&
    validationState.email &&
    validationState.password
  ) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}
