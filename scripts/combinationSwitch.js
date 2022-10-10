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
                                            <h2 id="data-title">Datos</h2>
                                            <p id="data-calc-latex-formula"></p>
                                        </div>
                                        <div id="data-container">
                                            <div class="data-input-container">
                                                <label for="data-input-n"><font style="font-family: MJXZERO, MJXTEX-I; font-size: 20px; font-weight: bolder;">n</font>:</label>
                                                <input class="data-input" onpaste="return isNaturalNumber(event.clipboardData.getData('text'))" onkeypress="return isNumberKey(event)" type="number" id="data-input-n" name="data-input" min="0" max="100" value="0" required>    
                                            </div>
                                            <div class="calc-btn-container">
                                                <a class="calc-btn" onclick="calculators['psr']()">Calcular</a>
                                            </div>
                                            <h2 id="data-result-title">Resultado</h2>
                                            <div id="data-result-container">
                                                <h3 id="data-result"></h3>
                                            </div>
                                            <h2 >Ejemplo</h2>
                                            <h3 id="data-example"></h3>
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
    return isNaturalNumber(String.fromCharCode(charCode));
}

function isNaturalNumber(n) {
    n = n.toString();
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}


let calculators = {
    'psr': () => {
        let n = document.querySelector("#data-input-n").value;
        let result = window.Combinatorics.permutation(n, n);
        let result_array = [];
        for(let i = 1; i <= n; i++) {
            result_array.push(i.toString());
        }
        let example = new window.Combinatorics.Permutation(result_array, n);
        console.log(example.length, example.sample(), result_array);
        document.querySelector("#data-result").innerHTML = `${result}`;
        document.querySelector("#data-example").innerHTML = `${example.sample().join(", ")}`;
        visualizators['psr']();
    },
    'pcr': () => {

    }
}

let visualizators = {
    'psr': () => {
        let n = document.querySelector("#data-input-n").value;
        let page_visualizador = document.querySelector('.page-visualizador');
        let visualizer_title = page_visualizador.querySelector('visualizer-title');


        //Generate array of characters from a to z
        let characters = [];
        for(let i = 0; i < n; i++) {
            characters.push(String.fromCharCode(65 + i));
        }


        //Generate permutations
        let permutations = new window.Combinatorics.Permutation(characters, n);
        let permutations_array = permutations.toArray();

        //Generate permutations table
        let permutations_table = document.querySelector("#visualizador-table");
        permutations_table.innerHTML = "";
        visualizer_title.innerHTML = "Conjunto: [" + characters.join(", ") + "]";
        for(let i = 0; i < permutations_array.length; i++) {
            let permutations_table_row = document.createElement("visualizer-row");
            for(let j = 0; j < n; j++) {
                let permutations_table_cell = document.createElement("visualizer-element");
                permutations_table_cell.innerHTML = permutations_array[i][j];
                permutations_table_row.appendChild(permutations_table_cell);
            }
            permutations_table.appendChild(permutations_table_row);
        }
    }
}