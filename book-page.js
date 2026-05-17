const params =
    new URLSearchParams(
        window.location.search
    );

const bookId =
    params.get("id");

const SHEET_ID =
    "1T-s_5SS0mTjvLRLpqwMqLuHrNpH-zMTRZtNGzEeVIS0";

const URL =
`https://opensheet.elk.sh/${SHEET_ID}/Books`;

fetch(URL)
    .then(res => res.json())
    .then(data => {

        const book =
            data.find(b =>
                b.book_id === bookId
            );

        if (!book) {

            document.getElementById(
                "book-page"
            ).innerHTML =
                "<h1>Book not found.</h1>";

            return;
        }

        renderBookPage(book);

    });

function renderBookPage(book) {

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

    const rating =
        Number(book.avg_rating);

    const star =
        rating >= 8.5
            ? "★"
            : "☆";

    const div =
        document.getElementById(
            "book-page"
        );

    const cover =
        book.cover_link ||
        "fallback.jpg";

    div.innerHTML = `

        <div class="page">

            <a
                class="back-link"
                href="index.html"
            >
                ← Charts
            </a>

            <div class="book-page-layout">

                <img
                    class="book-page-cover"
                    src="${cover}"
                    alt="${book.title}"
                >

                <div class="book-page-info">

                    <h1 class="book-page-title">
                        ${book.title}
                    </h1>

                    <p class="book-page-meta">

                        ${book.author}

                        •

                        ${book.release_type}

                    </p>

                    <p
                        class="book-page-rating"
                        title="${
                            rating >= 8.5
                                ? "Must-read"
                                : "Not yet must-read"
                        }"
                    >
                        ${star} ${book.avg_rating}
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

                    <div class="book-stats">

                        <p>
                            <strong>ID:</strong>
                            ${book.book_id}
                        </p>

                        <p>
                            <strong>Votes:</strong>
                            ${book.votes}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    `;

}
