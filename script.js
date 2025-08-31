// Basic interactive demo
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  const btn = document.getElementById('ctaBtn');
  const pre = document.getElementById('cmd');
  if (btn && pre) {
    btn.addEventListener('click', () => {
      pre.hidden = false;
      pre.textContent = `# Quick deploy (PowerShell)\n$rg = 'rg-static-sample'\n$loc = 'eastus'\n$app = 'static-sample-' + (Get-Random)\n\n# Create (plan auto-created by az webapp up)\naz webapp up --name $app --resource-group $rg --location $loc --html\n\n# Open site (after deploy completes)\nStart-Process "https://$app.azurewebsites.net"`;
      btn.disabled = true;
    });
  }

  console.log('Static site script loaded. Edit script.js to experiment.');
});
