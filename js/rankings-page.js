(function () {
  var tbody = document.getElementById("rankings-tbody");
  if (!tbody) return;

  function esc(s) {
    if (s == null) return "";
    var d = document.createElement("div");
    d.textContent = String(s);
    return d.innerHTML;
  }

  fetch("content/rankings.json")
    .then(function (r) {
      if (!r.ok) throw new Error("bad response");
      return r.json();
    })
    .then(function (data) {
      var items = (data.items || []).slice().sort(function (a, b) {
        return (Number(b.score) || 0) - (Number(a.score) || 0);
      });
      if (!items.length) {
        tbody.innerHTML =
          '<tr><td colspan="5">No rankings yet. Add wines in the admin.</td></tr>';
        return;
      }
      tbody.textContent = "";
      items.forEach(function (item, i) {
        var tr = document.createElement("tr");
        tr.innerHTML =
          '<td class="col-rank">' +
          esc(i + 1) +
          "</td><td>" +
          esc(item.wine) +
          "</td><td>" +
          esc(item.notes) +
          "</td><td>" +
          esc(item.pairings) +
          '</td><td class="col-score">' +
          esc(item.score) +
          "</td>";
        tbody.appendChild(tr);
      });
    })
    .catch(function () {
      tbody.innerHTML =
        '<tr><td colspan="5">Unable to load rankings. Check that content/rankings.json is available.</td></tr>';
    });
})();
