const submitButton = document.querySelector("input[type=submit]")
const continueButton = document.querySelector("button");



continueButton.addEventListener("click", toggleCompleteState);


submitButton.addEventListener("click", () => {
	const myForm = new FormData(document.querySelector("form"))
	event.preventDefault()
	const name = myForm.get("name")
	const cardNumber = myForm.get("card-number");
	const month = myForm.get("expiry-month");
	const year = myForm.get("expiry-year");
	const cvc = myForm.get("cvc");
	const errors = Array.from(document.querySelectorAll(".error"))

	errors.forEach((element) => {
		const fields = document.querySelectorAll("input")

		fields.forEach((field) => {
			field.style.border = "1px solid hsl(279, 6%, 55%)"
		})
		element.remove()
	})

	
	if (name === '') {
		const error = document.createElement("div");
		error.className = "error"
		error.innerHTML = "can't be empty"
		error.style.color = "red"
		nameInput.insertAdjacentElement("afterend", error)
		nameInput.style.border = "solid 1px red"
	}

	if (cardNumber === '') {
		const error = document.createElement("div");
		error.className = "error"
		error.innerHTML = "can't be empty"
		error.style.color = "red"
		cardNumberInput.insertAdjacentElement("afterend", error)
		cardNumberInput.style.border = "solid 1px red"
	} else if (!isValidCardNumber(cardNumber)) {
		const error = document.createElement("div");
		error.className = "error"
		error.innerHTML = "invalid card number"
		error.style.color = "red"
		cardNumberInput.insertAdjacentElement("afterend", error)
		cardNumberInput.style.border = "solid 1px red"
	}

	if (month === '' || year === '') {
		const error = document.createElement("div");
		error.className = "error"
		error.innerHTML = "can't be empty"
		error.style.color = "red"
		yearInput.insertAdjacentElement("afterend", error)
		yearInput.style.border = "solid 1px red"
		monthInput.style.border = "solid 1px red"

	} else if (!isValidDate(month, year)) {
		const errorDate = document.createElement("div");
		errorDate.className = "error"
		errorDate.innerHTML = "invalid date"
		error.style.color = "red"
		yearInput.insertAdjacentElement("afterend", errorDate)
		yearInput.style.border = "solid 1px red"
		monthInput.style.border = "solid 1px red"
	}
	
	if (cvc === '') {
		const error = document.createElement("div");
		error.className = "error"
		error.innerHTML = "can't be empty"
		error.style.color = "red"
		inputCvc.insertAdjacentElement("afterend", error)
		inputCvc.style.border = "solid 1px red"

	} else if (!isValidCvc(cvc)) {
		const errorcvc = document.createElement("div");
		errorcvc.className = "error"
		errorcvc.innerHTML = "invalid cvc"
		error.style.color = "red"
		inputCvc.insertAdjacentElement("afterend", errorcvc)
		inputCvc.style.border = "solid 1px red"
	}

	if (isValidCardNumber(cardNumber) 
		&& isValidDate(month, year)
		&& isValidCvc(cvc)) {
		
		toggleCompleteState()
	}


})

function isValidCardNumber(cardNumber) {
    // Remove spaces and non-numeric characters
    cardNumber = cardNumber.replace(/\s/g, '').replace(/\D/g, '');

    // Check if the card number contains only digits
    if (!/^\d+$/.test(cardNumber)) {
        return false;
		
    }

    // Check the length of the card number based on the card type
    let cardType = getCardType(cardNumber);
    let expectedLengths = {
        "Visa": [13, 16],
        "MasterCard": [16],
        "American Express": [15]
        // Add more card types and their lengths as needed
    };

    if (!expectedLengths[cardType]) {
        return false; // Unknown card type
    }

    if (!expectedLengths[cardType].includes(cardNumber.length)) {
        return false; // Invalid length for the card type
    }

    // Apply the Luhn algorithm
    let digits = cardNumber.split('').map(Number);
    digits.reverse();

    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        let digit = digits[i];
        if (i % 2 !== 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }

    // The card number is valid if the sum is a multiple of 10
    return sum % 10 === 0;
}

function getCardType(cardNumber) {
    // Determine the card type based on the card number's prefix
    if (/^4/.test(cardNumber)) {
        return "Visa";
    } else if (/^5[1-5]/.test(cardNumber)) {
        return "MasterCard";
    } else if (/^3[47]/.test(cardNumber)) {
        return "American Express";
    }
    // Add more card type detection patterns as needed
    return "Unknown";
}

function isValidDate(month, year) {
	if (!Number(month) || !Number(year)) {
		return false
	}
	const todayDate = new Date()
	if (year < 1 || year > todayDate.getFullYear()) {
		return false;
	}
	if (month < 1 || month > 12) {
		return false;
	}
	if(year == todayDate.getFullYear() && month > todayDate.getMonth() + 1){
		return false;
	}

	return true
}

function isValidCvc(cvc) {
    // Remove non-numeric characters
    cvc = cvc.replace(/\D/g, '');

    // Check if the CVC contains only digits and has a length of 3
    return /^\d{3}$/.test(cvc);
}

function toggleCompleteState() {
	const completeDiv = document.querySelector(".complete-state")
	const formDiv = document.querySelector("form")
	
	console.log(completeDiv.style.display)

	if (completeDiv.style.display === "none" || completeDiv.style.display === "") {
		completeDiv.style.display = "flex"
		formDiv.style.display = "none"
	} else {
		completeDiv.style.display = "none"
		formDiv.style.display = "inline"
	}
}