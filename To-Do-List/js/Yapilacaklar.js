// Toast mesajını göstermek için fonksiyon
function showToast(type, message) {
  let toast = document.querySelector("#liveToast");
  toast.className = "toast " + type + " show";
  toast.querySelector(".toast-body").innerText = message;

  // Toast'i 4 saniye sonra gizlemek için bir zamanlayıcı ayarla
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 4000);
}

// Yeni bir liste elemanı eklemek için fonksiyon
function newElement() {
  // giriş alanından giriş değerini al
  let inputValue = document.querySelector("#task").value;

  // Giriş değerinin boş olup olmadığını kontrol et
  if (inputValue === "") {
    showToast("error", "Listeye boş ekleme yapamazsınız!"); // Hata toast'ını görüntüle
    return;
  }

  // Yeni bir liste öğesi oluştur
  let createLi = document.createElement("li");
  let textNode = document.createTextNode(inputValue);
  createLi.appendChild(textNode);


  let closeSpan = document.createElement("span");
  closeSpan.className = "close";
  closeSpan.innerText = "x";

  // Silme düğmesine tıklandığında deleteElement fonksiyonunu çağır
  closeSpan.addEventListener("click", function() {
    deleteElement(this);
  });
  createLi.appendChild(closeSpan);
  let taskList = document.querySelector("#list");
  taskList.appendChild(createLi);

  // Başarı toast'ını görüntüle
  showToast("success", "Listeye eklendi.");

  // Local storage'a elemanı kaydet
  saveToLocalStorage(inputValue);

  // Görev giriş alanını temizle
  document.querySelector("#task").value = "";
}

// Liste elemanını silmek için fonksiyon
function deleteElement(element) {
  // Tıklanan silme düğmesinin üst öğesini (liste öğesi) kaldır
  element.parentNode.remove();
  showToast("success", "Madde silindi.");
}
function saveToLocalStorage(item) {
  let items = localStorage.getItem("taskList")
    ? JSON.parse(localStorage.getItem("taskList"))
    : []
  items.push(item);
  // Güncellenmiş diziyi local storage'a kaydet
  localStorage.setItem("taskList", JSON.stringify(items));
}
