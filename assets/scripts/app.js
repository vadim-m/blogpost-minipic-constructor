// Элементы со страницы
/* --------------*/
const scheme = document.getElementById("scheme");
const saveBtn = document.getElementById("save-btn");


/* СЕКЦИЯ LAYOUT */
/* --------------*/

// псевдомассив NodeList со списком всех кнопок-стрелок секции
let openButtons = document.querySelectorAll('.section__open-btn');

// вешаем на эти стрелки слушатели событий, чтоб открыть нужную секцию
openButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const currentSection = e.target.parentNode.parentNode;

    currentSection.classList.toggle('active');;
  });

});

// функция по переключению класса, чтобы изменить layout картинки
const changeLayout = () => {
  scheme.classList.toggle('column');
};


/* РАБОТА ГЛАВНОГО СКРИПТА html2canvas */
/* ------------------------------------ */

// При нажатии на reset-btn - сброс схемы и кнопки
const cleanScheme = () => {
  scheme.innerHTML = `<div class="scheme__title scheme__item">
                      Title</div>
                      <div class="scheme__info scheme__item">
                        <div class="scheme__info-wrap">
                          <div class="scheme__desc">thesis1</div>
                          <div class="scheme__desc">thesis2</div>
                          <div class="scheme__desc">thesis3</div>
                        </div>
                      </div>`;
  resetSaveBtn();
};

// сброс кнопки SaveBtn к начальному состоянию
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

// При нажатии на кнопку Apply вызываем эту функцию. Сохраняем картинку
const saveScheme = () => {
  closeAllSections();
  doCapture();
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
