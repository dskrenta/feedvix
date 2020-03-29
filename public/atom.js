function atom({ symbol, shells }) {
  let htmlStr = '<div class="atomContain">';
  htmlStr += `<div class="atomCenter">${symbol}</div>`;

  let size = 50;
  for (let i in shells) {
    size += 20;
    htmlStr += `
      <div 
        class="atomShell" 
        style="
          height: ${size}px;
          width: ${size}px;
          top: calc(50% - ${size / 2}px);
          left: calc(50% - ${size / 2}px);
          z-index: ${200 - size};
        "
      >
    `;

    const eCount = shells[i];
    const electrons = Array(eCount).fill(0);
    const radius = size / 2;
    const width = size - 12;

    for (let j in electrons) {
      const angle = (j / (eCount / 2)) * Math.PI;
      const x = (radius * Math.cos(angle)) + (width / 2);
      const y = (radius * Math.sin(angle)) + (width / 2);

      htmlStr += `
        <div 
          class="atomElectron"
          style="
            top: ${y}px;
            left: ${x}px;
          "
        ></div>
      `;
    }

    htmlStr += '</div>';
  }

  htmlStr += '</div>';
  return htmlStr;
}