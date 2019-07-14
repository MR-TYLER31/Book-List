// Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class 
class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete" >X</a></td>
        
        `;
    
        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create Div Element
        const div = document.createElement('div');
        // Create class for div
        div.className = `alert ${className}`;
        // Append text node
        div.appendChild(document.createTextNode(message));

        // Get parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        // Insert alert
        container.insertBefore(div, form);

        // Set time out 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

}

 // Local Storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
             books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book);
        });   
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);


// Add Book Event Listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get Form Values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // Instantiate New Book
    const book = new Book(title, author, isbn);

    // Instantiate New UI
    const ui = new UI();

    // Validate 
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');

    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add to LS
        Store.addBook(book)

        // Show Success
        ui.showAlert('Book Added!', 'success');

        // Clear input Fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function(e) {

// Instantiate New UI
const ui = new UI();

// Delete book
ui.deleteBook(e.target);

// Remove From LS
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

// Show Message
ui.showAlert('Book Removed!', 'success' );

    e.preventDefault();
});