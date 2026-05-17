const SHEET_ID = "PUT_YOUR_SHEET_ID_HERE";

const URL =
`https://opensheet.elk.sh/${SHEET_ID}/Books`;

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
            "fallback.jpg";

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

                  <p class="rating">
                      ★ ${book.avg_rating}
                  </p>

                <div class="tags">

                    ${genres.map(g =>
                        `<span class="genre">${g}</span>`
                    ).join("")}

                    ${undertones.map(u =>
                        `<span class="undertone">${u}</span>`
                    ).join("")}

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
