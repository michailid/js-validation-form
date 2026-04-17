const form = document.getElementById("form");
const usernameInput = document.getElementById("username-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const confirmPasswordInput = document.getElementById("confirm-password-input");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkIfEmpty([usernameInput, emailInput, passwordInput, confirmPasswordInput]);
    if (!emailCheck(emailInput.value.trim())) {
        errorMsg(emailInput, "Invalid email");
    } else {
        success(emailInput);
    }
    if (!checkStringLength(usernameInput.value.trim(), 3, 15)) {
        errorMsg(
            usernameInput,
            "Username should be between 3 and 15 characters"
        );
    } else {
        success(usernameInput);
    }
    // checking again if empty, because otherwise the confirm pwd
    // field gets green when pwd and confirm pwd are both empty
    if (confirmPasswordInput.value == "") {
        errorMsg(
            confirmPasswordInput,
            "Confirm password is required"
        );
    } else if (passwordInput.value != confirmPasswordInput.value) {
        errorMsg(
            confirmPasswordInput,
            "Passwords should match"
        );
    } else {
        success(confirmPasswordInput);
    }
});

/**
 * Checks if all the input fields in the given array
 * are empty and displays the respective messages.
 * 
 * @param {*} inputArray 
 */
function checkIfEmpty(inputArray) {
    inputArray.forEach(input => {
        if (input.value.trim() === "") {
            errorMsg(
                input, 
                `${input.parentElement.getElementsByTagName("label")[0].innerText} is required`
            );
        } else {
            success(input);
        }
    });
}

function errorMsg(input, msg) {
    const inputParent = input.parentElement;
    inputParent.className = "input-container error";
    const inputErrLabel = inputParent.getElementsByClassName("error-label")[0]; // we have only one error label
    inputErrLabel.innerText = msg;
    inputErrLabel.style.visibility = "visible";
}

function success(input) {
    const inputParent = input.parentElement;
    inputParent.className = "input-container success";
    const inputErrLabel = inputParent.getElementsByClassName("error-label")[0]; // we have only one error label
    inputErrLabel.style.visibility = "hidden";
}

function emailCheck(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email));
}

/**
 * Checks whether the length of the given string 
 * is between min and max (inclusive).
 * 
 * @param {*} min 
 * @param {*} max 
 */
function checkStringLength(str, min, max) {
    return str.length >= min && str.length <= max;
}