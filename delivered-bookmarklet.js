(function () {

  // 🧼 evitar duplicados
  const old = document.getElementById("tool-box");
  if (old) old.remove();

  // 📦 contenedor
  const box = document.createElement("div");
  box.id = "tool-box";
  box.style = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 300px;
    background: #1e1e1e;
    color: white;
    padding: 15px;
    border-radius: 10px;
    z-index: 99999;
    font-family: sans-serif;
  `;

  box.innerHTML = `
    <h4>Load Tool</h4>
    <textarea id="loads-input" placeholder="Pega cargas aquí..." style="width:100%;height:100px;"></textarea>
    <button id="run-btn" style="margin-top:10px;width:100%;">Procesar</button>
  `;

  document.body.appendChild(box);

  document.getElementById("run-btn").onclick = () => {

    const input = document.getElementById("loads-input").value;

    const userLoads = input.split('\n').map(x => x.trim()).filter(x => x);

    const rows = document.querySelectorAll('#orderSummaryDataTable_wrapper table tbody tr');

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

    navigator.clipboard.writeText(output);

    alert("✅ Copiado al portapapeles");

  };

})();
