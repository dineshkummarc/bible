function Parser() {
	this.mode = 0;
	this.db = null;
	this.book = 0;
}

Parser.MODE_BOOK = 0; /* Current line is a book title */
Parser.MODE_VERSE = 1; /* Current line is a verse */

Parser.prototype.parse = function (stream) {
	var line = stream.readLine();
	do {
		this.parseLine(line);
		line = stream.readLine();
	} while (line !== null);
};

Parser.prototype.parseLine = function (line) {
	if (this.mode === MODE_BOOK) {
		this.book = this.db.addBook(line);
	}
};
