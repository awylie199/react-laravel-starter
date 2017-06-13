# React Laravel Starter

A React Laravel Starter Project.

This is a **Work in Progress**.

Inspired by [React Laravel](https://github.com/talyssonoc/react-laravel) and [Go Starter Kit](https://github.com/olebedev/go-starter-kit).

## Features

- [x] Laravel 5.4
- [x] React with Redux
- [x] React Router v4 and Redux Router v3
- [x] Styled SCSS Components
- [x] ImmutableJS
- [x] Server Side Rendering (with PHP V8JS)
- [x] Hot Module Reloading
- [x] Eslint and Stylelint
- [x] BDD Testing via Mocha, Chai, Enzyme and Sinon
- [x] Service Worker Support (for Progressive Apps)
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

Your config/react.php file should look like:

```php
return [
    'source'            => base_path('node_modules/react/dist/react.js'),
    'dom-source'        => base_path('node_modules/react-dom/dist/react-dom.js'),
    'dom-server-source' => base_path('node_modules/react-dom/dist/react-dom-server.js'),
    'components'        => public_path('bundle.js')
];
```
