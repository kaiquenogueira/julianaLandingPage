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
| `adc.json` | saída de `gcloud auth application-default login` (copie do caminho impresso) |
| `developer-token.txt` | Central de API — **só existe em conta de administrador (MCC)**, ver abaixo |

A conta usada no ADC precisa ter acesso à conta de Google Ads `AW-974807273`.

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
  --scopes https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform \
  --client-id-file=credentials/oauth-client.json
```

## Developer token: exige conta de administrador (MCC)

A Central de API **não aparece em conta comum de Google Ads** — só em conta de
administrador. Não é questão de ter campanha criada.

1. Crie uma conta de administrador em `ads.google.com/home/tools/manager-accounts` (gratuito).
2. Dentro dela: Contas → vincular a conta existente → informe o ID de `AW-974807273`.
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
