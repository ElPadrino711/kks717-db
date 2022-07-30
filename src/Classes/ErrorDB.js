class ErrorDB extends Error {
  constructor(msg, type, method) {
    super(msg)

    this.name = "@kks717/db"
    this.type = type
    this.method = `<Database>${method}`
  }
}

module.exports = ErrorDB
