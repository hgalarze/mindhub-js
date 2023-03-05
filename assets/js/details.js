function fillDetails(event) {
  try {
    // Set event card elements
    const eventContainer = document.querySelector(".event-container");
    const eventPhoto = eventContainer.querySelector(".event-photo");
    const eventTitle = eventContainer.querySelector(".event-title");
    const eventDescription = eventContainer.querySelector(".event-description");
    const eventCategory = eventContainer.querySelector(".event-category");
    const eventDate = eventContainer.querySelector(".event-date");
    const eventPlace = eventContainer.querySelector(".event-place");
    const eventCapacity = eventContainer.querySelector(".event-capacity");
    const eventAssistance = eventContainer.querySelector(".event-assistence");
    const eventPrice = eventContainer.querySelector(".event-price");

    // Set event propierties
    eventPhoto.src = event.image;
    eventTitle.innerText = event.name;
    eventDescription.innerText = event.description;
    eventCategory.innerText = event.category;
    eventDate.innerText = `Date: ${event.date}`;
    eventPlace.innerText = `Place: ${event.place}`;
    eventCapacity.innerText = `Capacity: ${event.capacity}`;
    eventAssistance.innerText = `Assistence: ${event.assistance}`;
    eventPrice.innerText = `Price: $${event.price}`;
  } catch (e) {
    console.log(e);
  }
}

function getEventById(id) {
  return data.events.find((f) => f._id == id);
}

const url = new URL(window.location.href);
const eventId = url.searchParams.get("eventId");
const currentEvent = getEventById(eventId);
fillDetails(currentEvent);
