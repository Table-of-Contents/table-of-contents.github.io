let GENRE_TREE = null;

async function loadGenres() {

    if (GENRE_TREE)
        return GENRE_TREE;

    const res =
        await fetch("genres.json");

    GENRE_TREE =
        await res.json();

    return GENRE_TREE;

}

function findSubgenres(
    tree,
    target
) {

    for (const genre in tree) {

        if (genre === target) {

            return collectGenres(
                genre,
                tree[genre]
            );

        }

        const found =
            findSubgenres(
                tree[genre]._children || {},
                target
            );

        if (found)
            return found;

    }

    return null;

}

function collectGenres(
    name,
    node
) {

    let genres = [name];

    for (
        const child
        in node._children || {}
    ) {

        genres = genres.concat(
            collectGenres(
                child,
                node._children[child]
            )
        );

    }

    return genres;

}
