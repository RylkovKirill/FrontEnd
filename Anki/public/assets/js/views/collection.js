import Utils from './../Utils.js'

let collection = {
    render: async () => {
        let view = `
        <section class="cards-area">
        <h1 id="title"></h1>
        <form action="javascript:void(0);">
            <input type="text" id="collectionNameInput" required autocomplete="off"/>
            <label for="collectionNameInput"><span>Name</span></label>
            <button id="saveCollectionButton" class="button-primary">Save</button>
        </form>
        <ul id="cards" class="cards-wraper">           
        </ul>
        </section>
        `
        return view
    },
    after_render: async () => {
        const request = Utils.parseRequestURL();
        console.log(request);
        var currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId != null) {
            var collectionNameInput = document.getElementById('collectionNameInput');
            if (request.id != null) {
                database.ref('users/' + currentUserId + '/collections/' + request.id).on('value', (snapshot) => {
                    var data = snapshot.val();
                    collectionNameInput.value = data.collectionName;
                });
                title.textContent = "Edit collection";
                var cards = document.getElementById('cards');
                var cardIdArray = []
                const cardView = ['<li><article class="card"><h2>', '</h2><time>', '</time><input type="checkbox"  checked class="card_checkbox"></article></li>'];
                database.ref('users/' + currentUserId + '/cards/').on('value', (snapshot) => {
                    for (let cardId in snapshot.val()) {
                        let data = snapshot.child(cardId).val();
                        if (data.collectionId == request.id) {
                            cardIdArray.push(cardId);
                            cards.insertAdjacentHTML("afterbegin", cardView[0] + data.frontValue + cardView[1] + new Date(data.creationDate).toLocaleDateString() + cardView[2]);
                        }
                    }
                });
            }
            else {
                title.textContent = "Add collection";
            }
            var currentUserId = localStorage.getItem('currentUserId');
            var saveCollectionButton = document.getElementById('saveCollectionButton');

            saveCollectionButton.addEventListener('click', function (event) {
                if (currentUserId != null) {
                    var collectionId;
                    if (request.id != null) {
                        collectionId = request.id;
                    }
                    else {
                        collectionId = firebase.database().ref().child('cards').push().key;
                        firebase.database().ref('users/' + currentUserId + '/userInformation/').update({
                            collectionsCreated:  firebase.database.ServerValue.increment(1)
                        });
                    }
                    firebase.database().ref('users/' + currentUserId + '/collections/' + collectionId).update({
                        collectionName: collectionNameInput.value,
                        creationDate: Date.now(),
                        lastResult: 0,
                        lastPassedDate: Date.now(),
                    });
                    if (request.id != null) {
                        const x = document.getElementsByClassName("card_checkbox");
                        var checkboxesChecked = [];
                        for (var i = 0; i < x.length; i++) {
                            if (x[i].checked) {
                                console.log(x[i]);
                                checkboxesChecked.push(true);
                            }
                            else {
                                checkboxesChecked.push(false);
                            }
                        }
                        cardIdArray.reverse();
                        for (var i = 0; i < x.length; i++) {
                            if (checkboxesChecked[i] == false) {
                                database.ref('users/' + currentUserId + '/cards/').child(cardIdArray[i]).remove();
                            }
                        }
                    }
                    window.location.hash = '#/collections';
                }
            });
        }
    }
}

export default collection;