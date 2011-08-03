function Database() {}

/* Add a book to the database
* @param {string} bookName The name of the book
* @return {number} The generated ID of the book in the database
*/
Database.prototype.addBook = function (bookName) {
	print('Adding book: ' + bookName)
	return 0;
};

/* Add a chapter to the database
* @param {number} bookId The ID of the book in the database
* @param {number} chapterId The chapter number of the book
* @param {boolean} True if successful, false otherwise
*/
Database.prototype.addChapter = function (bookId, chapterNumber) {
	print('Adding chapter: ' + chapterNumber + ' in book ' + bookId)
};
