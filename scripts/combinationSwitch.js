const referencePages = {
    'permutaciones_sin_repeticion': [   `<div id="reference-title-container">
                                            <h2 id="reference-title">Permutaciones sin repetición</h2>
                                        </div>
                                        <div id="reference-container">
                                            <p id="reference">
                                                Denominamos permutación sin repetición a cada una de las formas enque podemos ordenar un conjunto de 
                                                <font style="font-family: MJXZERO, MJXTEX-I; font-size: 20px; font-weight: bolder;">n</font> 
                                                elementos distintos, siendo <font style="font-family: MJXZERO, MJXTEX-I; font-size: 20px; font-weight: bolder;">n</font> 
                                                un número natural cualquiera.
                                            </p>
                                            <p id="latex-formula"></p>
                                        </div>`],
    'permutaciones_con_repeticion': [   `<div id="reference-title-container">
                                            <h2 id="reference-title">Permutaciones con repetición</h2>
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
                                        <h2 id="reference-title">Permutaciones circulares</h2>
                                    </div>
                                    <div id="reference-container">
                                        <p id="reference">
                                        Denominamos permutación circular a cada uno de los ordenamientos alrededor de un círculo con un conjunto de 
                                        <font style="font-family: MJXZERO, MJXTEX-I; font-size: 20px; font-weight: bolder;">n</font> elementos distintos.
                                        </p>
                                        <p id="latex-formula"></p>
                                    </div>`, 'PC_n=(n-1)!']
}

const dataAndCalcPages = {
    'permutaciones_sin_repeticion': [   `<div id="data-title-container">
                                            <h2 id="data-title">Ingrese los datos necesarios para:</h2>
                                            <p id="data-calc-latex-formula"></p>
                                            <h2 id="data-title2">Datos</h2>
                                        </div>
                                        <div id="data-container">
                                            <div class="data-input-container">
                                                <label for="data-input-n"><font style="font-family: MJXZERO, MJXTEX-I; font-size: 20px; font-weight: bolder;">n</font>:</label>
                                                <input class="data-input" onkeypress="return isNumberKey(event)" type="number" id="data-input-n" name="data-input" min="0" max="100" value="0" required>    
                                            </div>
                                        </div>`, 'P_n=n!']
}

function setReferencePage(combination_type) {
    //Get referencePages keys
    const referencePagesKeys = Object.keys(referencePages);
    if(referencePagesKeys.includes(combination_type)) {
        const reference_page = document.querySelector('.page-referencia');
        reference_page.innerHTML = referencePages[combination_type][0];
        sessionStorage.setItem("combination_type", combination_type);
        changeMathJaxElementFormula(document.querySelector("#data-calc-latex-formula"), referencePages[combination_type][1]);
    }
}

function changeDataAndCalcPage(combination_type) {
    const dataAndCalcPagesKeys = Object.keys(dataAndCalcPages);
    if(dataAndCalcPagesKeys.includes(combination_type)) {
        const data_calc_page = document.querySelector('.page-datos-y-calculos');
        data_calc_page.innerHTML = dataAndCalcPages[combination_type][0];
        sessionStorage.setItem("combination_type", combination_type);
        changeMathJaxElementFormula(document.querySelector("#data-calc-latex-formula"), dataAndCalcPages[combination_type][1]);
    }
}
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    console.log();
    if (charCode > 31 && (charCode < 48 || charCode > 57) || (Number(evt.target.value) > 10))
        return false;
    return true;
}