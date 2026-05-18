fetch("genres.json")
    .then(res => res.json())
    .then(genres => {

        const container =
            document.getElementById(
                "genre-tree"
            );

        renderTree(
            genres,
            container
        );

    });

function renderTree(
    tree,
    parent,
    depth = 0
) {

    for (const genre in tree) {

        const genreData =
            tree[genre];

        const entry =
            document.createElement("div");

        entry.className =
            "genre-entry";

        entry.style.marginLeft =
            `${depth * 24}px`;

        const header =
            document.createElement("div");

        header.className =
            "genre-header";

        const children =
            genreData._children || {};

        const hasChildren =
            Object.keys(children).length > 0;

        const toggle =
            document.createElement("span");

        toggle.className =
            "genre-toggle";

        toggle.textContent =
            hasChildren
                ? "+"
                : "•";

        header.appendChild(toggle);

        const link =
            document.createElement("a");

        link.href =
            `genre.html?genre=${encodeURIComponent(genre)}`;

        link.textContent =
            genre;

        link.className =
            "genre-link";

        header.appendChild(link);

        entry.appendChild(header);

        if (genreData._description) {

            const desc =
                document.createElement("div");

            desc.className =
                "genre-tree-description";

            desc.textContent =
                genreData._description;

            entry.appendChild(desc);

        }

        const childrenContainer =
            document.createElement("div");

        childrenContainer.className =
            "children-container";

        childrenContainer.style.display =
            "none";

        entry.appendChild(
            childrenContainer
        );

        parent.appendChild(entry);

        if (hasChildren) {

            renderTree(
                children,
                childrenContainer,
                depth + 1
            );

            header.addEventListener(
                "click",
                () => {

                    const open =
                        childrenContainer.style.display ===
                        "block";

                    childrenContainer.style.display =
                        open
                            ? "none"
                            : "block";

                    toggle.textContent =
                        open
                            ? "+"
                            : "−";

                }
            );

        }

    }

}
