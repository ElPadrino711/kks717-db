class ErrorDB extends Error {
	constructor(msg, type, method) {
		super(msg);

		this.name = '717-DB';
		this.type = type;
		this.method = `<Database>${method}`;
	}
}

module.exports = ErrorDB;
