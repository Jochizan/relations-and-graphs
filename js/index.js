'use strict'

const crearArray = () => {
  let fc = parseInt(document.getElementById("fc").value);
  let doc = document.getElementById("stock");
  doc.innerHTML = "";
  let numInputs = 1;
  let val = 1;
  let range = 1;
  for (let i = 0; i < fc + 1; ++i) {
    doc.innerHTML += `<div>`
    for (let j = 0; j < fc + 1; ++j) {
      if (i !== 0 && j !== 0) {
        doc.innerHTML += `<input type="number" id="input${numInputs}" class="inputs-array">`
        numInputs++;
      } else {
        if (i === 0 && j === 0) {
          doc.innerHTML += `<input tpye="text" id="val${0}" class="fx-val" placeholder="cls">`;
          continue;
        }
        if (i !== 0) {
          doc.innerHTML += `<input type="text" id="val${val}" class="fx-val">`;
        }
        if (j !== 0) {
          doc.innerHTML += `<input type="text" id="val${val}" class="cx-val">`;
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

const reflexivo = (matriz=[]) => {
  let fc = matriz.length;
  let count = 0;
  for (let i = 0; i < fc; ++i) {
    for (let j = 0; j < fc; ++j) {
      if (i === j) {
        if (matriz[i][j] === 1) {
          count++;
        }
      }
    }
  }
  return (count === fc)
    ? true
    : false;
}

const irreflexivo = (matriz=[]) => {
  let fc = matriz.length;
  let count = 0;
  for (let i = 0; i < fc; ++i) {
    for (let j = 0; j < fc; ++j) {
      if (i === j) {
        if (matriz[i][j] === 0) {
          count++;
        }
      }
    }
  }
  return (count === fc)
    ? true
    : false;
}

const simetrica = (matriz=[]) => {
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
