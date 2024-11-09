document.addEventListener('DOMContentLoaded', function() {

    fetch('http://127.0.0.1:8000/logec/api/get/index/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.error("Failed to retrieve data", response.status);
        }
    }).then(data => {
        const sermons = data.sermons;
        const sermonContainer = document.getElementById('sermon-container');
        sermonContainer.innerHTML = '';
        if (sermons.length === 0) {
            const noSermonsMessage = document.createElement('p');
            noSermonsMessage.classList.add('text-center');
            noSermonsMessage.textContent = 'No sermons available at the moment. Please check back later.';
            sermonContainer.appendChild(noSermonsMessage);
        } else {
            sermons.forEach(sermon => {
                const rowHtml = `
                <div class="col-md-4 text-center">
                    <div class="sermon-entry">
                        <div class="sermon" style="background-image: url(images/sermon-2.jpg);"></div>
                        <h3><b>${sermon.title}</b></h3>
                        <span>Pastor ${sermon.preacher}</span> <br>
                        <a href="sermon-details.html?id=${sermon.id}" style="margin-top:50px;">Read More <i class="icon-arrow-right3"></i></a>
                    </div>
                    
                </div>
                
                `;
                sermonContainer.innerHTML += rowHtml;
            });
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });


})