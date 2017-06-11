# React Laravel Starter

React Laravel Start project

## React Laravel Config

In your config/react.php:

```php
return [
    'source'            => base_path('node_modules/react/dist/react.js'),
    'dom-source'        => base_path('node_modules/react-dom/dist/react-dom.js',
    'dom-server-source' => base_path('node_modules/react-dom/dist/react-dom-server.js'),
    'components'        => public_path('components.js')
];
```
