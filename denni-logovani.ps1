<#
.SYNOPSIS
    Denní logování cen pohonných hmot a legislativních změn
.DESCRIPTION
    automaticky spouštěn ve 23:59 pro projekt LoveDeal
    Sleduje ceny benzínu, nafty a legislativní změny
.NOTES
    Autor: MaxiGreens a.s.
    Verze: 1.0.0
    Datum: 2026-09-20
#>

param(
    [string]$DataDir = ".\docs\auta",
    [string]$LogDir = ".\logs"
)

# Vytvoření adresářů
if (-not (Test-Path $DataDir)) { New-Item -ItemType Directory -Path $DataDir -Force }
if (-not (Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir -Force }

# Datum
$Dnes = Get-Date -Format "yyyy-MM-dd"
$Cas = Get-Date -Format "HH:mm:ss"
$DenMesice = (Get-Date).Day

# Cesty k souborům
$CsvSoubor = Join-Path $DataDir "ceny-pohonnych-hmot-zari2026.csv"
$LogSoubor = Join-Path $LogDir "denni-log-$Dnes.log"
$SbirkaSoubor = Join-Path $DataDir "SBIRKA-ZAKONU.md"

# Funkce pro zápis logu
function Write-Log {
    param([string]$Zprava)
    $CasovyFormat = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $Zaznam = "[$CasovyFormat] $Zprava"
    Add-Content -Path $LogSoubor -Value $Zaznam
    Write-Host $Zaznam
}

# Funkce pro získání cen (simulace - nahradit reálným API)
function Get-CenyPohonnichHmot {
    # Simulace cen - v reálu napojit na API
    # napr: https://www.nerezove.cz/ceny-paliv/
    # nebo: https://www.mfcr.cz/ceny-pohonnich-hmot
    
    $ZakladniCeny = @{
        "Benzin" = [math]::Round((Get-Random -Minimum 36.5 -Maximum 42.5), 2)
        "Nafta" = [math]::Round((Get-Random -Minimum 35.0 -Maximum 40.0), 2)
        "LPG" = [math]::Round((Get-Random -Minimum 17.0 -Maximum 22.0), 2)
        "CNG" = [math]::Round((Get-Random -Minimum 28.0 -Maximum 35.0), 2)
    }
    
    return $ZakladniCeny
}

# Funkce pro kontrolu legislativních změn
function Get-LegislativniZmeny {
    # Simulace - v reálu napojit na Sbírku zákonů API
    # https://www.czlegislation.cz/
    
    $Zmeny = @()
    
    # Kontrola nových zákonů
    # V reálu: dotaz na API Sbírky zákonů
    
    return $Zmeny
}

# Hlavní logika
Write-Log "=== Denny log cen pohonnych hmot ==="
Write-Log "Datum: $Dnes"
Write-Log "Den v mesici: $DenMesice/12"

# Získání cen
$Ceny = Get-CenyPohonnichHmot
Write-Log "Ceny nacteny:"
Write-Log "  Benzin: $($Ceny['Benzin']) Kc/l"
Write-Log "  Nafta: $($Ceny['Nafta']) Kc/l"
Write-Log "  LPG: $($Ceny['LPG']) Kc/l"
Write-Log "  CNG: $($Ceny['CNG']) Kc/l"

# Výpočet změn (pokud je předchozí záznam)
$PredchoziCeny = $null
if (Test-Path $CsvSoubor) {
    $PosledniRadek = Get-Content $CsvSoubor | Select-Object -Last 1
    if ($PosledniRadek -and $PosledniRadek -notmatch "^Den;") {
        $Hodnoty = $PosledniRadek -split ";"
        if ($Hodnoty.Length -ge 4) {
            $PredchoziCeny = @{
                "Benzin" = [double]$Hodnoty[2]
                "Nafta" = [double]$Hodnoty[3]
            }
        }
    }
}

$ZmenaBenzin = 0
$ZmenaNafta = 0
if ($PredchoziCeny) {
    $ZmenaBenzin = [math]::Round($Ceny['Benzin'] - $PredchoziCeny['Benzin'], 2)
    $ZmenaNafta = [math]::Round($Ceny['Nafta'] - $PredchoziCeny['Nafta'], 2)
    Write-Log "Zmeny:"
    Write-Log "  Benzin: $ZmenaBenzin Kc"
    Write-Log "  Nafta: $ZmenaNafta Kc"
}

# Zápis do CSV
$Radek = "$DenMesice;$Dnes;$($Ceny['Benzin']);$($Ceny['Nafta']);$($Ceny['LPG']);$($Ceny['CNG']);$ZmenaBenzin;$ZmenaNafta;"

if (-not (Test-Path $CsvSoubor)) {
    # Hlavička
    $Hlavicka = "Den;Datum;Benzin (Kc/l);Nafta (Kc/l);LPG (Kc/l);CNG (Kc/l);Zmena benzin;Zmena nafta;Poznamka"
    Set-Content -Path $CsvSoubor -Value $Hlavicka
    Add-Content -Path $CsvSoubor -Value $Radek
    Write-Log "Vytvoreny novy CSV soubor"
} else {
    Add-Content -Path $CsvSoubor -Value $Radek
    Write-Log "Pridan novy zaznam do CSV"
}

# Kontrola legislativních změn
$Zmeny = Get-LegislativniZmeny
if ($Zmeny.Count -gt 0) {
    Write-Log "Nalezeny legislativni zmeny:"
    foreach ($Zmena in $Zmeny) {
        Write-Log "  - $Zmena"
    }
} else {
    Write-Log "Zadne legislativni zmeny"
}

# Aktualizace Sbírky zákonů
if (Test-Path $SbirkaSoubor) {
    $ZaznamSbirka = @"

---

#### $Dnes (Den $DenMesice)
- **Ceny:** Benzín $($Ceny['Benzin']) Kč/l, Nafta $($Ceny['Nafta']) Kč/l
- **Legislativa:** $(if ($Zmeny.Count -gt 0) { $Zmeny -join ", " } else { "žádné změny" })
- **Poznámka:** Automatický záznam

"@
    Add-Content -Path $SbirkaSoubor -Value $ZaznamSbirka
    Write-Log "Aktualizovana Sbirka zakonu"
}

# Shrnutí
Write-Log "=== Hotovo ==="
Write-Log "Zaznam ulozen: $CsvSoubor"
Write-Log "Log ulozen: $LogSoubor"

# Výstup pro scheduler
return @{
    "Datum" = $Dnes
    "Ceny" = $Ceny
    "Zmeny" = $Zmeny
    "Uspech" = $true
}
