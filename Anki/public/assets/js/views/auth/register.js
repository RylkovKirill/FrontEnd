let register = {
    render: async () => {
        let view = `
        <dialog id="registerDialog">
            <form action="javascript:void(0);" >
                <fieldset>
                    <legend>Register</legend>
                    <input type="text" id="registerEmailInput" required autocomplete="off" />
                    <label for="registerEmailInput"><span>Email</span></label>
                    <input type="text" id="registerUserNameInput" required autocomplete="off" />
                    <label for="registerUserNameInput"><span>UserName</span></label>
                    <input type="text" id="registerPasswordInput" required autocomplete="off" />
                    <label for="registerPasswordInput"><span>Password</span></label>
                    <button id="submitRegisterButton" class="button-primary">Register</button>
                </fieldset>
            </form>
        </dialog>
        `
        return view
    },

    after_render: async () => {
        var registerDialog = document.getElementById('registerDialog');
        var submitRegisterButton = document.getElementById('submitRegisterButton');

        registerDialog.showModal();

        registerDialog.addEventListener('click', function (event) {
            var rect = registerDialog.getBoundingClientRect();
            if (!(rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX && event.clientX <= rect.left + rect.width)) {
                history.back();
            }
        });

        submitRegisterButton.addEventListener('click', function (event) {
            register();
            registerDialog.close();
        });

        async function register() {
            var email = document.getElementById("registerEmailInput").value;
            var userName = document.getElementById("registerUserNameInput").value;
            var password = document.getElementById("registerPasswordInput").value;

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    currentUser = userCredential.user;
                    currentUser.updateProfile({
                        displayName: userName
                    }).then(function () {
                    }).catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                    });
                    window.location.hash = '#/home';
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    }
}

export default register;