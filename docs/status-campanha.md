# Status da campanha — ponto de retomada

Documento vivo. Atualizar a cada rodada de análise.

**Campanha no ar desde:** 05/08/2026
**Última atualização:** 11/08/2026

> **11/08/2026 — a conversão estava quebrada desde o dia 1.** 96 cliques, R$ 157,89 e 0,00
> conversão no painel. Causa: o Partytown engolia o evento de conversão do Google Ads.
> Corrigido e no ar no mesmo dia (seção 7). **Nenhum dado de conversão de 05–11/08 existe no
> Ads** — o marco zero da medição automática é 11/08/2026.
>
> Os leads da semana existiram e foram contados na mão: **3 no WhatsApp, todos pela LP do
> anúncio, nenhum virou primeiro atendimento.** R$ 52,63 por lead. Isso é resultado normal
> para uma amostra de 3 — ver "Como ler esses números" antes de mudar qualquer coisa.

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
| Conversão principal | `AW-18373032857 / XfZECKDk29wcEJn3-LhE` ("Contato"), contagem "Uma" |
| Conversão secundária | `HznsCJ6H0dwcEJn3-LhE` ("Visualização de página") — só observação |
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
2. **Planilha de controle** com os leads: data, origem, tempo até a resposta, agendou,
   compareceu
3. Quantos leads chegaram no WhatsApp e quantos viraram paciente
4. **Onde cada conversa parou** — quem falou por último e em que ponto morreu. Não precisa de
   conteúdo clínico, só a forma. É o que aponta a correção (tabela na seção 7).
5. Se a agenda encheu

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
| Conversões **registradas no Ads** | 0,00 — a tag estava quebrada, ver abaixo |
| **Leads reais no WhatsApp** | **3** (contados na mão, na conversa) |
| **Primeiro atendimento** | **0** |
| Cliques em celular | 94,8% |

Os 3 leads vieram da LP do anúncio — a mensagem pré-preenchida dizia "página de psicoterapia
online". Atribuição não é dúvida nesta semana.

| Taxa | Valor |
|---|---|
| Clique → lead | 3,1% |
| **Custo por lead** | **R$ 52,63** |
| Lead → paciente | 0 de 3 |

Redes conferidas: parceiros de pesquisa e Display **desmarcados**. O CPC baixo não é
vazamento de Display.

Volume estabilizou em 16–19 cliques/dia a partir do dia 3. O aviso "Qualificada (limitada)"
era ruído — **não adicionar as palavras de reserva**, não falta volume.

### Como ler esses números

**R$ 52,63 por lead é bom** para psicoterapia. Com os 20–25% de lead→paciente das premissas,
projeta CAC de ~R$ 234 — dentro da meta de R$ 200–350 e bem abaixo do teto de R$ 660. Com
R$ 700/mês dá ~13 leads/mês, ou ~3 pacientes novos/mês. É exatamente a meta de trabalho e o
limite da agenda.

**0 de 3 não é sinal de nada.** Se a taxa real fosse 20–25%, a chance de sair 0 em 3 leads é
de 42–51%. O resultado é o esperado quase metade das vezes numa campanha saudável. O número
que separa azar de problema é **12 leads**: com 12 e nenhum paciente, a premissa de 20% cai
para 6,9% de probabilidade, e aí o gargalo é real. 12 leads ≈ R$ 630 ≈ um mês de verba — bate
com o checkpoint de dia 30 da seção 3.

> **Não pausar, não mexer no lance e não mexer em palavra-chave por causa de 0 de 3.**
> Reavaliar em 12 leads.

**A recomendação de trocar para CPC manual foi descartada.** O CPC de R$ 1,64 com CTR de 1,39%
parecia posição de rodapé comprando clique ruim. Os 3 leads desmentem: esse tráfego converte.
Subir o lance cortaria o volume em ~4x para comprar qualidade que os dados dizem já existir.
O CTR baixo é cosmético — quem paga a conta é o custo por lead.

**O gargalo agora está depois do clique.** Para o CAC ficar abaixo do teto de R$ 660 basta 8%
de lead→paciente (1 a cada 12,5). A margem é grande, mas depende da conversa no WhatsApp, que
o Google não controla. Onde a conversa morre define a correção:

| Padrão na conversa | O que indica | Correção |
|---|---|---|
| Demora para responder | maior fator isolado em lead de WhatsApp | responder em minutos |
| Some depois do preço | R$ 130 não é caro no mercado; é ancoragem | falar do formato antes do número |
| Pede o que ela não faz (casal, presencial, criança, convênio) | negativa faltando | adicionar às negativas |
| Some sem responder nada | lead frio | normal, é o custo do jogo |

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

### Uma segunda ação de conversão dispara no page view

Descoberto durante o teste em produção: ao abrir qualquer página, antes de qualquer clique,
sai um hit com **outro rótulo**:

```
…/pagead/conversion/18373032857/?…&en=page_view&label=HznsCJ6H0dwcEJn3-LhE&data=event%3Dgtag.config
```

Não vem do código do site — vem da configuração da conta, provavelmente ação criada pelo
assistente do Google. Ficou invisível a semana toda porque o Partytown bloqueava tudo.

Confirmado na interface: a ação chama-se **"Visualização de página"**, origem Site, **data de
criação 05/08/2026** — o mesmo dia em que a campanha subiu. Foi criada pelo assistente do
Google, não de propósito. Estava como **Ação principal** e como **meta padrão da conta**,
aplicada à campanha ("1 de 1"). Contagem em "Todas as conversões", ou seja: cada página aberta
na mesma sessão contaria separado.

**Risco:** cada visita viraria conversão. A taxa infla, o custo por conversão despenca e, ao
migrar para Maximizar conversões, o algoritmo passa a otimizar para visita em vez de lead.
Ficou invisível a semana toda só porque o Partytown bloqueava tudo — com a tag corrigida,
começaria a contar já no dia seguinte.

### Ajustes feitos na conta em 11/08/2026

| Meta | Ação | Antes | Depois |
|---|---|---|---|
| Visualização de página | `HznsCJ6H0dwcEJn3-LhE` | Principal | **Secundária** |
| Contato (WhatsApp) | `XfZECKDk29wcEJn3-LhE` | Principal, contagem "Todas" | **Principal, contagem "Uma"** |

Secundária significa que a ação continua sendo registrada, mas só na coluna "Todas as
conversões" — fora da coluna "Conversões" e fora da otimização de lances.

Contagem **"Uma"** é a correta para lead: uma pessoa que abre o WhatsApp, fecha e volta contaria
2 leads em "Todas". Com 3 leads por semana, um lead fantasma distorce o custo por lead em mais
de 30% — e é nele que as decisões estão baseadas.

> Regra geral que sai daí: **só `XfZECKDk29wcEJn3-LhE` pode ser Principal.** Se aparecer outra
> ação Principal, foi o Google que criou sozinho. Conferir também "Conversões automáticas do
> site" em Metas → Configurações, que é o que permite a recriação.

### Pendente desta rodada

1. ~~Deploy da correção~~ — feito e verificado em produção em 11/08/2026 (commits `f2a9e3d`
   e `ada8cfe`).
2. ~~Ação de conversão duplicada → Secundária~~ — feito em 11/08/2026, junto com a contagem
   da "Contato" para "Uma".
3. **Confirmar que a "Contato" saiu de 0,00.** É o teste final: com a tag corrigida e o lead
   entrando, a coluna Conversões tem que sair do zero. Se continuar em "Não há conversões
   recentes" depois de um clique real com aceite do banner, voltar a investigar.
4. **Tempo de resposta das 3 conversas.** Fator isolado mais provável e mais barato de
   corrigir.
5. **CSV de termos de pesquisa** (05–11/08). O objetivo mudou: não é cortar volume, é achar
   termo que gastou e não gerou lead.
6. **Planilha dos leads** a partir de 11/08: data, origem, tempo até a resposta, agendou,
   compareceu.
7. **Lance: não mexer.** Ver "Como ler esses números".
8. **Não aplicar "Remover 2 palavras-chave redundantes"** — a recomendação apareceu no painel
   em 11/08. A campanha usa o mesmo termo em frase e em exata de propósito; o Google chama
   isso de redundante e a sugestão tira a exata, que é a de maior controle.

---

## 8. Referências

| Assunto | Onde |
|---|---|
| Estrutura completa da campanha | `docs/trafego-pago.md` |
| Configuração da API do Google Ads | `credentials/README.md` |
| Formulário de Basic Access | `docs/google-ads-api-application.html` |
| Implementação do tracking | `src/layouts/BaseLayout.astro` |
| Links de WhatsApp com origem | `src/lib/whatsapp.ts` |
