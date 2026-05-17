const SHEET_ID = "1T-s_5SS0mTjvLRLpqwMqLuHrNpH-zMTRZtNGzEeVIS0";

const URL =
`https://opensheet.elk.sh/${SHEET_ID}/Books`;

fetch(URL)
    .then(res => res.json())
    .then(data => {

        const booksDiv = document.getElementById("books");

        data.forEach(book => {

            const div = document.createElement("div");

            div.className = "book";

            div.innerHTML = `
                <h2>${book.title}</h2>
                <p>Average Rating: ${book.avg_rating}</p>
            `;

            booksDiv.appendChild(div);

        });

    });
