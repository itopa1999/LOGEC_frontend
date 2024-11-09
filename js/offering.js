document.addEventListener('DOMContentLoaded', function() {

    amountInput = document.getElementById("amount-input")
    amountInput.addEventListener('input', function() {
        let amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        const percentage = 1.5 / 100;
        const additionalAmount = 100;
        const modifiedAmount = (amount * percentage) + amount + additionalAmount;
        document.getElementById("total_price").innerHTML = modifiedAmount
    });



    document.querySelector('.addOffering-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const form = this;

        // Create FormData object to send to the backend
        const formData = new FormData(form);

        // Validate the form before submission
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Show loading spinner and hide submit text
        const spinner = document.getElementById('spinner');
        const submitText = document.getElementById('submit-text');
        spinner.classList.remove('d-none');
        submitText.classList.add('d-none');

        // Submit the form data to the backend
        fetch(`http://127.0.0.1:8000/logec/api/paystack/deposit/`, {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData.entries())), // Convert form data to JSON
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            spinner.classList.add('d-none');
            submitText.classList.remove('d-none');
            console.log(response);
            if (response.status === 200) {
                return response.json().then(data => {
                    document.querySelector('.addOffering-form').reset();
                    document.getElementById("total_price").innerHTML = '';
                    const link = data.link;
                    window.open(link, '_blank');
                });
            } else {
                return response.json().then(data => {
                    alert(data.error || 'An error occurred. Please try again later.');
                });
            }
        })
        .catch(error => {
            spinner.classList.add('d-none');
            submitText.classList.remove('d-none');
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    });
});
