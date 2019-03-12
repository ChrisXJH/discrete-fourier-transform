function graph(ctx, data, color = 'blue') {
  const { x, y } = data;
  const height = ctx.canvas.height;
  const width = ctx.canvas.width;

  const yMax = Math.max.apply(null, y);
  const yMin = Math.min.apply(null, y);
  const xStart = x[0];
  const xEnd = x[x.length - 1];

  const heightScale = (-height / (yMax - yMin)) * 0.5;
  const widthScale = (width / (xEnd - xStart)) * 0.8;

  const xOffset = 40;
  const yOffset = height / 2;

  ctx.beginPath();

  // draw x axis
  const xStep = Math.ceil((xEnd - xStart) / (width / 40));
  for (let i = xStart; i <= xEnd; i += xStep) {
    ctx.fillText(i.toFixed(2), xOffset + widthScale * i - 10, yOffset + 20);
  }

  // draw y axis
  const yStep = Math.ceil((yMax - yMin) / (height / 40));
  for (let i = yMin; i <= yMax; i += yStep) {
    ctx.fillText(i.toFixed(2), 0, yOffset + heightScale * i);
  }

  for (let i = 0; i < x.length; i++) {
    ctx.lineTo(xOffset + widthScale * x[i], yOffset + heightScale * y[i]);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}
