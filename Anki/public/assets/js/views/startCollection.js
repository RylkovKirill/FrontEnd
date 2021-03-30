let startCollection = {
    render : async () => {
        let view =`
        <section class="collection-section">
            <h1>Collection name</h1>
            <span class="statistics-area">
                <span class="statistics-area__span">Time: <em class="statistics-area__em">value</em></span>
                <span class="statistics-area__span">Cards left: <em class="statistics-area__em">value</em></span>
            </span>
            <div class="card-wrapper">
                <article class="card card-animated">
                    <div class="side front">
                        <h2>Front value</h2>
                    </div>
                    <div class="side back">
                        <h2>Back value</h2>
                    </div>
                </article>
            </div>
            <span class="container-inline">
                <button class="button-secondary">Fogot</button>
                <button class="button-primary">Remembered</button>
            </span>
        </section>
        `
        return view
    },
    after_render: async () => {}    
}

export default startCollection;