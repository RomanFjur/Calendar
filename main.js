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

    if (a >= 10) {
      fullDate = [`${year}`, `${a}`, `01`];
    } else {
      fullDate = [`${year}`, `0${a}`, `01`];
    }

    fullDate = fullDate.join('-');
    console.log(fullDate);

    setFirstDate(fullDate);
    createFirstWeek();
    createFirstMonth();
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

    console.log(newArray);
  }

  createFirstMonth();
});
