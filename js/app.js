function init() {
    const section_element = document.querySelector(".shopping_list_items");
    const input_field = document.querySelector("input");
    const submit_button = document.querySelector("button");
    const remove_button = document.getElementById("remove");
    const ul_element = document.createElement("ul");

    // Local storage https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    const shopping_list_from_storage = JSON.parse(localStorage.getItem("shopping_list")) || [];

    shopping_list_from_storage.forEach((item) => {
        const li_element = document.createElement("li");
        const li_checkbox = document.createElement("input");
        li_checkbox.type = "checkbox";
        const li_delete_button = document.createElement("button");
        li_delete_button.innerText = "X";

        li_checkbox.checked = item.checked;
        li_element.innerText = item.value;
        li_element.prepend(li_checkbox);
        li_element.appendChild(li_delete_button);
        ul_element.appendChild(li_element);

        li_checkbox.addEventListener("change", (event) => {
            item.checked = event.target.checked;
            localStorage.setItem("shopping_list", JSON.stringify(shopping_list_from_storage));
        });

        li_delete_button.addEventListener("click", () => {
            const index = shopping_list_from_storage.indexOf(item);
            shopping_list_from_storage.splice(index, 1);
            localStorage.setItem("shopping_list", JSON.stringify(shopping_list_from_storage));
            li_element.remove();
        });
    });

    section_element.appendChild(ul_element);

    submit_button.addEventListener("click", addListItem);
    remove_button.addEventListener("click", removeAllListItems);

    function addListItem() {
        const li_element = document.createElement("li");
        const li_checkbox = document.createElement("input");
        li_checkbox.type = "checkbox";
        const li_delete_button = document.createElement("button");
        li_delete_button.innerText = "X";

        const item = { value: input_field.value, checked: false };


        li_element.innerText = item.value;
        li_element.appendChild(li_delete_button);
        li_element.prepend(li_checkbox);
        ul_element.appendChild(li_element);
        shopping_list_from_storage.push(item);

        localStorage.setItem("shopping_list", JSON.stringify(shopping_list_from_storage));

        li_checkbox.addEventListener("change", (e) => {
            item.checked = e.target.checked;
            localStorage.setItem("shopping_list", JSON.stringify(shopping_list_from_storage));
        });

        li_delete_button.addEventListener("click", () => {
            const index = shopping_list_from_storage.indexOf(item);
            shopping_list_from_storage.splice(index, 1);
            localStorage.setItem("shopping_list", JSON.stringify(shopping_list_from_storage));
            li_element.remove();
        });
    }

    function removeAllListItems() {
        while (ul_element.firstChild) {
            ul_element.removeChild(ul_element.firstChild);
        };
        localStorage.removeItem('shopping_list');
    };
};

init();
