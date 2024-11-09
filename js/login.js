document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const form = this;

        // Check form validity using browser's built-in validation
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated'); // This will show the validation messages
            return;
        }
        
        const formData = new FormData(form);
        const spinner = document.getElementById('spinner');
        const loginText = document.getElementById('submit-text');

        spinner.classList.remove('d-none');
        loginText.classList.add('d-none');

        // Send the login request
        fetch('https://lucky1999.pythonanywhere.com/admins/api/login/', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData.entries())), // Convert form data to JSON
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            spinner.classList.add('d-none');
            loginText.classList.remove('d-none');
            
            if (response.status===200) {
                return response.json().then(data => {
                    
                    alert("login successful")
                    localStorage.setItem('logec_token', data.access);
                    window.location.href = 'index.html';
                });
            } else if (response.status === 400) {
                return response.json().then(data => {
                    alert(data.detail || 'Invalid credentials.');
                });
            } else {
                // Handle other error statuses
                alert('An error occurred. Please try again later.');
            }
        }).catch(error => {
                spinner.classList.add('d-none');
                loginText.classList.remove('d-none');
                console.error('Server is not responding. Please try again later.');
        });
        
    });

    

});
