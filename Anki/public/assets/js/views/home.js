let home = {
    render : async () => {
        let view =`
        <section class="collections-section">
            <h1>Home</h1>
            <article class="statistics-area">
                <span class="statistics-area__span">Card studied today: <em class="statistics-area__em">value</em></span>
                <span class="statistics-area__span">Time wasted today: <em class="statistics-area__em">value</em></span>
            </article>
            <h2>Recomandation</h2>
            <ul class="collections-section__ul">
                <li>
                    <article class="collection">
                        <h2>Collection name</h2>
                        <time>Creation date</time>
                        <button class="button-primary">Start</button>
                        <button class="button-primary">Edit</button>
                        <button class="button-secondary">Remove</button>
                    </article>
                </li>
                <li>
                    <article class="collection">
                        <h2>Collection name</h2>
                        <time>Creation date</time>
                        <button class="button-primary">Start</button>
                        <button class="button-primary">Edit</button>
                        <button class="button-secondary">Remove</button>
                    </article>
                </li>
                <li>
                    <article class="collection">
                        <h2>Collection name</h2>
                        <time>Creation date</time>
                        <button class="button-primary">Start</button>
                        <button class="button-primary">Edit</button>
                        <button class="button-secondary">Remove</button>
                    </article>
                </li>
                <li>
                <article class="collection">
                    <h2>Collection name</h2>
                    <time>Creation date</time>
                    <button class="button-primary">Start</button>
                    <button class="button-primary">Edit</button>
                    <button class="button-secondary">Remove</button>
                </article>
                </li>
                <li>
                    <article class="collection">
                        <h2>Collection name</h2>
                        <time>Creation date</time>
                        <button class="button-primary">Start</button>
                        <button class="button-primary">Edit</button>
                        <button class="button-secondary">Remove</button>
                    </article>
                </li>
                <li>
                    <article class="collection">
                        <h2>Collection name</h2>
                        <time>Creation date</time>
                        <button class="button-primary">Start</button>
                        <button class="button-primary">Edit</button>
                        <button class="button-secondary">Remove</button>
                    </article>
                </li>
                <li>
                    <article class="collection">
                        <h2>Collection name</h2>
                        <time>Creation date</time>
                        <button class="button-primary">Start</button>
                        <button class="button-primary">Edit</button>
                        <button class="button-secondary">Remove</button>
                    </article>
                </li>              
                <li>
                    <article class="collection">
                        <h2>Collection name</h2>
                        <time>Creation date</time>
                        <button class="button-primary">Start</button>
                        <button class="button-primary">Edit</button>
                        <button class="button-secondary">Remove</button>
                    </article>
                </li>
                <li>
                    <article class="collection">
                        <h2>Collection name</h2>
                        <time>Creation date</time>
                        <button class="button-primary">Start</button>
                        <button class="button-primary">Edit</button>
                        <button class="button-secondary">Remove</button>
                    </article>
                </li>
                <li>
                <article class="collection">
                    <h2>Collection name</h2>
                    <time>Creation date</time>
                    <button class="button-primary">Start</button>
                    <button class="button-primary">Edit</button>
                    <button class="button-secondary">Remove</button>
                </article>
            </li>
            </ul>
        </section>
        `
        return view
    },
    after_render: async () => {}    
}

export default home;
