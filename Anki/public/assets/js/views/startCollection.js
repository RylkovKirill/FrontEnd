import Utils from './../Utils.js'

let startCollection = {
    render: async () => {
        let view = `
        <section class="collection-section">
            <h1 id="colectionName"></h1>
            <div id="statisticsArea" class="statistics-area">
                <span class="statistics-area__span">Time: <em id="timeEm" class="statistics-area__em">value</em></span>
                <span class="statistics-area__span">Cards left: <em id="cardsLeftEm" class="statistics-area__em">value</em></span>
            </div>
            <div id="card" class="card-wrapper">
                <article class="card card-animated">
                    <div class="side front">
                        <h2 id="cardFrontValue">Front value</h2>
                    </div>
                    <div class="side back">
                        <h2 id="cardBackValue">Back value</h2>
                    </div>
                </article>
            </div>
            <div id="buttonSection" class="container-inline">
                <button id="fogotButton" class="button-secondary">Fogot</button>
                <button id="rememberedButton" class="button-primary">Remembered</button>
            </div>
        </section>
        `
        return view
    },
    after_render: async () => {
        const request = Utils.parseRequestURL();
        console.log(request);
        var collectionId = request.id;
        var coincidences = 0;
        var currentCard = 0;
        var cards = [];
        if (collectionId != null) {
            var statisticsArea = document.getElementById('statisticsArea');
            var colectionName = document.getElementById('colectionName');
            var cardFrontValue = document.getElementById('cardFrontValue');
            var cardBackValue = document.getElementById('cardBackValue');
            var fogotButton = document.getElementById('fogotButton');
            var rememberedButton = document.getElementById('rememberedButton');
            var cardsLeftEm = document.getElementById('cardsLeftEm');
            var timeEm = document.getElementById('timeEm');
            fogotButton.addEventListener('click', function (event) {
                showNextCard(false);
            });
            rememberedButton.addEventListener('click', function (event) {
                showNextCard(true);
            });
            var currentUserId = localStorage.getItem('currentUserId');
            database.ref('users/' + currentUserId + '/collections/' + collectionId).on('value', (snapshot) => {
                console.log(snapshot.val());
            });
            database.ref('users/' + currentUserId + '/cards/').on('value', (snapshot) => {
                for (let cardId in snapshot.val()) {
                    let cardData = snapshot.child(cardId).val();
                    if (collectionId == cardData.collectionId) {
                        cards.push({
                            id: cardId,
                            backValue: cardData.backValue,
                            frontValue: cardData.frontValue,
                            collectionId: cardData.collectionId,
                            creationDate: cardData.creationDate
                        });
                    }
                }
                for (let card of cards) {
                    console.log(card);
                }
                console.log(cards[currentCard]);
                shuffle(cards);
                updateCollectionData();
                timeEm.textContent = 0;
                window.timerId = window.setInterval(timer, 1000);
            });
        }
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }

        function showNextCard(result) {
            if (result == true) {
                coincidences++;
            }
            if (currentCard < cards.length - 1) {

                currentCard++;
                updateCollectionData();
            }
            else if (currentCard == cards.length - 1) {
                colectionName.textContent = "Сollection is complete";
                statisticsArea.innerHTML = "";
                var time = document.createElement('div');
                time.textContent = 'time wasted: ' + timeEm.textContent;
                statisticsArea.appendChild(time);
                var result = document.createElement('div');
                result.textContent = 'result: ' +  coincidences + '/' + cards.length;
                statisticsArea.appendChild(result);
                var percents = document.createElement('div');
                percents.textContent = 'percents: ' + (coincidences * 100 / cards.length);
                statisticsArea.appendChild(percents);
                window.clearInterval(window.timerId);
                currentCard++;
                document.getElementById("card").style.display = "none";
                var clone = rememberedButton.cloneNode(true);
                clone.textContent = "Ok";
                fogotButton.style.display = "none";
                rememberedButton.style.display = "none";
                document.getElementById("buttonSection").appendChild(clone);
                clone.addEventListener('click', function (event) {
                    window.location.hash = '#/home';
                });
                saveStatistics(parseInt(timeEm.textContent), coincidences, (coincidences * 100 / cards.length));
            }
        }
        function updateCollectionData() {
            cardFrontValue.textContent = cards[currentCard].frontValue;
            cardBackValue.textContent = cards[currentCard].backValue;
            cardsLeftEm.textContent = (cards.length) - currentCard;
        }
        function timer() {
            timeEm.textContent = parseInt(timeEm.textContent) + 1;
        }

        function saveStatistics(timeWasted, cardStudied, result) {
            var currentDate = (new Date()).toLocaleDateString().replace(/[.]/g, '');
            var updates = {};
            console.log((new Date()).toLocaleDateString().replace(/[.]/g, ''));
            updates[`users/${currentUserId}/statistics/timeWasted/`] = firebase.database.ServerValue.increment(timeWasted);
            updates[`users/${currentUserId}/statistics/cardStudied/`] = firebase.database.ServerValue.increment(cardStudied);
            updates[`users/${currentUserId}/statistics/${currentDate}/timeWasted/`] = firebase.database.ServerValue.increment(timeWasted);
            updates[`users/${currentUserId}/statistics/${currentDate}/cardStudied/`] = firebase.database.ServerValue.increment(cardStudied);
            firebase.database().ref().update(updates);
            firebase.database().ref('users/' + currentUserId + '/collections/' + collectionId).update({
                lastResult: result,
                lastPassedDate: Date.now(),
            });
        }
    }
}

export default startCollection;