if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Client side rendering
    require('./client');
} else {
    // Server side rendering
    global.RLS = require('./server');
}
