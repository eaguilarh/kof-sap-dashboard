$md = "C:\Users\eaguilarher2\.gemini\antigravity\brain\24f438d2-40e3-4121-819e-734de2251226\browser\scratchpad_hbt3csro.md"
$lines = Get-Content $md -Encoding UTF8
$points = @{}
$currentPoint = $null
$section = $null

foreach ($line in $lines) {
    if ($line -match "^Punto\s+(\d+)") {
        $currentPoint = $matches[1]
        if (-not $points.ContainsKey($currentPoint)) {
            $points[$currentPoint] = @{ c = [System.Collections.Generic.List[String]]::new(); p = [System.Collections.Generic.List[String]]::new() }
        }
        $section = $null
    } elseif ($line -match "^Comentarios 24\/Mar\/2026") {
        $section = "c"
    } elseif ($line -match "^Comentarios 17\/Mar\/2026") {
        $section = "p"
    } elseif ($currentPoint -ne $null -and $section -ne $null -and $line -notmatch "^Minuta Reunion Semanal") {
        # Keep literal line content, just trim ends
        if ($line.Trim() -ne "") {
            $points[$currentPoint][$section].Add($line.Trim())
        }
    }
}

$jsonFile = "dashboard_data.json"
$data = Get-Content $jsonFile -Raw -Encoding UTF8 | ConvertFrom-Json

foreach ($item in $data.value) {
    $id = [string]$item.id
    if ($points.ContainsKey($id)) {
        # Join lines with powershell newline (`n), which translates to \n in JSON
        $cLines = $points[$id].c -join "`n"
        $pLines = $points[$id].p -join "`n"
        
        if ($cLines -ne "") { $item.currentWeek = "24/3 - `n" + $cLines }
        if ($pLines -ne "") { $item.prevWeek = "17/3 - `n" + $pLines }
        
        # Calculate status automatically
        if ($cLines -match "Sin incidente") {
            $item.status = "Sin Incidentes"
        } elseif ($cLines -match "(?i)(Indisponibilidad|Afectaci.n|problema|vulnerabilidad|Error|Failover)") {
            $item.status = "Con Incidentes"
        } elseif ($cLines -match "(?i)(En espera|En seguimiento|En proceso|Depuraci.n)") {
            $item.status = "En Proceso"
        } else {
            $item.status = "En Revisión"
        }
    }
}

$jsonStr = $data | ConvertTo-Json -Depth 10
# Unescape \uXXXX characters 
$jsonStr = [regex]::Replace($jsonStr, '\\u([0-9a-fA-F]{4})', { [char][int]("0x" + $args[0].Groups[1].Value) })

[System.IO.File]::WriteAllText((Resolve-Path $jsonFile).ProviderPath, $jsonStr, [System.Text.Encoding]::UTF8)

Write-Host "Re-generated dashboard_data.json successfully with literal text."
