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

function renderTree(tree, parent) {

    const ul =
        document.createElement("ul");

    for (const genre in tree) {

        const li =
            document.createElement("li");

        const link =
            document.createElement("a");

        link.href =
            `genre.html?genre=${encodeURIComponent(genre)}`;

        link.textContent = genre;

        li.appendChild(link);

        ul.appendChild(li);

        const children =
            tree[genre]._children;

        if (
            children &&
            Object.keys(children).length > 0
        ) {
            renderTree(
                children,
                li
            );
        }

    }

    parent.appendChild(ul);

}
