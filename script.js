// ==========================
// 🌗 Dark/Light Theme
// ==========================
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
  });
}

// ==========================
// 🔍 Regelwerk-Suchfunktion
// ==========================
const searchInput = document.getElementById("rule-search");
if (searchInput) {
  const sections = document.querySelectorAll("main.rules-content section");

  function removeHighlights(element) {
    const marks = element.querySelectorAll("mark");
    marks.forEach(mark => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
  }

  function highlightText(element, query) {
    if (!query) return;
    const regex = new RegExp(`(${query})`, "gi");

    for (const node of element.childNodes) {
      if (node.nodeType === 3) {
        const matches = node.textContent.match(regex);
        if (matches) {
          const newNode = document.createElement("span");
          newNode.innerHTML = node.textContent.replace(regex, `<mark>$1</mark>`);
          node.replaceWith(newNode);
        }
      } else if (node.nodeType === 1 && node.tagName !== "MARK") {
        highlightText(node, query);
      }
    }
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    sections.forEach(section => {
      removeHighlights(section);

      if (!query) {
        section.style.display = "";
        return;
      }

      const text = section.textContent.toLowerCase();
      if (text.includes(query.toLowerCase())) {
        section.style.display = "";
        highlightText(section, query);
      } else {
        section.style.display = "none";
      }
    });
  });
}

// ==========================
// 🧑‍💼 Team-Suchfunktion
// ==========================
const teamSearch = document.getElementById("search");
if (teamSearch) {
  const cards = document.querySelectorAll(".team-card");
  teamSearch.addEventListener("input", () => {
    const query = teamSearch.value.toLowerCase();
    cards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      const role = card.querySelector(".role").textContent.toLowerCase();
      card.style.display = (name.includes(query) || role.includes(query)) ? "" : "none";
    });
  });
}