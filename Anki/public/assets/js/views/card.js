import Utils from './../Utils.js'

let card = {
    render: async () => {
        let view = `<section>
                        <h1 id="title"></h1>
                        <form id="cardForm" class="card-form" action="javascript:void(0);">
                            <div class="card-form__front-item">
                                <h2>Front</h2>
                                <input type="text" id="frontValueInput" required autocomplete="off" />
                                <label for="frontValueInput"></label>
                            </div>
                            <div class="card-form__back-item">
                                <h2>Back</h2>
                                <input type="text" id="backValueInput" required autocomplete="off" />
                                <label for="backValueInput"></label>
                            </div>
                            <div class="card-form__option-item">
                                <select id="collectionSelect">
                                </select>
                                <button id="saveCardButton" class="button-primary">Save</button>
                            </div>
                        </form>
                    </section>`
        return view
    },
    after_render: async () => {
        const request = Utils.parseRequestURL();
        console.log(request);
        var currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId != null) {
            var saveCardButton = document.getElementById('saveCardButton');
            var frontValueInput = document.getElementById('frontValueInput');
            var backValueInput = document.getElementById('backValueInput');
            var collectionSelect = document.getElementById('collectionSelect');
            database.ref('users/' + currentUserId + '/collections/').on('value', (snapshot) => {
                for (let collectionId in snapshot.val()) {
                    var data = snapshot.child(collectionId).val();
                    var option = document.createElement('option');
                    option.appendChild(document.createTextNode(data.collectionName));
                    option.value = collectionId;
                    collectionSelect.appendChild(option);
                }
            });
            if (request.id != null) {
                database.ref('users/' + currentUserId + '/cards/' + request.id).on('value', (snapshot) => {
                    var data = snapshot.val();
                    frontValueInput.value = data.frontValue;
                    backValueInput.value = data.backValue;
                    collectionSelect.value = data.collectionId;
                });
                title.textContent = "Edit card";
            }
            else {
                title.textContent = "Add card";
            }
            saveCardButton.addEventListener('click', function (event) {
                var currentUserId = localStorage.getItem('currentUserId');
                if (currentUserId != null) {
                    var cardId;
                    if (request.id != null) {
                        cardId = request.id;
                    }
                    else {
                        cardId = firebase.database().ref().child('cards').push().key;
                        firebase.database().ref('users/' + currentUserId + '/userInformation/').update({
                            cardsCreated:  firebase.database.ServerValue.increment(1)
                        });
                    }
                    firebase.database().ref('users/' + currentUserId + '/cards/' + cardId).update({
                        frontValue: frontValueInput.value,
                        backValue: backValueInput.value,
                        creationDate: Date.now(),
                        collectionId: collectionSelect.value
                    });
                    window.location.hash = '#/cards';
                }
            });
        }
    }
}

export default card;