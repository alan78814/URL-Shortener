function generateUrlWord() {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseLetters = lowerCaseLetters.toUpperCase()
    const numbers = '1234567890'
    let collection = []
    collection = lowerCaseLetters.split("").concat(upperCaseLetters.split("")).concat(numbers.split(""))
    let urlWord = ""
    for (i = 0; i < 5; i++) {
        const index = Math.floor(Math.random() * collection.length)
        urlWord += collection[index]
    }
    return urlWord
}

module.exports = generateUrlWord