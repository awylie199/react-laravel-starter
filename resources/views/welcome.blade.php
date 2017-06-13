<?php $currentUrl = Request::url(); ?>

<!doctype html>
<html lang="en" dir="ltr">
    <head>
        <meta charset='utf-8' />
        <base target='_blank' href='{{ url('/') }}' />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#536878' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description'content='React Laravel Starter' />
        <meta property='og:image' content='/icon.png' />
        <meta property='og:title' content='React Laravel Starter' />
        <meta property='og:url' content='{{ url('/') }}' />
        <meta property='og:site_name' content='React Laravel Starter' />
        <meta property='og:type' content='website' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='canonical' href='{{ url('/') }}' />
        <link rel='manifest' href='/manifest.json' />
    </head>
    <body>
        @react_component('RLS', ['url' => $currentUrl], ['tag' => 'main','prerender' => true])
    </body>
</html>