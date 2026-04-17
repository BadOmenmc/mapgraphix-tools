(function () {

  alert("SCRIPT CARGADO");

  const input = prompt("Pega la lista de cargas (una por línea):");
  if (!input) return;

  const userLoads = input.split('\n').map(x => x.trim()).filter(x => x);

  const checkTable = setInterval(() => {

    const rows = document.querySelectorAll('#orderSummaryDataTable_wrapper table tbody tr');

    if (rows.length === 0) return;

    clearInterval(checkTable);

    const results = [];
    const get = (tds, i) => tds[i]?.innerText.trim() || "-";

    rows.forEach(row => {
      const tds = row.querySelectorAll('td');
      if (tds.length < 23) return;

      const loadBtn = tds[1].querySelector('button');
      const loadNumber = loadBtn ? loadBtn.innerText.trim() : null;

      if (!loadNumber || !userLoads.includes(loadNumber)) return;

      const ref = get(tds, 21);
      const origin = get(tds, 7);
      const destination = get(tds, 8);
      const transitStatus = get(tds, 5);
      const orderStatus = get(tds, 6);
      const puIn = get(tds, 13);
      const puOut = get(tds, 14);
      const delIn = get(tds, 15);
      const delOut = get(tds, 16);
      const lastLoc = get(tds, 20);
      const driver = get(tds, 22);
      const truck = get(tds, 2);
      const trailer = get(tds, 3);

      const block =
`🔢 ${loadNumber}
Ref: ${ref}
📍 ${origin} - ${destination}

🚚 ${transitStatus} - ${orderStatus}

PU: IN ${puIn} - OUT ${puOut}
DEL: IN ${delIn} - OUT ${delOut}

📌 Last: ${lastLoc}

👤 Driver: ${driver}
🚛 Truck: ${truck}
📦 Trailer: ${trailer}
-----------------------------`;

      results.push(block);
    });

    const output = results.join('\n\n');

    const temp = document.createElement('textarea');
    temp.value = output;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);

    alert(`✅ ${results.length} loads procesados`);

  }, 500);

})();
