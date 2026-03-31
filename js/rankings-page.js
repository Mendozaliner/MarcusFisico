(function () {
  var tbody = document.getElementById("rankings-tbody");
  if (!tbody) return;

  function esc(s) {
    if (s == null) return "";
    var d = document.createElement("div");
    d.textContent = String(s);
    return d.innerHTML;
  }

  function loadJsonWithFallback(path) {
    var stamp = Date.now();
    var urls = [];
    var normalized = String(path || "").replace(/^\/+/, "");
    if (!normalized) return Promise.reject(new Error("missing path"));

    urls.push(normalized);
    urls.push("./" + normalized);
    urls.push("/" + normalized);

    // GitHub Pages project sites are hosted under /<repo>/.
    var parts = location.pathname.split("/").filter(Boolean);
    if (parts.length > 0) {
      urls.push("/" + parts[0] + "/" + normalized);
    }

    function tryAt(i) {
      if (i >= urls.length) return Promise.reject(new Error("not found"));
      var u = urls[i] + (urls[i].indexOf("?") === -1 ? "?" : "&") + "v=" + stamp;
      return fetch(u, { cache: "no-store" }).then(function (r) {
        if (!r.ok) throw new Error("bad response");
        return r.json();
      }).catch(function () {
        return tryAt(i + 1);
      });
    }

    return tryAt(0);
  }

  loadJsonWithFallback("content/rankings.json")
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
