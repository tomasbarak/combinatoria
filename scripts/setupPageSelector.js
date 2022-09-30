const page_selector_container = document.querySelectorAll('.page-selector-container');

page_selector_container.forEach((container) => {
    const selector = container.querySelector('.page-selector ');
    const selector_items = selector.querySelectorAll('.selector-item');
    const page_content = container.querySelector(".page-content");
    const pages = Array.prototype.slice.call(page_content.getElementsByTagName("page"));
    selector_items.forEach((item) => {
        const item_title = item.innerHTML;

        item.addEventListener("click", () => {
            selector_items.forEach((item) => {
                item.classList.remove("selector-item-selected");
            })
            item.classList.add("selector-item-selected");
            const page_name = item_title.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/ /g, "-");
            const page_component = page_content.querySelector(`.page-${page_name}`);

            pages.forEach((page) => {
                page.classList.remove("page-visible");
            });

            page_component.classList.add("page-visible");
        });
    });
});