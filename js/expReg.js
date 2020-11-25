const validateFirst = () => {
  if (!validateExpresionF()) {
    console.error("La expressión no puede evaluarse");
    return false;
  }
  if (!validateMIMF()) {
    console.error("Hubo un error 👎🏻");
    return false;
  }
  if (!validateBEF()) {
    console.error("Hubo un error con el valor 👎🏻");
    return false;
  }
  console.info("Ta bien 👍🏻");
  return true;
}

const validateSecond = () => {
  if (!validateExpresionS()) {
    console.error("La expressión no puede evaluarse");
    return false;
  }
  console.info("Ta bien 👍🏻");
  return true;
}

const validateBEF = () => {
  const textB = document.getElementById("expression1").value;
  const textE = document.getElementById("expression5").value;
  let ok = (textB.length > 0 && textB.length < 5) && (textE.length > 0 && textE.length < 5);
  ok = (ok && (Math.sign(parseInt(textE) - parseInt(textB)) === 1));
  return (/[0-9]/g.test(textB) && /[0-9]/g.test(textE) && ok)
    ? true
    : false;
}

const validateMIMF = () => {
  const textF = document.getElementById("expression2").value;
  const textS = document.getElementById("expression4").value;
  let ok = (textF.length > 0 && textF.length < 3) && (textS.length > 0 && textS.length < 3);
  return (/[<>][=]*[\s]*/.test(textF) && /[<>][=]*[\s]*/.test(textS) && ok)
    ? true
    : false;
}

const validateExpresionF = () => {
  const textN = document.getElementById("expression3").value;
  return (/[x]+/g.test(textN))
    ? true
    : false;
}

const validateExpresionS = () => {
  const textN = document.getElementById("expression3").value;
  return textN.match(/[^+[>()-]+/g).filter((x) => {
    return !/^{.+?}$/.test(x) 
  });
}
