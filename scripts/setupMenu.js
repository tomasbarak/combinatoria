const menu_items = document.querySelectorAll('.top-nav-bar-item');
const desplegable_menu_items = document.querySelectorAll('.desplegable-menu-item-desplegable');

menu_items.forEach((item) => {
    const parent_element = item;
    const item_title = parent_element.children[0];
    const item_submenu = parent_element.children[1];
    const item_submenu_items = item_submenu ? item_submenu.children : [];
    parent_element.addEventListener("click", () => {
        if (check_if_submenu_is_visible(item_submenu)) {
            show_single_submenu(null);
        } else {
            show_single_submenu(item_submenu);
        }
    })
    Array.prototype.slice.call(item_submenu_items).forEach((submenu_item) => {
        console.log(submenu_item);
        submenu_item.addEventListener("click", () => {
            const menu_name = String(item_title.innerText).normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s/g, '_');
            const submenu_name = String(submenu_item.innerText).normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s/g, '_');
            const combination_type = menu_name + '_' + submenu_name;
            console.log(combination_type);
            console.log("submenu item clicked");
            setReferencePage(combination_type);
        })
    })
})

desplegable_menu_items.forEach((item) => {
    const parent_element = item;
    const row_wrapper = parent_element.children[0];
    const item_submenu = parent_element.children[1];

    const item_chevron = row_wrapper.children[0];
    const item_title = row_wrapper.children[1];

    parent_element.addEventListener("click", () => {
        if(item_submenu) {
            if(item_chevron.classList.contains("rotated")){
                item_chevron.classList.remove("rotated");
                item_submenu.classList.remove("desplegable-submenu-visible");
                parent_element.classList.remove("desplegable-menu-item-desplegable-opened");
                parent_element.classList.add("desplegable-menu-item-desplegable-closed");
                console.log("closed");
            } else {
                item_submenu.classList.add("desplegable-submenu-visible");
                item_chevron.classList.add("rotated");
                parent_element.classList.add("desplegable-menu-item-desplegable-opened");
                parent_element.classList.remove("desplegable-menu-item-desplegable-closed");
                console.log("opened");
            }
        }
    })
})


function show_single_submenu(submenu) {
    hide_all_submenus();
    if(submenu) {
        submenu.classList.toggle("menu-visible");
    }
}

function hide_all_submenus() {
    menu_items.forEach((item) => {
        const parent_element = item;
        const item_submenu = parent_element.children[1];
        if(item_submenu) {
            item_submenu.classList.remove("menu-visible");
        }
    })
}

function check_if_submenu_is_visible(submenu) {
    if(submenu) {
        return submenu.classList.contains("menu-visible");
    }
}