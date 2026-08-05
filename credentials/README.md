# Credenciais — Google Ads

**Este repositório é público.** Nada aqui dentro pode ser commitado.

Proteção em duas camadas:
- `credentials/.gitignore` ignora tudo nesta pasta, exceto ele mesmo e este README.
- O `.gitignore` da raiz repete o bloqueio e adiciona padrões (`*client_secret*.json`, `*.key`, `google-ads.yaml`) que valem para o projeto inteiro.

Antes de commitar qualquer coisa, confirme que a pasta está ignorada:

```sh
git check-ignore -v credentials/qualquer-arquivo.json
git status --short          # nada de credentials/ pode aparecer
```

## O que guardar aqui

| Arquivo | Origem |
|---|---|
| `oauth-client.json` | GCP → APIs e Serviços → Credenciais → ID do cliente OAuth (tipo Desktop) |
| — | O ADC **não** precisa vir para cá. O gcloud grava em `~/.config/gcloud/application_default_credentials.json` e o MCP aponta direto para lá — menos uma cópia de segredo no disco. |
| `developer-token.txt` | Central de API — **só existe em conta de administrador (MCC)**, ver abaixo |

A conta usada no ADC precisa ter acesso à conta de Google Ads da Juliana.

> **Não confunda os dois IDs.** `AW-974807273` é o ID da *tag de conversão* usada no
> site (`src/layouts/BaseLayout.astro`). O **ID de cliente** é outro: 10 dígitos no
> formato `123-456-7890`, exibido no canto superior direito do Google Ads. É o ID de
> cliente que vale para vincular ao MCC e para consultar via API.

## Projeto GCP

| Item | Valor |
|---|---|
| Projeto | `juliana-site-504617` |
| Conta dona | `kaiquenogueir@gmail.com` |
| Google Ads API | habilitada |

O OAuth client pertence a este projeto — use este `GOOGLE_PROJECT_ID`, não o da Encantrip.

## Comando de configuração

Autentique com a conta que administra o Google Ads da Juliana:

```sh
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform \
  --client-id-file=/Users/kaique/Workspace/julianaLandingPage/credentials/oauth-client.json
```

As duas flags são obrigatórias. Sem `--client-id-file` o gcloud usa o cliente padrão dele;
sem `--scopes` o token sai sem `adwords` e a API do Google Ads recusa a chamada.

Conferir se deu certo — **não leia o campo `scopes` do arquivo**: com `--client-id-file`
o gcloud não persiste esse campo, então ele fica `None` mesmo quando o token está correto.
Pergunte ao Google quais escopos o token realmente tem:

```sh
python3 - <<'PY'
import json, urllib.request, urllib.parse
d = json.load(open(f"{__import__('os').environ['HOME']}/.config/gcloud/application_default_credentials.json"))
body = urllib.parse.urlencode({
    'client_id': d['client_id'], 'client_secret': d['client_secret'],
    'refresh_token': d['refresh_token'], 'grant_type': 'refresh_token'}).encode()
at = json.load(urllib.request.urlopen(urllib.request.Request(
    'https://oauth2.googleapis.com/token', data=body)))['access_token']
ti = json.load(urllib.request.urlopen(
    'https://oauth2.googleapis.com/tokeninfo?access_token=' + at))
print('adwords:', 'OK' if 'adwords' in ti.get('scope', '') else 'FALTANDO')
PY
```

O `client_id` do arquivo, esse sim vale conferir: precisa começar com `931477069622`.
Se começar com `764086051850`, o login rodou sem `--client-id-file` e caiu no cliente
padrão do gcloud.

> Se o login falhar com "acesso bloqueado" ou "app não verificado": a tela de consentimento
> OAuth do projeto `juliana-site-504617` provavelmente está em modo *Testing*. Adicione seu
> e-mail como usuário de teste em GCP → APIs e Serviços → Tela de permissão OAuth.

## Developer token: exige conta de administrador (MCC)

A Central de API **não aparece em conta comum de Google Ads** — só em conta de
administrador. Não é questão de ter campanha criada.

1. Crie uma conta de administrador em `ads.google.com/home/tools/manager-accounts` (gratuito).
2. Dentro dela: Contas → vincular a conta existente → informe o **ID de cliente**
   (`123-456-7890`), não o `AW-`.
3. Aceite o convite pela conta da Juliana.
4. Na conta de administrador: Ferramentas e configurações → Configuração → **Central de API**.
5. Solicite o developer token. Tokens novos costumam sair já com acesso **Explorer**, que é o
   mínimo para consultar contas de produção. Token de conta de teste não serve.

Se a conta estiver em Modo Inteligente, troque para **Modo Especialista** antes — o menu de
ferramentas completo não existe no Modo Inteligente.

## Estado da configuração (05/08/2026)

| Item | Estado |
|---|---|
| OAuth client + ADC com escopo `adwords` | validado contra o tokeninfo do Google |
| Google Ads API em `juliana-site-504617` | habilitada |
| MCP `google-ads` | registrado, Connected |
| Developer token | **nível de conta de teste — precisa de Explorer** |

Contas retornadas por `listAccessibleCustomers`:

| ID | Papel |
|---|---|
| **`6180049205`** | **conta da Juliana** — ativada e verificada como anunciante em 05/08/2026 |
| `9901998736` | ainda `CUSTOMER_NOT_ENABLED`; provavelmente o MCC |
| `8709194696` | ativa; outra conta |

`CUSTOMER_NOT_ENABLED` significa conta criada mas nunca ativada — o assistente de primeira
campanha precisa chegar até o passo de faturamento. `DEVELOPER_TOKEN_NOT_APPROVED` numa
conta ativa significa que o bloqueio é o nível do token, não a conta.

> Verificação de anunciante e Basic Access do developer token são aprovações diferentes e
> chegam em e-mails separados. A primeira libera veicular anúncio; a segunda libera ler
> dados pela API.

## Registro do MCP

Depois de ter os dois valores:

```sh
claude mcp add google-ads --scope user \
  --env GOOGLE_APPLICATION_CREDENTIALS=/caminho/absoluto/credentials/adc.json \
  --env GOOGLE_PROJECT_ID=juliana-site-504617 \
  --env GOOGLE_ADS_DEVELOPER_TOKEN=SEU_TOKEN \
  -- google-ads-mcp
```

Se o acesso for via MCC, acrescente `--env GOOGLE_ADS_LOGIN_CUSTOMER_ID=id_do_manager`.

## Se vazar

Rotacione imediatamente, nesta ordem:
1. Revogue o cliente OAuth no GCP.
2. `gcloud auth application-default revoke`.
3. Peça um developer token novo na Central de API do Google Ads.

Apagar o arquivo e commitar **não** resolve — o conteúdo segue acessível pelo hash do commit.
