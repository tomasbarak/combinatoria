const menu_items = document.querySelectorAll('.top-nav-bar-item');

menu_items.forEach((item) => {
    const parent_element = item;
    const item_title = parent_element.children[0];
    const item_submenu = parent_element.children[1];
    const item_submenu_items = item_submenu ? item_submenu.children : null;

    parent_element.addEventListener("click", () => {
        if (check_if_submenu_is_visible(item_submenu)) {
            show_single_submenu(null);
        } else {
            show_single_submenu(item_submenu);
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