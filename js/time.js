const timeStatus = () => {
  let momentActual = new Date();
  let hora = momentActual.getHours();
  let minuto = momentActual.getMinutes();
  let segundo = momentActual.getSeconds();
  // agregando un 0 si fuese de 1 sola cifra
  minuto = checkTime(minuto);
  segundo = checkTime(segundo);
  document.getElementById('clock').innerHTML = hora + " : " + minuto + " : " + segundo;
  //document.form_reloj.reloj.value = mostrar;
  setTimeout("timeStatus()", 1000);
}

const checkTime = (i="") => (i < 10)
  ? '0' + i
  : i;
