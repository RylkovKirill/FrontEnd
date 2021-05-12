let user = {
    render: async () => {
        let view = `
        <h1>User</h1>
        <article class="statistics-area">
            <span class="statistics-area__span">Registration date: <em id="registrationDate" class="statistics-area__em"></em></span>
            <span class="statistics-area__span">Collections created: <em id="collectionsCreated" class="statistics-area__em"></em></span>
            <span class="statistics-area__span">Cards created: <em id="cardsCreated" class="statistics-area__em"></em></span>
            <input type="text" id="userNameInput" required autocomplete="off" />
            <label for="userNameInput"><span>Name</span></label>
            <button id="updateUserButton" class="button-animated button-primary">Save</button>
        </article>
        `
        return view
    },
    after_render: async () => {
        var userName = document.getElementById("userNameInput");
        var registrationDate = document.getElementById("registrationDate");
        var collectionsCreated = document.getElementById("collectionsCreated");
        var cardsCreated = document.getElementById("cardsCreated");
        var currentUserId = localStorage.getItem('currentUserId');
        var userInformation = new Map();
        database.ref('users/' + currentUserId + '/userInformation/').on('value', (snapshot) => {
            for (let userInformationOption in snapshot.val()) {
                userInformation.set(userInformationOption, snapshot.child(userInformationOption).val());
            }
            registrationDate.textContent = userInformation.get("registrationDate");
            collectionsCreated.textContent = userInformation.get("collectionsCreated");
            cardsCreated.textContent = userInformation.get("cardsCreated");
        });
        var user = firebase.auth().currentUser;
        var name = null;

        if (user != null) {
            name = user.displayName;
            userName.value = name;
        }

        var updateUserButton = document.getElementById('updateUserButton');
        updateUserButton.addEventListener('click', function (event) {
            update();
        });
        
        async function update() {
            user.updateProfile({
                displayName: userName.value
            }).then(function () {
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }
    }
}

export default user;