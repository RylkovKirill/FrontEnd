let cards = {
    render : async () => {
        let view =`
        <section class="cards-area">
        <h1>Cards</h1>
        <button class="button-primary">Add new</button>
        <button class="button-secondary">Remove all</button>
        <ul class="cards-wraper">
            <li>
                <article class="card">
                    <h2>Card name</h2>
                    <time>Creation date</time>
                    <button class="button-primary">Edit</button>
                    <button class="button-secondary">Remove</button>
                </article>
            </li>
            <li>
            <article class="card">
                <h2>Card name</h2>
                <time>Creation date</time>
                <button class="button-primary">Edit</button>
                <button class="button-secondary">Remove</button>
            </article>
            </li>
            <li>
            <article class="card">
                <h2>Card name</h2>
                <time>Creation date</time>
                <button class="button-primary">Edit</button>
                <button class="button-secondary">Remove</button>
            </article>
            </li>
            <li>
            <article class="card">
                <h2>Card name</h2>
                <time>Creation date</time>
                <button class="button-primary">Edit</button>
                <button class="button-secondary">Remove</button>
            </article>
            </li>
            <li>
            <article class="card">
                <h2>Card name</h2>
                <time>Creation date</time>
                <button class="button-primary">Edit</button>
                <button class="button-secondary">Remove</button>
            </article>
            </li>
            <li>
            <article class="card">
                <h2>Card name</h2>
                <time>Creation date</time>
                <button class="button-primary">Edit</button>
                <button class="button-secondary">Remove</button>
            </article>
            </li>
            <li>
            <article class="card">
                <h2>Card name</h2>
                <time>Creation date</time>
                <button class="button-primary">Edit</button>
                <button class="button-secondary">Remove</button>
            </article>
            </li>
            <li>
            <article class="card">
                <h2>Card name</h2>
                <time>Creation date</time>
                <button class="button-primary">Edit</button>
                <button class="button-secondary">Remove</button>
            </article>
            </li>
            <li>
            <article class="card">
                <h2>Card name</h2>
                <time>Creation date</time>
                <button class="button-primary">Edit</button>
                <button class="button-secondary">Remove</button>
            </article>
            </li>
            <li>
            <article class="card">
                <h2>Card name</h2>
                <time>Creation date</time>
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

export default cards;