let baseURL = `https://deckofcardsapi.com/api/deck/`;
let deckID;
$(
    axios.get(`${baseURL}new/shuffle`)
        .then(resp => {
            deckID = resp.data.deck_id
        })
        .catch(err => console.log('couldnt shuffle'))
)

$('button').click(function (evt) {
    evt.preventDefault();
    axios.get(`${baseURL}${deckID}/draw`)
        .then(resp => {
            $('#cards').append(`<img src=${resp.data.cards[0].image}>`)
        })
        .catch(err => console.log('couldnt draw'))
}

)