$ocrPath = "C:\Users\eaguilarher2\Documents\Antigravity\kof-sap-dashboard\ocr.txt"
$jsPath = "C:\Users\eaguilarher2\Documents\Antigravity\kof-sap-dashboard\js\app.js"

$lines = Get-Content $ocrPath -Encoding UTF8
$jsContent = Get-Content $jsPath -Raw -Encoding UTF8

foreach ($line in $lines) {
    if (!$line.Trim().StartsWith('|') -or $line.Contains('Punto | Tipo')) { continue }
    $parts = $line.Split('|')
    if ($parts.Length -ge 7) {
        $puntoCol = $parts[1].Trim()
        $statusCol = $parts[4].Trim()
        $prevCol = $parts[5].Trim()
        $actCol = $parts[6].Trim()

        if ($puntoCol -match '^(\d+)\s*-') {
            $id = $matches[1]
            
            # Format regex strings
            $statusSafe = $statusCol.Replace("\", "\\").Replace("$", "$$").Replace("'", "\'")
            $prevSafe = $prevCol.Replace("\", "\\").Replace("$", "$$").Replace("'", "\'")
            $actSafe = $actCol.Replace("\", "\\").Replace("$", "$$").Replace("'", "\'")

            # Replace status (matches inside double quotes)
            $jsContent = [regex]::Replace($jsContent, "(id:\s*['""]$id['""][^}]*?status:\s*"")([^""]*)("")", "`${1}$statusSafe`${3}")
            
            # Replace prevWeek
            $jsContent = [regex]::Replace($jsContent, "(id:\s*['""]$id['""][\s\S]*?prevWeek:\s*"")([^""]*)("")", "`${1}$prevSafe`${3}")
            
            # Replace currentWeek
            $jsContent = [regex]::Replace($jsContent, "(id:\s*['""]$id['""][\s\S]*?currentWeek:\s*"")([^""]*)("")", "`${1}$actSafe`${3}")
        }
    }
}

$jsContent | Set-Content $jsPath -Encoding UTF8
Write-Output "Done parsing and updating app.js with fixed regex."
