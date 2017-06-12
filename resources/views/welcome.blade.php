<?php $currentUrl = Request::url()->current(); ?>

<!doctype html>
@react_component(
    'RLS',
    [
        'url' => $currentUrl
    ],
    [
        'prerender' => true,
        'id' => 'root'
    ]
)