function init() {
  // hente søke ord fra url
  const searchQuery = decodeURIComponent(window.location.search.slice(1));

  // endre side tittel og h1
  const h1Element = document.querySelector('h1');
  if (searchQuery) {
    h1Element.textContent = searchQuery;
    document.title = `${searchQuery} liste`;
  }

  // hente DOM elementer
  const sectionElement = document.querySelector('.shopping_list_items');
  const inputField = document.querySelector('input');
  const submitButton = document.getElementById('submit_button');
  const removeButton = document.getElementById('remove');
  const ulElement = document.createElement('ul');

  // hente handleliste basert på url
  let shoppingListFromStorage = JSON.parse(localStorage.getItem(`shopping_list_${searchQuery}`)) || [];

  // rendre liste
  function renderListItem(item) {
    const liElement = document.createElement('li');
    const liCheckbox = document.createElement('input');
    liCheckbox.type = 'checkbox';
    liCheckbox.className = 'checkbox';
    const liSpanElement = document.createElement('span');
    const liDeleteButton = document.createElement('button');
    liDeleteButton.className = 'li_delete_button';

    liCheckbox.checked = item.checked;
    liSpanElement.innerText = item.value;
    liElement.appendChild(liCheckbox);
    liElement.appendChild(liSpanElement);
    liElement.appendChild(liDeleteButton);
    ulElement.appendChild(liElement);

    liCheckbox.addEventListener('change', (event) => {
      item.checked = event.target.checked;
      localStorage.setItem(`shopping_list_${searchQuery}`, JSON.stringify(shoppingListFromStorage));
    });

    liCheckbox.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        liCheckbox.checked = !liCheckbox.checked;
      }
      item.checked = event.target.checked;
      localStorage.setItem(`shopping_list_${searchQuery}`, JSON.stringify(shoppingListFromStorage));
    });

    liDeleteButton.addEventListener('click', () => {
      const index = shoppingListFromStorage.indexOf(item);
      shoppingListFromStorage.splice(index, 1);
      localStorage.setItem(`shopping_list_${searchQuery}`, JSON.stringify(shoppingListFromStorage));
      ulElement.removeChild(liElement);
    });
  }

  // legg til elementer i listen
  function addItem() {
    if (inputField.value === '') {
      alert('Skriv noe i feltet først');
    } else {
      const item = { value: inputField.value, checked: false };
      shoppingListFromStorage.push(item);
      localStorage.setItem(`shopping_list_${searchQuery}`, JSON.stringify(shoppingListFromStorage));
      renderListItem(item);
      inputField.value = '';
    }
  };

  shoppingListFromStorage.forEach(item => renderListItem(item));
  sectionElement.appendChild(ulElement);

  submitButton.addEventListener('click', addItem)

  inputField.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      addItem()
    }
  });

  removeButton.addEventListener('click', () => {
    localStorage.removeItem(`shopping_list_${searchQuery}`);
    while (ulElement.firstChild) {
      ulElement.removeChild(ulElement.firstChild);
    }
  });

  function removeButtonHover() {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      removeButton.addEventListener('mouseover', () => {
        removeButton.style.backgroundImage = "url('../assets/søppel_icon_hover.svg')";
      });

      removeButton.addEventListener('mouseout', () => {
        removeButton.style.backgroundImage = "url('../assets/søppel_icon.svg')";
      });
    }
  }

  removeButtonHover();
};

init();