importPackage(java.io);

load('src/database.js');
load('src/parser.js');
load('lib/mysql.js');

var parser = new Parser();
var db = new Database('root', '', 'bible');
var stream = new BufferedReader(new InputStreamReader(new FileInputStream('assets/bible.txt')));

parser.parse(stream, db);
