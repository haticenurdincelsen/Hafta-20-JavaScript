function showToast(type, message) {
  let toast = document.querySelector("#liveToast");
  toast.className = "toast " + type + " show";
  toast.querySelector(".toast-body").innerText = message;

  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 4000);
}

function newElement() {
  let inputValue = document.querySelector("#task").value;
  if (inputValue === "") {
    showToast("error", "Listeye boş ekleme yapamazsınız!");
    return;
  }

  let createLi = document.createElement("li");
  createLi.innerHTML =
    inputValue + ' <span class="close" onclick="deleteElement(this)">x</span> ';

  let taskList = document.querySelector("#list");
  taskList.appendChild(createLi);

  showToast("success", "Listeye eklendi.");

  saveToLocalStorage(inputValue);

  document.querySelector("#task").value = "";
}

function deleteElement(element) {
  element.parentNode.remove();
  showToast("success", "Madde silindi.");
}

function saveToLocalStorage(item) {
  let items = localStorage.getItem("taskList")
    ? JSON.parse(localStorage.getItem("taskList"))
    : [];
  items.push(item);
  localStorage.setItem("taskList", JSON.stringify(items));
}
