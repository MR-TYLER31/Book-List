// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor 
function UI() { }

// Add Book To List
UI.prototype.addBookToList = function (book) {
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

// Remove Book from list
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Clear Input Fields 
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Show Alert 
UI.prototype.showAlert = function (message, className) {
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

ui.deleteBook(e.target);

// Show Message
ui.showAlert('Book Removed!', 'success' );

    e.preventDefault();
});

