function validateForm(){

    console.log("Validation Product");

    const titleInput = document.getElementById('title');
    const modelInput = document.getElementById('model');
    const typesInput = document.getElementById('type');
    const priceInput = document.getElementById('price');

    const errorTitle = document.getElementById('errorTitle');
    const errorModel = document.getElementById('errorModel');
    const errorTypes = document.getElementById("errorTypes");
    const errorPrice = document.getElementById('errorPrice');
    const errorsSummary = document.getElementById('errorsSummary');
    
    
    resetErrors([titleInput, modelInput, typesInput, priceInput],
         [errorTitle, errorModel, errorTypes, errorPrice], errorsSummary);
    

    let valid = true;

    if(!checkRequired(titleInput.value)){
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(titleInput.value, 2, 60)){
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    } else if(!containsOnlyLetters(titleInput.value)){
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Pole powinno zawierać tylko litery";
    }

    if(!checkRequired(modelInput.value)){
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(modelInput.value, 2, 60)){
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    } else if(!containsOnlyLetters(modelInput.value)){
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole powinno zawierać tylko litery";
    }

    if(!checkRequired(typesInput.value)){
        valid = false;
        typesInput.classList.add("error-input");
        errorTypes.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(typesInput.value, 2, 60)) {
        valid = false;
        typesInput.classList.add("error-input");
        errorTypes.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }else if(!containsOnlyLetters(typesInput.value)){
        valid = false;
        typesInput.classList.add("error-input");
        errorTypes.innerText = "Pole powinno zawierać tylko litery";
    }

    if(!checkRequired(priceInput.value)){
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
    } else if(isNegative(priceInput.value)){
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole nie może zawierać ujemne liczby";
    } else if(isHigher(priceInput.value)){
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Maksymalna liczba wynosi 1000";
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    console.log(valid);
    return valid;
}


