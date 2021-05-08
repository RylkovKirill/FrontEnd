let statistics = {
    render: async () => {
        let view = `<h1>Statistics</h1>
                    <article class="statistics-area">
                        <span class="statistics-area__span">Card studied: <em id="cardStudiedValue" class="statistics-area__em"></em></span>
                        <span class="statistics-area__span">Time wasted: <em  id="timeWastedValue"class="statistics-area__em"></em></span>
                        <span class="statistics-area__span">Card studied today: <em id="cardStudiedValueToday" class="statistics-area__em"></em></span>
                        <span class="statistics-area__span">Time wasted today: <em id="timeWastedValueToday"class="statistics-area__em"></em></span>
                    </article>`
        return view
    },
    after_render: async () => {
        var currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId != null) {
            var cardStudiedValue = document.getElementById('cardStudiedValue');
            var timeWastedValue = document.getElementById('timeWastedValue');
            var statistics = new Map();
            database.ref('users/' + currentUserId + '/statistics/').on('value', (snapshot) => {
                for (let statisticsOption in snapshot.val()) {
                    // console.log(statisticsOption);
                    // console.log(snapshot.child(statisticsOption).val());
                    statistics.set(statisticsOption, snapshot.child(statisticsOption).val());
                }
                cardStudiedValue.textContent = statistics.get("cardStudied");
                timeWastedValue.textContent = statistics.get("timeWasted");
            });
            var cardStudiedValueToday = document.getElementById('cardStudiedValueToday');
            var timeWastedValueToday = document.getElementById('timeWastedValueToday');
            var statistics = new Map();
            database.ref('users/' + currentUserId + '/statistics/' + (new Date()).toLocaleDateString().replace(/[.]/g, '')).on('value', (snapshot) => {
                for (let statisticsOption in snapshot.val()) {
                    // console.log(statisticsOption);
                    // console.log(snapshot.child(statisticsOption).val());
                    statistics.set(statisticsOption, snapshot.child(statisticsOption).val());
                }
                cardStudiedValueToday.textContent = statistics.get("cardStudied");
                timeWastedValueToday.textContent = statistics.get("timeWasted");
            });
        }
    }
}

export default statistics;