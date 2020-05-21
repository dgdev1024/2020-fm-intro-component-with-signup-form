/* DOM Elements */
const signupForm = document.querySelector('#signup-form');
const firstNameElement = document.querySelector('#first-name-element');
const lastNameElement = document.querySelector('#last-name-element');
const emailAddressElement = document.querySelector('#email-address-element');
const passwordElement = document.querySelector('#password-element');
const confirmPasswordElement = document.querySelector('#confirm-password-element');

/* Regular Expressions */
const regex = {
  letters: /^[a-zA-Z]+$/,
  numbers: /[0-9]/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
};

/* Set Input Error */
const setInputError = (element, message = '') => {
  const { classList } = element;
  if (classList.contains('fm-signup-input-element') === false) {
    return;
  }

  if (message === '') {
    classList.remove('error');
  } else {
    classList.add('error');
  }
  
  const errorField = element.getElementsByClassName('fm-signup-input-error')[0];
  errorField.innerHTML = message;
};

/* Validation Functions */
const validatiors = {
  firstName () {
    const { value } = firstNameElement.querySelector('#first-name');
    if (typeof value !== 'string' || value === '') {
      setInputError(firstNameElement, 'First Name cannot be empty.');
      return false;
    } else if (regex.letters.test(value) === false) {
      setInputError(firstNameElement, 'First Name can contain only letters.');
      return false;
    }

    setInputError(firstNameElement);
    return true;
  },

  lastName () {
    const { value } = lastNameElement.querySelector('#last-name');
    if (typeof value !== 'string' || value === '') {
      setInputError(lastNameElement, 'Last Name cannot be empty.');
      return false;
    } else if (regex.letters.test(value) === false) {
      setInputError(lastNameElement, 'Last Name can contain only letters.');
      return false;
    }

    setInputError(lastNameElement);
    return true;
  },

  emailAddress () {
    const { value } = emailAddressElement.querySelector('#email-address');
    if (typeof value !== 'string' || value === '') {
      setInputError(emailAddressElement, 'Email Address cannot be empty.');
      return false;
    } else if (regex.email.test(value) === false) {
      setInputError(emailAddressElement, 'Looks like this is not an email.');
      return false;
    }

    setInputError(emailAddressElement);
    return true;
  },

  password () {
    const { value: password } = passwordElement.querySelector('#password');
    const { value: confirm } = confirmPasswordElement.querySelector('#confirm-password');
    let ok = true;

    if (typeof password !== 'string' || password === '') {
      setInputError(passwordElement, 'Password cannot be empty.');
      ok = false;
    } else if (regex.numbers.test(password) === false) {
      setInputError(passwordElement, 'Password must contain a number.');
      ok = false;
    }

    if (typeof confirm !== 'string' || confirm === '') {
      setInputError(confirmPasswordElement, 'You must confirm your password.');
      ok = false;
    } else if (password !== confirm) {
      setInputError(confirmPasswordElement, 'The passwords do not match.');
      ok = false;
    }

    if (ok === true) {
      setInputError(passwordElement);
      setInputError(confirmPasswordElement);
    }

    return ok;
  }
}

/* DOM Events */
const onSignupFormSubmit = (ev) => {
  ev.preventDefault();

  validatiors.firstName();
  validatiors.lastName();
  validatiors.emailAddress();
  validatiors.password();
};

/* On Window Load */
window.onload = () => {
  signupForm.addEventListener('submit', onSignupFormSubmit);
};
