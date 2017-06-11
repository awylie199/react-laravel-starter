import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiEnzyme from 'chai-enzyme';
import jsdom, {JSDOM} from 'jsdom';

const virtualConsole = new jsdom.VirtualConsole().sendTo(console);

new JSDOM('<!doctype html><html><body></body></html>', {
    beforeParse(window) {
        window.URL = {
            createObjectURL: () => {}
        };
        global.document = window.document;
        global.window = window;
        global.Blob = window.Blob;
    },
    virtualConsole
});

Object.keys(global.window).forEach((key) => {
    if (!(key in global)) {
        global[key] = global.window[key];
    }
});

chai.use(chaiImmutable);
chai.use(chaiEnzyme());
