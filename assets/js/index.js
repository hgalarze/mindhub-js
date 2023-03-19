let homeEvents = [];

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
  const events = homeEvents.filter(
    (f) =>
      (searchText == "" ||
        f.name?.toLowerCase().indexOf(searchText) > -1 ||
        f.description?.toLowerCase().indexOf(searchText) > -1) &&
      (categories.length == 0 || categories.indexOf(f.category) > -1)
  );

  fillGrid(events);
}

function toggleLoading() {
  const loading = document.querySelector(".loader-anim");
  loading.classList.toggle("d-none");
}

function buildCategoriesFilter() {
  const filterContainer = document.querySelector(".filters");
  const categoriesContainer = filterContainer.querySelector(".categories");
  const categoryCheckboxTemplate = document.querySelector(
    "#category-checkbox-template"
  );
  const categories = Array.from(new Set(homeEvents.map((m) => m.category)));

  for (let categoryIdx in categories) {
    let category = categories[categoryIdx];
    let currentCategory = categoryCheckboxTemplate.content.cloneNode(true);
    currentCategory = categoriesContainer.appendChild(currentCategory);
    currentCategory = categoriesContainer.lastElementChild;
    let categoryItem = currentCategory.querySelector(".category-item");
    let categoryCheck = currentCategory.querySelector(".category-check");
    categoryItem.value = category;
    let id = `category${categoryIdx}`;
    categoryItem.setAttribute("id", id);
    categoryCheck.innerText = category;
    categoryCheck.setAttribute("for", id);
  }
}

function initializeListeners() {
  const searchFilterButton = document.querySelector(".search-filter-button");
  searchFilterButton.addEventListener("click", search);
}

function initializeData() {
  const url = new URL(window.location.href);
  const useApi = url.searchParams.get("useApi");
  const apiUrl =
    !useApi || useApi == "true"
      ? "https://mindhub-xj03.onrender.com/api/amazing"
      : "https://mindhub-xj03.onrender.com/api/wrong-endpoint";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((jsonResponse) => {
      homeEvents = jsonResponse.events;
      buildCategoriesFilter();
      search();
    })
    .catch((error) => {
      homeEvents = backupData.events;
      buildCategoriesFilter();
      search();
    });
}

/*
 * Initialize App
 */
function init() {
  initializeData();
  initializeListeners();
}

/*
 * Entry point
 */
function onloadReady() {
  init();
}
