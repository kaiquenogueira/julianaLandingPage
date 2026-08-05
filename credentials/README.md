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
| `developer-token.txt` | Google Ads → Ferramentas → Central de API (precisa de acesso **Explorer**) |

A conta usada no ADC precisa ter acesso à conta de Google Ads `AW-974807273`.

## Comando de configuração

```sh
gcloud auth application-default login \
  --scopes https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform \
  --client-id-file=credentials/oauth-client.json
```

## Registro do MCP

Depois de ter os dois valores:

```sh
claude mcp add google-ads --scope user \
  --env GOOGLE_APPLICATION_CREDENTIALS=/caminho/absoluto/credentials/adc.json \
  --env GOOGLE_PROJECT_ID=plata-494423 \
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
