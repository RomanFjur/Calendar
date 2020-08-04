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
    'Воскресенье'
  ];

  let moy = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //month of each year
  let monthCopy = month;

  const element = document.querySelector('.today-month__date'),
        parents = document.querySelectorAll('.day');

  function renderMonth(year) {
    element.textContent = `${monthNames[monthCopy]} ${year}`;
  }

  renderMonth(year);

  const prevMonth = document.querySelector('.last-month'),
        nextMonth = document.querySelector('.next-month');

  let leftCount,
      rightCount;

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

  //Функция переключения месяца назад

  function renderPreviousMonth() {
    moy[1] = 28;
    if (leftCount === 11) {
      renderMonth(year - 1);
      leftCount--;
      year = year - 1;
    } else {
      monthCopy--;
      renderMonth(year);
    }

    createThatMonth(monthCopy + 1);

    highYears.forEach((item, i) => {
      if (year === item) {
        moy[1] = 29;
      }
    });

    createFirstWeek();
    createMonth();
  }

  prevMonth.addEventListener('click', () => {
    if (element.textContent === `${monthNames[0]} ${year}`) {
      leftCount = 11;
      monthCopy = leftCount;
    }
    renderPreviousMonth();
  });

  //Функция переключения месяца вперед

  function renderNextMonth() {
    moy[1] = 28;

    if (rightCount === 0) {
      renderMonth(year + 1);
      rightCount++;
      year = year + 1;
    } else {
      monthCopy++;
      renderMonth(year);
    }

    createThatMonth(monthCopy + 1);

    highYears.forEach((item, i) => {
      if (year === item) {
        moy[1] = 29;
      }
    });

    createFirstWeek();
    createMonth();
  }

  nextMonth.addEventListener('click', () => {
    if (element.textContent == `${monthNames[11]} ${year}`) {
      rightCount = 0;
      monthCopy = rightCount;
    }
    renderNextMonth();
  });

  //Далее функции создания первой недели в месяце, текущего месяца и последующих месяцев

  let firstWeek = document.querySelector('.first-week'),
      firstWeekDays = firstWeek.querySelectorAll('.description'),
      weekDays = document.querySelectorAll('.description');

  let firstDate,
      firstYear,
      firstWeekDay,
      firstDay,
      firstMonth;

  let newArray = [];
  let parentsArray = [];
  let fullDate = '2020-08-01';

  function setFirstDate(fullDate) {
    return firstDate = new Date(fullDate),
          firstYear = firstDate.getFullYear(),
          firstWeekDay = firstDate.getDay(),
          firstDay = firstDate.getDate(),
          firstMonth = firstDate.getMonth();
  }

  setFirstDate(fullDate);

  function createFirstWeek() {
    newArray = [];
    parentsArray = [];

    weekDays.forEach((elem, i) => {
      elem.textContent = ``;
    });

    firstWeekDays.forEach((p, i) => {
      p.textContent = `${weekdayNames[i]}`;
      p.classList.remove('first-day');
    });
  }

  createFirstWeek();

  function createMonth() {
    if (firstWeekDay === 0) {
      firstWeekDay = 7;
      for (var n = 1; n <= moy[monthCopy]; n++) {
        newArray.push(weekDays[(firstWeekDay - 2) + n]);
        parentsArray.push(parents[(firstWeekDay - 2) + n]);
      }
    } else {
      for (var i = 1; i <= moy[monthCopy]; i++) {
        newArray.push(weekDays[(firstWeekDay - 2) + i]);
        parentsArray.push(parents[(firstWeekDay - 2) + i]);
      }
    }

    newArray.forEach((elem, i) => {
      if (i === 0) {
        elem.textContent = `${(firstDay)}`;
      } else {
        elem.textContent = `${(firstDay + i)}`;
      }
    });

    for (var v = 0; v < firstWeekDays.length; v++) {
      if (v === firstWeekDay - 1) {

        firstWeekDays[v].textContent = `${weekdayNames[firstWeekDay - 1]}, ${firstDay}`;

        for (var x = 1; x < (7 - v); x++) {
          firstWeekDays[v + x].textContent = `${weekdayNames[firstWeekDay + x - 1]}, ${firstDay + x}`;
        }

        for (var y = 1; y <= (7 - (7 - v)); y++) {
          firstWeekDays[v - y].textContent = `${weekdayNames[firstWeekDay - y - 1]}, ${moy[monthCopy - 1] - (y - 1)}`;
        }

        firstWeekDays[v].classList.add('first-day');

      } else if (firstWeekDay === 0) {

        firstWeekDay = 7;

        if (v === firstWeekDay - 1) {
          firstWeekDays[v].textContent = `${weekdayNames[firstWeekDay - 1]}, ${firstDay}`;
          firstWeekDays[v].classList.add('first-day');
        }
      }
    }

    if (month != monthCopy) {
      resetThatDay();
    } else {
      showThatDay();
    }
  }

  function resetThatDay(){
    parentsArray.forEach((elem, i) => {
      elem.classList.remove('that-day');
    });
  }

  function showThatDay() {
    parentsArray.forEach((elem, i) => {
      if (i === day - 1) {
        elem.classList.add('that-day');
      }
    });
  }

  createMonth();

  showThatDay();
});
