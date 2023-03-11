/*
 * Remove all child elements from parent
 */
function removeChildNodesFrom(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

/*
 * Fill grid with cards events
 */
function fillGrid(events) {
  try {
    let eventCardsContainer = document.querySelector(".events-container");
    const eventCardTemplate = document.querySelector("#event-card-template");
    const emptyResultTemplate = document.querySelector(
      "#empty-result-template"
    );
    let currentRow;

    removeChildNodesFrom(eventCardsContainer);
    if (events?.length == 0) {
      let emptyResult = emptyResultTemplate.content.cloneNode(true);
      eventCardsContainer.append(emptyResult);
      return;
    }

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

/*
 * Get filetered events and call the funtion to fill the grid
 */
function search() {
  const searchText = document
    .querySelector(".search-text")
    .value?.toLowerCase();
  const selectedCategories = document.querySelectorAll(
    ".category-item:checked"
  );
  const categories = Array.from(selectedCategories, (m) => m.value);
  const events = data.events.filter(
    (f) =>
      (searchText == "" ||
        f.name?.toLowerCase().indexOf(searchText) > -1 ||
        f.description?.toLowerCase().indexOf(searchText) > -1) &&
      (categories.length == 0 || categories.indexOf(f.category) > -1)
  );

  fillGrid(events);
}

/*
 * Initialize App
 */
function init() {
  const searchFilterButton = document.querySelector(".search-filter-button");
  searchFilterButton.addEventListener("click", search);
  search();
}

/*
 * Entry point
 */
function onloadReady() {
  init();
}
