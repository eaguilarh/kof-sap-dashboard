$imgDir = "C:\Users\eaguilarher2\Documents\Antigravity\kof-sap-dashboard\img"
$jsFile = "C:\Users\eaguilarher2\Documents\Antigravity\kof-sap-dashboard\js\image-data.js"

$files = Get-ChildItem -Path $imgDir -Filter "ref_*.png"

$content = "window.DashboardImages = {`r`n"

foreach ($file in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $base64 = [System.Convert]::ToBase64String($bytes)
    $key = $file.BaseName
    $content += "    `"$key`":  `"data:image/png;base64,$base64`",`r`n"
}

$content += "};`r`n"

Set-Content -Path $jsFile -Value $content -NoNewline
Write-Host "Successfully embedded $($files.Count) images into image-data.js"
