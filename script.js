let snippets = [];
let currentCategory = null;

async function init() {
try {
const response = await fetch("snippets.json");
snippets = await response.json();

```
    buildCategories();
    renderSnippets(snippets);

} catch (error) {
    console.error("Failed to load snippets:", error);
}
```

}

function buildCategories() {

```
const categories = [
    ...new Set(snippets.map(s => s.category))
];

const container =
    document.getElementById("categories");

container.innerHTML = "";

categories.forEach(cat => {

    const div =
        document.createElement("div");

    div.className = "category";
    div.textContent = cat;

    div.onclick = () => {

        currentCategory = cat;

        renderSnippets(
            snippets.filter(
                s => s.category === cat
            )
        );
    };

    container.appendChild(div);
});
```

}

function renderSnippets(list) {

```
const panel =
    document.getElementById("snippetList");

panel.innerHTML = "";

list.forEach(snippet => {

    const div =
        document.createElement("div");

    div.className = "snippet";

    div.innerHTML = `
        <strong>${snippet.title}</strong><br>
        <small>${snippet.description}</small>
    `;

    div.onclick = () => showSnippet(snippet);

    panel.appendChild(div);
});
```

}

function showSnippet(snippet) {

```
const preview =
    document.getElementById("previewArea");

preview.innerHTML = `
    <style>${snippet.css}</style>
    ${snippet.html}
`;

document.getElementById("htmlCode").textContent =
    snippet.html || "";

document.getElementById("cssCode").textContent =
    snippet.css || "";

document.getElementById("jsCode").textContent =
    snippet.js || "";
```

}

document
.getElementById("previewTab")
.addEventListener("click", () => {

```
document.getElementById("previewArea")
    .style.display = "block";

document.getElementById("codeArea")
    .style.display = "none";
```

});

document
.getElementById("codeTab")
.addEventListener("click", () => {

```
document.getElementById("previewArea")
    .style.display = "none";

document.getElementById("codeArea")
    .style.display = "block";
```

});

document
.getElementById("search")
.addEventListener("input", e => {

```
const value =
    e.target.value.toLowerCase();

renderSnippets(
    snippets.filter(
        s =>
            s.title.toLowerCase().includes(value) ||
            s.description.toLowerCase().includes(value)
    )
);
```

});

init();
