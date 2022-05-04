function search(search, dictionary, results = 3) {    
    const sSearch = sanitizeWord(search)

    //Primeira verificação, vai procurar por ocorrência no inicio dda palavra
    var words = dictionary.filter(word => {
        const sWord = sanitizeWord(word)
        return sWord.startsWith(sSearch)
    })
    
    if (words.length > 0) return words.slice(0, results)
    
    //Segunda verificação, vai removendo um caractere da palavra ate achar uma ocorrência
    var nSearch = sSearch.slice(0, -1)

    while (nSearch.length > 0) {
        words = dictionary.filter(word => {
            const sWord = sanitizeWord(word)
            return sWord.startsWith(nSearch)
        })

        if (words.length > 0) {
            var nnSearch = sSearch.replace(nSearch, '')

            while (nnSearch.length > 0) {
                const nWords = words.filter(word => {
                    const sWord = sanitizeWord(word)
                    return sWord.endsWith(nnSearch)
                })

                if (nWords.length > 0) return nWords.slice(0, results)
                else nnSearch = nnSearch.slice(1)

            }

            return words.slice(0, results)
        }

        nSearch = nSearch.slice(0, -1)
    }
}

function organizeDictionary(dictionary) {
    return dictionary.sort((a, b) => {
        if (a.length > b.length) return 1
        if (a.length < b.length) return -1
        return 0
    })
}

function sanitizeWord(word) {
    return word.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ç/g, 'c')
        .replace(/Ç/g, 'C')
        .trim()
}

function mergeDictionaries(...dictionaries) {
    const dictionary = []

    for(words of dictionaries)
        for (word of words)
            dictionary.push(word)

    return dictionary
}

module.exports = {
    search,
    organizeDictionary,
    mergeDictionaries
}