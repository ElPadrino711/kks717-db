const ErrorDB = require("./ErrorDB.js"),
  fs = require("node:fs"),
  EventEmitter = require("node:events"),
  DefaultOptions = {
    path: "./database",
    tables: ["main"],
    extension: ".json",
    split_object: ".",
    auto_save: !0,
  },
  isObject = (d) => {
    return typeof d == "object" && d != null
  }

class Database extends EventEmitter {
  /**
   * Main constructor
   * @param {object} [options] Database Options.
   * @param {string} [options.path] Database Path.
   * @param {array} [options.tables] Database tables.
   * @param {string} [options.extension] File extension.
   * @param {string} [options.split_object] Spit object.
   * @param {boolean} [options.auto_save] Autosave?
   * @constructor
   */
  constructor(opt) {
    super()
    /*
    if (!isObject(opt))
      throw new ErrorDB(
        "the proovided options aren't a object",
        "INVALID_OPTIONS",
        ""
      )*/

    this.path = {}
    this.object = {}
    this.tables = []
    this.options = opt || {}
    this.ready = false
    this.uwu = "uwu"
  }

  /**
   * Start database
   */
  start() {
    for (const o in DefaultOptions) {
      if (!this.options.hasOwnProperty(o)) this.options[o] = DefaultOptions[o]
    }
    const tables = this.options.tables
    if (!Array.isArray(tables))
      throw new ErrorDB(
        "Property 'tables' is not an array",
        "INVALID_TABLES",
        ".prototype.sync()"
      )
    if (tables.some((x) => x === ""))
      throw new ErrorDB(
        "Property 'tables' has an empty value",
        "INVALID_TABLES",
        ".prototype.sync()"
      )

    for (const t of tables) {
      if (!fs.existsSync(this.options.path)) {
        fs.mkdirSync(this.options.path)
      }
      if (
        !fs.existsSync(this.options.path + "/" + t + this.options.extension)
      ) {
        fs.writeFileSync(
          this.options.path + "/" + t + this.options.extension,
          JSON.stringify({}, null, "	")
        )
      }

      this.path[t] = this.options.path + "/" + t + this.options.extension

      let data = fs.readFileSync(
        this.options.path + "/" + t + this.options.extension,
        "utf-8"
      )

      this.object[t] = JSON.parse(data)
      this.tables.push(t)
    }

    this.ready = true
    this.emit("ready", this)
  }

  /**
   * Saves the local data of the provided table
   * @param table {string} table name
   */
  save(t) {
    if (!this.ready)
      throw new ErrorDB(
        "Do <Database>.start() first",
        "Database isn't connected",
        ".prototype.save(table)"
      )
    if (!t)
      throw new ErrorDB(
        "Parameter 'table' is undefined",
        "INVALID_TABLE",
        ".prototype.save(table)"
      )
    if (!this.path[t])
      throw new ErrorDB(
        "Table " + t + " doesnt exist",
        "INVALID_TABLE",
        ".prototype.save(table)"
      )

    try {
      fs.writeFileSync(this.path[t], JSON.stringify(this.object[t], null, "	"))
    } catch (e) {
      throw e
    }
  }

  /**
   * Creates or modifies the value of a key in the provided table
   * @param table {string} The table
   * @param key {string} The key
   * @param value {any} The new value
   */
  set(t, k, v) {
    if (!this.ready)
      throw new ErrorDB(
        "Do <Database>.start() first",
        "Database isn't connected",
        ".prototype.set(table, key, value)"
      )
    if (!t)
      throw new ErrorDB(
        "Parameter 'table' is undefined",
        "INVALID_TABLE",
        ".prototype.set(table, key, value)"
      )
    if (!k)
      throw new ErrorDB(
        "Key not provided",
        "INVALID_KEY",
        ".prototype.set(table, key, value)"
      )
    if (!v)
      throw new ErrorDB(
        "Value not provided",
        "INVALID_VALUE",
        ".prototype.set(table, key, value)"
      )
    let data = this.object[t]
    if (!data)
      throw new ErrorDB(
        "Table " + t + " doesnt exist",
        "INVALID_TABLE",
        ".prototype.set(table, key, value)"
      )

    const [...keys] = k.split(this.options.split_object)
    let tk = 0

    for (const key of keys) {
      if (tk === keys.length - 1) {
        data[key] = v
        break
      }
      if (!data.hasOwnProperty(key)) data = data[key] = {}
      else data = !isObject(data[key]) ? (data[key] = {}) : data[key]
      tk++
    }

    this.options.auto_save && this.save(t)
  }

  /**
   * Get data from the database
   * @param table {string} The table
   * @param key {string} The key
   * @return {any} returns object/string/array/boolean, any of that
   */

  get(t, k) {
    if (!this.ready)
      throw new ErrorDB(
        "Do <Database>.start() first",
        "Database isn't connected",
        ".prototype.get(table, key)"
      )
    if (!t)
      throw new ErrorDB(
        "Parameter 'table' is undefined",
        "INVALID_TABLE",
        ".prototype.get(table, key)"
      )
    if (!k)
      throw new ErrorDB(
        "Key not provided",
        "INVALID_KEY",
        ".prototype.get(table,key)"
      )
    let data = this.object[t]
    if (!data)
      throw new ErrorDB(
        "Table " + t + " doesnt exist",
        "INVALID_TABLE",
        ".prototype.get(table, key)"
      )
    const [...keys] = k.split(this.options.split_object)
    let tk = 0

    for (const key of keys) {
      if (!data.hasOwnProperty(key)) return undefined
      if (tk === keys.length - 1) return data[key]
      else data = data[key]
      tk++
    }
  }

  /**
   * Deletes data from the database
   * @param table {string} the table
   * @param key {string} the key
   * @return {boolean}
   */
  delete(t, k) {
    if (!this.ready)
      throw new ErrorDB(
        "Do <Database>.start() first",
        "Database isn't connected",
        ".prototype.delete(table, key)"
      )
    if (!t)
      throw new ErrorDB(
        "Parameter 'table' is undefined",
        "INVALID_TABLE",
        ".prototype.delete(table, key)"
      )
    if (!k)
      throw new ErrorDB(
        "Key not provided",
        "INVALID_KEY",
        ".prototype.delete(table,key)"
      )
    let data = this.object[t]
    if (!data)
      throw new ErrorDB(
        "Table " + t + " doesnt exist",
        "INVALID_TABLE",
        ".prototype.delete(table, key)"
      )

    const [...keys] = k.split(this.options.split_object)

    for (const key of keys) {
      if (!data.has(key)) return !1
      if (tk === keys.length - 1) {
        delete data[key]
        this.options.auto_save && this.save(t)
        return !0
      } else data = data[key]
      tk++
    }
  }

  /**
	 * Check if database has some data

	 * @param table {string} the table
	 * @param key {string} the key
	 * @return {boolean}
	 */
  has(t, k) {
    if (!this.ready)
      throw new ErrorDB(
        "Do <Database>.start() first",
        "Database isn't connected",
        ".prototype.has(table, key)"
      )
    if (!t)
      throw new ErrorDB(
        "Parameter 'table' is undefined",
        "INVALID_TABLE",
        ".prototype.has(table, key)"
      )
    if (!k)
      throw new ErrorDB("Key not provided", "INVALID_KEY", "has(table,key)")
    let data = this.object[t]
    if (!data)
      throw new ErrorDB(
        "Table " + t + " doesnt exist",
        "INVALID_TABLE",
        ".prototype.has(table, key)"
      )

    const [...keys] = k.split(this.options.split_object)
    let tk = 0

    for (const key of keys) {
      if (!data.hasOwnProperty(key)) return false
      if (tk === keys.length - 1) return true
      else data = data[key]
      tk++
    }
  }

  /**
   * The number of keys in a table
   * @param table {string} the table
   * @return {number}
   */
  size(t) {
    if (!this.ready)
      throw new ErrorDB(
        "Do <Database>.start() first",
        "Database isn't connected",
        ".prototype.size(table)"
      )
    if (!t)
      throw new ErrorDB(
        "Parameter 'table' is undefined",
        "INVALID_TABLE",
        ".prototype.size(table)"
      )
    let data = this.object[t]
    if (!data)
      throw new ErrorDB(
        "Table " + t + " doesnt exist",
        "INVALID_TABLE",
        ".prototype.size(table)"
      )
    return Object.keys(data).length
  }

  /**
   * Get all data in a table
   * @param table {string} the table
   * @return {any}
   */
  async data(t) {
    if (!this.ready)
      throw new ErrorDB(
        "Do <Database>.start() first",
        "Database isn't connected",
        ".prototype.data(table)"
      )
    if (!t)
      throw new ErrorDB(
        "Parameter 'table' is undefined",
        "INVALID_TABLE",
        ".prototype.data(table)"
      )
    let data = await this.object[t]
    if (!data)
      throw new ErrorDB(
        "Table " + t + " doesnt exist",
        "INVALID_TABLE",
        ".prototype.data(table)"
      )
    return data
  }

  ping() {
    if (!this.ready)
      throw new ErrorDB(
        "Do <Database>.start() first",
        "Database isn't connected",
        ".prototype.ping()"
      )
    let ping = 0
    for (const t1 of this.tables) {
      const d1 = new Date()
      this.data(t1)
      const d2 = new Date()
      ping += d2 - d1
    }

    return ping
  }
}

module.exports = Database
