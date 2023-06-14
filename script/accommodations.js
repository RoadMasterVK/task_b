// Fetch and display accommodations
fetch("/./json/accommodations.json")
  .then((response) => response.json())
  .then((data) => {
    const accommodations = data.accommodations;
    const accommodationList = document.querySelector(".accommodation-list");

    accommodations.forEach((accommodation) => {
      const {
        image,
        roomPreviews,
        name,
        location,
        price,
        description,
        phoneNumber,
        url,
        
      } = accommodation;

      const accommodationElement = document.createElement("div");
      accommodationElement.classList.add("accommodation");

      const imageElement = document.createElement("img");
      imageElement.classList.add("room-img");
      imageElement.src = image;
      imageElement.alt = "Accommodation Image";
      imageElement.width = "400";
      accommodationElement.appendChild(imageElement);

      const roomPreviewElement = document.createElement("div");
      roomPreviewElement.classList.add("room-preview");
      roomPreviews.forEach((roomPreview) => {
        const roomPreviewImage = document.createElement("img");
        roomPreviewImage.src = roomPreview;
        roomPreviewImage.alt = "Room Preview";
        roomPreviewImage.width = "100";
        roomPreviewImage.onclick = () => openModal(roomPreview);
        roomPreviewElement.appendChild(roomPreviewImage);
      });
      accommodationElement.appendChild(roomPreviewElement);

      const nameElement = document.createElement("h2");
      nameElement.classList.add("name");
      nameElement.textContent = name;
      accommodationElement.appendChild(nameElement);

      const locationElement = document.createElement("p");
      locationElement.classList.add("location");
      locationElement.textContent = location;
      accommodationElement.appendChild(locationElement);

      const priceElement = document.createElement("p");
      priceElement.classList.add("price");
      priceElement.textContent = `Price per Night: $${price}`;
      accommodationElement.appendChild(priceElement);

      const bookButton = document.createElement("button");
      bookButton.classList.add("book-button");
      bookButton.textContent = "Book Now";
      bookButton.onclick = () =>
        openBookingModal(
          name,
          description,
          location,
          price,
          image,
          phoneNumber,
          url,
          
        );
      accommodationElement.appendChild(bookButton);

      accommodationList.appendChild(accommodationElement);
    });
  });

function openModal(imageUrl) {
  const roomModal = document.getElementById("roomModal");
  const roomModalImage = document.getElementById("roomModalImage");
  roomModalImage.src = imageUrl;
  roomModal.style.display = "block";
}

function closeModal() {
  const roomModal = document.getElementById("roomModal");
  roomModal.style.display = "none";
}

function openBookingModal(
  name,
  description,
  location,
  price,
  image,
  phoneNumber,
  url,
 
) {
  const bookingModal = document.getElementById("bookingModal");
  const bookingAccommodationName = document.getElementById(
    "bookingAccommodationName"
  );
  const bookingAccommodationDescription = document.getElementById(
    "bookingAccommodationDescription"
  );
  const bookingAccommodationLocation = document.getElementById(
    "bookingAccommodationLocation"
  );
  const bookingAccommodationPhoneNumber = document.getElementById(
    "bookingAccommodationPhoneNumber"
  );
  const bookingAccommodationUrl = document.getElementById(
    "bookingAccommodationUrl"
  );
  const bookingAccommodationPrice = document.getElementById(
    "bookingAccommodationPrice"
  );
  const bookingAccommodationImage = document.getElementById(
    "bookingAccommodationImage"
  );
  const bookingNightQuantity = document.getElementById("bookingNightQuantity");
  const bookingGuestQuantity = document.getElementById("bookingGuestQuantity");
  

  bookingAccommodationName.textContent = name;
  bookingAccommodationDescription.textContent = description;
  bookingAccommodationLocation.textContent = location;
  bookingAccommodationPhoneNumber.textContent = phoneNumber;
  bookingAccommodationUrl.href = url;
  bookingAccommodationPrice.textContent = `Price per Night: $${price}`;
  bookingAccommodationImage.src = image;

  bookingNightQuantity.value = "1";
  bookingGuestQuantity.value = "0";
  
  bookingModal.style.display = "block";
}

function closeBookingModal() {
  const bookingModal = document.getElementById("bookingModal");
  bookingModal.style.display = "none";
}

function calculateTotalPrice(price, nightQuantity, guestQuantity) {
  return price * nightQuantity;
}

function updateTotalPrice() {
  const nightQuantityInput = document.getElementById("bookingNightQuantity");
  const guestQuantityInput = document.getElementById("bookingGuestQuantity");
  const totalPriceElement = document.getElementById("bookingTotal");
  const accommodationPriceElement = document.getElementById(
    "bookingAccommodationPrice"
  );

  const nightQuantity = parseInt(nightQuantityInput.value) || 0;
  const guestQuantity = parseInt(guestQuantityInput.value) || 0;
  const accommodationPrice = parseFloat(
    accommodationPriceElement.textContent.replace("Price per Night: $", "")
  );

  if (isNaN(accommodationPrice)) {
    console.log("Accommodation price is invalid.");
    return;
  }

  

  const totalPrice = calculateTotalPrice(
    accommodationPrice,
    nightQuantity,
    guestQuantity
  );

  totalPriceElement.textContent = "Total Price: $" + totalPrice.toFixed(2);
}



function printBooking() {
  const bookingAccommodationName = document.getElementById(
    "bookingAccommodationName"
  ).textContent;
  const bookingAccommodationDescription = document.getElementById(
    "bookingAccommodationDescription"
  ).textContent;
  const bookingAccommodationLocation = document.getElementById(
    "bookingAccommodationLocation"
  ).textContent;
  const bookingAccommodationPhoneNumber = document.getElementById(
    "bookingAccommodationPhoneNumber"
  ).textContent;
  const bookingAccommodationUrl = document.getElementById(
    "bookingAccommodationUrl"
  ).href;
  const bookingAccommodationPrice = document.getElementById(
    "bookingAccommodationPrice"
  ).textContent;
  const bookingNightQuantity = document.getElementById(
    "bookingNightQuantity"
  ).value;
  const bookingGuestQuantity = document.getElementById(
    "bookingGuestQuantity"
  ).value;
  const bookingRoomQuantity = document.getElementById(
    "bookingRoomQuantity"
  ).value;
  const bookingTotalPrice = document.getElementById("bookingTotal").textContent;
  

  const bookingInfo = `
      Accommodation: ${bookingAccommodationName}
      Description: ${bookingAccommodationDescription}
      Location: ${bookingAccommodationLocation}
      Phone Number: ${bookingAccommodationPhoneNumber}
      Website: ${bookingAccommodationUrl}
      Price: ${bookingAccommodationPrice}
      Nights: ${bookingNightQuantity}
      Guests: ${bookingGuestQuantity}
      Rooms: ${bookingRoomQuantity}
      Total Price: ${bookingTotalPrice}
     
    `;

  console.log(bookingInfo);
  window.print();
}
function confirmBooking() {
  

  const totalPriceElement = document.getElementById("bookingTotal");
  const totalPrice = parseFloat(
    totalPriceElement.textContent.replace("Total Price: $", "")
  );

  if (isNaN(totalPrice)) {
    console.log("Total price is invalid.");
    return;
  }

  alert("Booking confirmed! Total Price: $" + totalPrice.toFixed(2));
 // printBooking(); 
 closeBookingModal();
}
const bookingNightQuantity = document.getElementById("bookingNightQuantity");
const bookingGuestQuantity = document.getElementById("bookingGuestQuantity");
const bookingRoomQuantity = document.getElementById("bookingRoomQuantity");

bookingNightQuantity.addEventListener("change", updateTotalPrice);
bookingGuestQuantity.addEventListener("change", updateTotalPrice);

