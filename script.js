const SHEET_ID = "1T-s_5SS0mTjvLRLpqwMqLuHrNpH-zMTRZtNGzEeVIS0";

const URL =
`https://opensheet.elk.sh/${SHEET_ID}/Books`;

const MUST_READ_THRESHOLD = 8.5;

fetch(URL)
    .then(res => res.json())
    .then(data => {

        data.sort((a, b) =>
            Number(b.avg_rating) - Number(a.avg_rating)
        );

        const booksDiv =
            document.getElementById("books");

        data.forEach((book, index) => {

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

        const div =
            document.createElement("div");
            
        div.className = "book";

        const cover =
            book.cover_link ||
            "fallback.png";

        const ratingNumber =
            Number(book.avg_rating);

        const star =
            ratingNumber >= MUST_READ_THRESHOLD
                ? "★"
                : "☆";

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
                    ${book.title}
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
                            ? 'Must-read'
                            : 'Not yet must-read'
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

                </div>

                <div class="side-info">

                    <p class="book-id">
                        ID: ${book.book_id}
                    </p>

                    <p class="votes">
                        Votes: ${book.votes}
                    </p>

                </div>

            `;

            booksDiv.appendChild(div);

        });

    });
