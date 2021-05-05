let cards = {
    render: async () => {
        let view = `<section class="cards-area">
                        <h1>Cards</h1>
                        <button id="addNewCardButton" class="button-primary">Add new</button>
                        <button id="removeAllCardButton" class="button-secondary">Remove all</button>
                        <ul id="cards" class="cards-wraper"></ul>
                    </section>`
        return view
    },

    after_render: async () => {
        var currentUserId = localStorage.getItem('currentUserId');
        const cardView = ['<li><article class="collection"><h2>',
            '</h2><time>',
            '</time><button onclick="',
            '" class="button-primary">Edit</button><button onclick="',
            '" class="button-secondary">Remove</button></article></li>'];
        var cards = document.getElementById("cards");
        database.ref('users/' + currentUserId + '/cards/').on('value', (snapshot) => {
            for (let cardId in snapshot.val()) {
                let data = snapshot.child(cardId).val();
                var hrefEdit = "window.location='/#/edit-card/" + cardId + "'";
                var hrefRemove = "window.location='/#/remove-card/" + cardId + "'";
                cards.insertAdjacentHTML("afterbegin", cardView[0] + data.frontValue + cardView[1] + new Date(data.creationDate).toLocaleDateString() + cardView[2] + hrefEdit + cardView[3] + hrefRemove + cardView[4]);
            }
        });
        var addNewCardButton = document.getElementById('addNewCardButton');
        addNewCardButton.addEventListener('click', function (event) {
            window.location.hash = '#/create-card';
        });
        var removeAllCardButton = document.getElementById('removeAllCardButton');
        removeAllCardButton.addEventListener('click', function (event) {
            database.ref('users/' + currentUserId).child('cards').remove();
            cards.innerHTML = '';
        });
    }

}
export default cards;