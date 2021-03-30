let collection = {
    render : async () => {
        let view =`
        <section class="cards-area">
        <h1>Collection name</h1>
        <form>
            <input type="text" id="collectionNameInput" required autocomplete="off" />
            <label for="collectionNameInput"><span>Name</span></label>
            <button class="button-primary">Save</button>
        </form>
        <ul class="cards-wraper">
            <li>
                <article class="card">
                    <h2>Card name</h2>
                    <time>Creation date</time>
                    <input type="checkbox">
                </article>
            </li>
            <li>
            <article class="card">
                <h2>Card name</h2>
                <time>Creation date</time>
                <input type="checkbox">
            </article>
            </li>
            <li>
                <article class="card">
                    <h2>Card name</h2>
                    <time>Creation date</time>
                    <input type="checkbox">
                </article>
            </li>
                      <li>
                <article class="card">
                    <h2>Card name</h2>
                    <time>Creation date</time>
                    <input type="checkbox">
                </article>
            </li>
                      <li>
                <article class="card">
                    <h2>Card name</h2>
                    <time>Creation date</time>
                    <input type="checkbox">
                </article>
            </li>
                      <li>
                <article class="card">
                    <h2>Card name</h2>
                    <time>Creation date</time>
                    <input type="checkbox">
                </article>
            </li>
                      <li>
                <article class="card">
                    <h2>Card name</h2>
                    <time>Creation date</time>
                    <input type="checkbox">
                </article>
            </li>
            <li>
            <article class="card">
                <h2>Card name</h2>
                <time>Creation date</time>
                <input type="checkbox">
            </article>
        </li>
                  <li>
                <article class="card">
                    <h2>Card name</h2>
                    <time>Creation date</time>
                    <input type="checkbox">
                </article>
            </li>
            <li>
            <article class="card">
                <h2>Card name</h2>
                <time>Creation date</time>
                <input type="checkbox">
            </article>
        </li>
        </ul>
        </section>
        `
        return view
    },
    after_render: async () => {}    
}

export default collection;