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

  fetch("content/reviews.json")
    .then(function (r) {
      if (!r.ok) throw new Error("bad response");
      return r.json();
    })
    .then(function (data) {
      var items = data.items || [];
      if (!items.length) {
        var empty = document.createElement("p");
        empty.textContent = "No reviews yet. Add them in the admin.";
        root.appendChild(empty);
        return;
      }
      items.forEach(function (item) {
        var id = item.slug && String(item.slug).trim() ? item.slug.trim() : slugify(item.title);
        var article = document.createElement("article");
        article.className = "review-card";
        article.id = "review-" + id.replace(/[^a-zA-Z0-9_-]/g, "");

        var h2 = document.createElement("h2");
        h2.textContent = item.title || "";

        var meta = document.createElement("p");
        meta.className = "review-meta";
        meta.textContent = item.meta || "";

        var bodyP = document.createElement("p");
        bodyP.style.whiteSpace = "pre-line";
        bodyP.textContent = item.body || "";

        article.appendChild(h2);
        article.appendChild(meta);
        article.appendChild(bodyP);
        root.appendChild(article);
      });
    })
    .catch(function () {
      var err = document.createElement("p");
      err.textContent =
        "Unable to load reviews. Check that content/reviews.json is available.";
      root.appendChild(err);
    });
})();
