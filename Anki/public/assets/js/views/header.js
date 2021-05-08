let headerView = {
    render: async () => {
        let view =
            `
        <input type="checkbox" id="menuCheckbox" class="menu-checkbox">
        <label for="menuCheckbox" class="menu-icon">
            <div id ="menuIconLine1" class="menu-icon_line"></div>
            <div id ="menuIconLine2" class="menu-icon_line"></div>
            <div id ="menuIconLine3" class="menu-icon_line"></div>
        </label>
        <nav id="menuSection1" class="navbar">
            <a class="navbar__link_logo" href="/#/home">Anki</a>
            <a class="navbar__link" href="/#/home">Home</a>
            <a id="collectionsLink" class="navbar__link" href="/#/collections">Collections</a>
            <a id="cardsLink" class="navbar__link" href="/#/cards">Cards</a>
            <a id="statisticsLink" class="navbar__link" href="/#/statistics">Statistics</a>
            <a class="navbar__link" href="/#/privacy">Privacy</a>
        </nav>
        <div id="menuSection2" class="header-section">
            <button id="loginButton" onclick="window.location='/#/login'" class="button-animated button-secondary">Log in</button>
            <button id="registerButton" onclick="window.location='/#/register'" class="button-animated button-secondary">Register</button>
            <button id="userButton" onclick="window.location='/#/user'" class="button-animated button-secondary">User</button>
            <button onclick="logout()" id="logoutButton" class="button-animated button-secondary">Log out</button>
        </div>
        `
        return view
    },
    after_render: async () => {
        if (localStorage.getItem('currentUserId') != null) {

            document.getElementById("loginButton").style.display = "none";
            document.getElementById("registerButton").style.display = "none";
        }
        else {
            document.getElementById("userButton").style.display = "none";
            document.getElementById("logoutButton").style.display = "none";
            document.getElementById("collectionsLink").style.display = "none";
            document.getElementById("cardsLink").style.display = "none";
            document.getElementById("statisticsLink").style.display = "none";
        }
    }
}
export default headerView;