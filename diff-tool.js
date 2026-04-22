document.getElementById("run-diff").onclick = () => {

  const getNumber = (line) => {
    const match = line.match(/\d{6,}/);
    return match ? match[0] : null;
  };

  const listAraw = document.getElementById("list-a").value
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);

  const listBraw = document.getElementById("list-b").value
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);

  const listA = listAraw
    .map(getNumber)
    .filter(Boolean);

  const newLoads = listBraw.filter(line => {
    const num = getNumber(line);
    return num && !listA.includes(num);
  });

  const output = newLoads.join('\n\n');

  navigator.clipboard.writeText(output);

  alert(`🆕 ${newLoads.length} cargas nuevas copiadas`);

};
