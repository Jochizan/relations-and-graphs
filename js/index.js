//const grafo = [];
//console.log(grafo);
//grafo.push(1);
//console.log(grafo);
//grafo.push([1, 2]);
//grafo.push([2, 1]);
//const valores = [];
//for(let i = 0; i < 2; ++i) {
  //valores.push(i);
//}
//grafo.push(valores);
//console.log(grafo);
/*for (let i = 0; i < 2; ++i) {*/
//for (let j = 0; j < 2; ++j) {
//console.log(grafo[i][j] + " ");
//}
//console.log("\n");
/*}*/
const aeamanita = () => {
  let num = document.getElementById("valor");
  for (let j = 0; j < num; ++j) {
    for (let i = 0; i < num; ++i) {
      let doc = document.getElementById("stock");
      doc.innerHTML = `<table border="2"><tr>`
      for (let i = 0; i < 2; ++i) {
        for (let j = 0; j < 2; ++j) {
          doc.innerHTML += `<td>${grafo[i][j]}</td>`
        }
        doc.innerHTML += `</tr><tr>`
      }
      doc.innerHTML += `</table>`
    }
  }
}

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
  const valores = [];
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
    //console.log(valores);
    //if (valores.length == fc) {
      //matriz.push(valores);
      //console.log(matriz);
      //for (let j = 0; j < fc; ++j) {
        //valores.pop();
      //}
    //}
  }
  setTimeout(() => {
    for (let i = 0; i < fc; ++i) {
      for (let j = 0; j < fc; ++j) {
        console.log(matriz[i][j]);
      }
    }
    console.log(matriz);
  }, 1000)
}
