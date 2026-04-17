(function () {

  const old = document.getElementById("tool-box");
  if (old) old.remove();

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
  `;

  box.innerHTML = `
    <div style="display:flex; justify-content:space-between;">
      <h4 style="margin:0;">Load Tool</h4>
      <button id="close-btn">X</button>
    </div>
    <textarea id="loads-input" style="width:100%;height:100px;margin-top:10px;"></textarea>
    <button id="run-btn" style="margin-top:10px;width:100%;">Procesar</button>
  `;

  document.body.appendChild(box);

  document.getElementById("close-btn").onclick = () => box.remove();

  document.getElementById("run-btn").onclick = () => {

    const input = document.getElementById("loads-input").value;

    const userLoads = input
      .split('\n')
      .map(x => (x.match(/\d+/) || [])[0])
      .filter(Boolean);

    // 🧠 MAPEAR HEADERS → ÍNDICES
    const headers = document.querySelectorAll('#orderSummaryDataTable_wrapper th');

    const columnMap = {};

    headers.forEach((th, i) => {
      const text = th.innerText.trim().toLowerCase();

      if (text.includes("reference")) columnMap.ref = i;
      if (text.includes("order #")) columnMap.order = i;
      if (text.includes("orig loc")) columnMap.origin = i;
      if (text.includes("dest loc")) columnMap.dest = i;
      if (text.includes("transit status")) columnMap.transit = i;
      if (text.includes("order status")) columnMap.status = i;
      if (text.includes("orig arr")) columnMap.puIn = i;
      if (text.includes("act pu")) columnMap.puOut = i;
      if (text.includes("dest arr")) columnMap.delIn = i;
      if (text.includes("act del")) columnMap.delOut = i;
      if (text.includes("last known location")) columnMap.last = i;
      if (text.includes("driver name")) columnMap.driver = i;
      if (text.includes("current trk")) columnMap.truck = i;
      if (text.includes("trailer")) columnMap.trailer = i;
    });

    console.log("🧠 COLUMN MAP:", columnMap);

    if (columnMap.ref === undefined) {
      alert("❌ No se encontró Reference Number");
      return;
    }

    const rows = document.querySelectorAll('#orderSummaryDataTable_wrapper table tbody tr');

    const results = [];

    const get = (tds, key) => {
      const i = columnMap[key];
      return i !== undefined ? tds[i]?.innerText.trim() || "-" : "-";
    };

    rows.forEach(row => {

      const tds = row.querySelectorAll('td');

      const refNumber = get(tds, "ref").replace(/\D/g, '');

      if (!userLoads.includes(refNumber)) return;

      const loadBtn = tds[columnMap.order]?.querySelector('button');
      const loadNumber = loadBtn ? loadBtn.innerText.trim() : "-";

      const block =
`🔢 Ref: ${refNumber}
Load: ${loadNumber}
📍 ${get(tds,"origin")} - ${get(tds,"dest")}

🚚 ${get(tds,"transit")} - ${get(tds,"status")}

PU: IN ${get(tds,"puIn")} - OUT ${get(tds,"puOut")}
DEL: IN ${get(tds,"delIn")} - OUT ${get(tds,"delOut")}

📌 Last: ${get(tds,"last")}

👤 Driver: ${get(tds,"driver")}
🚛 Truck: ${get(tds,"truck")}
📦 Trailer: ${get(tds,"trailer")}
-----------------------------`;

      results.push(block);

    });

    navigator.clipboard.writeText(results.join('\n\n'));

    alert(`✅ ${results.length} loads encontrados`);

  };

})();
