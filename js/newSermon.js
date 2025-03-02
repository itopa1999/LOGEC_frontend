document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('.addSermon-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const form = this;

        const formData = new FormData(form);


        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }


        
        fetch(`https://lucky1999.pythonanywhere.com/logec/api/create/sermon/`, {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData.entries())), // Convert form data to JSON
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {            
            if (response.status===201) {
                return response.json().then(data => {
                    document.querySelector('.addSermon-form').reset();
                    alert(data.message)
                });

            } else {
                return response.json().then(data => {
                alert(data.error || 'An error occurred. Please try again later.')
                })
            }
        })
        .catch(
            alert('server is not available, please try again later.')
        )
        
    });


})