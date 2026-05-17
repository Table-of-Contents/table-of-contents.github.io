const SHEET_ID = "1T-s_5SS0mTjvLRLpqwMqLuHrNpH-zMTRZtNGzEeVIS0";

const URL =
`https://opensheet.elk.sh/${SHEET_ID}/Books`;

fetch(URL)
    .then(res => res.json())
    .then(data => {

        data.sort((a, b) =>
            Number(b.avg_rating) - Number(a.avg_rating)
        );

        const booksDiv = document.getElementById("books");

        data.forEach((book, index) => {

            const genres =
                book.genres      
                    .split(",")
                    .map(g => g.trim());

            const undertones =
                book.undertones
                    .split(",")
                    .map(u => u.trim());

            const div = document.createElement("div");

            div.className = "book";
            
            div.innerHTML = `
                <div class="rank">
                    #${index + 1}
                </div>

                <img
                    class="cover"
                    src="${book.cover_link || 'fallback.png'}"
                    alt="${book.title}"
                >

                <div class="info">

                    <h2>${book.title}</h2>

                    <p class="author">
                        ${book.author}
                    </p>

                    <p class="rating">
                        ★ ${book.avg_rating}
                    </p>

                </div>

                <div class="side-info">

                    <p class="book-id">
                        ID: ${book.book_id}
                    </p>

                    <p class="votes">
                        Votes: ${book.votes}
                    </p>

                </div>

                <div class="tags">

                    ${genres.map(g =>
                        `<span class="genre">${g}</span>`
                    ).join("")}

                    ${undertones.map(u =>
                        `<span class="undertone">${u}</span>`
                    ).join("")}

                </div>
            `;

            booksDiv.appendChild(div);

        });

    });
