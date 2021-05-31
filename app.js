/* Define UI Variables */
// Loan Form Section
const loanForm = document.querySelector('#loan-form');
const loanAmount = document.querySelector('#amount');
const interset = document.querySelector('#interest');
const yearsToRepay = document.querySelector('#years');
// Results Section
const loader = document.querySelector('#loading');
const results = document.querySelector('#results');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');

loanForm.addEventListener('submit', calculateResults);
loanForm.addEventListener('click', removeErrorMessages);


function calculateResults(e) {
    e.preventDefault();
    const principal = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(interset.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearsToRepay.value) * 12;

    // Calculate Monthly Payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x - 1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        if(!loanForm.querySelector('.error')) {
            createErrorMessage(loanForm, "Check the entered numbers");
        }
    }
}

function createErrorMessage(element, message) {
    const errorElTemplate = `<div class="error alert alert-danger" role="alert">${message}</div>`;
    element.insertAdjacentHTML('afterbegin', errorElTemplate);
}

function removeErrorMessages(e) {
    if(e.target.getAttribute('type') === 'number') {
        const errorMessages = document.querySelectorAll('.error');
    
        errorMessages.forEach(function(errorMessage) {
            errorMessage.remove();
        })
    }
}