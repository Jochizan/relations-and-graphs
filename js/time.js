const timeStatus = () => {
  let momentActual = new Date();
  let hora = momentActual.getHours();
  let minuto = momentActual.getMinutes();
  let segundo = momentActual.getSeconds();
  let mostrar = hora + " : " + minuto + " : " + segundo;
  document.form_reloj.reloj.value = mostrar;
  setTimeout("timeStatus()", 1000);
}
