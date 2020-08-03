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
    'Воскресение',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ];

  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const element = document.querySelector('.today-month__date');
  const parent = document.querySelector('.today-month');
  const monthDays = document.querySelector('.month');

  function renderMonth() {
    element.textContent = `${monthNames[month]} ${year}`;
  }

  renderMonth();

  function createCalendar() {
    let elem = document.createElement('div');
    elem.innerHTML = `
      <div class="week">
        <div class="day">
          <p></p>
        </div>
        <div class="day">
          <p></p>
        </div>
        <div class="day">
          <p></p>
        </div>
        <div class="day">
          <p></p>
        </div>
        <div class="day">
          <p></p>
        </div>
        <div class="day">
          <p></p>
        </div>
        <div class="day">
          <p></p>
        </div>
      </div>
    `;

    for (var i = 0; i < 4; i++) {
      monthDays.append(elem);
    }
  }

  createCalendar();
  createCalendar();
  createCalendar();
  createCalendar();
  createCalendar();

  const lastMonth = document.querySelector('.last-month'),
        nextMonth = document.querySelector('.next-month');

  let count = 1;
  let recount = 1;

  function renderNextMonth() {
    for (let i = 0; i <= count; i++) {
      element.textContent = `${monthNames[month + i]} ${year}`;
      if (element.textContent == `Декабрь ${year}`) {
        month = 0;
        count = -1;
        year = year + 1;
      }
    }
  }

  function renderPreviousMonth() {
    for (let i = 0; i <= recount; i++) {
      element.textContent = `${monthNames[month - i]} ${year}`;
      if (element.textContent == `Январь ${year}`) {
        month = 11;
        recount = -1;
        year = year - 1;
      }
    }
  }

  nextMonth.addEventListener('click', () => {
    renderNextMonth();
    count++;
  });

  lastMonth.addEventListener('click', () => {
    renderPreviousMonth();
    recount++;
  });
});
