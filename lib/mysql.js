importPackage(java.sql);
load('lib/mysqlconnection.js');

(function () {
	var MySQL = this.MySQL = {};

	java.lang.Class.forName('com.mysql.jdbc.Driver').newInstance();

	/* Returns a raw java.sql.Connection object to MySQL */
	MySQL.getConnection = function (username, password, database) {
		var props = new java.util.Properties();
		props.setProperty('user', username || '');
		props.setProperty('password', password || '');
		return DriverManager.getConnection('jdbc:mysql://localhost/' + (database || ''), props);
	};

	/* Returns a new instance of MySQLConnection */
	MySQL.open = function (username, password, database) {
		return new MySQLConnection(MySQL.getConnection(username, password, database));
	};

}());
