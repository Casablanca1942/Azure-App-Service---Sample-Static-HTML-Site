# Azure App Service - Sample Static HTML Site

Minimal, framework-free static website you can deploy to **Azure App Service** for Microsoft Learn training or quick demos.

## Contents
- `index.html` main page
- `styles.css` styling (light + dark mode)
- `script.js` small interactive demo
- `404.html` custom not-found page
- `favicon.svg` simple icon

No build step, just static assets.

## Prerequisites
- Azure subscription (free trial works)
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) installed
- Logged in: `az login`

## Option A: Fastest Single Command Deploy
This creates (or reuses) a resource group + plan automatically.

```powershell
$rg = "rg-static-sample"
$loc = "eastus"              # Pick any supported region
$app = "static-sample-" + (Get-Random)

az webapp up --name $app --resource-group $rg --location $loc --html

# Open site
Start-Process "https://$app.azurewebsites.net"
```

The `--html` switch tells Azure CLI to treat the folder as a static HTML site.

## Option B: Manual (Separate Plan + App)
Gives you explicit control over the App Service plan.

```powershell
$rg   = "rg-static-sample"
$loc  = "eastus"
$plan = "plan-static-sample"
$app  = "static-sample-" + (Get-Random)

# 1. Resource group
az group create --name $rg --location $loc

# 2. Linux Free (F1) plan
az appservice plan create --name $plan --resource-group $rg --sku F1 --is-linux

# 3. Web App (runtime is arbitrary for static content)
az webapp create --name $app --resource-group $rg --plan $plan --runtime "NODE|18-lts"

# 4. Deploy current directory contents
az webapp up --name $app --resource-group $rg --location $loc --html

# 5. Stream logs (optional)
az webapp log tail --name $app --resource-group $rg
```

Visit: `https://<your-app-name>.azurewebsites.net`

## Updating the Site
1. Edit files locally.
2. Run the deployment command again (`az webapp up ...`).
3. Hard refresh your browser (Ctrl+F5) to avoid cached assets.

## Clean Up (to avoid lingering charges)
```powershell
az group delete --name $rg --yes --no-wait
```
This deletes the plan and web app together.

## Optional: GitHub Actions Workflow (Quick Outline)
1. Create a publish profile: `az webapp deployment list-publishing-profiles --name $app --resource-group $rg --output tsv > publishprofile.publishsettings`
2. Add it as a GitHub secret (e.g. `AZURE_WEBAPP_PUBLISH_PROFILE`).
3. Use a workflow step with `azure/webapps-deploy@v2` referencing the secret.

> For a static-only repo you can also consider **Azure Static Web Apps**, but this sample intentionally demonstrates classic Azure App Service.

## Troubleshooting
| Symptom | Fix |
|---------|-----|
| 404 page on new asset | Wait ~30s; ensure file deployed (check `az webapp log tail`). |
| Old CSS/JS | Hard refresh (Ctrl+F5) / clear cache. |
| Permission / auth error | Run `az login` again or ensure correct subscription (`az account show`). |
| Name already taken | Use a different `$app` value (names must be globally unique). |

## Next Ideas
- Add another page & navigation.
- Add basic CI/CD via GitHub Actions.
- Add an `appsettings` value and surface it via an API (if you later add a backend).

Enjoy experimenting! ✨

