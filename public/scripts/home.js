// Buscar estado e cidade
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      states.forEach((state) => {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      });
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const { selectedIndex } = event.target;

  stateInput.value = event.target.options[selectedIndex].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value=''>Selecione a cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      citySelect.innerHTML = "";
      cities.forEach((city) => {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      });

      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

// remover e adicionar modal
const closeButton = document.querySelector("#closeButton");
const buttonSearch = document.querySelector("#page-home main button");

const modal = document.querySelector("#modal");

buttonSearch.addEventListener("click", () => modal.classList.remove("hide"));

closeButton.addEventListener("click", () => modal.classList.add("hide"));
