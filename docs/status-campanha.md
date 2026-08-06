# Status da campanha — ponto de retomada

Documento vivo. Atualizar a cada rodada de análise.

**Campanha no ar desde:** 05/08/2026
**Última atualização:** 05/08/2026

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
consentimento** (sem aceite, o Consent Mode bloqueia o registro por design).

Se continuar em "Nenhuma conversão recente" depois de um clique real, investigar antes de
qualquer outra coisa. **Já aconteceu uma vez neste projeto** — a tag ficou meses sem registrar
nada porque `window.gtag` não existia no worker do Partytown. É a falha que só aparece depois
de semanas de verba gasta.

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

**O histórico de conversão anterior não existe.** A conta antiga (`AW-974807273`) tinha a tag
quebrada: `window.gtag` nunca chegava ao objeto global dentro do worker do Partytown, então
toda chamada de conversão morria em silêncio. Nenhum dado anterior a 05/08/2026 serve de
baseline.

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

## 7. Referências

| Assunto | Onde |
|---|---|
| Estrutura completa da campanha | `docs/trafego-pago.md` |
| Configuração da API do Google Ads | `credentials/README.md` |
| Formulário de Basic Access | `docs/google-ads-api-application.html` |
| Implementação do tracking | `src/layouts/BaseLayout.astro` |
| Links de WhatsApp com origem | `src/lib/whatsapp.ts` |
