try {
    $content = Get-Content 'C:\Users\eaguilarher2\Documents\Antigravity\kof-sap-dashboard\dashboard_data.json' -Raw -Encoding UTF8
    $json = ConvertFrom-Json $content -ErrorAction Stop
    Write-Host "Valid JSON. Items: $($json.value.Count)"
} catch {
    Write-Host "Invalid JSON!"
    Write-Host $_.Exception.Message
}
