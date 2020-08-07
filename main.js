'use strict';

window.addEventListener('DOMContentLoaded', () => {

  //Создание переменных с псевдоелементами модального окна и самого модального окна;
  const modalAddEvent = document.querySelector('.modal-create-event'),
        modalAddNote = document.querySelector('.modal-add-note'),
        modalClose = document.querySelector('.close-event'),
        modalCloudLeft = document.querySelector('.modal-cloud-left'),
        modalCloudRight = document.querySelector('.modal-cloud-right'),
        addClose = document.querySelector('.close-add');

  //Переменные с кнопками модалки и инпутами (для ввода текста);
  const writeEvent = document.querySelector('#event'),
        writeDate = document.querySelector('#date'),
        writeNames = document.querySelector('#names'),
        btnEvent = document.querySelector('.btn-event'),
        btnAdd = document.querySelector('.btn-add'),
        addEvent = document.querySelector('.add-event'),
        addButton = document.querySelector('.to-add');

  //Переменные для полуаемого значения из инпута и для элемента куда присваивать;
  let text,
      eventFields = document.querySelectorAll('.event');

  //Создание переменных с актуальной (текущей) датой;
  let date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth(),
      weekday = date.getDay(),
      day = date.getDate();

  //Создание массива с названиями месяцев;
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

  //Создание массива с названиями дней недели;
  const weekdayNames = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
  ];

  //Создание псевдомассивов для дальнейшенй операций с днями, их именования и нумерации;
  const firstWeek = document.querySelector('.first-week'),
        firstWeekDays = firstWeek.querySelectorAll('.day-number'),
        weekDays = document.querySelectorAll('.day-number'),
        days = document.querySelectorAll('.day');

  //Создание переменных для дальнейшего установления и просчета календаря по датам (для Функции SetThatDate);
  let thatDate,
      thatYear,
      thatWeekDay,
      thatDay,
      thatMonth,
      fullDate = '2020-08-01';

  //Массивы для дальнейшего построения календаря;
  let daysNumberArray = [],
      monthInDaysArray = [];

  //Массив дней в каждом месяце;
  let monthsOfYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //Копии текущего месяца и года для дальнейшего их изменения без изменения текущей даты;
  let monthCopy = month,
      yearCopy = year;

  //Переменная отображаемой текущей даты;
  const thatDateName = document.querySelector('.today-month__date');

  //Кнопки переключения месяцев (вперед и назад);
  const prevMonth = document.querySelector('.last-month'),
        nextMonth = document.querySelector('.next-month');

  //Счетчики;
  let leftCount,
      rightCount,
      emptyCount;

  //Массив для подсчёта високосных годов;
  let everyFourYears = [];

  //Функция получения вводимого значения из инпута;
  function getValue(element) {
    text = element.value;
  }

  //Функция генерации отображения переключаемой даты
  function renderMonth(year) {
    thatDateName.textContent = `${monthNames[monthCopy]} ${year}`;
  }

  //Установка текущей даты;
  function setThatDate(fullDate) {
    return thatDate = new Date(fullDate),
          thatYear = thatDate.getFullYear(),
          thatWeekDay = thatDate.getDay(),
          thatDay = thatDate.getDate(),
          thatMonth = thatDate.getMonth();
  }

  //Генерация текущего месяца;
  function createThatMonth(a) {
    fullDate = fullDate.split('-');

    if (a >= 10) {
      fullDate = [`${year}`, `${a}`, `01`];
    } else {
      fullDate = [`${year}`, `0${a}`, `01`];
    }

    fullDate = fullDate.join('-');

    setThatDate(fullDate);
  }

  //Функция генерации количества високосных годов, которые нужно учитывать в календаре от 1972 года
  function generateEveryFourYears(count) {
    let someDate = new Date('1972-01-01'),
        someYear = someDate.getFullYear();

    for (let i = 0; i < count; i++) {
      everyFourYears.push(someYear);
      someYear = everyFourYears[i] + 4;
    }
  }

  function createFirstWeek() {

    daysNumberArray = [];

    weekDays.forEach((elem, i) => {
      elem.textContent = ``;
      days[i].classList.remove('empty-day');
      days[i].classList.remove('prev-day');
      emptyCount = 1;
    });

    firstWeekDays.forEach((p, i) => {
      p.textContent = `${weekdayNames[i]}`;
      p.classList.remove('first-day');
    });
  }

  let countError = 0;

  function createThatDays () {
    createMonth();
  }

  function createMonth() {
    countError = 1;
    days.forEach((item, i) => {
      item.classList.remove('full-day');
      item.id = ``;
    });

    monthInDaysArray = [];
    //Построение массивов с числами месяца начиная от первого дня месяца
    if (thatWeekDay === 0) {
      thatWeekDay = 7;
      for (let n = 1; n <= monthsOfYear[monthCopy]; n++) {
        daysNumberArray.push(weekDays[(thatWeekDay - 2) + n]);
        monthInDaysArray.push(days[(thatWeekDay - 2) + n]);
      }
    } else {
      for (let i = 1; i <= monthsOfYear[monthCopy]; i++) {
        daysNumberArray.push(weekDays[(thatWeekDay - 2) + i]);
        monthInDaysArray.push(days[(thatWeekDay - 2) + i]);
      }
    }

    monthInDaysArray.forEach((item, i) => {
      item.dataset.dataId = `${i + 1}-${monthCopy + 1}-${yearCopy}`;
      item.classList.add('full-day');
      eventFields[i + 5].textContent = localStorage.getItem(`${item.dataset.dataId}`);
    });

    checkDay();

    //Нумерация массива чисел месяца
    daysNumberArray.forEach((elem, i) => {
      if (i === 0) {
        elem.textContent = `${(thatDay)}`;
      } else {
        elem.textContent = `${(thatDay + i)}`;
      }
    });

    for (let v = 0; v < firstWeekDays.length; v++) {
      if (v === thatWeekDay - 1) {

        //Разметка дней первой недели после первого дня месяца
        for (let x = 1; x < (7 - v); x++) {
          firstWeekDays[v + x].textContent = `${weekdayNames[thatWeekDay + x - 1]}, ${thatDay + x}`;
        }

        //Разметка в календаре дней предыдущего месяца
        for (let y = 1; y <= (7 - (7 - v)); y++) {
          if (monthCopy === 0) {
            firstWeekDays[v - y].textContent = `${weekdayNames[thatWeekDay - y - 1]}, ${monthsOfYear[11] - (y - 1)}`;
            days[v - y].classList.add('prev-day');
          } else {
            firstWeekDays[v - y].textContent = `${weekdayNames[thatWeekDay - y - 1]}, ${monthsOfYear[monthCopy - 1] - (y - 1)}`;
            days[v - y].classList.add('prev-day');
          }
        }

        //Разметка первого дня месяца
        firstWeekDays[v].textContent = `${weekdayNames[thatWeekDay - 1]}, ${thatDay}`;
        firstWeekDays[v].classList.add('first-day');

      } else if (thatWeekDay === 0) {

        //Если первый день месяца по счету в массиве равен 0, то он становится равным 7 (далее чтобы стать Воскресеньем)
        thatWeekDay = 7;

        if (v === thatWeekDay - 1) {
          firstWeekDays[v].textContent = `${weekdayNames[thatWeekDay - 1]}, ${thatDay}`;
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
      days[i].classList.remove('empty-day');
      days[i].classList.remove('full-day');
      if (item.lastChild === null) {
        days[i].classList.add('empty-day');
        for (let e = 0; e < emptyCount; e++) {
          item.textContent = `${thatDay + e}`;
        }
        emptyCount++;
      } else if(!days[i].classList.contains('prev-day')) {
        days[i].classList.add('full-day');
      }
    });

  }

  function resetThatDay(){
    monthInDaysArray.forEach((elem, i) => {
      elem.classList.remove('that-day');
    });
  }

  function showThatDay() {
    monthInDaysArray.forEach((elem, i) => {
      if (i === day - 1) {
        elem.classList.add('that-day');
      }
    });
  }

  function renderThatMonth() {
    monthCopy = month;
    yearCopy = year;
    thatDateName.textContent = `${monthNames[month]} ${year}`;
    createThatMonth(month + 1);
    createFirstWeek();
    createMonth();
    showThatDay();
    closeModal();
    days.forEach((item, i) => {
      item.classList.remove('checked');
    });
  }

  //Функция переключения месяца назад

  function renderPreviousMonth() {
    monthsOfYear[1] = 28;
    if (leftCount === 11) {
      renderMonth(yearCopy - 1);
      leftCount--;
      yearCopy = yearCopy - 1;
    } else {
      monthCopy--;
      renderMonth(yearCopy);
    }

    createThatMonth(monthCopy + 1);

    everyFourYears.forEach((item, i) => {
      if (yearCopy === item) {
        monthsOfYear[1] = 29;
      }
    });

    createFirstWeek();
    createMonth();
  }

  prevMonth.addEventListener('click', () => {

    if (thatDateName.textContent === `${monthNames[0]} ${yearCopy}`) {
      leftCount = 11;
      monthCopy = leftCount;
    }
    renderPreviousMonth();
    checkDay();
    closeModal();
    days.forEach((item, i) => {
      item.classList.remove('checked');
    });
  });

  //Функция переключения месяца вперед

  function renderNextMonth() {
    monthsOfYear[1] = 28;

    if (rightCount === 0) {
      renderMonth(yearCopy + 1);
      rightCount++;
      yearCopy = yearCopy + 1;
    } else {
      monthCopy++;
      renderMonth(yearCopy);
    }

    createThatMonth(monthCopy + 1);

    everyFourYears.forEach((item, i) => {
      if (yearCopy === item) {
        monthsOfYear[1] = 29;
      }
    });

    createFirstWeek();
    createMonth();
  }

  nextMonth.addEventListener('click', () => {
    if (thatDateName.textContent == `${monthNames[11]} ${yearCopy}`) {
      rightCount = 0;
      monthCopy = rightCount;
    }
    renderNextMonth();
    closeModal();
    days.forEach((item, i) => {
      item.classList.remove('checked');
    });
  });

  renderMonth(year);
  generateEveryFourYears(20);
  createThatMonth(monthCopy + 1);
  createFirstWeek();
  createThatDays();
  showThatDay();

  //ДОБАВЛЕНИЕ И РЕДАКТИРОВАНИЕ СОБЫТИЙ!!!!! (Далее)
  function closeModal() {
    modalAddEvent.classList.remove('show');
    modalAddEvent.classList.add('hide');
  }

  //localStorage

  function checkDay () {

    function addChecked(item) {
      item.classList.add('checked');
    }

    function removeChecked(item) {
      monthInDaysArray.forEach((item, i) => {
        item.classList.remove('checked');
      });
      days.forEach((item, i) => {
        item.classList.remove('checked');
      });
    }

    function openModal() {
      modalAddEvent.classList.remove('hide');
      modalAddEvent.classList.add('show');
    }

    monthInDaysArray.forEach((item, i) => {
      item.addEventListener('click', (event) => {
        if (item.classList.contains('empty-day') || item.classList.contains('prev-day')) {
          return;
        }

        if (`${item.dataset.dataId}` != `${i + 1}-${monthCopy + 1}-${yearCopy}`) {
          console.log(`${item.dataset.dataId}`, `${i + 1}-${monthCopy + 1}-${yearCopy}`);
          return;
        }

        if (countError > 1) {
          return;
        }

        modalAddEvent.classList.remove('show');
        modalAddEvent.classList.add('hide');
        removeChecked(item);
        addChecked(item);

        if (item.offsetLeft > 600) {
          modalAddEvent.style.left = `${item.offsetLeft - 345}px`;
          modalAddEvent.style.top = `${item.offsetTop - 20}px`;
          modalClose.style.right = `285px`;
          modalCloudRight.classList.remove('hide');
          modalCloudLeft.classList.add('hide');
        } else {
          modalAddEvent.style.left = `${item.offsetLeft + 156}px`;
          modalAddEvent.style.top = `${item.offsetTop - 20}px`;
          modalClose.style.right = `-17px`;
          modalCloudRight.classList.add('hide');
          modalCloudLeft.classList.remove('hide');
        }

        if (item.offsetTop > 700) {
          modalAddEvent.style.top = `${item.offsetTop - 181}px`;
          modalCloudLeft.style.top = `+161px`;
        } else if (item.offsetTop > 700 && item.offsetLeft > 600) {
          modalAddEvent.style.top = `${item.offsetTop - 181}px`;
          modalCloudRight.classList.remove('hide');
          modalCloudLeft.classList.add('hide');
          modalCloudRight.style.top = `+161px`;
        } else {
          modalCloudLeft.style.top = `0px`;
        }

        openModal();
        console.log(item.dataset.dataId);

        btnEvent.addEventListener('click', () => {
          getValue(writeEvent);
          localStorage.setItem(`${item.dataset.dataId}`, text);
          eventFields[i + 5].textContent = localStorage.getItem(`${item.dataset.dataId}`);
          closeModal();
        });
        countError++;
      });
    });

    modalClose.addEventListener('click', () => {
      closeModal();
    });
  }

  const toThatMonth = document.querySelector('.that-month');

  toThatMonth.addEventListener('click', () => {
    renderThatMonth();
  });


  addButton.addEventListener('click', () => {
    addButton.classList.toggle('to-add__pushed');
    modalAddNote.classList.toggle('hide');
  });

  addClose.addEventListener('click', () => {
    addButton.classList.toggle('to-add__pushed');
    modalAddNote.classList.toggle('hide');
  });

});
