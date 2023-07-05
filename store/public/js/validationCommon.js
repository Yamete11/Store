function resetErrors(inputs, errorTexts, errorInfo){
    for(let i = 0; i < inputs.length; i++){
        inputs[i].classList.remove("error-input")
    }

    for(let i = 0; i < errorTexts.length; i++){
        errorTexts[i].innerText = "";
    }

    errorInfo.innerText = "";
}

function checkRequired(value){
    if(!value){
        return false;
    }

    value = value.toString().trim();

    if(value === ""){
        return false;
    }

    return true;
}

function checkTextLengthRange(value, min, max){
    if(!value){
        return false;
    }

    value = value.toString().trim();

    const length = value.length;
    if(max && length > max){
        return false;
    }
    if(min && length < min){
        return false;
    }
    return true;
}

function checkNumber(value){
    if(!value){
        return false;
    }
    if(isNaN(value)){
        return false;
    }

    return true;
}

function checkNumberRange(value, min, max){
    if(!value){
        return false;
    }
    if(isNaN(value)){
        return false;
    }

    value = parseFloat(value);
    if(value < min){
        return false;
    }
    if(value > max){
        return false;
    }

    return true;
}

function containsDigits(str) {
    return /\d/.test(str);
}

function isEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

function containsTelNumber(str) {
    return /^\d{9}$/.test(str);
}

function containsOnlyLetters(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function isNegative(num) {
    return num < 0 ? true : false;
}

function isHigher(num){
    return num > 1000 ? true : false;
}


