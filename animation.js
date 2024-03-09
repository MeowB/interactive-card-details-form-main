
const nameInput = document.querySelector("#name");
const targetName = document.querySelector("#target-name");

const cardNumberInput = document.querySelector("#card-number");
const targetCardNumber = document.querySelector("#target-card-number")

const monthInput = document.querySelector("#expiry-month")
const targetMonth = document.querySelector("#target-month")

const yearInput = document.querySelector("#expiry-year")
const targetYear = document.querySelector("#target-year")

const inputCvc = document.querySelector("#cvc")
const targetCvc = document.querySelector("#target-cvc")

writingInTarget(nameInput, targetName)
writingInTarget(monthInput, targetMonth)
writingInTarget(yearInput, targetYear)
writingInTarget(inputCvc, targetCvc)

cardNumberInput.addEventListener("input", ()=> {
	// Get input value
	let value = event.target.value;

	// Remove non-numeric characters
	value = value.replace(/\D/g, '');

	// Format value as a card number (add space after every four digits)
	value = value.replace(/(\d{4})/g, '$1 ').trim();

	// Update content of target div with formatted value
	targetCardNumber.textContent = value;
})

function writingInTarget(input, target) {
	input.addEventListener("input", () => 
	target.textContent = event.target.value
	)
}