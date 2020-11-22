const drawGraph = () => {
  const doc = document.getElementById("canvas");
  const ctx = doc.getContext("2d");
  let n = document.getElementById("fc").value;
  let x = 30;
  let y = 30;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < n; ++i) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    x += 30;
    y += 30;
  }
}
