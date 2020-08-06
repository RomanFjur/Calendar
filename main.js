'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const modalEvent = document.querySelector('.modal'),
        modalClose = document.querySelector('.modal-close'),
        modalCloudLeft = document.querySelector('.modal-cloud-left'),
        modalCloudRight = document.querySelector('.modal-cloud-right');

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

  //Далее функции создания первой недели в месяце, текущего месяца и последующих месяцев

  let firstWeek = document.querySelector('.first-week'),
      firstWeekDays = firstWeek.querySelectorAll('.day-number'),
      weekDays = document.querySelectorAll('.day-number');

  let firstDate,
      firstYear,
      firstWeekDay,
      firstDay,
      firstMonth;

  let newArray = [],
      daysArray = [],
      fullDate = '2020-08-01';

  let moy = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //month of year

  let monthCopy = month,
      yearCopy = year;

  const element = document.querySelector('.today-month__date'),
        psevdoParents = document.querySelectorAll('.day');

  let parents = Array.from(psevdoParents);

  function renderMonth(year) {
    element.textContent = `${monthNames[monthCopy]} ${year}`;
  }

  const prevMonth = document.querySelector('.last-month'),
        nextMonth = document.querySelector('.next-month');

  let leftCount,
      rightCount,
      emptyCount;

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

  function setFirstDate(fullDate) {
    return firstDate = new Date(fullDate),
          firstYear = firstDate.getFullYear(),
          firstWeekDay = firstDate.getDay(),
          firstDay = firstDate.getDate(),
          firstMonth = firstDate.getMonth();
  }

  function createFirstWeek() {
    newArray = [];

    weekDays.forEach((elem, i) => {
      elem.textContent = ``;
      parents[i].classList.remove('empty-day');
      parents[i].classList.remove('prev-day');
      emptyCount = 1;
    });

    firstWeekDays.forEach((p, i) => {
      p.textContent = `${weekdayNames[i]}`;
      p.classList.remove('first-day');
    });
  }

  let firstDaysArray = [];

  function createThatDays (arr) {
    createMonth();
    arr = [];
  }

  function createMonth() {
    parents.forEach((item, i) => {
      item.classList.remove('full-day');
      item.id = ``;
    });

    firstDaysArray = [];
    //Построение массивов с числами месяца начиная от первого дня месяца
    if (firstWeekDay === 0) {
      firstWeekDay = 7;
      for (let n = 1; n <= moy[monthCopy]; n++) {
        newArray.push(weekDays[(firstWeekDay - 2) + n]);
        firstDaysArray.push(parents[(firstWeekDay - 2) + n]);
      }
    } else {
      for (let i = 1; i <= moy[monthCopy]; i++) {
        newArray.push(weekDays[(firstWeekDay - 2) + i]);
        firstDaysArray.push(parents[(firstWeekDay - 2) + i]);
      }
    }

    firstDaysArray.forEach((item, i) => {
      item.classList.add('full-day');
      item.id = `${i}`;
    });

    checkDay();

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
            parents[v - y].classList.add('prev-day');
          } else {
            firstWeekDays[v - y].textContent = `${weekdayNames[firstWeekDay - y - 1]}, ${moy[monthCopy - 1] - (y - 1)}`;
            parents[v - y].classList.add('prev-day');
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

    checkForEmpty();
  }

  //Функция проверки пустого контента
  function checkForEmpty() {
    weekDays.forEach((item, i) => {
      if (item.textContent === '') {
        parents[i].classList.add('empty-day');
        for (let e = 0; e < emptyCount; e++) {
          item.textContent = `${firstDay + e}`;
        }
        emptyCount++;
      }
    });
  }

  function resetThatDay(){
    firstDaysArray.forEach((elem, i) => {
      elem.classList.remove('that-day');
    });
  }

  function showThatDay() {
    firstDaysArray.forEach((elem, i) => {
      if (i === day - 1) {
        elem.classList.add('that-day');
      }
    });
  }

  function renderThatMonth() {
    renderMonth(year);
    createThatMonth(month);
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
    createMonth(firstDaysArray);
  }

  prevMonth.addEventListener('click', () => {

    if (element.textContent === `${monthNames[0]} ${yearCopy}`) {
      leftCount = 11;
      monthCopy = leftCount;
    }
    renderPreviousMonth();
    checkDay();
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
    createMonth(firstDaysArray);
  }

  nextMonth.addEventListener('click', () => {
    if (element.textContent == `${monthNames[11]} ${yearCopy}`) {
      rightCount = 0;
      monthCopy = rightCount;
    }
    renderNextMonth();
  });

  renderMonth(year);
  generateHighYears(20);
  setFirstDate(fullDate);
  createFirstWeek();
  createThatDays(firstDaysArray);
  showThatDay();

  //ДОБАВЛЕНИЕ И РЕДАКТИРОВАНИЕ СОБЫТИЙ!!!!! (Далее)

  function checkDay () {

    function addChecked(item) {
      item.classList.add('checked');
    }

    function removeChecked(item) {
      firstDaysArray.forEach((item, i) => {
        item.classList.remove('checked');
      });
      parents.forEach((item, i) => {
        item.classList.remove('checked');
      });
    }

    function closeModal() {
      modalEvent.classList.remove('show');
      modalEvent.classList.add('hide');
    }

    function openModal() {
      modalEvent.classList.remove('hide');
      modalEvent.classList.add('show');
    }

    firstDaysArray.forEach((item, i) => {
      if (item.id != ``) {
        item.addEventListener('click', () => {
          modalEvent.classList.remove('show');
          modalEvent.classList.add('hide');
          removeChecked(item);
          addChecked(item);
          console.log('hello');

          if (item.offsetLeft > 700) {
            modalEvent.style.left = `${item.offsetLeft - 345}px`;
            modalEvent.style.top = `${item.offsetTop - 20}px`;
            modalClose.style.right = `285px`;
            modalCloudRight.classList.remove('hide');
            modalCloudLeft.classList.add('hide');
          } else {
            modalEvent.style.left = `${item.offsetLeft + 177}px`;
            modalEvent.style.top = `${item.offsetTop - 20}px`;
            modalClose.style.right = `-17px`;
            modalCloudRight.classList.add('hide');
            modalCloudLeft.classList.remove('hide');
          }

          if (item.offsetTop > 800) {
            modalEvent.style.top = `${item.offsetTop - 181}px`;
            modalCloudLeft.style.top = `+161px`;
          } else {
            modalCloudLeft.style.top = `0px`;
          }

          openModal();
        });
      }
    });

    modalClose.addEventListener('click', () => {
      closeModal();
    });
  }

  const toThatMonth = document.querySelector('.that-month');

  toThatMonth.addEventListener('click', () => {
    createThatDays(firstDaysArray);
  });

  //localStorage

});
