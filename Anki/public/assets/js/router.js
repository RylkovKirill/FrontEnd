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

import removeView from './views/remove.js'

import pageNotFound from './views/errors/pageNotFound.js'
import unauthorized from './views/errors/unauthorized.js'

import headerView from './views/header.js'

import Utils from './Utils.js'


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
    '/remove-collection/:id': removeView,
    '/create-card': card,
    '/edit-card/:id': card,
    '/remove-card/:id': removeView

};

const router = async () => {
    const header = null || document.getElementById('menu');
    header.innerHTML = await headerView.render();
    await headerView.after_render();
    const content = null || document.getElementById('root');
    var user = firebase.auth().currentUser;
    let request = Utils.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    let page = routes[parsedURL] ? routes[parsedURL] : pageNotFound
    if (localStorage.getItem('currentUserId') === null && (parsedURL != '/login' && parsedURL != '/register' && parsedURL != '/privacy')) {
        page = unauthorized;
    }
    content.innerHTML = await page.render();
    // alert(window.location.hash);
    await page.after_render();

}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);