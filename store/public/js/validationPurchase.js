function validateForm(){

    console.log("Validation Product");

    const nameInput = document.getElementById('firstName');
    const surnameInput = document.getElementById('secondName');
    const emailInput = document.getElementById('email');
    const telNumberInput = document.getElementById('telNumber');
    const passwordInput = document.getElementById('password');


    const errorName = document.getElementById('errorName');
    const errorSurname = document.getElementById('errorSurname');
    const errorEmail = document.getElementById("errorEmail");
    const errorTelNumber = document.getElementById('errorTelNumber');
    const errorPassword = document.getElementById('errorPassword');

    const errorsSummary = document.getElementById('errorsSummary');


    resetErrors([nameInput, surnameInput, emailInput, telNumberInput, passwordInput],
         [errorName, errorSurname, errorEmail, errorTelNumber, errorPassword], errorsSummary);
    

    let valid = true;

    if(!checkRequired(nameInput.value)){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(nameInput.value, 2, 60)){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }  else if(!containsOnlyLetters(nameInput.value)){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać tylko litery";
    }

    if(!checkRequired(surnameInput.value)){
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(surnameInput.value, 2, 60)){
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }  else if(!containsOnlyLetters(surnameInput.value)){
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "Pole powinno zawierać tylko litery";
    }

    if(!checkRequired(emailInput.value)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if(!isEmail(emailInput.value)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierac prawidłowy adres email";
    } else if(!checkTextLengthRange(emailInput.value, 2, 60)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if(!checkRequired(telNumberInput.value)){
        valid = false;
        telNumberInput.classList.add("error-input");
        errorTelNumber.innerText = "Pole jest wymagane";
    } else if(!containsDigits(telNumberInput.value)){
        valid = false;
        telNumberInput.classList.add("error-input");
        errorTelNumber.innerText = "Pole powinno zawierać tylko cyfry";
    }else if(!containsTelNumber(telNumberInput.value)){
        valid = false;
        telNumberInput.classList.add("error-input");
        errorTelNumber.innerText = "Pole powinno zawierać 9 cyfr";
    }

    if(!checkRequired(passwordInput.value)){
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(passwordInput.value, 2, 10)){
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = "Pole powinno zawierać od 2 do 10 znaków";
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    console.log(valid);
    return valid;
}


