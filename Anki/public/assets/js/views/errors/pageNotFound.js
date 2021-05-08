let pageNotFound = {
    render : async () => {
        let view = `
        <h1 class="error">Page not found</h1>
        `
        return view
    },
    after_render: async () => {}    
}

export default pageNotFound;