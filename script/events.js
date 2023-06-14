
fetch('/./json/events.json')
.then(response => response.json())
.then(data => {
  const eventRows = document.getElementById('eventRows');
  
  
  data.events.forEach(event => {
    const row = document.createElement('div');
    row.className = 'row';
    
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    
    const image = document.createElement('img');
    image.src = '/./events/' + event.image;
    image.alt = event.title;
    image.className = 'event-image';
    eventCard.appendChild(image);
    
    const title = document.createElement('h2');
    title.textContent = event.title;
    title.className = 'event-title';
    eventCard.appendChild(title);
    
    const moreInfo = document.createElement('a');
    moreInfo.href = "#"; 
    moreInfo.textContent = 'More Info';
    eventCard.appendChild(moreInfo);
    
    moreInfo.addEventListener('click', () => {
      fetch('/./json/events.json')
        .then(response => response.json())
        .then(data => {
          const eventData = data.events.find(e => e.moreInfo === event.moreInfo);
          if (eventData) {
            const popupWindow = window.open('', '_blank','width=600,height=600');
            popupWindow.document.open();
            popupWindow.document.write(`
              <style>
                body {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                  margin: 0;
                  padding: 10px;
                }
                .popup-content {
                  text-align: center;
                }
                .close-button {
                  position: absolute;
                  bottom: 10px;
                  right: 10px;
                }
              </style>
              <div class="popup-content">
                <h2>${eventData.title}</h2>
                <img src="/./events/${eventData.image}" alt="${eventData.title}" style="height: 300px;">
                
                <p>${eventData.moreInfoDescription}</p>
              </div>
              <button class="close-button" onclick="window.close()">Close</button>
            `);
            popupWindow.document.close();
          }
        })
        .catch(error => console.log(error));
    });
    
    
    
    eventCard.appendChild(document.createElement('br'));
    eventCard.appendChild(document.createElement('br'));
    
    const buyTickets = document.createElement('button');
    buyTickets.textContent = 'Buy Tickets';
    buyTickets.classList.add('book-button');
    buyTickets.addEventListener('click', () => openModal(event));
    eventCard.appendChild(buyTickets);
    
    row.appendChild(eventCard);
    eventRows.appendChild(row);
  });
})
.catch(error => console.log(error));

// Modal 
function openModal(event) {
var modal = document.getElementById("myModal");
var eventTitle = document.getElementById("eventTitle");
var eventDescription = document.getElementById("eventDescription");

eventTitle.textContent = event.title;
eventDescription.textContent = event.description;

modal.style.display = "block";
}

function closeModal() {
var modal = document.getElementById("myModal");
modal.style.display = "none";
}

window.onclick = function(event) {
var modal = document.getElementById("myModal");
if (event.target == modal) {
  modal.style.display = "none";
}
}