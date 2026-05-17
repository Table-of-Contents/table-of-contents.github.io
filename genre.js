const params =
    new URLSearchParams(
        window.location.search
    );

const genreName =
    params.get("genre");

fetch("genres.json")
    .then(res => res.json())
    .then(genres => {

        const genre =
            findGenre(
                genres,
                genreName
            );

        if (!genre) {

            document.getElementById(
                "genre-page"
            ).innerHTML =
                "<h1>Genre not found</h1>";

            return;
        }

        renderGenrePage(
            genreName,
            genre
        );

    });

function findGenre(tree, target) {

    for (const genre in tree) {

        if (genre === target)
            return tree[genre];

        const found =
            findGenre(
                tree[genre]._children,
                target
            );

        if (found)
            return found;

    }

    return null;

}

function renderGenrePage(
    name,
    genre
) {

    const div =
        document.getElementById(
            "genre-page"
        );

    div.innerHTML = `

        <h1>${name}</h1>

        <p>
            ${genre._description}
        </p>

        <h2>Subgenres</h2>

        <ul>

            ${Object.keys(
                genre._children
            ).map(child => `

                <li>
                    <a href="
                        genre.html?genre=${encodeURIComponent(child)}
                    ">
                        ${child}
                    </a>
                </li>

            `).join("")}

        </ul>

    `;

}
