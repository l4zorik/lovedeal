<#
.SYNOPSIS
    Automaticka aktualizace checklistu - +1 princip
.DESCRIPTION
    Po kazdem ukolu aktualizuje checklisty, metriky a logy
.NOTES
    Autor: MaxiGreens a.s.
    Verze: 1.0.0
    Princip: +1 po kazdem ukolu
#>

param(
    [string]$DocsDir = ".\docs",
    [string]$ChecklistSoubor = "CHECKLIST-AUTO-UPDATE.md"
)

# Cesta k souboru
$CestaKLogu = Join-Path $DocsDir $ChecklistSoubor
$Dnes = Get-Date -Format "yyyy-MM-dd"
$Cas = Get-Date -Format "HH:mm:ss"

# Funkce pro zapis
function Write-Log {
    param([string]$Zprava)
    $CasovyFormat = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $Zaznam = "[$CasovyFormat] $Zprava"
    Add-Content -Path $CestaKLogu -Value $Zaznam
    Write-Host $Zaznam
}

# Funkce pro secteni checkboxu
function Get-ChecklistStats {
    param([string]$Soubor)
    
    if (-not (Test-Path $Soubor)) {
        return @{ Total = 0; Completed = 0; Percent = 0 }
    }
    
    $Obsah = Get-Content $Soubor -Raw
    
    # Pocet vsech checkboxu [ ] nebo [x]
    $Total = ([regex]::Matches($Obsah, '\[[ x]\]')).Count
    
    # Pocet dokoncenych [x]
    $Completed = ([regex]::Matches($Obsah, '\[x\]')).Count
    
    # Procenta
    $Percent = if ($Total -gt 0) { [math]::Round(($Completed / $Total) * 100) } else { 0 }
    
    return @{
        Total = $Total
        Completed = $Completed
        Percent = $Percent
    }
}

# Hlavni logika
Write-Log "=== Aktualizace checklistu - +1 princip ==="
Write-Log "Datum: $Dnes"

# Najdi vsechny checklisty
$Checklisty = Get-ChildItem -Path $DocsDir -Filter "*CHECKLIST*" -File

$CelkemUkolu = 0
$CelkemHotovo = 0

foreach ($Soubor in $Checklisty) {
    $Stats = Get-ChecklistStats -Soubor $Soubor.FullName
    
    Write-Log "Checklist: $($Soubor.Name)"
    Write-Log "  Celkem: $($Stats.Total) | Hotovo: $($Stats.Completed) | %: $($Stats.Percent)%"
    
    $CelkemUkolu += $Stats.Total
    $CelkemHotovo += $Stats.Completed
}

# Celkove procenta
$CelkoveProcenta = if ($CelkemUkolu -gt 0) { [math]::Round(($CelkemHotovo / $CelkemUkolu) * 100) } else { 0 }

Write-Log "=== CELKEM ==="
Write-Log "Ukoly: $CelkemHotovo / $CelkemUkolu"
Write-Log "Pokrok: $CelkoveProcenta%"

# Vytvor/aktualizuj souhrny soubor
$Souhrn = @"
# Auto-Update Checklist - +1 Princip

## Posledni aktualizace
- Datum: $Dnes
- Cas: $Cas

## Statistiky
| Checklist | Celkem | Hotovo | % |
|-----------|--------|--------|---|
"@

foreach ($Soubor in $Checklisty) {
    $Stats = Get-ChecklistStats -Soubor $Soubor.FullName
    $Radek = "| $($Soubor.Name) | $($Stats.Total) | $($Stats.Completed) | $($Stats.Percent)% |"
    $Souhrn += "`n$Radek"
}

$Souhrn += @"

## Celkovy pokrok
$CelkemHotovo / $CelkemUkolu ukolu ($CelkoveProcenta%)

## Log
- Auto-update proveden: $Dnes $Cas
"@

# Uloz souhrn
Set-Content -Path $CestaKLogu -Value $Souhrn

Write-Log "=== Hotovo ==="
Write-Log "Souhrn ulozen: $CestaKLogu"

# Vystup
return @{
    Datum = $Dnes
    CelkemUkolu = $CelkemUkolu
    CelkemHotovo = $CelkemHotovo
    Procenta = $CelkoveProcenta
}
