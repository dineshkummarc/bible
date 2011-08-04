String.prototype.trim = function () {
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
};

function Parser() {
	this.mode = 0;
	this.book = 0;
	this.lastLine = null;
}

Parser.modes = {
	book: 0, /* Current line is a book title */
	chapter: 1, /* Current line is a chapter */
	verse: 2 /* Current line is a verse */
};

Parser.patterns = {
	chapter: /^CHAPTER\s+(\d+)$/,
	verse: /^(\d+)\s+(.+)$/,
	words: /\b[\w'-]+\b/g
};

/** Parse a stream of bible data
* @param stream A line-buffered stream that supports readLine()
* @param database The database to store the result
*/
Parser.prototype.parse = function (stream, database) {
	var line = stream.readLine();
	this.db = database;
	do {
		this.parseLine(String(line).trim());
		line = stream.readLine();
	} while (line !== null);
};

/** Parse a chapter line
* @param {string} line The line to parse
* @return {number} The chapter number, or -1 if the line is not a chapter line
*/
Parser.prototype.parseChapter = function (line) {
	var match = line.match(Parser.patterns.chapter);
	if (match !== null) {
		return match[1];
	}

	return -1;
};

/** Parse a verse line
* @param {string} line The line to parse
* @return {object} An object containing the number and text content of the verse, or null if line is not a verse
*/
Parser.prototype.parseVerse = function (line) {
	var match = line.match(Parser.patterns.verse);
	if (match !== null) {
		return ({
			number: match[1],
			text: match[2]
		});
	}

	return null;
};

/** Extract words from a verse and store them in the database word index
* @param {number} verseId The verseId in the database to associate with the words
* @param {string} verse The verse to parse
*/
Parser.prototype.parseWords = function (verseId, verse) {
	verse.toLowerCase().match(Parser.patterns.words).forEach(function (word) {
		this.db.addWord(verseId, word);
	});
};

/** Parse an indvidual line
* @param {string} line The line to parse
*/
Parser.prototype.parseLine = function (line) {
	var verse, verseId;

	if (this.lastLine !== null && this.lastLine.length === 0) {
		this.mode = Parser.modes.book;
		if (Parser.patterns.chapter.test(line)) {
			this.mode = Parser.modes.chapter;
		}
	}

	this.lastLine = '' + line;

	if (line.length === 0) {
		return;
	}

	if (this.mode === Parser.modes.book) {
		this.book = this.db.addBook(line);
	} else if (this.mode === Parser.modes.chapter) {
		this.chapter = this.db.addChapter(this.book, this.parseChapter(line));
		this.mode = Parser.modes.verse;
	} else if (this.mode === Parser.modes.verse) {
		verse = this.parseVerse(line);
		verseId = this.db.addVerse(this.chapter, verse.number, verse.text);
		this.parseWords(verseId, verse.text);
	}
};
