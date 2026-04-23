(function () {

  const old = document.getElementById("tool-box");
  if (old) old.remove();

  const box = document.createElement("div");
  box.id = "tool-box";
  box.style = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 360px;
    background: #1e1e1e;
    color: white;
    padding: 15px;
    border-radius: 10px;
    z-index: 99999;
    font-family: sans-serif;
  `;

  box.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h4 style="margin:0;">Load Tool</h4>
      <button id="close-btn" style="background:red;color:white;border:none;width:25px;height:25px;cursor:pointer;">X</button>
    </div>

    <textarea id="loads-input" style="width:100%;height:120px;margin-top:10px;"></textarea>

    <button id="full-btn" style="margin-top:10px;width:100%;padding:8px;background:#4CAF50;border:none;color:white;border-radius:5px;cursor:pointer;">
      FULL INFO
    </button>

    <button id="follow-btn" style="margin-top:8px;width:100%;padding:8px;background:#2196F3;border:none;color:white;border-radius:5px;cursor:pointer;">
      FOLLOW UP
    </button>
  `;

  document.body.appendChild(box);

  document.getElementById("close-btn").onclick = () => box.remove();

  const process = (mode) => {

    const input = document.getElementById("loads-input").value;

    const userLoadsRaw = input.split('\n').filter(Boolean);

    const userLoads = userLoadsRaw.map(line => {
      const match = line.match(/\d{6,}/);
      return match ? match[0] : null;
    }).filter(Boolean);

    const tables = document.querySelectorAll("table");

    const results = [];

    tables.forEach(table => {

      const rows = table.querySelectorAll("tbody tr");

      rows.forEach(row => {

        const cells = row.querySelectorAll("td");

        cells.forEach(cell => {

          const ref = cell.innerText.trim();

          if (!userLoads.includes(ref)) return;

          const tds = row.querySelectorAll("td");
          const get = (i) => tds[i]?.innerText.trim() || "-";

          const loadBtn = tds[1]?.querySelector('button');
          const orderNumber = loadBtn ? loadBtn.innerText.trim() : "-";

          const originalInput = userLoadsRaw.find(l => l.includes(ref)) || ref;

          const status = get(3);
          const delOut = get(19);

          let block = "";

// 🟢 FULL MODE
if (mode === "full") {
  block =
`> #### ${originalInput}

**Order#:** ${orderNumber}

👤 Driver Info: ${get(7)} - ${get(8)}

🚚 Truck & Trailer #: ${get(5)} - ${get(6)}

🪟PU WINDOW: IN ${get(12)} - OUT ${get(13)}
🪟DEL WINDOW: IN ${get(16)} - OUT ${get(17)}

PU: IN ${get(14)} - OUT ${get(15)}
DEL: IN ${get(18)} - OUT ${get(19)}

📌 Last Location: ${get(20)}
📌 Last Tracked: ${get(21)}

📦 **Status: ${status}**

---`;
}

          // 🔵 FOLLOW MODE
          if (mode === "follow") {
            block =
`#### ${originalInput}

📦 ${status}
🕒 ${delOut}

---`;
          }

          results.push(block);

        });

      });

    });

    navigator.clipboard.writeText(results.join('\n\n'));

    alert(`✅ ${results.length} loads procesados`);

  };

  document.getElementById("full-btn").onclick = () => process("full");
  document.getElementById("follow-btn").onclick = () => process("follow");

})();
