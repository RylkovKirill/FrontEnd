import Utils from './../Utils.js'

let removeView = {
    render: async () => {
        let view = `
        <dialog id="submitDialog" class="dialog-submit">
            <form action="javascript:void(0);">
                <fieldset>
                    <legend>To delete, press the submit button</legend>
                    <button id="submitButton" class="button-animated button-primary button-submit">Submit</button>
                </fieldset>
            </form>
        </dialog>
        `
        return view
    },

    after_render: async () => {
        var submitDialog = document.getElementById('submitDialog');
        var submitButton = document.getElementById('submitButton');

        submitDialog.showModal();

        submitDialog.addEventListener('click', function (event) {
            var rect = submitDialog.getBoundingClientRect();
            if (!(rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX && event.clientX <= rect.left + rect.width)) {
                history.back();
            }
        });

        submitButton.addEventListener('click', function (event) {
            var currentUserId = localStorage.getItem('currentUserId');
            if (currentUserId != null) {
                const request = Utils.parseRequestURL()
                if (request.id != null) {
                    if (request.resource == "remove-collection") {
                        database.ref('users/' + currentUserId + '/collections/').child(request.id).remove();
                        window.location.hash = '#/collections';
                    }
                    if (request.resource == "remove-card") {
                        database.ref('users/' + currentUserId + '/cards/').child(request.id).remove();
                        window.location.hash = '#/cards';
                    }
                }
            }
        });
    }
}

export default removeView;