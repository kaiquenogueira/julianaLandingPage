import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// `gtag` e `dataLayer.push` NÃO entram aqui: o gtag.js roda na thread principal
// porque a conversão do Google Ads não funciona dentro do worker (ver o
// comentário longo em BaseLayout.astro). Encaminhar `gtag` também criaria um
// stub do Partytown que sobrescreveria o gtag real.
//
// Só encaminha `fbq` quando o Meta Pixel realmente sobe. Encaminhar uma função
// que não existe no worker gera TypeError no console a cada chamada.
const forward = [];
if (process.env.PUBLIC_META_PIXEL_ID) {
    forward.push('fbq');
}

export default defineConfig({
    site: 'https://www.julianacapucci.com.br',
    output: 'static',
    trailingSlash: 'always',
    integrations: [
        // `/comecar/` é destino de anúncio e vai com noindex: mantê-la no
        // sitemap seria pedir indexação e negar na mesma respiração.
        sitemap({
            filter: (page) => !page.includes('/comecar/'),
        }),
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
