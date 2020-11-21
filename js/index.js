const graficar = () => {
  let fc = document.getElementById("fc").value;
  let doc = document.getElementById("stock");
  let c = 1;
  for (let i = 0; i < fc; ++i) {
    doc.innerHTML += `<div>`
    for (let j = 0; j < fc; ++j) {
      doc.innerHTML += `<input type="number" id="input${c}" style="height: 40px; width: 40px; font-size: 12px; ">`
      c++;
    }
    doc.innerHTML += `</div>`
  }
}

const extraer = () => {
  const matriz = [];
  let fc = document.getElementById("fc").value;
  let k = 0;
  let l = 0;
  for (let i = 0; i < fc; ++i) {
    matriz.push([]);
  }
  for (let i = 0; i < fc * fc; ++i) {
    let valor = parseInt(document.getElementById(`input${i+1}`).value);
    matriz[l][k] = valor;
    k++;
    if (k == fc) {
      k = 0;
      l++;
    }
  }
  setTimeout(() => {
    for (let i = 0; i < fc; ++i) {
      for (let j = 0; j < fc; ++j) {
        console.log(matriz[i][j]);
      }
    }
    (reflexivo(matriz))
      ? console.log("La matriz SI es reflexiva")
      : console.log("La matriz NO es reflexiva");
    (irreflexivo(matriz))
      ? console.log("La matriz SI es irreflexiva")
      : console.log("La matriz NO es irreflexiva");
    (transitiva(matriz))
      ? console.log("La matriz SI es transitiva")
      : console.log("La matriz NO es transitiva");
    (simetrica(matriz))
      ? console.log("La matriz SI es simetrica")
      : console.log("La matriz NO es simetrica");
    (asimetrica(matriz))
      ? console.log("La matriz SI es asimetrica")
      : console.log("La matriz NO es asimetrica");
    (antisimetrica(matriz))
      ? console.log("La matriz SI es antisimetrica")
      : console.log("LA matriz NO es antisimetrica");
    console.log(matriz);
  }, 500)
}

const reflexivo = (matriz=[]) => {
  let fc = matriz.length;
  let count = 0;
  for (let i = 0; i < fc; ++i) {
    for (let j = 0; j < fc; ++j) {
      if (i == j) {
        if (matriz[i][j] == 1) {
          count++;
        }
      }
    }
  }
  return (count == fc)
    ? true
    : false;
}

const irreflexivo = (matriz=[]) => {
  let fc = matriz.length;
  let count = 0;
  for (let i = 0; i < fc; ++i) {
    for (let j = 0; j < fc; ++j) {
      if (i == j) {
        if (matriz[i][j] == 0) {
          count++;
        }
      }
    }
  }
  return (count == fc)
    ? true
    : false;
}

const simetrica = (matriz=[]) => {
  let ok = true;
  let n = matriz.length;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (matriz[i][j] != matriz[j][i]) {
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
      if (i != j) {
        if (matriz[i][j] == matriz[j][i] && matriz[i][j] != 0 && matriz[j][i] != 0) {
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
      if (i != j) {
        if (matriz[i][j] == matriz[j][i] && matriz[i][j] != 0 && matriz[j][i] != 0) {
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
      if (matriz[i][j] == 1) {
        for (let k = 0; k < n; ++k) {
          if (matriz[j][k] == 1 && matriz[i][k] == 0) {
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
