/*
	Fill grid with cards events
*/
function fillGrid(events) {
  try {
    let eventCardsContainer = document.querySelector(".events-container");
    const eventCardTemplate = document.querySelector("#event-card-template");
    let currentRow;
    for (let idx in events) {
      const event = events[idx];

      // Create row
      if (idx % 4 === 0) {
        currentRow = document.createElement("div");
        currentRow.className = "row";
        eventCardsContainer.append(currentRow);
      }

      // Build template
      let eventCard = eventCardTemplate.content.cloneNode(true);
      currentRow.append(eventCard);
      eventCard = currentRow.lastElementChild;

      // Set event card elements
      const eventPhoto = eventCard.querySelector(".event-photo");
      const eventTitle = eventCard.querySelector(".event-title");
      const eventDescription = eventCard.querySelector(".event-description");
      const eventPrice = eventCard.querySelector(".event-price");
      const eventDetailButton = eventCard.querySelector(".event-detail-button");

      // Set event properties
      eventPhoto.src = event.image;
      eventTitle.innerText = event.name;
      eventDescription.innerText = event.description;
      eventPrice.innerText = `$${event.price}`;
      eventDetailButton.href = `details.html?eventId=${event._id}`;
    }
  } catch (e) {
    console.error(e);
  }
}

fillGrid(data.events);
