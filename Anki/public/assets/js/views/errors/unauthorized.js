let unauthorized = {
    render : async () => {
        let view = `
        <article class="authentication-warning">
            <button id="unauthorizedButton" onclick="window.location='/#/login'"  class="authentication-warning__button button-secondary">Log in to continue</button>
        </article>
        `
        return view
    },
    after_render: async () => {}    
}

export default unauthorized;