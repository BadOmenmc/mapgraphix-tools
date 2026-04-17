(function () {

  const input = prompt("Pega la lista de cargas (una por línea):");
  if (!input) return;

  const userLoads = input
    .split('\n')
    .map(x => x.trim())
    .filter(x => x);

  const rows = document.querySelectorAll('#orderSummaryDataTable_wrapper table tbody tr');

  const results = [];

  rows.forEach(row => {

    const tds = row.querySelectorAll('td');
    if (tds.length < 23) return;

    const loadBtn = tds[1].querySelector('button');
    const loadNumber = loadBtn ? loadBtn.innerText.trim() : null;

    if (!loadNumber || !userLoads.includes(loadNumber)) return;

    // 📦 DATA
    const ref = tds[21].innerText.trim();
    const origin = tds[7].innerText.trim();
    const destination = tds[8].innerText.trim();

    const transitStatus = tds[5].innerText.trim();
    const orderStatus = tds[6].innerText.trim();

    const puIn = tds[13].innerText.trim();
    const puOut = tds[14].innerText.trim();

    const delIn = tds[15].innerText.trim();
    const delOut = tds[16].innerText.trim();

    const lastLoc = tds[20].innerText.trim();

    const driver = tds[22].innerText.trim();
    const truck = tds[2].innerText.trim();
    const trailer = tds[3].innerText.trim();

    // 🧾 FORMATO
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

  alert(`✅ ${results.length} loads procesados y copiados`);

})();
