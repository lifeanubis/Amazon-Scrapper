import fs from "fs"
import Writer from "objects-to-csv"
import Parser from "data-to-json"

export default {
  write: async (object, location) => {
    const converted = new Writer(object)
    if (location) await converted.toDisk(location, { allColumns: true })
    return await converted.toString()
  },
  read: (location) => {
    return Parser.csv({ filePath: location }).toJson()
  }
}
