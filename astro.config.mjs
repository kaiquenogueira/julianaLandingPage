import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// Só encaminha `fbq` quando o Meta Pixel realmente sobe. Encaminhar uma função
// que não existe no worker gera TypeError no console a cada chamada.
const forward = ['dataLayer.push', 'gtag'];
if (process.env.PUBLIC_META_PIXEL_ID) {
    forward.push('fbq');
}

export default defineConfig({
    site: 'https://www.julianacapucci.com.br',
    output: 'static',
    trailingSlash: 'always',
    integrations: [
        sitemap(),
        partytown({
            config: {
                forward,
            },
        }),
    ],
    build: {
        assets: '_assets',
    },
});
