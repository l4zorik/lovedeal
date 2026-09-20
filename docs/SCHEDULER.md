# LoveDeal - Scheduler Nastavení

## automatické denní logování cen pohonných hmot a legislativních změn

### Windows Task Scheduler

```powershell
# Vytvoření úlohy pro denní logování ve 23:59
$Action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-File C:\Love\Lovedeal\lovedeal-app\denni-logovani.ps1"
$Trigger = New-ScheduledTaskTrigger -Daily -At 23:59
$Settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd
$Principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Highest

Register-ScheduledTask -TaskName "LoveDeal-DenniLogovani" -Action $Action -Trigger $Trigger -Settings $Settings -Principal $Principal -Description "Denní logování cen pohonných hmot a legislativních změn pro LoveDeal"
```

### manuální spuštění

```powershell
# Spuštění ručně
.\denni-logovani.ps1

# S vlastním adresářem
.\denni-logovani.ps1 -DataDir "C:\data" -LogDir "C:\logs"
```

### Cron (Linux/Mac)

```bash
# Přidat do crontab
crontab -e

# Přidat řádek - spouštět ve 23:59
59 23 * * * cd /path/to/lovedeal-app && pwsh ./denni-logovani.ps1
```

### GitHub Actions

```yaml
name: Denni Logovani

on:
  schedule:
    - cron: '59 23 * * *'  # 23:59 UTC denně
  workflow_dispatch:

jobs:
  log:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4
      - name: Spustit denní logování
        run: ./denni-logovani.ps1
      - name: Commit změn
        run: |
          git config --local user.name "github-actions[bot]"
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git add .
          git commit -m "Denní log $(date +'%Y-%m-%d')" || exit 0
          git push
```

---

## Výstupní soubory

### CSV soubor
- **Cesta:** `docs/auta/ceny-pohonnych-hmot-zari2026.csv`
- **Formát:** Den;Datum;Benzin;Nafta;LPG;CNG;Změna benzín;Změna nafta;Poznámka

### Log soubory
- **Cesta:** `logs/denni-log-YYYY-MM-DD.log`
- **Obsah:** Časově razítkované záznamy

### Sbírka zákonů
- **Cesta:** `docs/auta/SBIRKA-ZAKONU.md`
- **Obsah:** Automaticky aktualizovaný přehled

---

## Monitoring

### Kontrola stavu
```powershell
# Zkontrolovat, zda úloha běží
Get-ScheduledTaskInfo -TaskName "LoveDeal-DenniLogovani"

# Zobrazit historii
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-TaskScheduler/Operational'; ID=106} | Select-Object -First 10
```

### Alerting
- Pokud logování selže → e-mail na admin
- Pokud ceny > 45 Kč/l → upozornění
- Pokud legislativní změna → okamžitý push

---

## API propojení

### Ceny pohonných hmot
- **Český statistický úřad:** https://www.czso.cz/
- **MFČR:** https://www.mfcr.cz/
- **CEE data:** https://www.ceerdata.com/

### Legislativa
- **Sbírka zákonů:** https://www.czlegislation.cz/
- **ECLI:** https://opendata.espon.eu/
- **EUR-Lex:** https://eur-lex.europa.eu/

---

> 📅 Poslední aktualizace: 2026-09-20
> 👤 Správce: MaxiGreens a.s.
