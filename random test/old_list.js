function init() {
	const sectionElement = document.querySelector('.shopping_list_items');
	const inputField = document.querySelector('input');
	const submitButton = document.getElementById('submit_button');
	const removeButton = document.getElementById('remove');
	const ulElement = document.createElement('ul');

	let shoppingListFromStorage = JSON.parse(localStorage.getItem('shopping_list')) || [];

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
			localStorage.setItem('shopping_list', JSON.stringify(shoppingListFromStorage));
		});

		liCheckbox.addEventListener('keyup', (event) => {
			if (event.key === 'Enter') {
				liCheckbox.checked = !liCheckbox.checked;
			}
			item.checked = event.target.checked;
			localStorage.setItem('shopping_list', JSON.stringify(shoppingListFromStorage));
		});

		liDeleteButton.addEventListener('click', () => {
			const index = shoppingListFromStorage.indexOf(item);
			shoppingListFromStorage.splice(index, 1);
			localStorage.setItem('shopping_list', JSON.stringify(shoppingListFromStorage));
			ulElement.removeChild(liElement);
		});
	}

	shoppingListFromStorage.forEach(item => {
		if (item.id === window.location.search.slice(1)) {
			renderListItem(item);
		}
	});
	sectionElement.appendChild(ulElement);

	submitButton.addEventListener('click', () => {
		if (inputField.value === '') {
			alert('Skriv noe i feltet først');
		} else {
			const item = { id: window.location.search.slice(1), value: inputField.value, checked: false };
			shoppingListFromStorage.push(item);
			localStorage.setItem('shopping_list', JSON.stringify(shoppingListFromStorage));
			if (item.id === window.location.search.slice(1)) {
				renderListItem(item);
			}
			inputField.value = '';
		}
	});

	removeButton.addEventListener('click', () => {
		while (ulElement.firstChild) {
			ulElement.removeChild(ulElement.firstChild);
		}
		localStorage.removeItem('shopping_list');
	});

	inputField.addEventListener('keyup', (event) => {
		if (event.key === 'Enter') {
			if (inputField.value === '') {
				alert('Skriv noe i feltet først');
			} else {
				const item = { id: window.location.search.slice(1), value: inputField.value, checked: false };
				shoppingListFromStorage.push(item);
				localStorage.setItem('shopping_list', JSON.stringify(shoppingListFromStorage));
				if (item.id === window.location.search.slice(1)) {
					renderListItem(item);
				}
				inputField.value = '';
			}
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
