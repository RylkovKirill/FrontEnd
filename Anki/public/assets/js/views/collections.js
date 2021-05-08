let collections = {
    render : async () => {
        let view =`<section class="collections-section">
                        <h1>Collections</h1>
                        <button id="addNewCollectionButton" class="button-primary">Add new</button>
                        <button id="removeAllCollectionButton" class="button-secondary">Remove all</button>
                        <ul id="collections" class="collections-section__ul">
                        </ul>
                    </section>
                    <script>
                        function removeCollection(collectionId){
                        database.ref('users/' + currentUserId + '/collections/').child(collectionId).remove();
                        }
                    </script>`
        return view
    },
    after_render: async () => {
        var currentUserId = localStorage.getItem('currentUserId');
        const cardView = ['<li><article class="collection"><h2>', 
                          '</h2><time>', 
                          '</time><button onclick="', 
                          '" class="button-primary">Start</button><button onclick="',
                          '" class="button-primary">Edit</button><button onclick="',
                          '" class="button-secondary">Remove</button></article></li>'];
        var collections = document.getElementById("collections");
        database.ref('users/' + currentUserId + '/collections/').on('value', (snapshot) => {
            for (let collectionId in snapshot.val()) {
                let data = snapshot.child(collectionId).val();
                var hrefStart = "window.location='/#/start-collection/" + collectionId + "'";
                var hrefEdit = "window.location='/#/edit-collection/" + collectionId + "'";
                var hrefRemove = "window.location='/#/remove-collection/" + collectionId + "'";
                collections.insertAdjacentHTML("afterbegin", cardView[0] + data.collectionName + cardView[1] + new Date(data.creationDate).toLocaleDateString() + cardView[2] + hrefStart + cardView[3]+ hrefEdit + cardView[4] + hrefRemove + cardView[5]);                 
            }
        });      
        var addNewCollectionButton = document.getElementById('addNewCollectionButton');
        addNewCollectionButton.addEventListener('click', function (event) {
            window.location.hash = '#/create-collection';
        });
        var removeAllCollectionButton = document.getElementById('removeAllCollectionButton');
        removeAllCollectionButton.addEventListener('click', function (event) {
            database.ref('users/' + currentUserId).child('collections').remove();
            collections.innerHTML = '';
        });

    }    
}

export default collections;