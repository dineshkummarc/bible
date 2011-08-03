function Database(user, password, database) {
	this.connection = MySQL.open(user, password, database);
	this.statements = {
		insertBook: this.connection.prepare(
			'INSERT INTO `books` (`name`) VALUES(?)'
		),
		
		insertChapter: this.connection.prepare(
			'INSERT INTO `chapters` (`book_id`, `chapter`) VALUES(?, ?)'
		)
	};
}

/* Add a book to the database
* @param {string} bookName The name of the book
* @return {number} The generated ID of the book in the database, or -1 if no ID was generated
*/
Database.prototype.addBook = function (bookName) {
	var bookId = this.connection.execute(this.statements.insertBook, [bookName]);
	if (bookId.length) {
		return bookId[0];
	}

	return -1;
};

/* Add a chapter to the database
* @param {number} bookId The ID of the book in the database
* @param {number} chapterNumber The chapter number of the book
* @return {number} The generated ID of the chapter in the database, or -1 if no ID was generated
*/
Database.prototype.addChapter = function (bookId, chapterNumber) {
	var chapterId = this.connection.execute(this.statements.insertChapter, [bookId, chapterNumber]);
	if (chapterId.length) {
		return chapterId[0];
	}

	return -1;
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
