fetch("genres.json")
    .then(res => res.json())
    .then(genres => {

        const container =
            document.getElementById("genre-tree");

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

        const genreDiv =
            document.createElement("div");

        genreDiv.className =
            "genre-entry";

        genreDiv.style.marginLeft =
            `${depth * 28}px`;

        const link =
            document.createElement("a");

        link.href =
            `genre.html?genre=${encodeURIComponent(genre)}`;

        link.textContent =
            genre;

        link.className =
            "genre-link";

        genreDiv.appendChild(link);

        parent.appendChild(
            genreDiv
        );

        const children =
            tree[genre]._children || {};

        if (
            Object.keys(children).length > 0
        ) {

            renderTree(
                children,
                parent,
                depth + 1
            );

        }

    }

}
