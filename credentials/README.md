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

Conferir se deu certo:

```sh
python3 -c "
import json; d=json.load(open('$HOME/.config/gcloud/application_default_credentials.json'))
print('scopes:', d.get('scopes'))
print('client:', d.get('client_id','')[:20])
"
```

`scopes` precisa listar `.../auth/adwords` e `client` **não** pode começar com `764086051850`
(esse é o cliente padrão do gcloud).

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
