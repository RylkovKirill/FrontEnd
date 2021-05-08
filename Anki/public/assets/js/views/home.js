let home = {
    render: async () => {
        let view = `<section class="collections-section">
                        <h1>Home</h1>
                        <article class="statistics-area">
                            <span class="statistics-area__span">Card studied today: <em id="cardStudiedValue" class="statistics-area__em"></em></span>
                            <span class="statistics-area__span">Time wasted today: <em  id="timeWastedValue"class="statistics-area__em"></em></span>
                        </article>
                        <h2>Recomendation</h2>
                        <ul id="recommendationList" class="collections-section__ul">
                        </ul>
                    </section>`
        return view
    },
    after_render: async () => {
        var currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId != null) {
            await getStatistics();
            await getRecommendation();
        }
        async function getStatistics() {
            var cardStudiedValue = document.getElementById('cardStudiedValue');
            var timeWastedValue = document.getElementById('timeWastedValue');
            var statistics = new Map();
            database.ref('users/' + currentUserId + '/statistics/' + (new Date()).toLocaleDateString().replace(/[.]/g, '')).on('value', (snapshot) => {
                for (let statisticsOption in snapshot.val()) {
                    // console.log(statisticsOption);
                    // console.log(snapshot.child(statisticsOption).val());
                    statistics.set(statisticsOption, snapshot.child(statisticsOption).val());
                }
                cardStudiedValue.textContent = statistics.get("cardStudied");
                timeWastedValue.textContent = statistics.get("timeWasted");
            });
        }
        async function getRecommendation() {
            var recommendation = [];
            const cardView = ['<li><article class="collection"><h2>',
                '</h2><time>',
                '</time><button onclick="',
                '" class="button-primary">Start</button><button onclick="',
                '" class="button-primary">Edit</button><button onclick="',
                '" class="button-secondary">Remove</button></article></li>'];

            database.ref('users/' + currentUserId + '/collections/').on('value', (snapshot) => {
                for (let collectionId in snapshot.val()) {
                    // console.log(collectionId);
                    let collectionData = snapshot.child(collectionId).val();
                    //console.log(collectionData);
                    recommendation.push({
                        id: collectionId,
                        collectionName: collectionData.collectionName,
                        creationDate: collectionData.creationDate,
                        lastResult: collectionData.lastResult,
                        lastPassedDate: collectionData.lastPassedDate
                    });
                }
                recommendation.sort(function (a, b) {
                    // console.log(a);
                    // console.log(b);
                    let aCoefficient = a.lastResult * 0.4 + a.lastPassedDate * 0.6;
                    let bCoefficient = b.lastResult * 0.4 + b.lastPassedDate * 0.6;
                    // console.log(aCoefficient);
                    // console.log(bCoefficient);
                    if (aCoefficient > bCoefficient) {
                      return 1;
                    }
                    if (aCoefficient < bCoefficient) {
                      return -1;
                    }
                    return 0;
                  });
                //  console.log(recommendation);
                var recommendationList = document.getElementById("recommendationList");
                recommendation.forEach((element) => {
                    // console.log(element);
                    var hrefStart = "window.location='/#/start-collection/" + element.id + "'";
                    var hrefEdit = "window.location='/#/edit-collection/" + element.id + "'";
                    var hrefRemove = "window.location='/#/remove-collection/" + element.id + "'";
                    recommendationList.insertAdjacentHTML("afterbegin", cardView[0] + element.collectionName + cardView[1] + new Date(element.creationDate).toLocaleDateString() + cardView[2] + hrefStart + cardView[3] + hrefEdit + cardView[4] + hrefRemove + cardView[5]);
                })
            });
        }
    }
}

export default home;
