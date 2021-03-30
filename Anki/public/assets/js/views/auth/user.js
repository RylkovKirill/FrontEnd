let user = {
    render: async () => {
        let view = `
        <h1>User</h1>
        <article class="statistics-area">
            <span class="statistics-area__span">Registration date: <em class="statistics-area__em">2021</em></span>
            <span class="statistics-area__span">Collections created: <em class="statistics-area__em">10</em></span>
            <span class="statistics-area__span">Cards created: <em class="statistics-area__em">10</em></span>
            <input type="text" id="userNameInput" required autocomplete="off" />
            <label for="userNameInput"><span>Name</span></label>
            <button id="updateUserButton" class="button-animated button-primary">Save</button>
        </article>
        `
        return view
    },
    after_render: async () => {
        var userName = document.getElementById("userNameInput");
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