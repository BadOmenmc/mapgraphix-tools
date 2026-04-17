(function () {

  // 🧼 evitar duplicados
  const old = document.getElementById("tool-box");
  if (old) old.remove();

  // 📦 contenedor UI
  const box = document.createElement("div");
  box.id = "tool-box";
  box.style = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 320px;
    background: #1e1e1e;
    color: white;
    padding: 15px;
    border-radius: 10px;
    z-index: 99999;
    font-family: sans-serif;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  `;

  box.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h4 style="margin:0;">Load Tool</h4>
      <button id="close-btn" style="background:red;color:white;border:none;border-radius:5px;width:25px;height:25px;cursor:pointer;">X</button>
    </div>

    <textarea id="loads-input" placeholder="Pega cargas aquí..." 
      style="width:100%;height:100px;margin-top:10px;"></textarea>

    <button id="run-btn" 
      style="margin-top:10px;width:100%;padding:8px;background:#4CAF50;border:none;color:white;border-radius:5px;cursor:pointer;">
      Procesar
    </button>
  `;

  document.body.appendChild(box);

  // ❌ cerrar panel
  document.getElementById("close-btn").onclick = () => {
    box.remove();
  };

  document.getElementById("run-btn").onclick = () => {

    const input = document.getElementById("loads-input").value;

    // 🔢 extraer números del input
    const userLoads = input
      .split('\n')
      .map(x => {
        const match = x.match(/\d+/);
        return match ? match[0].trim() : null;
      })
      .filter(x => x);

    const rows = document.querySelectorAll('#orderSummaryDataTable_wrapper table tbody tr');

    const results = [];
    const get = (tds, i) => tds[i]?.innerText.trim() || "-";

    rows.forEach(row => {

      const tds = row.querySelectorAll('td');
      if (tds.length < 23) return;

      // 🔢 Reference limpio (solo números)
      const refNumber = get(tds, 21).replace(/\D/g, '');

      if (!refNumber || !userLoads.includes(refNumber)) return;

      // 🔢 Order #
      const loadBtn = tds[1].querySelector('button');
      const loadNumber = loadBtn ? loadBtn.innerText.trim() : "-";

      // 📦 DATA
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
`🔢 Ref: ${refNumber}
Load: ${loadNumber}
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

    alert(`✅ ${results.length} loads encontrados y copiados`);

  };

})();
