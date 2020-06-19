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

// Items de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li");

itemsToCollect.forEach((item) => {
  item.addEventListener("click", handleSelectedItem);
});

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex((item) => item == itemId);

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => item != itemId);

    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems;
}
