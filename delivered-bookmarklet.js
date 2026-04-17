(function () {

  const old = document.getElementById("tool-box");
  if (old) old.remove();

  const box = document.createElement("div");
  box.id = "tool-box";
  box.style = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 340px;
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

    <button id="run-btn" style="margin-top:10px;width:100%;padding:8px;background:#4CAF50;border:none;color:white;border-radius:5px;cursor:pointer;">
      Procesar
    </button>
  `;

  document.body.appendChild(box);

  document.getElementById("close-btn").onclick = () => box.remove();

  document.getElementById("run-btn").onclick = () => {

    const input = document.getElementById("loads-input").value;

    const userLoads = input
      .split('\n')
      .map(x => (x.match(/\d+/) || [])[0])
      .filter(Boolean);

    const tables = document.querySelectorAll("table");

    const results = [];

    tables.forEach(table => {

      const rows = table.querySelectorAll("tbody tr");

      rows.forEach(row => {

        const cells = row.querySelectorAll("td");

        cells.forEach(cell => {

          const value = cell.innerText.trim();

          if (!userLoads.includes(value)) return;

          const tds = row.querySelectorAll("td");
          const get = (i) => tds[i]?.innerText.trim() || "-";

          const loadBtn = tds[1]?.querySelector('button');
          const loadNumber = loadBtn ? loadBtn.innerText.trim() : "-";

          const block =
`#### ${value}

**Order#:** ${loadNumber}

👤 Driver Info: ${get(7)} - ${get(8)}

🚚 Truck & Trailer #: ${get(5)} - ${get(6)}

PU: IN ${get(13)} - OUT ${get(14)}
DEL: IN ${get(15)} - OUT ${get(16)}

📌 Last Location: ${get(20)}

📦 **Status: ${get(6)}**

---`;

          results.push(block);

        });

      });

    });

    navigator.clipboard.writeText(results.join('\n\n'));

    alert(`✅ ${results.length} loads encontrados y copiados`);

  };

})();
