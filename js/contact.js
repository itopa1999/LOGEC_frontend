document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('.addContact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const form = this;

        const formData = new FormData(form);


        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const spinner = document.getElementById('spinner');
        const submitText = document.getElementById('submit-text');

        spinner.classList.remove('d-none');
        submitText.classList.add('d-none');

        
        fetch(`http://127.0.0.1:8000/logec/api/create/question/`, {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData.entries())), // Convert form data to JSON
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            spinner.classList.add('d-none');
            submitText.classList.remove('d-none');
            
            if (response.status===201) {
                return response.json().then(data => {
                    document.querySelector('.addContact-form').reset();
                    alert(data.message)
                });

            } else {
                return response.json().then(data => {
                alert(data.error || 'An error occurred. Please try again later.')
                })
            }
        })
        
    });


})