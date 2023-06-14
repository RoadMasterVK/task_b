fetch("json/food.json")
  .then((response) => response.json())
  .then((data) => {
    const rowsContainer = document.getElementById("rows");
    const restaurants = data.restaurants;

    const column1Data = restaurants.slice(0, Math.ceil(restaurants.length / 3));
    const column2Data = restaurants.slice(
      Math.ceil(restaurants.length / 3),
      Math.ceil(restaurants.length / 3) * 2
    );
    const column3Data = restaurants.slice(
      Math.ceil(restaurants.length / 3) * 2
    );

    row(column1Data, rowsContainer);
    row(column2Data, rowsContainer);
    row(column3Data, rowsContainer);
  });

function row(restaurants, rowsContainer) {
  const rowContainer = document.createElement("div");
  rowContainer.classList.add("row");

  restaurants.forEach((restaurant) =>
    createRestaurantElement(restaurant, rowContainer)
  );

  rowsContainer.appendChild(rowContainer);
}

function createRestaurantElement(restaurant, rowContainer) {
  const restaurantContainer = document.createElement("div");
  restaurantContainer.classList.add("restaurant");

  const ratingStars = getRatingStars(restaurant.rating);

  restaurantContainer.innerHTML = `
    <img src="${restaurant.photo}" alt="Photo" tabindex="0">
    <h2><a href="${restaurant.website}" target="_blank">${restaurant.name}</a></h2>
    <p>${restaurant.description}</p>
    <p>${restaurant.address}</p>
    <p><a href="tel:${restaurant.phone}">${restaurant.phone}</a></p>
    <div class="rating">${ratingStars}</div>
    <button onclick="openBookingModal('${restaurant.name}', '${restaurant.photo}', '${restaurant.address}', '${restaurant.description}', '${restaurant.phone}', '${restaurant.website}')">Book a table</button>
  `;

  rowContainer.appendChild(restaurantContainer);
}

function getRatingStars(rating) {
  const filledStar = "★";
  const emptyStar = "☆";

  const filledStarsCount = Math.floor(rating);
  const emptyStarsCount = 5 - filledStarsCount;

  const ratingStars = filledStar.repeat(filledStarsCount) + emptyStar.repeat(emptyStarsCount);

  return ratingStars;
}

function openBookingModal(
  restaurantName,
  restaurantPhoto,
  restaurantAddress,
  restaurantDescription,
  restaurantPhone,
  restaurantWebsite
) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  const currentDate = new Date();
  const minDate = currentDate.toISOString().split("T")[0]; // Current Date "YYYY-MM-DD"

  modal.innerHTML = `
    <button onclick="closeModal()" class="close">Close</button>
    <h3>${restaurantName}</h3>
    <p>${restaurantDescription}</p>
    <p>${restaurantAddress}</p>
    <p>${restaurantPhone}</p>
    <img src="${restaurantPhoto}" alt="Restaurant photo">
    <form>
      <input type="text" id="name" required placeholder="Name Guest:">
     
      <input type="tel" id="phone" required placeholder="Phone:">  
     
      <input type="number" id="guests" min="1" required placeholder="Number of Guests:">
      <br>
      <br>
      <input type="date" id="date" required min="${minDate}" placeholder="Date:">
      
      <input type="time" id="time" required > 
      <br>
      <button type="submit" class="submit">Submit</button>
    </form>
  `;

  modal.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const guests = document.getElementById("guests").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    printConfirmation(
      restaurantName,
      restaurantAddress,
      restaurantPhone,
      restaurantPhoto,
      name,
      phone,
      guests,
      date,
      time
    );
  });

  document.body.appendChild(modal);
}

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.remove();
}

function printConfirmation(
  restaurantName,
  restaurantAddress,
  restaurantPhone,
  restaurantPhoto,
  name,
  phone,
  guests,
  date,
  time
) {
  const confirmation = `
    <h3>Booking Confirmation</h3>
    <p>Restaurant: ${restaurantName}</p>
    <p>Address: ${restaurantAddress}</p>
    <p>Phone: ${restaurantPhone}</p>
    <img src="${restaurantPhoto}" alt="Restaurant photo">
    <p>Name: ${name}</p>
    <p>Phone: ${phone}</p>
    <p>Guests: ${guests}</p>
    <p>Date: ${date}</p>
    <p>Time: ${time}</p>
  `;

  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <button onclick="closeModal()" class="close">Close</button>
    ${confirmation}
    <button onclick="printConfirmationPage()" class="print">Print</button>
  `;

  document.body.appendChild(modal);
}

function printConfirmationPage() {
  const modalContent = document.querySelector(".modal").innerHTML;
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Booking Confirmation</title>
      </head>
      <body>
        ${modalContent}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.remove();
}
