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
            result.genreData,
            result.parents
        );

    });

function findGenre(
    tree,
    target,
    parents = []
) {

    for (const genre in tree) {

        if (genre === target) {

            return {
                genreData: tree[genre],
                parents: parents
            };

        }

        const children =
            tree[genre]._children || {};

        const found =
            findGenre(
                children,
                target,
                [...parents, genre]
            );

        if (found)
            return found;

    }

    return null;

}

function renderGenrePage(
    name,
    genre,
    parents
) {

    const div =
        document.getElementById(
            "genre-page"
        );

    const children =
        genre._children || {};

    div.innerHTML = `

        <div class="page">

            <div class="breadcrumbs">

                <a href="genres.html">
                    Genres
                </a>

                ${parents.map(parent => `
                    <span>›</span>

                    <a href="
                        genre.html?genre=${encodeURIComponent(parent)}
                    ">
                        ${parent}
                    </a>
                `).join("")}

                <span>›</span>

                <span class="current-genre">
                    ${name}
                </span>

            </div>

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
                <h2 class="subgenre-heading">
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

        </div>

    `;

}
