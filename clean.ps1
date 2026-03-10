$filePath = "c:\Users\eaguilarher2\Documents\Antigravity\kof-sap-dashboard\js\image-data.js"
$content = Get-Content -Path $filePath -Raw
$content = $content -replace '"ref_18_\d+"\s*:\s*"[^"]+",?\r?\n?', ''
Set-Content -Path $filePath -Value $content -NoNewline
