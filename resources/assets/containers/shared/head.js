import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

export default class Head extends Component {
    render() {
        return (
            <Helmet
                {...this.props}
                htmlAttributes={{
                    lang: 'en',
                    dir: 'ltr'
                }}
                defaultTitle='React Laravel Starter'
                encodeSpecialCharacters={true}
             >
                <meta charSet='utf-8' />
                <base target='_blank' href='http://localhost:3000' />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name='mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='theme-color' content='#536878' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta name='description'content='React Laravel Starter' />
                <meta property='og:image' content='/icon.png' />
                <meta property='og:title' content='React Laravel Starter' />
                <meta
                    property='og:url'
                    content={typeof window === 'undefined' ? '' : window.location.origin}
                />
                <meta property='og:site_name' content='React Laravel Starter' />
                <meta property='og:type' content='website' />
                <link rel='shortcut icon' href='/favicon.ico' />
                <link rel='canonical' href={typeof window === 'undefined' ? '' : window.location.origin} />
                <link rel='manifest' href='/manifest.json' />
             </Helmet>
        );
    }
}
