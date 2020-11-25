'use strict'

const crearArray = () => {
  const fc = parseInt(document.getElementById("fc").value);
  const doc = document.getElementById("stock");
  doc.innerHTML = "";
  let numInputs = 1;
  let val = 1;
  let range = 1;
  for (let i = 0; i < fc + 1; ++i) {
    doc.innerHTML += `<div>`
    for (let j = 0; j < fc + 1; ++j) {
      if (i !== 0 && j !== 0) {
        doc.innerHTML += `<input type="number" id="input${numInputs}" min="0" max="1" class="inputs-array">`
        numInputs++;
      } else {
        if (i === 0 && j === 0) {
          doc.innerHTML += `<p id="val${val}" class="fx-val">n</p>`;
          continue;
        }
        if (i !== 0) {
          doc.innerHTML += `<p id="val${val}" class="fx-val">${range}</p>`;
        }
        if (j !== 0) {
          doc.innerHTML += `<p id="val${val}" class="cx-val">${range}</p>`;
        }
        val++;
        range++;
        if (range - 1 === fc) {
          range = 1;
        }
      }
    }
    doc.innerHTML += `</div>`
  }
}

const calcular = () => {
  const fc = document.getElementById("fc").value;
  const matriz = [];
  let k = 0;
  let l = 0;
  for (let i = 0; i < fc; ++i) {
    matriz.push([]);
  }
  for (let i = 0; i < fc * fc; ++i) {
    matriz[l][k] = parseInt(document.getElementById(`input${i+1}`).value);
    k++;
    if (k == fc) {
      k = 0;
      l++;
    }
  }
  const reflexivo1 = document.getElementById("reflexivo");
  const irreflexivo2 = document.getElementById("irreflexivo");
  const simetrico3 = document.getElementById("simetrica");
  const asimetrico4 = document.getElementById("asimetrica");
  const antisimetrico5 = document.getElementById("antisimetrica");
  const transitiva6 = document.getElementById("transitiva");
  (reflexivo(matriz))
    ? reflexivo1.innerHTML = "SI ES REFLEXIVO"
    : reflexivo1.innerHTML = "NO ES REFLEXIVO";
  (irreflexivo(matriz))
    ? irreflexivo2.innerHTML = "SI ES IRREFLEXIVO"
    : irreflexivo2.innerHTML = "NO ES IRREFLEXIVO";
  (simetrica(matriz))
    ? simetrico3.innerHTML = "SI ES SIMETRICA"
    : simetrico3.innerHTML = "NO ES SIMETRICA";
  (asimetrica(matriz))
    ? asimetrico4.innerHTML = "SI ES ASIMETRICA"
    : asimetrico4.innerHTML = "NO ES ASIMETRICA";
  (antisimetrica(matriz))
    ? antisimetrico5.innerHTML = "SI ES ANTISIMETRICA"
    : antisimetrico5.innerHTML = "NO ES ANTISIMETRICA";
  (transitiva(matriz))
    ? transitiva6.innerHTML = "SI ES TRANSITIVA"
    : transitiva6.innerHTML = "NO ES TRANSITIVA";
  console.log(matriz);
}

const matrizRelacional = () => {
  const matriz = generarMatriz();
  const doc = document.getElementById("stock");
  const fc = matriz.length;
  doc.innerHTML = "";
  let numInputs = 1;
  let val = 1;
  let range = 1;
  for (let i = 0; i < fc + 1; ++i) {
    doc.innerHTML += `<div>`
    for (let j = 0; j < fc + 1; ++j) {
      if (i !== 0 && j !== 0) {
        doc.innerHTML += `<input type="number" id="input${numInputs}" min="0" max="1" value="${matriz[i][j]}"class="inputs-array">`
        numInputs++;
      } else {
        if (i === 0 && j === 0) {
          doc.innerHTML += `<p id="val${val}" class="fx-val">n</p>`;
          continue;
        }
        if (i !== 0) {
          doc.innerHTML += `<p id="val${val}" class="fx-val">${range}</p>`;
        }
        if (j !== 0) {
          doc.innerHTML += `<p id="val${val}" class="cx-val">${range}</p>`;
        }
        val++;
        range++;
        if (range - 1 === fc) {
          range = 1;
        }
      }
    }
    doc.innerHTML += `</div>`
  }
}

const generarMatriz = () => {
  
}

const generarVector = () => {
  if (!validateFirst()) {
    return document.getElementById("messageValid").innerHTML = "NO SE PUEDE GENERAR LA MATRIZ";
  }
  const vector = [];
  const mostrar = document.getElementById("expression-preview-ruler")
  const title = document.getElementById("title-expression")
  const text = document.getElementById("expression3").value;
  const value1 = document.getElementById("expression1").value;
  const value2 = document.getElementById("expression5").value;
  const condition1 = document.getElementById("expression2").value;
  const condition2 = document.getElementById("expression4").value;
  const solve1 = value1 + " = "+ text;
  const solve2 = value2 + " = "+ text;
  const solution1 = nerdamer.solve(solve1, 'x');
  const solution2 = nerdamer.solve(solve2, 'x');
  let principio = solution1.symbol.elements[0].multiplier.num.value /
    solution1.symbol.elements[0].multiplier.den.value;
  let final = solution2.symbol.elements[0].multiplier.num.value /
    solution2.symbol.elements[0].multiplier.den.value;
  if (condition1 === "<=" && condition2 === "<=") {
    for (let i = Math.ceil(principio); i <= Math.floor(final); ++i) {
      vector.push(i);
    }
  } else if (condition1 === "<=" && condition2 === "<") {
    let ok = (Math.floor(final) === final);
    if(!ok)
      final = Math.ceil(final)
    for (let i = Math.ceil(principio); i < final; ++i) {
      vector.push(i);
    }
  } else if (condition1 === "<" && condition2 === "<=") {
    let ok = (Math.floor(principio) === principio)
    if(!ok)
      principio = Math.ceil(principio)
    else
      principio++;
    for (let i = principio; i <= Math.floor(final); ++i) {
      vector.push(i);
    }
  } else {
    let ok = (Math.floor(final) === final);
    let ans = (Math.floor(principio) === principio);
    if(!ok)
      final = Math.ceil(final);
    if(!ans)
      principio = Math.ceil(principio)
    else
      principio++;
    for (let i = principio; i < final; ++i) {
      vector.push(i);
    }
  }
  mostrar.innerHTML = "";
  title.innerHTML = "Estos son los valores que cumplen la condición anterior"
  for (let i = 0; i < vector.length - 1; ++i) {
    mostrar.innerHTML += `<p style="font-size: 3.2rem;">${vector[i]},</p>`
  }
  mostrar.innerHTML += `<p style="font-size: 3.2rem;">${vector[vector.length - 1]}</p>`
  console.log(vector);
  return vector;
}

const reflexivo = (matriz=[]) => {
  if (matriz.length === 0) {
    console.error("Error no puede ingresar una matriz nula");
  }
  let fc = matriz.length;
  let count = 0;
  for (let i = 0; i < fc; ++i) {
    if (matriz[i][i] === 1) {
      count++;
    }
  }
  return (count === fc)
    ? true
    : false;
}

const irreflexivo = (matriz=[]) => {
  if (matriz === []) {
    console.error("Error no puede ingresar una matriz nula");
  }
  let fc = matriz.length;
  let count = 0;
  for (let i = 0; i < fc; ++i) {
    if (matriz[i][i] === 0) {
      count++;
    }
  }
  return (count === fc)
    ? true
    : false;
}

const simetrica = (matriz=[]) => {
  if (matriz === []) {
    console.error("Error no puede ingresar una matriz nula");
  }
  let ok = true;
  let n = matriz.length;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (matriz[i][j] !== matriz[j][i]) {
        ok = false;
        break;
      }
    }
    if (!ok) {
      break;
    }
  }
  return (ok)
    ? true
    : false;
}

const asimetrica = (matriz=[]) => {
  if (matriz === []) {
    console.error("Error no puede ingresar una matriz nula");
  }
  let ok = true;
  let n = matriz.length;
  if (!irreflexivo(matriz)) {
    return !ok;
  }
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (i !== j) {
        if (matriz[i][j] === matriz[j][i] && matriz[i][j] !== 0 && matriz[j][i] !== 0) {
          ok = false;
          break;
        }
      }
    }
    if (!ok) {
      break;
    }
  }
  return (ok)
    ? true
    : false;
}

const antisimetrica = (matriz=[]) => {
  if (matriz === []) {
    console.error("Error no puede ingresar una matriz nula");
  }
  let ok = true;
  let n = matriz.length;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (i !== j) {
        if (matriz[i][j] === matriz[j][i] && matriz[i][j] !== 0 && matriz[j][i] !== 0) {
          ok = false;
          break;
        }
      }
    }
    if (!ok) {
      break;
    }
  }
  return (ok)
    ? true
    : false;
}

const transitiva = (matriz=[]) => {
  if (matriz === []) {
    console.error("Error no puede ingresar una matriz nula");
  }
  let transitividad = true;
  let n = matriz.length;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (matriz[i][j] === 1) {
        for (let k = 0; k < n; ++k) {
          if (matriz[j][k] === 1 && matriz[i][k] === 0) {
            transitividad = false;
            break;
          }
        }
      }
      if (!transitividad) {
        break;
      }
    }
    if (!transitividad) {
      break;
    }
  }
  return (transitividad)
    ? true
    : false;
}
