function init() {
	const sectionElement = document.querySelector('.lists');
	const inputField = document.querySelector('input');
	const submitButton = document.getElementById('submit_button');
	const removeButton = document.getElementById('remove');
	const ulElement = document.createElement('ul');

	// get shopping list from local storage based on search query id
	let shoppingListFromStorage = JSON.parse(localStorage.getItem("shopping_list_index")) || [];

	// render list items
	function renderListItem(item) {
		const liElement = document.createElement('li');
		const liAnchorElement = document.createElement('a');
		const liDeleteButton = document.createElement('button');
		liDeleteButton.className = 'li_delete_button';
	
		// få liste fra local storage basert på navn
		const shoppingList = JSON.parse(localStorage.getItem(`shopping_list_${item.value}`)) || [];
	
		// teller ting i listen
		const totalItems = shoppingList.length;
	
		// teller hvor mange ting som er checked
		const checkedItems = shoppingList.filter(item => item.checked).length;
	
		// lage indicatortext
		const indicatorText = document.createElement('span');
		indicatorText.textContent = `${checkedItems}/${totalItems}`;
		indicatorText.className = 'indicator_text'
	
		liAnchorElement.innerText = `${item.value}`;
		liAnchorElement.href = `./lists/index.html?${item.value}`;

		liElement.appendChild(liAnchorElement);
		liElement.appendChild(liDeleteButton);
		liElement.appendChild(indicatorText)
		ulElement.appendChild(liElement);
	
		liDeleteButton.addEventListener('click', () => {
			const index = shoppingListFromStorage.indexOf(item);
			shoppingListFromStorage.splice(index, 1);
			localStorage.setItem("shopping_list_index", JSON.stringify(shoppingListFromStorage));
			ulElement.removeChild(liElement);
	
			const fileName = `shopping_list_${item.value}`;
			Object.keys(localStorage).forEach(key => {
				if (key.startsWith(fileName)) {
					localStorage.removeItem(key);
				}
			});
		});
	}

	function addItem() {
		if (inputField.value === '') {
			alert('Skriv noe i feltet først');
		} else {
			const item = { value: inputField.value };
			const itemExists = shoppingListFromStorage.some(listItem => listItem.value.toLowerCase() === item.value.toLowerCase());
			if (itemExists) {
				alert('Listene må ha forskjellige navn');
			} else {
				shoppingListFromStorage.push(item);
				localStorage.setItem("shopping_list_index", JSON.stringify(shoppingListFromStorage));
				renderListItem(item);
				inputField.value = '';
			}
		}
	}

	shoppingListFromStorage.forEach(item => renderListItem(item));
	sectionElement.appendChild(ulElement);

	submitButton.addEventListener('click', addItem);

	removeButton.addEventListener('click', () => {
		localStorage.clear();
		while (ulElement.firstChild) {
			ulElement.removeChild(ulElement.firstChild);
		}
		shoppingListFromStorage = JSON.parse(localStorage.getItem("shopping_list_index")) || [];
	});

	inputField.addEventListener('keyup', (event) => {
		if (event.key === 'Enter') {
			addItem();
		}
	});

	function removeButtonHover() {
		if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			removeButton.addEventListener('mouseover', () => {
				removeButton.style.backgroundImage = "url('./assets/søppel_icon_hover.svg')";
			});

			removeButton.addEventListener('mouseout', () => {
				removeButton.style.backgroundImage = "url('./assets/søppel_icon.svg')";
			});
		}
	}

	removeButtonHover();
};

init();
