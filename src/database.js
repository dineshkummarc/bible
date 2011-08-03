function Database() {
	this.book = 0;
}

/* Add a book to the database
* @param {string} bookName The name of the book
* @return {number} The generated ID of the book in the database
*/
Database.prototype.addBook = function (bookName) {
	print('Adding book: ' + bookName)
	this.book += 1;
	return this.book;
};

/* Add a chapter to the database
* @param {number} bookId The ID of the book in the database
* @param {number} chapterNumber The chapter number of the book
* @return {number} The generated ID of the chapter in the database
*/
Database.prototype.addChapter = function (bookId, chapterNumber) {
	print('Adding chapter: ' + chapterNumber + ' in book ' + bookId)
	return 0;
};

/* Add a verse to the database
* @param {number} chapterId The ID of the chapter in the database
* @param {number} verseNumber The number of the verse in the chapter
* @param {string} verse The text content of the verse
* @return {number} The generated ID of the verse in the database
*/
Database.prototype.addVerse = function (chapterId, verseNumber, verse) {
	print('Adding verse: (' + verseNumber + ') ' + verse);
	return 0;
};
