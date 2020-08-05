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

  let moy = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //month of year
  
  let monthCopy = month,
      yearCopy = year;

  const element = document.querySelector('.today-month__date'),
        parents = document.querySelectorAll('.day');

  function renderMonth(year) {
    element.textContent = `${monthNames[monthCopy]} ${year}`;
  }

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

    for (let i = 0; i < count; i++) {
      highYears.push(someYear);
      someYear = highYears[i] + 4;
    }
  }

  //Функция переключения месяца назад

  function renderPreviousMonth() {
    moy[1] = 28;
    if (leftCount === 11) {
      renderMonth(yearCopy - 1);
      leftCount--;
      yearCopy = yearCopy - 1;
    } else {
      monthCopy--;
      renderMonth(yearCopy);
    }

    createThatMonth(monthCopy + 1);

    highYears.forEach((item, i) => {
      if (yearCopy === item) {
        moy[1] = 29;
      }
    });

    createFirstWeek();
    createMonth();
  }

  prevMonth.addEventListener('click', () => {
    if (element.textContent === `${monthNames[0]} ${yearCopy}`) {
      leftCount = 11;
      monthCopy = leftCount;
    }
    renderPreviousMonth();
  });

  //Функция переключения месяца вперед

  function renderNextMonth() {
    moy[1] = 28;

    if (rightCount === 0) {
      renderMonth(yearCopy + 1);
      rightCount++;
      yearCopy = yearCopy + 1;
    } else {
      monthCopy++;
      renderMonth(yearCopy);
    }

    createThatMonth(monthCopy + 1);

    highYears.forEach((item, i) => {
      if (yearCopy === item) {
        moy[1] = 29;
      }
    });

    createFirstWeek();
    createMonth();
  }

  nextMonth.addEventListener('click', () => {
    if (element.textContent == `${monthNames[11]} ${yearCopy}`) {
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

  let newArray = [],
      parentsArray = [],
      fullDate = '2020-08-01';

  function setFirstDate(fullDate) {
    return firstDate = new Date(fullDate),
          firstYear = firstDate.getFullYear(),
          firstWeekDay = firstDate.getDay(),
          firstDay = firstDate.getDate(),
          firstMonth = firstDate.getMonth();
  }

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

  function createMonth() {

    //Построение массивов с числами месяца начиная от первого дня месяца
    if (firstWeekDay === 0) {
      firstWeekDay = 7;
      for (let n = 1; n <= moy[monthCopy]; n++) {
        newArray.push(weekDays[(firstWeekDay - 2) + n]);
        parentsArray.push(parents[(firstWeekDay - 2) + n]);
      }
    } else {
      for (let i = 1; i <= moy[monthCopy]; i++) {
        newArray.push(weekDays[(firstWeekDay - 2) + i]);
        parentsArray.push(parents[(firstWeekDay - 2) + i]);
      }
    }

    //Нумерация массива чисел месяца
    newArray.forEach((elem, i) => {
      if (i === 0) {
        elem.textContent = `${(firstDay)}`;
      } else {
        elem.textContent = `${(firstDay + i)}`;
      }
    });

    for (let v = 0; v < firstWeekDays.length; v++) {
      if (v === firstWeekDay - 1) {

        //Разметка дней первой недели после первого дня месяца
        for (let x = 1; x < (7 - v); x++) {
          firstWeekDays[v + x].textContent = `${weekdayNames[firstWeekDay + x - 1]}, ${firstDay + x}`;
        }

        //Разметка в календаре дней предыдущего месяца
        for (let y = 1; y <= (7 - (7 - v)); y++) {
          if (monthCopy === 0) {
            firstWeekDays[v - y].textContent = `${weekdayNames[firstWeekDay - y - 1]}, ${moy[11] - (y - 1)}`;
          } else {
            firstWeekDays[v - y].textContent = `${weekdayNames[firstWeekDay - y - 1]}, ${moy[monthCopy - 1] - (y - 1)}`;
          }
        }

        //Разметка первого дня месяца
        firstWeekDays[v].textContent = `${weekdayNames[firstWeekDay - 1]}, ${firstDay}`;
        firstWeekDays[v].classList.add('first-day');

      } else if (firstWeekDay === 0) {

        //Если первый день месяца по счету в массиве равен 0, то он становится равным 7 (далее чтобы стать Воскресеньем)
        firstWeekDay = 7;

        if (v === firstWeekDay - 1) {
          firstWeekDays[v].textContent = `${weekdayNames[firstWeekDay - 1]}, ${firstDay}`;
          firstWeekDays[v].classList.add('first-day');
        }
      }
    }

    //Проверка текущей даты для удаления либо установления на календаре текущего дня
    if (month === monthCopy && year === yearCopy) {
      showThatDay();
    } else {
      resetThatDay();
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

  renderMonth(year);
  generateHighYears(20);
  setFirstDate(fullDate);
  createFirstWeek();
  createMonth();
  showThatDay();
});
