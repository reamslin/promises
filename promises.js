let baseURL = 'http://numbersapi.com/'


function getFact(n) {
    return axios
        .get(`${baseURL}${n}?json`)
        .then(resp => {
            fact = resp.data.text
            return fact
        })
        .catch(err => console.log(err))
}

function getFacts(nums) {
    let URL = baseURL + nums.join()

    return axios
        .get(URL)
        .then(resp => {
            for (fact in resp.data) {
                console.log(resp.data[fact])
            }
        })
        .catch(err => console.log(err))
}

function getFourFacts(n) {
    factPromises = [];
    for (i = 0; i < 4; i++) {
        factPromises.push(getFact(n))
    }
    Promise.all(factPromises)
        .then(factArr => {
            factArr.forEach(f => console.log(f))
        })
        .catch(err => console.log(err))
}

let cardBaseURL = `https://deckofcardsapi.com/api/deck/`

axios
    .get(`${cardBaseURL}new/shuffle/`)
    .then(resp => {
        let deckID = resp.data.deck_id
        return axios.get(`${cardBaseURL}${deckID}/draw`)
    })
    .then(resp => console.log(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`))
    .catch(err => console.log(err))

let cards = [];
axios
    .get(`${cardBaseURL}new/shuffle/`)
    .then(resp => {
        let deckID = resp.data.deck_id
        return axios.get(`${cardBaseURL}${deckID}/draw`)
    })
    .then(resp => {
        let deckID = resp.data.deck_id;
        cards.push(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`)
        return axios.get(`${cardBaseURL}${deckID}/draw`)
    })
    .then(resp => {
        cards.push(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`)
        console.log(`${cards}`)
    })
    .catch(err => console.log(err))