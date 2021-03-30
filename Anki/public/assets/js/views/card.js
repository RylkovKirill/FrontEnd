let card = {
    render : async () => {
        let view =`
        <section>
            <h1>Edit card</h1>
            <form class="card__form">
                <div class="card__form_front">
                    <h2>Front</h2>
                    <input type="text" id="frontValueInput" required autocomplete="off" />
                    <label for="frontValueInput"></label>
                </div>
                <div class="card__form_back">
                    <h2>Back</h2>
                    <input type="text" id="backValueInput" required autocomplete="off" />
                    <label for="backValueInput"></label>
                </div>
                <div class="card__form_option">
                    <select>
                        <option>Collection 1</option>
                        <option>Collection 2</option>
                        <option>Collection 3</option>
                    </select>
                    <button class="button-primary">Save</button>
                </div>
            </form>
        </section>
        `
        return view
    },
    after_render: async () => {}    
}

export default card;