import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

export default defineConfig({
    site: 'https://www.julianacapucci.com.br',
    output: 'static',
    integrations: [sitemap(), react()],
    build: {
        assets: '_assets',
    },
});