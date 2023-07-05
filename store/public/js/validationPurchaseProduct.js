function validateForm(){

    const titleInput = document.getElementById('title');
    const nameInput = document.getElementById('name');
    const quantityInput = document.getElementById('quantity');
    const descriptionInput = document.getElementById('description');

    const errorTitle = document.getElementById('errorTitle');
    const errorName = document.getElementById('errorName');
    const errorQuantity = document.getElementById("errorQuantity");
    const errorDescription = document.getElementById('errorDescription');
    const errorsSummary = document.getElementById('errorsSummary');


    resetErrors([titleInput, nameInput, quantityInput, descriptionInput],
         [errorTitle, errorName, errorQuantity, errorDescription], errorsSummary);
    

    let valid = true;

    if(checkRequired(titleInput.value == "default")){
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Pole jest wymagane";
    } 

    if(checkRequired(nameInput.value == "default")){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } 

    if(!checkRequired(quantityInput.value)){
        valid = false;
        quantityInput.classList.add("error-input");
        errorQuantity.innerText = "Pole jest wymagane";
    } else if(isHigher(quantityInput.value)){
        valid = false;
        quantityInput.classList.add("error-input");
        errorQuantity.innerText = "Maksymalna liczba wynosi 1000";
    } else if(isNegative(quantityInput.value)){
        valid = false;
        quantityInput.classList.add("error-input");
        errorQuantity.innerText = "Pole nie może zawierać ujemne liczby";
    }

    if(!checkRequired(descriptionInput.value)){
        valid = false;
        descriptionInput.classList.add("error-input");
        errorDescription.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(descriptionInput.value, 1, 60)) {
        valid = false;
        descriptionInput.classList.add("error-input");
        errorDescription.innerText = "Pole powinno zawierać od 1 do 60 znaków";
    }
    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    console.log(valid);
    return valid;
}


