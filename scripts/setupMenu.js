

function setup_menu() {
    const menu_items = document.querySelectorAll('.top-nav-bar-item');

    menu_items.forEach((item) => {
        const parent_element = item;
        const item_title = parent_element.children[0];
        const item_submenu = parent_element.children[1];
        const item_submenu_items = item_submenu ? item_submenu.children : [];
        parent_element.addEventListener("click", () => {
            if (check_if_submenu_is_visible(item_submenu)) {
                show_single_submenu(null, menu_items);
            } else {
                show_single_submenu(item_submenu, menu_items);
            }
        })

        Array.prototype.slice.call(item_submenu_items).forEach((submenu_item) => {
            submenu_item.addEventListener("click", () => {
                const menu_name = String(item_title.innerText).normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s/g, '_');
                const submenu_name = String(submenu_item.innerText).normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s/g, '_');
                const combination_type = menu_name + '_' + submenu_name;
                select_method(combination_type);
            })
        })
    })
}

function setup_desplegable_menu() {
    const desplegable_menu_items = document.querySelectorAll('.desplegable-menu-item-desplegable');

    desplegable_menu_items.forEach((item) => {
        const parent_element = item;
        const row_wrapper = parent_element.children[0];
        const item_submenu = parent_element.children[1];
        const item_submenu_items = item_submenu ? item_submenu.children[0].children : [];
        const item_chevron = row_wrapper.children[0];
        const item_title = row_wrapper.children[1];

        const rotateChevron = isRotated => {
            if(isRotated){
                item_chevron.classList.remove("rotated");
                item_submenu.classList.remove("desplegable-submenu-visible");
                parent_element.classList.remove("desplegable-menu-item-desplegable-opened");
                parent_element.classList.add("desplegable-menu-item-desplegable-closed");
                return;
            }
            item_submenu.classList.add("desplegable-submenu-visible");
            item_chevron.classList.add("rotated");
            parent_element.classList.add("desplegable-menu-item-desplegable-opened");
            parent_element.classList.remove("desplegable-menu-item-desplegable-closed");
            return;
        }

        parent_element.addEventListener("click", () => {
            if(item_submenu) {
                rotateChevron(item_chevron.classList.contains("rotated"));
            }
        });

        Array.prototype.slice.call(item_submenu_items).forEach((submenu_item) => {
            submenu_item.addEventListener("click", () => {
                const menu_name = String(item_title.innerText).normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s/g, '_');
                const submenu_name = String(submenu_item.innerText).normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s/g, '_');
                const combination_type = menu_name + '_' + submenu_name;
                select_method(combination_type);
            })
        });
    })
}

function setup_hamburger() {
    let hamburger = document.querySelectorAll(".hamburger");
    let dimmer = document.querySelector("#dimmer");
    let desplegableMenu = document.querySelector("#desplegable-menu");
    let isDimmerVisible = false;
    hamburger.forEach((hamburger) => {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("is-active");
            if (isDimmerVisible) {
                $("#dimmer").fadeOut(200);
            } else {
                $("#dimmer").fadeIn(200);
            }
            isDimmerVisible = !isDimmerVisible;
            desplegableMenu.classList.toggle("desplegable-menu-visible");
            desplegableMenu.classList.toggle("desplegable-menu-invisible");
        });
    });
    dimmer.addEventListener("click", () => {
        hamburger[0].click();
    });
}

function show_single_submenu(submenu, menu_items) {
    hide_all_submenus(menu_items);
    if(submenu) {
        submenu.classList.toggle("menu-visible");
    }
}

function select_method(combination_type) {
    const page_selector = document.querySelector('.page-selector-container');
    const select_combination_type = document.querySelector('#select-combination-type');

    if(combination_type === null || combination_type === undefined || combination_type === '') {
        page_selector.style.display = 'none';
        select_combination_type.style.display = 'flex';
    }

    page_selector.style.display = "flex";
    select_combination_type.style.display = "none";
    
    setReferencePage(combination_type);
    changeDataAndCalcPage(combination_type);
    return;
}

function hide_all_submenus(menu_items) {
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