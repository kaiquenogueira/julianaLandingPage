import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';

export default defineConfig({
    site: 'https://www.julianacapucci.com.br',
    output: 'static',
    trailingSlash: 'always',
    integrations: [
        sitemap(),
        react(),
        partytown({
            config: {
                forward: ['dataLayer.push', 'gtag'],
            },
        }),
    ],
    build: {
        assets: '_assets',
    },
});
