let statistics = {
    render : async () => {
        let view =
        `
        <h1>Statistics</h1>
        <article class="statistics-area">
            <span class="statistics-area__span">Card studied: <em class="statistics-area__em">21</em></span>
            <span class="statistics-area__span">Time wasted: <em class="statistics-area__em">21</em></span>
        </article>
        `
        return view
    },
    after_render: async () => {}    
}

export default statistics;