const SHEET_ID = "1T-s_5SS0mTjvLRLpqwMqLuHrNpH-zMTRZtNGzEeVIS0";

const URL =
`https://opensheet.elk.sh/${SHEET_ID}/Books`;

const MUST_READ_THRESHOLD = 8.5;

let ALL_BOOKS = [];

let GENRE_TREE = null;

fetch("genres.json")
    .then(res => res.json())
    .then(genresTree => {

        GENRE_TREE = genresTree;

        setupGenreFilter(
            genresTree
        );

        fetch(URL)
            .then(res => res.json())
            .then(data => {

                ALL_BOOKS = data;

                renderBooks();

            });

    });

function setupGenreFilter(
    genresTree
) {

    const select =
        document.getElementById(
            "genre-filter"
        );

    const allGenres =
        flattenGenres(
            genresTree
        );

    allGenres.forEach(genre => {

        const option =
            document.createElement(
                "option"
            );

        option.value = genre;

        option.textContent =
            genre;

        select.appendChild(
            option
        );

    });

    select.addEventListener(
        "change",
        () => {

            renderBooks();

        }
    );

}

function flattenGenres(tree) {

    let result = [];

    for (const genre in tree) {

        result.push(genre);

        result = result.concat(
            flattenGenres(
                tree[genre]._children || {}
            )
        );

    }

    return result;

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

function renderBooks() {

    const booksDiv =
        document.getElementById(
            "books"
        );

    booksDiv.innerHTML = "";

    const selectedGenre =
        document.getElementById(
            "genre-filter"
        ).value;

    let filteredBooks =
        [...ALL_BOOKS];

    if (selectedGenre) {

        const allowedGenres =
            findSubgenres(
                GENRE_TREE,
                selectedGenre
            );

        filteredBooks =
            filteredBooks.filter(book => {

                const bookGenres =
                    [

                        ...String(
                            book.genres || ""
                        ).split(","),

                        ...String(
                            book.undertones || ""
                        ).split(",")

                    ]
                    .map(g => g.trim())
                    .filter(g => g);

                return bookGenres.some(
                    g =>
                    allowedGenres.includes(g)
                );

            });

    }

    filteredBooks.sort((a, b) =>
        Number(b.avg_rating) -
        Number(a.avg_rating)
    );

    filteredBooks.forEach((
        book,
        index
    ) => {

        const genres =
            String(book.genres || "")
                .split(",")
                .map(g => g.trim())
                .filter(g => g);

        const undertones =
            String(book.undertones || "")
                .split(",")
                .map(u => u.trim())
                .filter(u => u);

        const ratingNumber =
            Number(book.avg_rating);

        const star =
            ratingNumber >=
            MUST_READ_THRESHOLD
                ? "★"
                : "☆";

        const div =
            document.createElement(
                "div"
            );

        div.className = "book";

        const cover =
            book.cover_link ||
            "fallback.png";

        div.innerHTML = `

            <div class="rank">
                #${index + 1}
            </div>

            <img
                class="cover"
                src="${cover}"
                alt="${book.title}"
            >

            <div class="info">

                <h2>

                    <a
                        class="book-link"
                        href="
                            book.html?id=${encodeURIComponent(book.book_id)}
                        "
                    >
                        ${book.title}
                    </a>

                </h2>

                <p class="meta">

                    ${book.author}

                    •

                    ${book.release_type}

                </p>

                <p
                    class="rating"
                    title="${
                        ratingNumber >= MUST_READ_THRESHOLD
                            ? "Must-read"
                            : "Not yet must-read"
                    }"
                >

                    ${star}
                    ${book.avg_rating}

                </p>

                <div class="tags">

                    ${genres.map(g => `
                        <a
                            class="genre"
                            href="
                                genre.html?genre=${encodeURIComponent(g)}
                            "
                        >
                            ${g}
                        </a>
                    `).join("")}

                    ${undertones.map(u => `
                        <a
                            class="undertone"
                            href="
                                genre.html?genre=${encodeURIComponent(u)}
                            "
                        >
                            ${u}
                        </a>
                    `).join("")}

                </div>

            </div>

            <div class="side-info">

                <p class="book-id">

                    ID:
                    ${book.book_id}

                </p>

                <p class="votes">

                    Votes:
                    ${book.votes}

                </p>

            </div>

        `;

        booksDiv.appendChild(
            div
        );

    });

}
