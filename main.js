'use strict';

window.addEventListener('DOMContentLoaded', () => {

  let date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth(),
      weekday = date.getDay(),
      day = date.getDate();

  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Откябрь',
    'Ноябрь',
    'Декабрь'
  ];

  const weekdayNames = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресение'
  ];

  let moy = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //month of each year
  let monthCopy = month;

  const element = document.querySelector('.today-month__date');

  function renderMonth(year) {
    element.textContent = `${monthNames[monthCopy]} ${year}`;
  }

  renderMonth(year);

  const prevMonth = document.querySelector('.last-month'),
        nextMonth = document.querySelector('.next-month');

  let monthCount;

  let highYears = [];

  function createThatMonth(a) {
    fullDate = fullDate.split('-');

    if (a >= 10) {
      fullDate = [`${year}`, `${a}`, `01`];
    } else {
      fullDate = [`${year}`, `0${a}`, `01`];
    }

    fullDate = fullDate.join('-');

    setFirstDate(fullDate);
  }

  function generateHighYears(count) {
    let someDate = new Date('1972-01-01'),
        someYear = someDate.getFullYear();

    for (var i = 0; i < count; i++) {
      highYears.push(someYear);
      someYear = highYears[i] + 4;
    }
  }

  generateHighYears(20);

  function renderPreviousMonth() {
    moy[1] = 28;
    if (monthCount === 11) {
      renderMonth(year - 1);
      monthCount--;
      year = year - 1;
    } else {
      monthCopy--;
      renderMonth(year);
    }

    createThatMonth(monthCopy + 1);

    if (element.textContent === `${monthNames[0]} ${year}`) {
      monthCount = 11;
      monthCopy = monthCount;
    }

    highYears.forEach((item, i) => {
      if (year === item) {
        moy[1] = 29;
      }
    });

    createFirstWeek();
    createFirstMonth();
  }

  prevMonth.addEventListener('click', () => {
    renderPreviousMonth();
  });

  function renderNextMonth() {
    moy[1] = 28;

    if (monthCount === 0) {
      renderMonth(year + 1);
      monthCount++;
      year = year + 1;
    } else {
      monthCopy++;
      renderMonth(year);
    }

    createThatMonth(monthCopy + 1);

    if (element.textContent == `${monthNames[11]} ${year}`) {
      monthCount = 0;
      monthCopy = monthCount;
    }

    highYears.forEach((item, i) => {
      if (year === item) {
        moy[1] = 29;
      }
    });

    createFirstWeek();
    createFirstMonth();
  }

  nextMonth.addEventListener('click', () => {
    renderNextMonth();
  });

  let firstWeek = document.querySelector('.first-week'),
      firstWeekDays = firstWeek.querySelectorAll('.description'),
      weekDays = document.querySelectorAll('.description');

  let firstDate,
      firstWeekDay,
      firstDay,
      firstMonth;

  let newArray = [];
  let fullDate = '2020-08-01';

  function setFirstDate(fullDate) {
    return firstDate = new Date(fullDate),
          firstWeekDay = firstDate.getDay(),
          firstDay = firstDate.getDate(),
          firstMonth = firstDate.getMonth();
  }

  setFirstDate(fullDate);

  function createFirstWeek() {
    newArray = [];

    firstWeekDays.forEach((p, i) => {
      p.textContent = `${weekdayNames[i]}`;
      p.classList.remove('first-day');
    });

    for (var i = 0; i < firstWeekDays.length; i++) {
      if (i === firstWeekDay - 1) {

        firstWeekDays[i].textContent = `${weekdayNames[firstWeekDay - 1]}, ${firstDay}`;
        firstWeekDays[i].classList.add('first-day');

      } else if (firstWeekDay === 0) {
        firstWeekDay = 7;

        if (i === firstWeekDay - 1) {
          firstWeekDays[i].textContent = `${weekdayNames[firstWeekDay - 1]}, ${firstDay}`;
          firstWeekDays[i].classList.add('first-day');
        }
      }
    }
  }

  createFirstWeek();

  function createFirstMonth() {
    weekDays.forEach((elem, i) => {
      elem.textContent = ``;
    });

    if (firstWeekDay === 0) {
      firstWeekDay = 7;
      for (var n = 1; n <= moy[monthCopy]; n++) {
        newArray.push(weekDays[(firstWeekDay - 2) + n]);
      }
    } else {
      for (var i = 1; i <= moy[monthCopy]; i++) {
        newArray.push(weekDays[(firstWeekDay - 2) + i]);
      }
    }

    newArray.forEach((elem, i) => {
      if (i === 0) {
        elem.textContent = `${(firstDay)}`;
      } else {
        elem.textContent = `${(firstDay + i)}`;
      }
    });
  }

  createFirstMonth();
});
