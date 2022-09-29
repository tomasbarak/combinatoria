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

function setReferencePage(combination_type) {
    const referencePages = {
        'permutaciones_sin_repeticion': [   `<div id="reference-title-container">
                                                <h1 id="reference-title">Permutaciones sin repetición</h1>
                                            </div>
                                            <div id="reference-container">
                                                <p id="reference">
                                                    Denominamos permutación sin repetición a cada una de las formas enque podemos ordenar un conjunto de 
                                                    <font style="font-family: MJXZERO, MJXTEX-I; font-size: 20px; font-weight: bolder;">n</font> 
                                                    elementos distintos, siendo <font style="font-family: MJXZERO, MJXTEX-I; font-size: 20px; font-weight: bolder;">n</font> 
                                                    un número natural cualquiera.
                                                </p>
                                                <p id="latex-formula"></p>
                                            </div>`, 'P_n=n!'],
        'permutaciones_con_repeticion': [   `<div id="reference-title-container">
                                                <h1 id="reference-title">Permutaciones con repetición</h1>
                                            </div>
                                            <div id="reference-container">
                                                <p id="reference">
                                                    Se refiere a las formas de ordenar un conjunto de 
                                                    <font style="font-family: MJXZERO, MJXTEX-I; font-size: 20px; font-weight: bolder;">n</font> 
                                                    elementos, pero uno
                                                    o más elementos se pueden repetir.
                                                </p>
                                                <p id="latex-formula"></p>
                                            </div>`, 'PR_{n_1;n_2;...n_k} ^{n} =\\frac{n!}{n_1!n_2! \\ldots n_k!}'],
        'permutaciones_circulares': [  `<div id="reference-title-container">
                                            <h1 id="reference-title">Permutaciones circulares</h1>
                                        </div>
                                        <div id="reference-container">
                                            <p id="reference">
                                            Denominamos permutación circular a cada uno de los ordenamientos alrededor de un círculo con un conjunto de 
                                            <font style="font-family: MJXZERO, MJXTEX-I; font-size: 20px; font-weight: bolder;">n</font> elementos distintos.
                                            </p>
                                            <p id="latex-formula"></p>
                                        </div>`, 'PC_n=(n-1)!']
    }

    //Get referencePages keys
    const referencePagesKeys = Object.keys(referencePages);
    if(referencePagesKeys.includes(combination_type)) {
        const reference_page = document.querySelector('.page-referencia');
        reference_page.innerHTML = referencePages[combination_type][0];
        sessionStorage.setItem("combination_type", combination_type);
        console.log(referencePages[combination_type][0])
        changeMathJaxElementFormula(document.querySelector("#latex-formula"), referencePages[combination_type][1]);
    }
}