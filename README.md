# React Laravel Starter

A React Laravel Starter Project.

Inspired by [React Laravel](https://github.com/talyssonoc/react-laravel) and [Go Starter Kit](https://github.com/olebedev/go-starter-kit).

## Features

- [x] Laravel 5.4
- [x] React with Redux
- [x] Server Side Rendering (with PHP V8JS)
- [x] Hot Module Reloading
- [x] React Router v4 and Redux Router v3
- [x] Styled SCSS Components
- [x] ImmutableJS
- [x] Eslint and Stylelint
- [x] BDD Testing via Mocha, Chai, Enzyme and Sinon
- [x] Service Worker Support (for Progressive Web Apps)
- [x] Yarn

## V8 and PHPV8 Setup

Install [V8JS](https://github.com/phpv8/v8js) from [source](https://github.com/phpv8/v8js/blob/master/README.Linux.md) or as a [pre-built binary](https://launchpad.net/~pinepain/+archive/ubuntu/libv8-5.2):

```shell
sudo add-apt-repository ppa:pinepain/libv8-5.2
sudo apt-get update
sudo apt-get install libv8-5.2
```

Install [PHPV8](https://github.com/pinepain/php-v8):

```shell
cd /tmp
git clone https://github.com/phpv8/v8js.git
cd v8js
phpize
./configure --with-v8js=/opt/v8
make
make test
sudo make install
```

You may need to add the extension to your php.ini files:

```php
extension=v8js.so
```

Check your installed v8 extension is enabled:

```shell
php --ri v8js
```

## React Laravel Config

This project depends on [React Laravel](https://github.com/talyssonoc/react-laravel).

Republish the React Laravel config:

```shell
php artisan vendor:publish
```

Check your config/react.php file still looks like:

```php
return [
    'source'            => base_path('node_modules/react/dist/react.js'),
    'dom-source'        => base_path('node_modules/react-dom/dist/react-dom.js'),
    'dom-server-source' => base_path('node_modules/react-dom/dist/react-dom-server.js'),
    'components'        => public_path('bundle.server.js')
];
```

## Build, Run & Test

Run in the project root:

```shell
composer install
yarn install

# Dev:
npm run start:dev

# Prod:
npm run build

# Test:
npm run test

# Lint:
npm run lint
```

## Hot Module Replacement

To get the hot module replacement to work with the webapp, you may need to install a [forwarder plugin](https://github.com/mhallin/vagrant-notify-forwarder) if you're using Homestead.

Also update your resources/webpack.client.js file to match your app URL:

```js
host = process.env.HOST || 'rls.local'
```

## Limitations

Currently the React components are rendered after the Laravel route has been matched.

Consequently, the Router *context* cannot be used to redirect the app on the server.

Therefore you should avoid using 'Redirect' within React Router.

Alternatively you could rely on Laravel to handle redirects, and create separate routes and views for use cases such as [authenticated pages](https://reacttraining.com/react-router/web/example/auth-workflow).
