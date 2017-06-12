global.RLS = {};

if (typeof window === 'undefined') {
    // Client side rendering
    global.App = require('./client');
} else {
    // Server side rendering
    global.App = require('./server');
}
