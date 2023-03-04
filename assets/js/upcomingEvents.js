/*
	Fill grid with cards events
*/
function fillGrid(events) {
  try {
    let eventCardsContainer = document.querySelector(".events-container");
    const eventCardTemplate = document.querySelector("#event-card-template");
    for (const event of events) {
      // Build template
      let eventCard = eventCardTemplate.content.cloneNode(true);
      eventCardsContainer.append(eventCard);
      eventCard = eventCardsContainer.lastElementChild;

      // Set event card elements
      const eventPhoto = eventCard.querySelector(".event-photo");
      const eventTitle = eventCard.querySelector(".event-title");
      const eventDescription = eventCard.querySelector(".event-description");
      const eventPrice = eventCard.querySelector(".event-price");

      // Set event properties
      eventCard.dataset.id = event.id;
      eventPhoto.src = event.image;
      eventTitle.innerText = event.name;
      eventDescription.innerText = event.description;
      eventPrice.innerText = `$${event.price}`;
    }
  } catch (e) {
    console.error(e);
  }
}

/*
	Get upcoming event list given a date
*/
function getUpcomingEventsByDate(date, events) {
  let upcomingEvents = [];
  for (const event of events) {
    if (event.date > date) {
      upcomingEvents.push(event);
    }
  }
  return upcomingEvents;
}

const upcomingEvents = getUpcomingEventsByDate(data.currentDate, data.events);
fillGrid(upcomingEvents);
