/* Элементы со страницы */
/* --------------*/
let previewTitle = document.getElementById("title");
let previewText = document.getElementById("text");
const scheme = document.getElementById("scheme");
const saveBtn = document.getElementById("save-btn");

// псевдомассив NodeList со списком всех кнопок-стрелок секции
let openButtons = document.querySelectorAll('.section__open-btn');

// вешаем на эти стрелки слушатели,чтоб открыть нужную секцию при клике
openButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const currentSection = e.target.parentNode.parentNode;

    currentSection.classList.toggle('active');
  });
});


/* СЕКЦИЯ LAYOUT */
/* --------------*/

// функция по переключению класса, чтобы изменить layout картинки
const changeLayout = () => {
  scheme.classList.toggle('column');
};

// псевдомассив NodeList со списком всех кнопок-управления секции layout
let layoutButtons = document.querySelectorAll('.layout__btn');

// вешаем на эти кнопки слушатели,чтоб вызвать функцию их обработки
layoutButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {

    // конец строки класса от модификатора кнопки layout__btn--u 
    // это направление(либо сброс) для увелечения отступа нужного элемента.  
    const direction = btn.className.slice(-1);
    
    // получаем целевой элемент для смещения
    const target = checkTarget(btn);

    // вызываем функцию по изменению отступов
    changePaddings(target, direction);
  });
});

// проверяем какой элемент нам нужно подвинуть
const checkTarget = (clickedBtn) => {

  if (clickedBtn.parentNode.classList.contains('layout__title')) {
    targetElement = previewTitle;
  } else if (clickedBtn.parentNode.classList.contains('layout__desc')) {
    targetElement = previewText;
  }

  return targetElement;
};

// объявляю массивы с нулевыми отступами Заголовка и Тезисов
// padding[top, r, bot, l] 
let paddingsTitle = [0, 0, 0, 0];
let paddingsText = [0, 0, 0, 0];

// функция изменения массивов padding
const changePaddings = (target, direction) => {
  // Задаем шаг,с каждым нажатием увеличиваю отступ на 10px
  const step = 10;
  // внутренний массив для работы функции
  let paddings;

  if (target == previewTitle) {
    paddings = paddingsTitle;
  } else if (target == previewText) {
    paddings = paddingsText;
  }

  switch (direction) {
    case 'd': // кнопка вниз
      paddings[0] = paddings[0] + step;
      break;
    case 'u': // кнопка вверх
      paddings[2] = paddings[2] + step;
      break;
    case 'l': // кнопка влево
      paddings[1] = paddings[1] + step;
      break;
    case 'r': // кнопка вправо
      paddings[3] = paddings[3] + step;
      break;
    case '0': // кнопка reset
      paddings = [0,0,0,0];
      resetPaddings(target);
      break;
  }

  // и после всех изменений вызываем перемещение нужного элемента
  moveTarget(target, paddings);
};

// сбрасываем padding у нужного элемента (либо Заголовка, либо Тезисов)
const resetPaddings = (target) => {
  if (target == previewTitle) {
    paddingsTitle = [0, 0 , 0, 0];
  } else if (target == previewText) {
    paddingsText = [0, 0 , 0, 0];
  }
}

// функция по смещению элемента. Подставляем значения из массива паддингов нужному эл-ту
const moveTarget = (target, paddings) => {
  target.style.paddingTop = paddings[0] + 'px';
  target.style.paddingRight = paddings[1] + 'px';
  target.style.paddingBottom = paddings[2] + 'px';
  target.style.paddingLeft = paddings[3] + 'px';
}

/* КНОПКИ ДЛЯ СОХРАНЕНИЯ/СБРОСА ПРЕВЬЮ */
/* ------------------------------------ */

// При нажатии на reset-btn - сброс схемы и кнопки
const cleanScheme = () => {
  scheme.innerHTML = `<div class="scheme__title scheme__item"
                      id="title">Title</div>
                      <div class="scheme__info scheme__item">
                        <div class="scheme__info-wrap" id="text">
                          <div class="scheme__desc">thesis1</div>
                          <div class="scheme__desc">thesis2</div>
                          <div class="scheme__desc">thesis3</div>
                        </div>
                      </div>`;
  // завоно сохраняем элементы в переменные                    
  previewTitle = document.getElementById("title");
  previewText = document.getElementById("text");
  // обнуляем паддинги у Заголовка и Тезисов
  resetPaddings(previewTitle);
  resetPaddings(previewText);
  // сброс кнопки SaveBtn
  resetSaveBtn();
};

// При нажатии на кнопку Apply вызываем эту функцию. Сохраняем картинку
const saveScheme = () => {
  closeAllSections();
  doCapture();
};


// сброс кнопки save-btn к начальному состоянию
const resetSaveBtn = () => {
  saveBtn.disabled = true;
  saveBtn.innerHTML = "";
  saveBtn.innerText = "Save";
};

// закрытие всех секций, чтобы убрать баг с отступом на картинке
// слева из-за полосы прокрутки
const closeAllSections = () => {
  openButtons.forEach((btn) => {
    const currentSection = btn.parentNode.parentNode;

    currentSection.classList.remove('active');;
  })
};

/* РАБОТА ГЛАВНОГО СКРИПТА html2canvas */
/* ------------------------------------ */

// html2canvas => any div as image file
function doCapture() {
  html2canvas(document.getElementById("scheme")).then(function (canvas) {
    canvasdata = canvas.toDataURL("image/webp", 1);

    // создаем кнопку, которую потом подставим в
    // изначально неактивную кнопку saveBtn
    let a = document.createElement("a");
    a.textContent = "Save";
    a.setAttribute("id", "download__link");
    a.download = "blog_pic" + Date.now() + ".webp";
    a.href = canvasdata;

    // Делаем кнопку сохранить активной и добавляем в нее ссылку
    saveBtn.disabled = false;
    saveBtn.textContent = "";
    saveBtn.appendChild(a);
    const downloadBtn = document.getElementById("download__link");

    // Добавляем слушатель на ссылку, чтобы при клике очистить схему и выполнить deleteSchemes()
    downloadBtn.addEventListener("click", (e) => {
      cleanScheme();
    });
  });
};









// // buttons onclick function
// const add = (sym) => {
//   switch (sym) {
//     case "ot":
//       scheme.innerHTML = scheme.innerHTML + '<img src="./pics/ot.svg">';
//       break;
//     case "ot-tupik":
//       scheme.innerHTML = scheme.innerHTML + '<img src="./pics/ot-tupik.svg">';
//       break;
//     case "gvs":
//       scheme.innerHTML = scheme.innerHTML + '<img src="./pics/gvs.svg">';
//       break;
//     case "gvs-tupik":
//       scheme.innerHTML = scheme.innerHTML + '<img src="./pics/gvs-tupik.svg">';
//       break;
//     case "ts":
//       scheme.innerHTML =
//         scheme.innerHTML +
//         '<img style="width:394px; height:264px" src="./pics/ts.svg">';
//       break;
//     case "ts-pod":
//       scheme.innerHTML =
//         scheme.innerHTML +
//         '<img style="width:394px; height:264px" src="./pics/ts-pod.svg">';
//       break;
//     case "ov":
//       scheme.innerHTML = scheme.innerHTML + '<img src="./pics/ov.svg">';
//       break;
//     case "ov-tupik":
//       scheme.innerHTML = scheme.innerHTML + '<img src="./pics/ov-tupik.svg">';
//       break;
//     case "up":
//       scheme.innerHTML = scheme.innerHTML + '<img src="./pics/up.svg">';
//       break;
//     case "down":
//       scheme.innerHTML = scheme.innerHTML + '<img src="./pics/down.svg">';
//       break;
//   }
// };
