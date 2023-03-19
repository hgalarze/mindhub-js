let pastEvents = [];
let upcomingEvents = [];

function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

/*
	Get past event list given a date
*/
function getPastEventsByDate(date, events) {
  let pastEvents = [];
  for (const event of events) {
    if (event.date < date) {
      pastEvents.push(event);
    }
  }
  return pastEvents;
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

function fillStats() {
  const generalStats = getGeneralStats(pastEvents);
  const pastEventsStatsByCategory = getStastByCategory(pastEvents);
  const upcomingEventsStatsByCategory = getStastByCategory(upcomingEvents);

  /* General Stats */
  let currentStatsTableBody = document.querySelector(
    "#general-stats-table tbody"
  );
  let valCol1 = `${
    generalStats.HighestAttendance.name
  } ${generalStats.HighestAttendance.value.toFixed(2)}%`;
  let valCol2 = `${
    generalStats.LowestAttendance.name
  } ${generalStats.LowestAttendance.value.toFixed(2)}%`;
  let valCol3 = `${generalStats.LargerCapacity.name} ${generalStats.LargerCapacity.value}`;
  addRow(currentStatsTableBody, valCol1, valCol2, valCol3);

  /* Upcoming Stats */
  currentStatsTableBody = document.querySelector(
    "#upcoming-events-stats-table tbody"
  );

  upcomingEventsStatsByCategory.forEach((element) => {
    valCol1 = element.Category;
    valCol2 = element.Revenues;
    valCol3 = `${element.AttendancePercent.toFixed(2)}%`;
    addRow(currentStatsTableBody, valCol1, valCol2, valCol3);
  });

  /* Past Stats */
  currentStatsTableBody = document.querySelector(
    "#past-events-stats-table tbody"
  );

  pastEventsStatsByCategory.forEach((element) => {
    valCol1 = element.Category;
    valCol2 = element.Revenues;
    valCol3 = `${element.AttendancePercent.toFixed(2)}%`;
    addRow(currentStatsTableBody, valCol1, valCol2, valCol3);
  });
}

function addRow(container, valCol1, valCol2, valCol3) {
  const emptyResultElement = container.querySelector(".empty-results");

  if (emptyResultElement) {
    container.removeChild(container.lastElementChild);
  }
  const statsRowTemplate = document.querySelector("#stats-row-template");
  let currentRow = statsRowTemplate.content.cloneNode(true);
  currentRow = container.appendChild(currentRow);
  currentRow = container.lastElementChild;
  let firstCol = currentRow.querySelector(":nth-child(1)");
  let SecondCol = currentRow.querySelector(":nth-child(2)");
  let ThridCol = currentRow.querySelector(":nth-child(3)");

  firstCol.innerText = valCol1;
  SecondCol.innerText = valCol2;
  ThridCol.innerText = valCol3;
}

function getGeneralStats(events) {
  const eventWithHighestAttendance = events.reduce((prev, next) =>
    prev.assistance / prev.capacity > next.assistance / next.capacity
      ? prev
      : next
  );
  const eventWithLowestAttendance = events.reduce((prev, next) =>
    prev.assistance / prev.capacity < next.assistance / next.capacity
      ? prev
      : next
  );
  const eventWithLargerCapacity = events.reduce((prev, next) =>
    prev.capacity > next.capacity ? prev : next
  );

  return {
    HighestAttendance: {
      name: eventWithHighestAttendance.name,
      value:
        ([
          eventWithHighestAttendance.assistance ||
            eventWithHighestAttendance.estimate,
        ] /
          eventWithHighestAttendance.capacity) *
        100,
    },
    LowestAttendance: {
      name: eventWithLowestAttendance.name,
      value:
        ([
          eventWithLowestAttendance.assistance ||
            eventWithLowestAttendance.estimate,
        ] /
          eventWithLowestAttendance.capacity) *
        100,
    },
    LargerCapacity: {
      name: eventWithLargerCapacity.name,
      value: eventWithLargerCapacity.capacity,
    },
  };
}

function getStastByCategory(events) {
  let eventsByCategory = groupBy(events, "category");
  let eventsStatsByCategory = [];
  for (const categoryGroup in eventsByCategory) {
    if (Object.hasOwnProperty.call(eventsByCategory, categoryGroup)) {
      const element = eventsByCategory[categoryGroup];
      let newRow = {
        Category: categoryGroup,
        Revenues: element
          .map((m) => (m.estimate || m.assistance) * m.price)
          .reduce((prev, next) => prev + next),
        AttendancePercent:
          element
            .map((m) => ((m.estimate || m.assistance) / m.capacity) * 100)
            .reduce((prev, next) => prev + next) / element.length,
      };
      eventsStatsByCategory.push(newRow);
    }
  }

  return eventsStatsByCategory;
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
      const data = jsonResponse;
      pastEvents = getPastEventsByDate(data.currentDate, data.events);
      upcomingEvents = getUpcomingEventsByDate(data.currentDate, data.events);
      fillStats();
    })
    .catch((error) => {
      pastEvents = getPastEventsByDate(
        backupData.currentDate,
        backupData.events
      );
      upcomingEvents = getUpcomingEventsByDate(
        backupData.currentDate,
        backupData.events
      );
      fillStats();
    });
}

function init() {
  initializeData();
}

function onloadReady() {
  init();
}
