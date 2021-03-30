"use strict";

import home from './views/home.js'
import collections from './views/collections.js'
import cards from './views/cards.js'
import statistics from './views/statistics.js'
import privacy from './views/privacy.js'

import login from './views/auth/login.js'
import register from './views/auth/register.js'
import user from './views/auth/user.js'

import startCollection from './views/startCollection.js'
import collection from './views/collection.js'
import card from './views/card.js'

import pageNotFound from './views/errors/pageNotFound.js'
import unauthorized from './views/errors/unauthorized.js'

const Utils = {
    parseRequestURL: () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource: null,
            id: null,
            verb: null
        }
        request.resource = r[1]
        request.id = r[2]
        request.verb = r[3]
        return request
    }

    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}


const routes = {

    '/': home,
    '/home': home,
    '/collections': collections,
    '/cards': cards,
    '/statistics': statistics,
    '/privacy': privacy,
    '/login': login,
    '/register': register,
    '/user': user,

    '/start-collection/:id': startCollection,
    '/create-collection': collection,
    '/edit-collection/:id': collection,
    '/create-card': card,
    '/edit-card/:id': card
};

const router = async () => {
    const content = null || document.getElementById('root');
    var user = firebase.auth().currentUser;
    let request = Utils.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    let page = routes[parsedURL] ? routes[parsedURL] : pageNotFound
    content.innerHTML = await page.render();
    // alert(window.location.hash);
    await page.after_render();

}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);