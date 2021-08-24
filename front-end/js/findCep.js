$("#input-cep").mask("00000000");

const inputCep = document.getElementById("input-cep");
const error = document.getElementById("error");
const success = document.getElementById("success");
const loading = document.getElementById("loading");

inputCep.addEventListener("keyup", (e) => {
  const value = e.target.value;
  if (value.length === 8) {
    findZipCode(value);
  } else {
    emptyData();
    treatMessage("error", "Preencha 8 dígitos!");
  }
});

function findZipCode(cep) {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/cep",
    data: { cep },
    dataType: "JSON",
    beforeSend: () => {
      loading.classList.remove("d-none");
    },
    success: (data) => {
      loading.classList.add("d-none");
      if (!data.erro) {
        fillData(data);
        treatMessage("success", "CEP encontrado!");
      } else {
        emptyData();
        treatMessage("error", "CEP não encontrado!");
      }
    },
  });
}

function fillData(data) {
  Object.keys(data).forEach((key) => {
    const span = document.getElementById(key);
    if (span) {
      span.innerHTML = data[key];
    }
  });
}

function treatMessage(type, message) {
  if (type == "error") {
    success.style.display = "none";
    error.innerHTML = message;
    error.style.display = "block";
  } else {
    error.style.display = "none";
    success.innerHTML = message;
    success.style.display = "block";
  }
}

function emptyData() {
  const span = Array.from(document.getElementsByClassName("data"));
  span.forEach((e) => {
    e.innerHTML = "";
  });
}
