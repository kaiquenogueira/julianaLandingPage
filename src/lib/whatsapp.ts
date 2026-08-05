/**
 * Links de WhatsApp com origem rastreável.
 *
 * Todo CTA do site aponta para o mesmo número, então a única forma confiável de
 * saber de onde o lead veio é a própria mensagem pré-preenchida. O parâmetro
 * `text` chega escrito na conversa e não depende de pixel, cookie ou consentimento.
 * O `data-wa-origin` complementa isso enviando a origem como parâmetro do evento
 * de conversão (ver o listener em BaseLayout.astro).
 */

export const WHATSAPP_NUMBER = '5511993051221';
export const WHATSAPP_DISPLAY = '(11) 99305-1221';

/** Origens conhecidas → rótulo que aparece na mensagem enviada à Juliana. */
export const WHATSAPP_ORIGINS = {
  'nav': 'menu do site',
  'home-hero': 'início do site',
  'home-cta': 'página inicial',
  'blog-artigo': 'blog',
  'lp-maternidade': 'página sobre maternidade',
  'lp-intercambio': 'página sobre intercâmbio',
  'lp-relacionamento': 'página sobre relacionamentos',
  'lp-psicologa-online': 'página de psicoterapia online',
} as const;

export type WhatsAppOrigin = keyof typeof WHATSAPP_ORIGINS;

export interface WhatsAppLinkOptions {
  origin: WhatsAppOrigin;
  /** Sobrescreve o rótulo padrão da origem (ex.: título do artigo). */
  label?: string;
  /** Sobrescreve a mensagem inteira. */
  message?: string;
}

function defaultMessage(label: string): string {
  return `Oi, Juliana! Vim pelo site (${label}) e gostaria de agendar uma sessão.`;
}

export function whatsappUrl({ origin, label, message }: WhatsAppLinkOptions): string {
  const text = message ?? defaultMessage(label ?? WHATSAPP_ORIGINS[origin]);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Atributos que todo link de WhatsApp deve carregar.
 *
 * `target="_blank"` é obrigatório, não estético: o listener de conversão só
 * consegue enviar o beacon com segurança porque a aba de origem continua viva.
 */
export function whatsappLinkAttrs(options: WhatsAppLinkOptions) {
  return {
    href: whatsappUrl(options),
    target: '_blank',
    rel: 'noopener noreferrer',
    'data-wa-origin': options.origin,
  };
}
