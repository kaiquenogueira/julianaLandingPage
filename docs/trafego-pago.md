# Estrutura de Tráfego Pago — Juliana Capucci

Documento operacional. Tudo aqui é para ser copiado direto no Gerenciador.

**Última atualização:** 05/08/2026

---

## 1. Premissas

| Item | Valor |
|---|---|
| Sessão avulsa | R$ 130 |
| Sessão no pacote mensal | R$ 100 |
| Receita mensal por paciente (pacote) | R$ 400 |
| Permanência média estimada | ~5 meses |
| LTV estimado | ~R$ 2.000 |
| Capacidade de agenda | **1–4 pacientes novos/mês** |
| Meta de trabalho | 3 pacientes novos/mês |
| Lead → paciente esperado | 20–25% |
| CAC alvo | R$ 200–350 |
| Teto de CAC (3:1) | R$ 660 |
| **Verba inicial recomendada** | **R$ 600–700/mês, 100% Google Search** |

A capacidade é o limitador, não o CAC. Toda decisão abaixo prioriza **qualificação** sobre volume.

---

## 2. Campanha Google Search

**Configuração**

| Campo | Valor |
|---|---|
| Tipo | Rede de Pesquisa (só Pesquisa — desmarcar Rede de Display e parceiros) |
| Lance inicial | **Maximizar cliques com CPC máximo de R$ 5,00** |
| Lance depois de ~30 conversões | Maximizar conversões |
| Idioma | Português |
| Orçamento | Dividir a verba mensal por 30 (ex.: R$ 700 → R$ 23/dia) |
| Rotação de anúncios | Otimizar |
| AI Max | **Desligado** |
| Segmentação otimizada | **Desativada** |
| Públicos-alvo | **Vazios** |

> **Por que não começar em "Maximizar conversões":** a conta nova (`AW-18373032857`) não tem
> nenhuma conversão registrada, e o histórico da conta anterior era inválido — a tag estava
> quebrada até 05/08/2026. O algoritmo não tem base para otimizar. Rodar em Maximizar cliques
> até acumular ~30 conversões reais.

> **Por que AI Max desligado:** expande as palavras-chave com correspondência ampla, o que
> anula a escolha de frase/exata e enfraquece a lista de negativas; gera copy automática a
> partir do site, o que arrisca promessa de resultado vedada pelo CFP; e escolhe sozinha a
> página de destino, quebrando o match anúncio→LP por persona. Reavaliar só depois de uns
> 3 meses com volume de conversão.

### Política de saúde — o que ela restringe

O Google sinaliza campanhas de saúde mental sob **Health in personalized advertising**. A
política restringe *publicidade personalizada* — segmentar por condição de saúde inferida —
e **não** proíbe anunciar psicoterapia.

- **Campanha de Pesquisa por palavra-chave é contextual**, não personalizada. Se for
  sinalizada, solicitar revisão em vez de mutilar as palavras-chave.
- **Manter Públicos-alvo vazios e Segmentação otimizada desativada.** É o que de fato aciona
  a política, e o que mantém a conta puramente contextual.
- **Remarketing provavelmente não é permitido.** Montar lista a partir de quem visitou uma
  página de psicoterapia é exatamente o comportamento restrito. Verificar a política vigente
  antes de planejar essa etapa — vale também para públicos semelhantes no Meta a partir do
  tráfego dessas páginas.

**Localização por grupo**

| Grupo | Localização |
|---|---|
| Psicóloga online, Maternidade, Relacionamento | Brasil |
| Intercâmbio | EUA, Irlanda, Austrália, Canadá, Reino Unido, Portugal, Nova Zelândia + Brasil |

Em todos: usar "Presença: pessoas que estão no local" — não "interesse no local".

---

## 3. Grupos de anúncio

### Grupo 1 — Psicóloga Online (genérico)
**Destino:** `/psicologa-online/`

Palavras-chave:
```
"psicóloga online"
"psicólogo online"
"terapia online"
"psicoterapia online"
"psicóloga online tcc"
"terapia cognitivo comportamental online"
[psicóloga online]
[terapia online]
[psicóloga tcc online]
```

Títulos (máx. 30 caracteres):
```
Psicóloga Online CRP 06
Terapia Online com TCC
Psicoterapia 100% Online
Psicóloga Clínica Online
Sessões de 50 min por Vídeo
Horário Fixo Toda Semana
Adolescentes e Adultos
Recibo para Reembolso
Agende pelo WhatsApp
Atendimento com Sigilo
```

Descrições (máx. 90 caracteres):
```
Psicóloga clínica CRP 06/209216. Terapia Cognitivo-Comportamental online, 50 min.
Sessões por videochamada, dia e horário fixos. Agende pelo WhatsApp.
Atendimento com ética e sigilo profissional. Recibo para reembolso.
Abordagem estruturada e focada no presente. Para adolescentes e adultos.
```

---

### Grupo 2 — Maternidade
**Destino:** `/terapia-para-maternidade/`

Palavras-chave:
```
"terapia para maternidade"
"psicóloga maternidade"
"psicóloga desejo de ser mãe"
"dúvida em ser mãe"
"medo de ser mãe"
"ambivalência maternidade"
"terapia decisão de ser mãe"
```

Títulos:
```
Apoio na Decisão de Ser Mãe
Terapia p/ Maternidade
Espaço para Pensar a Decisão
Psicóloga Online CRP 06
Apoio Emocional Materno
Sessões Online de 50 min
Agende pelo WhatsApp
```

Descrições:
```
Apoio emocional para mulheres diante da decisão sobre a maternidade. CRP 06/209216.
Ambivalência, pressão familiar e medos. Sessões online de 50 minutos.
Apoio emocional — não é tratamento de fertilidade. Agende pelo WhatsApp.
Psicoterapia online com ética e sigilo. Um espaço para pensar sem pressa.
```

> Manter o disclaimer de fertilidade em pelo menos uma descrição. É o que separa o anúncio da política de saúde do Google.

---

### Grupo 3 — Intercâmbio e Au Pair
**Destino:** `/terapia-para-intercambio/`

Palavras-chave:
```
"psicóloga para au pair"
"terapia para au pair"
"psicóloga brasileira no exterior"
"terapia em português no exterior"
"psicóloga para intercambista"
"saúde mental intercâmbio"
"terapia online morando fora"
"psicólogo brasileiro nos estados unidos"
```

Títulos:
```
Psicóloga para Au Pair
Terapia em Português
Psicóloga p/ Intercâmbio
Atende de Qualquer País
Terapia Online no Exterior
Sessões no Seu Fuso
Psicóloga Online CRP 06
```

Descrições:
```
Psicoterapia online em português para brasileiras no exterior. CRP 06/209216.
Adaptação, saudade e isolamento. Sessões ajustadas ao seu fuso horário.
Au pairs e estudantes de intercâmbio. Agende pelo WhatsApp.
Atendimento por videochamada, 50 minutos, com ética e sigilo profissional.
```

---

### Grupo 4 — Relacionamentos
**Destino:** `/terapia-de-relacionamento/`

Palavras-chave:
```
"terapia para relacionamento"
"psicóloga dependência emocional"
"terapia dependência emocional"
"psicóloga para término"
"terapia para ciúmes"
"como impor limites terapia"
"terapia relacionamento abusivo"
```

Títulos:
```
Terapia p/ Relacionamento
Dependência Emocional
Terapia Individual Online
Psicóloga Online CRP 06
Aprender a Impor Limites
Sessões Online de 50 min
Agende pelo WhatsApp
```

Descrições:
```
Psicoterapia online para dependência emocional, ciúmes, limites e término.
Atendimento individual com TCC. Sessões de 50 min por videochamada.
Psicóloga clínica CRP 06/209216. Agende pelo WhatsApp.
Um espaço para entender os próprios padrões nas relações.
```

> Atendimento é **individual**. Se aparecerem muitos leads buscando terapia de casal, adicionar "casal" às negativas.

---

## 4. Palavras-chave negativas (nível de campanha)

```
grátis
gratuito
gratuita
de graça
barato
valor
preço
quanto custa
cvv
sus
caps
psiquiatra
receita
remédio
medicamento
antidepressivo
emprego
vaga
salário
concurso
curso
faculdade
graduação
pós graduação
estágio
supervisão
teste
quiz
sintomas
o que é
significado
wikipedia
pdf
livro
laudo
atestado
perícia
inss
judicial
criança
infantil
presencial
perto de mim
```

**Notas:**
- `valor`, `preço`, `quanto custa` entram como negativas porque o site não publica valores (Art. 20 CFP) — o clique vira decepção e não converte.
- `perto de mim` e `presencial` começam bloqueados. Vale testar liberar depois de 60 dias: parte de quem busca local aceita online.
- Revisar o **Relatório de termos de pesquisa toda semana** e adicionar o que aparecer fora do alvo. É a rotina que mais economiza verba no começo.

---

## 5. Recursos (aplicar na campanha inteira)

> Na interface atual isso fica em **Recursos**, não em "Extensões" — o nome mudou.
> Caminho: Campanhas → Recursos → **+**, escolhendo o nível **Campanha**.

**Sitelinks** — preencher os quatro. Com menos de quatro o Google não exibe nenhum.

| Texto (máx. 25) | Descrição 1 (máx. 35) | Descrição 2 (máx. 35) | Destino |
|---|---|---|---|
| Como funciona | Sessões de 50 min por videochamada | Dia e horário fixos toda semana | `/psicologa-online/#informacoes` |
| Terapia e Maternidade | Apoio na decisão de ser mãe | Ambivalência, medos e pressão | `/terapia-para-maternidade/` |
| Brasileiras no Exterior | Atendimento online em português | Au pairs e intercambistas | `/terapia-para-intercambio/` |
| Relacionamentos | Dependência emocional e limites | Atendimento individual online | `/terapia-de-relacionamento/` |

As descrições são opcionais, mas sitelink com descrição ocupa mais espaço na página de
resultados e rende mais cliques.

**Frases de destaque**
```
CRP 06/209216
100% Online
Sessões de 50 minutos
Ética e sigilo
Recibo para reembolso
Horário fixo semanal
```

**Snippet estruturado** — cabeçalho "Tipos", um valor por linha:
```
Ansiedade
Depressão
Luto
Relacionamentos
Maternidade
Intercâmbio
```

**Recurso de chamada:** (11) 99305-1221 — só em horário comercial, para não gerar ligação sem resposta.

---

## 6. Meta Ads — Fase 2

**Só subir depois de:** Meta Pixel instalado (`PUBLIC_META_PIXEL_ID` na Vercel) + banner LGPD em produção + 30 dias de Google rodando.

| Campo | Valor |
|---|---|
| Objetivo | Mensagens → WhatsApp (Click-to-WhatsApp) |
| Verba | R$ 300–500/mês |
| Públicos | Amplo, com recorte de idade/gênero por persona. **Sem** interesses de saúde mental (restritos) |
| Posicionamento | Automático, exceto Audience Network |

**Recortes por persona**

| Persona | Recorte |
|---|---|
| Maternidade | Mulheres, 28–42, Brasil |
| Intercâmbio | Mulheres, 19–30, EUA/Irlanda/Austrália/Canadá, idioma português |
| Relacionamento | Mulheres, 24–40, Brasil |
| Genérico | 22–45, Brasil |

**Ângulos criativos** — a regra é falar do *contexto de vida*, nunca do sintoma. "Você sofre de ansiedade?" é reprovado por implicar atributo pessoal.

1. **Intercâmbio** — "Morar fora tem uma parte que quase ninguém conta." Vídeo ou foto da Juliana falando em português sobre o que ela escuta de brasileiras no exterior.
2. **Maternidade** — "Querer e não querer ao mesmo tempo não é confusão. É ambivalência, e ela tem nome." Peça estática, texto sobre fundo da paleta do site.
3. **Relacionamento** — "Dizer não também se aprende." Carrossel com 3 situações concretas (pedir o que precisa, sustentar um combinado, sair de uma conversa).
4. **Genérico/TCC** — "Terapia com metas claras e o foco no presente." Explica o formato: 50 min, semanal, horário fixo, online.

Em toda peça: CRP 06/209216 visível. Nenhuma promessa de resultado ou cura.

---

## 7. Atendimento no WhatsApp

O lead chega com a origem escrita na mensagem (ex.: *"Vim pelo site (página sobre maternidade)"*). Anotar essa origem na planilha **antes de responder**.

Com agenda de 1–4 vagas/mês, a primeira resposta precisa qualificar, não só acolher:

```
Oi! Que bom que você me escreveu. 

Eu atendo 100% online, por videochamada, em sessões de 50 minutos,
uma vez por semana, sempre no mesmo dia e horário.

A sessão avulsa é R$ 130. No pacote mensal fica R$ 100 por sessão.
Aceito PIX e cartão, e emito recibo para reembolso.

Me conta um pouco: o que te trouxe até aqui? E quais dias e horários
funcionam melhor pra você?
```

Por que assim:
- **Formato antes de tudo** — filtra quem queria presencial ou quinzenal.
- **Valor na primeira mensagem** — é permitido no privado (a vedação do Art. 20 é sobre divulgação pública). Elimina a ida e volta e o lead que não fecha por preço.
- **Pacote posicionado como padrão** — é o que sustenta o LTV.
- **Pergunta de horário junto** — descobre já se cabe na agenda.

---

## 8. Planilha de controle

Uma linha por lead. Colunas:

```
Data | Origem (do ?text=) | Canal | Campanha/Termo | Nome | Respondeu? |
Agendou? | Compareceu? | Virou paciente? | Pacote ou avulsa | Observação
```

É daqui que sai o número que importa: **custo por paciente**, não custo por lead.

Cálculo mensal: `verba do mês ÷ pacientes que efetivamente iniciaram`.

---

## 9. Rotina de otimização

**Toda semana**
1. Exportar Relatório de termos de pesquisa → adicionar negativas.
2. Conferir a planilha: leads que chegaram vs. leads que fecharam, por origem.
3. Pausar palavra-chave com 50+ cliques e 0 conversão.
4. Conferir se a agenda ainda tem vaga.

**A cada 30 dias**
1. Calcular custo por paciente por grupo de anúncio.
2. Realocar verba para o grupo com melhor custo por paciente.
3. Trocar os 2 títulos com pior desempenho de cada grupo.

**Regras de corte**
| Situação | Ação |
|---|---|
| Termo com 50+ cliques, 0 conversão | Pausar |
| Grupo com CAC acima de R$ 660 por 30 dias | Pausar e revisar LP |
| Agenda cheia | **Pausar campanha.** Não acumular lead sem atendimento |
| 30 conversões acumuladas | Migrar lance para Maximizar conversões |

---

## 10. Pendências antes de subir

- [ ] Mergear `geo-novos-publicos` em `main` e publicar (sem isso as LPs não existem em produção)
- [ ] Definir verba mensal
- [ ] Confirmar cadastro **e-Psi** ativo (exigência do CFP para atendimento online)
- [ ] Decidir sobre o reajuste de preço
- [ ] Criar `PUBLIC_GA4_ID` na Vercel e vincular GA4 ao Google Ads
- [ ] Ampliar `areaServed` no JSON-LD de `"BR"` para incluir o exterior (`src/layouts/BaseLayout.astro`) — hoje contradiz a oferta de intercâmbio
- [ ] Validar a tag de conversão com o Google Tag Assistant em produção
