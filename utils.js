module.exports = {
    logFatal:(msg) => {
        console.log(msg)
        process.exit(1)
    }
}