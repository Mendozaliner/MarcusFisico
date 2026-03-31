(function () {
  var root = document.getElementById("reviews-list");
  if (!root) return;

  function slugify(s) {
    var t = String(s || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return t || "review";
  }

  function clampScore(n) {
    var x = Number(n);
    if (isNaN(x)) return null;
    x = Math.max(0, Math.min(5, x));
    return Math.round(x * 10) / 10;
  }

  function formatScoreDisplay(s) {
    if (s == null) return "—";
    return Math.round(s) + "/5";
  }

  function averageScores(item) {
    var p = clampScore(item.property);
    var w = clampScore(item.wine);
    var s = clampScore(item.service);
    var r = clampScore(item.prices);
    if (p == null || w == null || s == null || r == null) return null;
    return (p + w + s + r) / 4;
  }

  function formatAvg(avg) {
    return (Math.round(avg * 10) / 10).toFixed(1);
  }

  function bigStars(avg) {
    var filled = Math.round(avg);
    filled = Math.max(0, Math.min(5, filled));
    var out = "";
    for (var i = 0; i < 5; i++) {
      out += i < filled ? "★" : "☆";
    }
    return out;
  }

  function buildSubhead(item) {
    var r = String(item.region || "").trim();
    var m = String(item.month || "").trim();
    var y = String(item.year || "").trim();
    if (r || m || y) {
      var parts = [];
      if (r) parts.push(r);
      var dateStr = [m, y].filter(Boolean).join(" ");
      if (dateStr) parts.push(dateStr);
      return parts.join(" · ");
    }
    return String(item.meta || "").trim();
  }

  function normalizePhotoUrl(u) {
    var s = String(u || "").trim();
    if (!s) return "";
    s = s.replace(/\\/g, "/");
    if (/^https?:\/\//i.test(s)) return s;
    var leading = s.indexOf("/") === 0;
    var parts = s.split("/").filter(function (p) {
      return p.length;
    });
    var path = parts
      .map(function (seg) {
        return encodeURIComponent(seg);
      })
      .join("/");
    return leading ? "/" + path : path;
  }

  fetch("content/reviews.json")
    .then(function (r) {
      if (!r.ok) throw new Error("bad response");
      return r.json();
    })
    .then(function (data) {
      root.textContent = "";
      var items = data.items || [];
      if (!items.length) {
        var empty = document.createElement("p");
        empty.textContent = "No reviews yet. Add them in the admin.";
        root.appendChild(empty);
        return;
      }
      items.forEach(function (item) {
        var id = item.slug && String(item.slug).trim() ? item.slug.trim() : slugify(item.title);
        var safeId = id.replace(/[^a-zA-Z0-9_-]/g, "");

        var details = document.createElement("details");
        details.className = "review-card";
        details.id = "review-" + safeId;

        var summary = document.createElement("summary");
        summary.className = "review-card__summary";

        var inner = document.createElement("div");
        inner.className = "review-card__summary-inner";

        var headerLayout = document.createElement("div");
        headerLayout.className = "review-card__header-layout";

        var headerMain = document.createElement("div");
        headerMain.className = "review-card__header-main";

        var h2 = document.createElement("h2");
        h2.className = "review-card__title";
        h2.textContent = item.title || "";

        var subheadText = buildSubhead(item);
        if (subheadText) {
          var subP = document.createElement("p");
          subP.className = "review-card__subhead";
          subP.textContent = subheadText;
          headerMain.appendChild(h2);
          headerMain.appendChild(subP);
        } else {
          headerMain.appendChild(h2);
        }

        var scoresInline = document.createElement("div");
        scoresInline.className = "review-scores-inline";
        var labels = [
          { key: "wine", label: "Wine" },
          { key: "service", label: "Service" },
          { key: "property", label: "Property" },
          { key: "prices", label: "Prices" }
        ];
        labels.forEach(function (L, idx) {
          var c = clampScore(item[L.key]);
          var cell = document.createElement("div");
          cell.className = "review-score-inline";
          var lb = document.createElement("span");
          lb.className = "review-score-label";
          lb.textContent = L.label;
          var val = document.createElement("span");
          val.className = "review-score-val";
          val.textContent = formatScoreDisplay(c);
          cell.appendChild(lb);
          cell.appendChild(document.createTextNode(" "));
          cell.appendChild(val);
          scoresInline.appendChild(cell);
          if (idx < labels.length - 1) {
            var sep = document.createElement("span");
            sep.className = "review-score-sep";
            sep.setAttribute("aria-hidden", "true");
            sep.textContent = "·";
            scoresInline.appendChild(sep);
          }
        });

        headerMain.appendChild(scoresInline);

        var overall = document.createElement("div");
        overall.className = "review-overall";
        var avg = averageScores(item);
        var starsEl = document.createElement("div");
        starsEl.className = "review-overall-stars";
        var numEl = document.createElement("span");
        numEl.className = "review-overall-num";
        if (avg != null) {
          starsEl.textContent = bigStars(avg);
          var roundedAvg = Math.round(avg * 10) / 10;
          starsEl.setAttribute(
            "aria-label",
            "Overall " + roundedAvg.toFixed(1) + " out of 5"
          );
          numEl.textContent = formatAvg(avg);
        } else {
          starsEl.textContent = "—";
          starsEl.setAttribute("aria-hidden", "true");
        }

        overall.appendChild(starsEl);
        overall.appendChild(numEl);

        headerLayout.appendChild(headerMain);
        headerLayout.appendChild(overall);

        inner.appendChild(headerLayout);
        summary.appendChild(inner);
        details.appendChild(summary);

        var bodyWrap = document.createElement("div");
        bodyWrap.className = "review-card__expand";

        if (!subheadText && String(item.meta || "").trim()) {
          var meta = document.createElement("p");
          meta.className = "review-meta";
          meta.textContent = item.meta;
          bodyWrap.appendChild(meta);
        }

        var bodyP = document.createElement("p");
        bodyP.className = "review-body-text";
        bodyP.style.whiteSpace = "pre-line";
        bodyP.textContent = item.body || "";
        bodyWrap.appendChild(bodyP);

        var photos = [
          normalizePhotoUrl(item.photo1),
          normalizePhotoUrl(item.photo2),
          normalizePhotoUrl(item.photo3)
        ].filter(Boolean);

        if (photos.length) {
          var gal = document.createElement("div");
          gal.className = "review-card__gallery";
          photos.forEach(function (src) {
            var img = document.createElement("img");
            img.src = src;
            img.alt = "";
            img.loading = "lazy";
            img.width = 900;
            img.height = 900;
            gal.appendChild(img);
          });
          bodyWrap.appendChild(gal);
        }

        details.appendChild(bodyWrap);

        root.appendChild(details);
      });
    })
    .catch(function () {
      root.textContent = "";
      var err = document.createElement("p");
      err.textContent =
        "Unable to load reviews. Check that content/reviews.json is available.";
      root.appendChild(err);
    });
})();
