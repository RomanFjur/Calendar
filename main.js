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

  let moy = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let monthCopy = month;

  const element = document.querySelector('.today-month__date');

  function renderMonth() {
    element.textContent = `${monthNames[monthCopy]} ${year}`;
  }

  renderMonth();

  const prevMonth = document.querySelector('.last-month'),
        nextMonth = document.querySelector('.next-month');

  let monthCount;

  function createThatMonth(a) {
    fullDate = fullDate.split('-');

    fullDate = [`${year}`, `${a}`, `01`];

    fullDate = fullDate.join('-');
    console.log(fullDate);
  }

  function renderPreviousMonth() {
    if (monthCount === 11) {
      renderMonth();
      monthCount--;
    } else {
      monthCopy--;
      renderMonth();
    }

    createThatMonth(monthCopy + 1);

    if (element.textContent === `${monthNames[0]} ${year}`) {
      year = year - 1;
      monthCount = 11;
      monthCopy = monthCount;
    }
  }

  prevMonth.addEventListener('click', () => {
    renderPreviousMonth();
  });

  function renderNextMonth() {
    if (monthCount === 0) {
      renderMonth();
      monthCount++;
    } else {
      monthCopy++;
      renderMonth();
    }

    createThatMonth(monthCopy + 1);

    if (element.textContent == `${monthNames[11]} ${year}`) {
      year = year + 1;
      monthCount = 0;
      monthCopy = monthCount;
    }
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
    });

    for (var i = 0; i < firstWeekDays.length; i++) {
      if (i === firstWeekDay - 1) {
        firstWeekDays[i].textContent = `${weekdayNames[firstWeekDay - 1]}, ${firstDay}`;
        firstWeekDays[i].classList.add('first-day');
        for (var j = 0; j < moy[monthCopy]; j++) {
          if ((firstWeekDay - 1) + j < 0) {
            newArray.push(weekDays[(firstWeekDay) + j]);
          } else {
            newArray.push(weekDays[(firstWeekDay - 1) + j]);
          }
        }
      }
    }
    console.log(newArray);
  }

  createFirstWeek();

  function createFirstMonth() {
    for (var i = 0; i < moy[monthCopy]; i++) {
      if (monthCopy === i) {
        for (var j = 0; j < weekDays.length; j++) {
          if (weekDays[j].classList.contains('first-day')) {
            newArray.forEach((arrElem, c) => {
              arrElem.textContent = `${firstDay + c}`;
            });
          }
        }
      }
    }
  }

  //createFirstMonth();
});
