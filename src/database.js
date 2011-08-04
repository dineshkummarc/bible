function Database(user, password, database) {
	this.connection = MySQL.open(user, password, database);
	this.statements = {
		insertBook: this.connection.prepare(
			'INSERT INTO `books` (`name`) VALUES(?)'
		),
		
		insertChapter: this.connection.prepare(
			'INSERT INTO `chapters` (`book_id`, `chapter`) VALUES(?, ?)'
		),

		insertVerse: this.connection.prepare(
			'INSERT INTO `verses` (`chapter_id`, `number`, `text`) VALUES(?, ?, ?)'
		),

		insertWord: this.connection.prepare(
			'INSERT INTO `words` (`verse_id`, `word`) VALUES(?, ?)'
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
* @return {number} The generated ID of the verse in the database, or -1 if no ID was generated
*/
Database.prototype.addVerse = function (chapterId, verseNumber, verse) {
	var verseId = this.connection.execute(this.statements.insertVerse, [chapterId, verseNumber, verse]);
	if (verseId.length) {
		return verseId[0];
	}

	return -1;
};

/* Add a word to the database
* @param {number} verseId The ID of the verse this word was found
* @param {string} word The word to add into the word index
* @return {number} The generated ID of the word in the database, or -1 if no ID was generated
*/
Database.prototype.addWord = function (verseId, word) {
	var wordId = this.connection.execute(this.statements.insertWord, [verseId, word]);
	if (wordId.length) {
		return wordId[0];
	}

	return -1;
};
