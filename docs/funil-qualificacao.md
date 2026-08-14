# Funil de qualificação antes do WhatsApp — projeto e restrições

Documento de decisão. Escrito **antes** da implementação, para a discussão acontecer sobre o
desenho e não sobre o código já pronto.

**Data:** 14/08/2026
**Estado:** proposto, não implementado
**Pré-requisito:** as negativas da seção 8 do `status-campanha.md` (custam zero e cortam o mesmo
lead errado antes do clique pago)

---

## 1. O problema que isto tenta resolver

| Métrica (05–12/08) | Valor |
|---|---|
| Cliques | 112 |
| Leads no WhatsApp | 4 |
| Clique → lead | 3,6% |
| Custo por lead | ~R$ 44 |
| **Leads dentro do perfil** | **0 de 4** |
| Pacientes | 0 |

O custo por lead é bom. O que está quebrado é **quem chega** e **o que acontece na conversa**.
Hoje o site entrega ao WhatsApp uma pessoa anônima com a mensagem "Vim pelo site (página de
psicoterapia online)" — a Juliana começa a conversa sem saber nada e gasta as primeiras
mensagens perguntando o que o funil poderia ter perguntado de graça.

**Hipótese:** três perguntas entre o anúncio e o WhatsApp (a) descartam casal, criança e
presencial antes de consumirem tempo de atendimento e (b) entregam contexto na primeira
mensagem, encurtando o tempo até a resposta útil — o fator isolado mais forte em lead de
WhatsApp.

**O que isto não é:** não é tentativa de aumentar a taxa de conversão. A expectativa honesta é
que a taxa clique → lead **caia**. Com agenda de 1–4 pacientes/mês, 6 leads certos valem mais
que 13 aleatórios.

---

## 2. O que a pesquisa diz — e a armadilha do número

O benchmark que circula é da Interact: **40,1% de start-to-lead** e **65% start-to-finish** em
quizzes (base: 80M+ leads na plataforma desde 2013; metodologia não detalhada).

**Esse 40% não é comparável com os nossos 3,6%.** O denominador é *quem clicou em "começar"*,
não *quem clicou no anúncio*. Comparar os dois números levaria à conclusão errada de que o
funil multiplica a conversão por 10.

O número que de fato importa do relatório é o outro: **~35% abandonam no meio do quiz**. Esse é
o custo real da fricção, e é o que precisa ser coberto pelo ganho de qualificação.

> **Regra de leitura:** só existe uma comparação válida — **cliques do anúncio → conversão
> "Contato"**, medida antes e depois, no mesmo denominador. Qualquer número interno do quiz é
> diagnóstico, nunca argumento.

---

## 3. Restrições que moldam o desenho

### 3.1 CFP — o limite real é mais estreito do que "não prometer resultado"

Fonte: [Nota Técnica CFP nº 1/2022](https://site.cfp.org.br/wp-content/uploads/2022/06/SEI_CFP-0612475-Nota-Tecnica.pdf)
e o CEPP (Resolução CFP nº 10/2005).

| Artigo | O que diz | Consequência no desenho |
|---|---|---|
| **art. 18 CEPP** | vedado divulgar/compartilhar com leigos **instrumentos e técnicas psicológicas privativas** | **Nenhuma escala validada.** Nada de PHQ-9, GAD-7, BAI, BDI, nem versão "adaptada". As perguntas são de contexto e logística, não de intensidade de sintoma. |
| **art. 2º "q"** | vedado realizar diagnósticos ou **apresentar resultados** em meios de comunicação | **Sem tela de resultado.** Sem score, sem "seu perfil é X", sem "você provavelmente tem…". A última tela é encaminhamento, não devolutiva. |
| **art. 2º** | vedado **induzir** pessoa a recorrer aos seus serviços | Sem escassez fabricada, contagem regressiva ou "últimas vagas". |
| **art. 20 "d"** | preço não como propaganda | Sem "desconto", "valor acessível", "primeira sessão". O site já respeita — o funil não pode reintroduzir. |
| **Res. 10/2018 + NT 1/2022** | nome completo + título + CRP obrigatórios em toda divulgação | **CRP 06/209216 visível na página do funil**, inclusive nas telas de descarte. |
| **art. 9º** | sigilo | Nada de resposta armazenada, logada ou enviada a terceiro. |

> A leitura estrita "qualquer questionário é vedado" não se sustenta no texto: o art. 18 fala de
> **instrumentos privativos da categoria**. Perguntar "o atendimento é para você ou para outra
> pessoa?" não é instrumento psicológico. Perguntar "com que frequência você se sente sem
> esperança, de 0 a 3?" é. A fronteira é essa, e o desenho fica bem longe dela.

### 3.2 Google Ads

| Política | Exigência | Como o desenho atende |
|---|---|---|
| [Destination requirements](https://support.google.com/adspolicy/answer/6368661) | destino rastreável pelo AdsBot, sem pop-up que bloqueie conteúdo, sem navegação propositalmente difícil | Astro gera HTML estático: as perguntas existem no HTML da página. Sem modal, sem interstitial, sem etapa obrigatória para ver conteúdo — a página rola normalmente por baixo do funil. |
| [Publicidade personalizada — saúde](https://support.google.com/adspolicy/answer/143465) | não segmentar por condição de saúde inferida | Resposta **nunca** vira parâmetro de evento nem lista de remarketing. |
| [Coleta e uso de dados](https://support.google.com/adspolicy/answer/6020956) | SSL; não enviar PII ao Google | Nenhum campo de nome, telefone ou e-mail. HTTPS já é padrão na Vercel. |

### 3.3 LGPD

Resposta sobre saúde mental é **dado pessoal sensível** (art. 5º, II). O desenho evita o problema
em vez de administrá-lo: **estado só em memória do navegador, nada em `localStorage`, nada em
query string, nada em servidor, nenhum campo de identificação.** A única transmissão é a
mensagem que a própria pessoa envia pelo WhatsApp — e ela pode editá-la antes de enviar.

---

## 4. Decisão técnica: âncora, não redirect por JS

Era o ponto mais frágil da ideia original ("mandar pro WhatsApp sem depender de clique ativo").

Redirecionar com `window.location.href` dentro de um handler é justamente o padrão que o iOS
trata pior em navegação para deep link / Universal Link, e o comportamento varia entre Safari,
Chrome e webviews de app. Como **94,8% dos cliques são em celular**, essa é a maior parte do
tráfego, não uma borda.

**Solução:** as opções da última pergunta **são `<a href="https://wa.me/...">`**, com a URL já
montada em tempo de build para cada combinação. Continua sendo um clique só — o clique na
resposta *é* a ida para o WhatsApp, que é o efeito que a ideia buscava —, mas é navegação nativa
de link, o caminho mais confiável em todo navegador.

**Efeito colateral bom:** o listener global em `src/layouts/BaseLayout.astro:168` já dispara a
conversão em qualquer `a[href]` que aponte para o WhatsApp. **Zero código novo de tracking.**
Manter `target="_blank"` e `rel="noopener noreferrer"` — está documentado em
`src/lib/whatsapp.ts` que a aba de origem precisa continuar viva para o beacon terminar de sair.

---

## 5. Desenho do funil

Rota nova: **`/comecar/`**. Mobile-first. Primeira pergunta acima da dobra. Sem barra de
progresso falsa, sem campo de texto, sem botão "voltar" (recomeçar é mais barato que manter
estado).

Abaixo do funil, na mesma página: nome, foto, CRP, TCC, como funciona o online. Serve à política
de destino do Google e ao art. 18 da NT — e é o que a pessoa que quer conferir credencial
procura.

### Tela 1 — contexto

> **O que te trouxe até aqui?**

- Maternidade, tentativa de engravidar ou pós-parto
- Morar fora, intercâmbio ou au pair
- Relacionamentos
- Ansiedade e rotina
- Luto ou uma perda recente
- Outro assunto

Espelha as personas que já têm LP e conteúdo. Nomear o assunto é permitido — a LP
`/psicologa-online/` já lista os mesmos temas.

### Tela 2 — o filtro (a razão de existir do funil)

> **O atendimento é para quem?**

| Opção | Destino |
|---|---|
| Para mim | segue |
| Para um adolescente | segue — ela atende adolescentes e adultos |
| Para mim e meu parceiro ou parceira (casal) | **tela de encaminhamento** |
| Para uma criança | **tela de encaminhamento** |

### Tela 3 — modalidade + agenda, com as âncoras

> **As sessões são online, por videochamada, de 50 minutos.**
> **Qual período funciona melhor pra você?**

- Manhã → `<a href="wa.me/...">`
- Tarde → `<a href="wa.me/...">`
- Noite → `<a href="wa.me/...">`

A frase filtra "presencial" sem gastar uma pergunta, e a resposta já é útil para a agenda.

### Telas de encaminhamento (casal / criança)

Explicam que ela atende individual, adolescentes e adultos, e apontam o
[Cadastro Nacional de Psicólogos do CFP](https://cadastro.cfp.org.br/).

> **Sem link de WhatsApp nessas telas.** É deliberado e é o principal valor do funil. Um "ainda
> quero falar" anula o filtro e devolve o problema para a agenda da Juliana.

### Mensagem montada

```
Oi, Juliana! Vim pelo anúncio. Procuro terapia online para mim,
principalmente por causa de [contexto], e o melhor período pra mim é [período].
```

Implementada via `whatsappUrl({ origin, message })` — `src/lib/whatsapp.ts` já aceita mensagem
completa.

---

## 6. Medição

### O que muda na conta: nada

A conversão principal continua sendo **só** `AW-18373032857 / XfZECKDk29wcEJn3-LhE`, contagem
"Uma", disparada pelo listener existente. A regra da seção 7 do `status-campanha.md` se mantém:
se aparecer outra ação Principal, foi o Google que criou sozinho.

### Métrica de decisão

**Cliques do anúncio → conversão "Contato"**, o mesmo denominador de antes e depois. É o único
número comparável.

### Queda por etapa — opcional, não bloqueia

Ver onde as pessoas abandonam exigiria evento por tela. Hoje `PUBLIC_GA4_ID` não está definido
em lugar nenhum do repositório, e criar ação de conversão no Ads para isso violaria a regra de
uma única Principal.

**Decisão:** v1 vai sem medição por etapa. Se ela virar necessária, o caminho é definir
`PUBLIC_GA4_ID` e mandar `quiz_etapa` **só para o GA4** — e o evento leva o **número da etapa,
nunca a resposta** (seção 3.2).

---

## 7. Critério de decisão

Trocar o destino do anúncio inteiro para `/comecar/`. **Sem teste A/B**: com ~4 leads/semana,
dividir o tráfego produz dois grupos ilegíveis.

`/psicologa-online/` continua no ar para orgânico e como plano de reversão imediato (é só voltar
a URL final do anúncio).

Avaliar em **12 leads ou 30 dias**, o que vier primeiro — o mesmo marco já acordado na seção 7
do `status-campanha.md`.

| Resultado | Leitura | Ação |
|---|---|---|
| Leads dentro do perfil, mesmo em menor número | funcionou | manter |
| Leads certos e conversa começando mais rápida | funcionou pelos dois motivos | manter |
| Volume caiu e o perfil continua errado | o problema é anterior ao clique | reverter a URL, atacar termo de pesquisa e negativa |
| Volume despencou e ninguém completa | fricção alta demais | reverter e reduzir para 2 perguntas |

A leitura primária é **qualitativa** — "é a pessoa certa?" — e isso é assumido. Com esse volume,
nenhuma diferença de taxa vai ser estatisticamente significativa em 30 dias; fingir o contrário
seria repetir o erro de ler "0 de 3" como sinal.

---

## 8. Ordem de execução

1. **Negativas** (`casal`, `conjugal`, `grátis`, `gratuito`, `sus`, `cvv`; conferir `psicólogo`
   no masculino entrando por frase). Custa zero, corta antes do clique pago. **Antes do funil.**
2. **Tempo de resposta.** O funil entrega contexto, mas não responde por ninguém.
3. **CSV de termos de pesquisa 05–13/08** — ainda pendente, e é o que diz se o lead errado nasce
   no termo. Se nascer, negativa resolve mais barato que funil.
4. Implementar `/comecar/`.
5. Trocar a URL final do anúncio.

Os passos 1–3 podem tornar o passo 4 desnecessário. Fazer nessa ordem é o que evita construir
página para resolver problema de palavra-chave.

---

## 9. O que não fazer

- **Não usar escala clínica validada**, nem "inspirada em". Art. 18 do CEPP.
- **Não criar tela de resultado, score ou perfil.** Art. 2º "q".
- **Não pedir nome, telefone ou e-mail.** Quebra o desenho de LGPD e a política de coleta de
  dados do Google de uma vez só.
- **Não mandar a resposta como parâmetro de evento** para Ads, GA4, Meta ou qualquer lugar.
- **Não colocar o funil em modal ou pop-up.** Risco direto de Destination requirements.
- **Não trocar a âncora por `window.location.href`** por elegância de código — a decisão da
  seção 4 é sobre iOS, não sobre estilo.
- **Não dividir o tráfego em A/B.**
- **Não deixar link de WhatsApp nas telas de descarte.**

---

## 10. Referências

| Assunto | Onde |
|---|---|
| Estado da campanha e histórico | `docs/status-campanha.md` |
| Estrutura da campanha | `docs/trafego-pago.md` |
| Listener de conversão | `src/layouts/BaseLayout.astro:168` |
| Montagem dos links de WhatsApp | `src/lib/whatsapp.ts` |
| Layout das LPs pagas | `src/layouts/LandingLayout.astro` |
| Nota Técnica CFP 1/2022 | https://site.cfp.org.br/wp-content/uploads/2022/06/SEI_CFP-0612475-Nota-Tecnica.pdf |
| Destination requirements | https://support.google.com/adspolicy/answer/6368661 |
| Publicidade personalizada (saúde) | https://support.google.com/adspolicy/answer/143465 |
| Coleta e uso de dados | https://support.google.com/adspolicy/answer/6020956 |
| Benchmark de quiz (ler com a seção 2) | https://www.tryinteract.com/blog/quiz-conversion-rate-report/ |
