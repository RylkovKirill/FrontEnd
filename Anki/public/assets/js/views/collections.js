let collections = {
    render : async () => {
        let view =`
        <section class="collections-section">
            <h1>Collections</h1>
            <button class="button-primary">Add new</button>
            <button class="button-secondary">Remove all</button>
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

export default collections;