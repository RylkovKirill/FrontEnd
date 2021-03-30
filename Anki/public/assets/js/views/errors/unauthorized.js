let unauthorized = {
    render : async () => {
        let view = `
        <article class="authentication-warning">
            <button id="unauthorizedButton" class="authentication-warning__button button-animated button-secondary">Log in to continue</button>
        </article>
        `
        return view
    },
    after_render: async () => {}    
}

export default unauthorized;