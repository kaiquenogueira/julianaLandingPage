# Status da campanha — ponto de retomada

Documento vivo. Atualizar a cada rodada de análise.

**Campanha no ar desde:** 05/08/2026
**Última atualização:** 11/08/2026

> **11/08/2026 — a conversão estava quebrada desde o dia 1.** 96 cliques, R$ 157,89, 0,00
> conversão. Causa: o Partytown engolia o evento de conversão do Google Ads. Corrigido no
> mesmo dia (seção 7). **Nenhum dado de conversão de 05–11/08 existe** — o marco zero real
> é a data do deploy da correção.

---

## 1. O que está no ar

| Item | Estado |
|---|---|
| Campanha `Search - Psicoterapia Online` | Qualificada, veiculando |
| Orçamento | R$ 23/dia (≈ R$ 700/mês) |
| Lance | Cliques, CPC teto R$ 5,00 |
| Grupos ativos | só o Grupo 1 (Psicóloga Online) |
| Correspondência | frase e exata; ampla desligada |
| Negativas | 43, nível de campanha |
| Recursos | 4 sitelinks, 6 frases de destaque, snippet "Tipos" |
| AI Max / recursos automáticos / DSA | desligados |
| Locais / Idioma | Brasil, presença; Português |
| Landing pages | 4 no ar |
| Conversão | `AW-18373032857 / XfZECKDk29wcEJn3-LhE` |
| Consent Mode v2 + banner LGPD | ativo |

**Conta da Juliana:** `6180049205` (618-004-9205) — ativa e verificada como anunciante.

---

## 2. Pendente

| Item | Bloqueia? | Onde |
|---|---|---|
| Nome na declaração do anunciante | não, cosmético | Admin → Verificação do anunciante |
| Basic Access do developer token | só a leitura por API | aguardando Google, enviado 05/08 |
| Reajuste de preço | não | decisão da Juliana |
| Cadastro e-Psi | **sim, se não estiver ativo** | exigência do CFP para atendimento online |

---

## 3. Cronograma de verificação

### Dia 2 — a conversão registra?
Metas → Conversões. Pedir para alguém clicar no WhatsApp pelo celular e **aceitar o banner de
consentimento**.

Se continuar em "Nenhuma conversão recente" depois de um clique real, investigar antes de
qualquer outra coisa. **Já aconteceu duas vezes neste projeto** (ver seção 7). É a falha que
só aparece depois de semanas de verba gasta.

Não confiar em "a tag está instalada": os eventos customizados podem sair normalmente enquanto
a conversão não sai. O teste que vale é olhar a rede do navegador e procurar uma requisição
para `googleadservices.com/pagead/conversion/18373032857/` com `label=XfZECKDk29wcEJn3-LhE`.
Sem essa requisição, não há conversão — independente do que o resto do console mostre.

### Dia 3–4 — está gastando?
| Situação | Leitura | Ação |
|---|---|---|
| Gasto perto de R$ 23/dia | volume saudável | nada |
| Gasto muito abaixo, impressões perto de zero | falta volume | adicionar palavras de reserva da seção 3 do `trafego-pago.md` |
| Gasto no teto todo dia com CPC alto | competição forte | avaliar subir CPC teto ou focar termos de cauda longa |

Não seguir a recomendação "adicionar palavras-chave relevantes" do Google — ela adiciona ampla.

### Dia 7 — primeiro relatório de termos de pesquisa
Palavras-chave → Termos de pesquisa. Exportar CSV.

É a rotina que mais economiza no início. Daqui saem:
- negativas novas (o que apareceu fora do alvo)
- palavras novas (o que converteu e ainda não está na lista)

### Dia 30 — primeira decisão de escala
Calcular **custo por paciente** = verba do mês ÷ pacientes que iniciaram terapia.

| Resultado | Ação |
|---|---|
| abaixo de R$ 350 | manter ou escalar |
| R$ 350–660 | manter, otimizar termos |
| acima de R$ 660 | pausar e revisar LP e qualificação no WhatsApp |

---

## 4. O que trazer para a próxima sessão

1. **CSV de termos de pesquisa** (ou avisar se a API já foi aprovada — aí eu puxo direto)
2. **Planilha de controle** com os leads: data, origem, agendou, virou paciente
3. Quantos leads chegaram no WhatsApp e quantos viraram paciente
4. Se a agenda encheu

Sem o item 2 não dá para calcular custo por paciente, que é o número que decide tudo. O Google
Ads mostra custo por conversão; conversão aqui é clique no WhatsApp, não paciente.

---

## 5. Regras de corte já acordadas

| Situação | Ação |
|---|---|
| Termo com 50+ cliques e 0 conversão | pausar |
| Grupo com CAC acima de R$ 660 por 30 dias | pausar e revisar LP |
| **Agenda cheia** | **pausar campanha** — não acumular lead sem atendimento |
| 30 conversões acumuladas | migrar lance para Maximizar conversões |

---

## 6. Contexto que não é óbvio olhando a conta

**O histórico de conversão não existe — nem o antigo, nem o da primeira semana.** Duas falhas
diferentes, ambas do Partytown (seção 7). Nenhum dado até 11/08/2026 serve de baseline.

**Por isso o lance começa em Cliques, não em Maximizar conversões.** O algoritmo não tem
histórico real para otimizar. Só migrar depois de ~30 conversões verificadas.

**Remarketing provavelmente não é permitido.** A política *Health in personalized advertising*
restringe segmentar por condição de saúde inferida, e montar lista a partir de quem visitou
página de psicoterapia é exatamente isso. Verificar antes de investir tempo nessa etapa. Por
consequência: manter Públicos-alvo vazios e Segmentação otimizada desativada.

**A capacidade é o limitador, não o CAC.** Com 1–4 pacientes/mês e teto de CAC folgado em
~R$ 660, gastar mais só antecipa o momento de pausar por agenda cheia. A alavanca de receita
mais forte não é tráfego — é o reajuste de preço (hoje R$ 130 avulsa / R$ 100 no pacote,
abaixo do mercado CRP-06 online em SP).

---

## 7. Primeira semana (05–11/08/2026) e a falha que ela revelou

### Números

| Métrica | Valor |
|---|---|
| Impressões | 6.905 |
| Cliques | 96 |
| CTR | 1,39% |
| Custo | R$ 157,89 (R$ 22,56/dia — orçamento consumido todo dia) |
| CPC médio | R$ 1,64 |
| **Conversões** | **0,00** |
| Cliques em celular | 94,8% |

Redes conferidas: parceiros de pesquisa e Display **desmarcados**. O CPC baixo não é
vazamento de Display.

Volume estabilizou em 16–19 cliques/dia a partir do dia 3. O aviso "Qualificada (limitada)"
era ruído — **não adicionar as palavras de reserva**, não falta volume.

### A falha: o Partytown engole a conversão do Google Ads

Diagnóstico feito no navegador em 11/08/2026, na mesma página e no mesmo instante:

| Caminho | Resultado |
|---|---|
| `gtag('event','conversion',{send_to:'AW-…/XfZECKDk29wcEJn3-LhE'})` via Partytown | nenhuma requisição |
| `gtag('event','contato_whatsapp',…)` via Partytown | beacon completo, 200 |
| mesmo `conversion` com gtag.js na thread principal | `googleadservices.com/pagead/conversion/…&label=XfZECKDk29wcEJn3-LhE` → 200 |

Testado também com label inválido: qualquer evento chamado `conversion` era descartado, e
qualquer outro nome passava. Ou seja — não era a conta, não era o label, não era o
consentimento.

**Motivo.** Eventos comuns saem por fetch/XHR, que o worker consegue proxiar. A conversão do
Ads depende do cookie `_gcl_aw`, da Attribution Reporting API e das enhanced conversions
(`ec_mode`, `eoid`, `crd`, `fsk` aparecem na URL que funciona). Nada disso existe dentro do
worker. O gtag desiste **sem erro no console e sem requisição**.

**Por que passou despercebido.** A correção de 05/08 (expor `window.gtag` no worker) fez os
eventos customizados voltarem a sair. A tag passou a *parecer* instalada. A conversão nunca
voltou.

**Correção (11/08/2026).** gtag.js movido para a thread principal; `gtag` e `dataLayer.push`
removidos do `forward` do Partytown em `astro.config.mjs` — mantê-los criaria um stub que
sobrescreve o gtag real. O Partytown segue no projeto só para o Meta Pixel, que hoje está
desligado.

> **Não devolver o gtag ao Partytown por ganho de PageSpeed.** Já custou duas rodadas de
> verba. O comentário longo em `BaseLayout.astro` registra o motivo.

### Consent Mode: o que a recusa faz de verdade

Com recusa, o gtag **não fica em silêncio** — envia um ping sem cookie
(`gcs=G100`, `npa=1`, `pscdl=denied`, sem `auid`), usado para modelagem de conversão. É o
Consent Mode v2 avançado e é compatível com a LGPD: nenhum identificador é gravado. A versão
anterior deste documento afirmava que a recusa bloqueava o registro; estava errado.

### Pendente desta rodada

1. **Deploy da correção** — sem ele o número segue 0.
2. **CSV de termos de pesquisa** (05–11/08). É o que separa "posição ruim" de "consulta ruim"
   como explicação do CTR de 1,39%.
3. **Estratégia de lance.** Maximizar cliques com orçamento estourado faz o Google comprar o
   clique mais barato disponível: R$ 1,64 num mercado de R$ 3–8 significa rodapé de página.
   Com capacidade de 1–4 pacientes/mês, 17 cliques ruins/dia valem menos que 5 bons. Avaliar
   CPC manual em ~R$ 4,00 **depois** de a conversão estar registrando.

---

## 8. Referências

| Assunto | Onde |
|---|---|
| Estrutura completa da campanha | `docs/trafego-pago.md` |
| Configuração da API do Google Ads | `credentials/README.md` |
| Formulário de Basic Access | `docs/google-ads-api-application.html` |
| Implementação do tracking | `src/layouts/BaseLayout.astro` |
| Links de WhatsApp com origem | `src/lib/whatsapp.ts` |
