let loign = {
    render: async () => {
        let view = `
        <dialog id="loginDialog">
            <form action="javascript:void(0);">
                <fieldset>
                    <legend>Log in</legend>
                    <input type="text" id="loginEmailInput" required autocomplete="off" />
                    <label for="loginEmailInput"><span>Email</span></label>
                    <input type="text" id="loginPasswordInput" required autocomplete="off" />
                    <label for="loginPasswordInput"><span>Password</span></label>
                    <button id="submitLoginButton" class="button-animated button-primary">Log in</button>
                </fieldset>
            </form>
        </dialog>
        `
        return view
    },

    after_render: async () => {
        var loginDialog = document.getElementById('loginDialog');
        var submitLoginButton = document.getElementById('submitLoginButton');

        loginDialog.showModal();

        loginDialog.addEventListener('click', function (event) {
            var rect = loginDialog.getBoundingClientRect();
            if (!(rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX && event.clientX <= rect.left + rect.width)) {
                history.back();
            }
        });

        submitLoginButton.addEventListener('click', function (event) {
            login();
            loginDialog.close();
        });

        async function login() {
            var email = document.getElementById("loginEmailInput").value;
            var password = document.getElementById("loginPasswordInput").value;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    currentUser = userCredential.user;
                    window.location.hash = '#/home';
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    }
}

export default loign;