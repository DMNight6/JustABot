import fs from 'fs'

function create_db(path: fs.PathLike) {
    if (fs.existsSync(`${path}main.db`)) {
        return console.log("Database already exist, skipping creation.")
    } else {
        fs.closeSync(fs.openSync(`${path}main.db`, 'w'));
        return console.log(`Database is non-existing in current ${path}. Created ${path}main.db`)
    }
}

export default create_db