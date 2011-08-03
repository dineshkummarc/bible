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
	verse: /^(\d+)\s+\w/
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

/** Parse an indvidual line
* @param {string} line The line to parse
*/
Parser.prototype.parseLine = function (line) {
	var temp;

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
		this.chapter = this.parseChapter(line);
		this.db.addChapter(this.book, this.chapter);
		this.mode = Parser.modes.verse;
	}
};
