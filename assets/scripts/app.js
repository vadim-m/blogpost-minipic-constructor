const scheme = document.getElementById("scheme");
const saveBtn = document.getElementById("save-btn");

// псевдомассив NodeList со списком всех кнопок-стрелок секции
let openButtons = document.querySelectorAll('.section__open-btn');

// вешаем на эти стрелки слушатели событий, чтоб открыть нужную секцию
openButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const curretnSection = e.target.parentNode.parentNode;

    curretnSection.classList.toggle('active');;
  });

});

// функция по переключению класса, чтобы изменить layout картинки
const changeLayout = () => {
  scheme.classList.toggle('column');
}












// reset btn
const deleteSchemes = () => {
  scheme.innerHTML = "";
  saveBtn.disabled = true;
  saveBtn.innerHTML = "";
  saveBtn.innerText = "Save";
};
















// html2canvas => any div as image file
function doCapture() {
  html2canvas(document.getElementById("scheme")).then(function (canvas) {
    document.body.style.overflowY = "hidden";
    canvasdata = canvas.toDataURL("image/webp", 1);
    let a = document.createElement("a");
    a.textContent = "Save";
    a.setAttribute("id", "download__link");
    a.download = "схема_уутэ_" + Date.now() + ".webp";
    a.href = canvasdata;
    console.log(a);

    // Делаем кнопку сохранить активной и добавляем в нее ссылку
    saveBtn.disabled = false;
    saveBtn.textContent = "";
    saveBtn.appendChild(a);
    const downloadBtn = document.getElementById("download__link");

    // Добавляем слушатель на ссылку, чтобы при клике очистить схему и выполнить deleteSchemes()
    downloadBtn.addEventListener("click", (e) => {
      deleteSchemes();
    });
  });
}












// buttons onclick function
const add = (sym) => {
  switch (sym) {
    case "ot":
      scheme.innerHTML = scheme.innerHTML + '<img src="./pics/ot.svg">';
      break;
    case "ot-tupik":
      scheme.innerHTML = scheme.innerHTML + '<img src="./pics/ot-tupik.svg">';
      break;
    case "gvs":
      scheme.innerHTML = scheme.innerHTML + '<img src="./pics/gvs.svg">';
      break;
    case "gvs-tupik":
      scheme.innerHTML = scheme.innerHTML + '<img src="./pics/gvs-tupik.svg">';
      break;
    case "ts":
      scheme.innerHTML =
        scheme.innerHTML +
        '<img style="width:394px; height:264px" src="./pics/ts.svg">';
      break;
    case "ts-pod":
      scheme.innerHTML =
        scheme.innerHTML +
        '<img style="width:394px; height:264px" src="./pics/ts-pod.svg">';
      break;
    case "ov":
      scheme.innerHTML = scheme.innerHTML + '<img src="./pics/ov.svg">';
      break;
    case "ov-tupik":
      scheme.innerHTML = scheme.innerHTML + '<img src="./pics/ov-tupik.svg">';
      break;
    case "up":
      scheme.innerHTML = scheme.innerHTML + '<img src="./pics/up.svg">';
      break;
    case "down":
      scheme.innerHTML = scheme.innerHTML + '<img src="./pics/down.svg">';
      break;
  }
};
