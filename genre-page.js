const params =
    new URLSearchParams(
        window.location.search
    );

const genreName =
    params.get("genre");

fetch("genres.json")
    .then(res => res.json())
    .then(genres => {

        const result =
            findGenre(
                genres,
                genreName
            );

        if (!result) {

            document.getElementById(
                "genre-page"
            ).innerHTML =
                "<h1>Genre not found.</h1>";

            return;
        }

        renderGenrePage(
            genreName,
            result
        );

    });

function findGenre(
    tree,
    target
) {

    for (const genre in tree) {

        if (genre === target) {

            return tree[genre];

        }

        const children =
            tree[genre]._children || {};

        const found =
            findGenre(
                children,
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

    const children =
        genre._children || {};

    div.innerHTML = `

        <h1 class="genre-title">
            ${name}
        </h1>

        <p class="genre-description">
            ${genre._description}
        </p>

        ${
            Object.keys(children).length > 0
            ?
            `
            <h2>
                Subgenres
            </h2>

            <div class="subgenres">

                ${Object.keys(children)
                    .map(child => `

                        <a
                            class="subgenre-link"
                            href="
                            genre.html?genre=${encodeURIComponent(child)}
                            "
                        >
                            ${child}
                        </a>

                    `).join("")}

            </div>
            `
            :
            ""
        }

    `;

}
