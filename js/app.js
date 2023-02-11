function init() {
    const section_element = document.querySelector('.shopping_list_items');
    const input_field = document.querySelector('input');
    const submit_button = document.getElementById('submit_button');
    const remove_button = document.getElementById('remove');
    const ul_element = document.createElement('ul');

    // Local storage explanation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    const shopping_list_from_storage = JSON.parse(localStorage.getItem('shopping_list')) || [];

    shopping_list_from_storage.forEach((item) => {
        const li_element = document.createElement('li');
        const li_checkbox = document.createElement('input');
        li_checkbox.type = 'checkbox';
        li_checkbox.className = 'checkbox'
        const li_span_element = document.createElement('span')
        const li_delete_button = document.createElement('button');
        li_delete_button.className = 'li_delete_button';

        li_checkbox.checked = item.checked;
        li_span_element.innerText = item.value;
        li_element.prepend(li_checkbox);
        li_element.appendChild(li_span_element);
        li_element.appendChild(li_delete_button);
        ul_element.appendChild(li_element);

        li_checkbox.addEventListener('change', (event) => {
            item.checked = event.target.checked;
            localStorage.setItem('shopping_list', JSON.stringify(shopping_list_from_storage));
        });

        li_checkbox.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                li_checkbox.checked = !li_checkbox.checked;
            }
            item.checked = event.target.checked;
            localStorage.setItem('shopping_list', JSON.stringify(shopping_list_from_storage));
        });

        li_delete_button.addEventListener('click', () => {
            const index = shopping_list_from_storage.indexOf(item);
            shopping_list_from_storage.splice(index, 1);
            localStorage.setItem('shopping_list', JSON.stringify(shopping_list_from_storage));
            li_element.remove();
        });
        input_field.value = '';
    });

    section_element.appendChild(ul_element);

    submit_button.addEventListener('click', add_list_item);
    remove_button.addEventListener('click', remove_all_list_items);
    input_field.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            add_list_item()
        }
    });

    function add_list_item() {
        const li_element = document.createElement('li');
        const li_checkbox = document.createElement('input');
        li_checkbox.type = 'checkbox';
        li_checkbox.className = 'checkbox';
        const li_span_element = document.createElement('span')
        const li_delete_button = document.createElement('button');
        li_delete_button.className = 'li_delete_button';

        const item = { value: input_field.value, checked: false };

        li_span_element.innerText = item.value;
        li_element.prepend(li_checkbox);
        li_element.appendChild(li_span_element);
        li_element.appendChild(li_delete_button);
        ul_element.appendChild(li_element);
        shopping_list_from_storage.push(item);

        localStorage.setItem('shopping_list', JSON.stringify(shopping_list_from_storage));

        li_checkbox.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                li_checkbox.checked = !li_checkbox.checked;
            }
            item.checked = event.target.checked;
            localStorage.setItem('shopping_list', JSON.stringify(shopping_list_from_storage));
        });

        li_checkbox.addEventListener('change', (event) => {
            item.checked = event.target.checked;
            localStorage.setItem('shopping_list', JSON.stringify(shopping_list_from_storage));
        });

        li_delete_button.addEventListener('click', () => {
            const index = shopping_list_from_storage.indexOf(item);
            shopping_list_from_storage.splice(index, 1);
            localStorage.setItem('shopping_list', JSON.stringify(shopping_list_from_storage));
            li_element.remove();
        });
        input_field.value = '';
    }

    function remove_all_list_items() {
        while (ul_element.firstChild) {
            ul_element.removeChild(ul_element.firstChild);
        };
        localStorage.removeItem('shopping_list');
    };
};

init();


