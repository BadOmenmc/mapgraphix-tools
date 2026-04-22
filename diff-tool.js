(function () {

  const old = document.getElementById("diff-tool");
  if (old) old.remove();

  const box = document.createElement("div");
  box.id = "diff-tool";
  box.style = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 380px;
    background: #1e1e1e;
    color: white;
    padding: 15px;
    border-radius: 10px;
    z-index: 99999;
    font-family: sans-serif;
  `;

  box.innerHTML = `
    <div style="display:flex; justify-content:space-between;">
      <h4 style="margin:0;">MGX DIFF</h4>
      <button id="close-btn" style="background:red;color:white;border:none;width:25px;height:25px;">X</button>
    </div>

    <p style="margin-top:10px;font-size:12px;">A (inicio del día)</p>
    <textarea id="list-a" style="width:100%;height:80px;"></textarea>

    <p style="margin-top:10px;font-size:12px;">B (actual)</p>
    <textarea id="list-b" style="width:100%;height:80px;"></textarea>

    <button id="run-diff" style="margin-top:10px;width:100%;padding:8px;background:#9C27B0;border:none;color:white;border-radius:5px;">
      Detectar Nuevas
    </button>
  `;

  document.body.appendChild(box);

  document.getElementById("close-btn").onclick = function () {
    box.remove();
  };

  document.getElementById("run-diff").onclick = function () {

    function getNumber(line) {
      var match = line.match(/\d{6,}/);
      return match ? match[0] : null;
    }

    var listAraw = document.getElementById("list-a").value.split('\n');
    var listBraw = document.getElementById("list-b").value.split('\n');

    var listA = [];

    for (var i = 0; i < listAraw.length; i++) {
      var num = getNumber(listAraw[i]);
      if (num) listA.push(num);
    }

    var newLoads = [];

    for (var j = 0; j < listBraw.length; j++) {
      var line = listBraw[j];
      var numB = getNumber(line);

      if (numB && listA.indexOf(numB) === -1) {
        newLoads.push(line);
      }
    }

    var output = newLoads.join('\n\n');

    navigator.clipboard.writeText(output);

    alert("🆕 " + newLoads.length + " cargas nuevas copiadas");

  };

})();
