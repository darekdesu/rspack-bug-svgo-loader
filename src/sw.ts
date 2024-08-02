/* eslint-disable no-restricted-globals, import/first */
require('serviceworker-cache-polyfill');
import * as navigationPreload from 'workbox-navigation-preload';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
    CacheFirst,
    StaleWhileRevalidate
} from 'workbox-strategies';

// delete old cache from previous Workbox versions - for future updates
cleanupOutdatedCaches();

// delete old serviceworker-webpack-plugin cache
addEventListener('activate', function () {
    caches.delete('mweb-pwa-cache-v0.0.11');
});

/**
 * Precache Manifest for resources available offline.
 * https://developers.google.com/web/tools/workbox/modules/workbox-precaching#explanation_of_the_precache_list
 */

precacheAndRoute(self.__WB_MANIFEST);

/**
 * Disable navigation preload.
 */
navigationPreload.disable();

/**
 * Basic caching for scripts.
 */
registerRoute(
    /\.(?:js)$/,
    new StaleWhileRevalidate({
        cacheName: 'js'
    })
);

/**
 * Basic caching for fonts.
 */
registerRoute(
    /\.(?:woff|woff2|ttf|otf|eot)$/,
    new CacheFirst({
        cacheName: 'fonts'
    })
);

/**
 * Caching for small origin images.
 */
registerRoute(
    ({ sameOrigin, url }) =>
        sameOrigin && url.pathname.match(/\.(?:png|gif|jpg|jpeg|svg|webp)$/),
    new CacheFirst({
        cacheName: 'images'
    })
);
