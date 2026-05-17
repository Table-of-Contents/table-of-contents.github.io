const SHEET_ID = "1T-s_5SS0mTjvLRLpqwMqLuHrNpH-zMTRZtNGzEeVIS0";

const URL =
`https://opensheet.elk.sh/${SHEET_ID}/Books`;

fetch(URL)
    .then(res => res.json())
    .then(data => {

        const booksDiv = document.getElementById("books");

        data.sort((a, b) => Number(b.avg_rating) - Number(a.avg_rating));
        
        data.forEach(book => {

            const div = document.createElement("div");

            div.className = "book";

        div.innerHTML = `
            <h2>${book.title}</h2>
            
            <p><strong>ID:</strong> ${book.book_id}</p>
            
            <p><strong>Author:</strong> ${book.author}</p>
            
            <p><strong>Average Rating:</strong> ${book.avg_rating}</p>
            
            <p><strong>Votes:</strong> ${book.votes}</p>
        `;

            booksDiv.appendChild(div);

        });

    });
