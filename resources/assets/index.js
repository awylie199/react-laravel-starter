if (typeof window === 'undefined') {
    // Client side rendering
    require('./client');
} else {
    // Server side rendering
    global.RLS = require('./server');
}
