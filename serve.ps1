$port = 8080
$path = "c:\Users\eaguilarher2\Documents\Antigravity\kof-sap-dashboard"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Listening on http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $path + $request.Url.LocalPath.Replace("/", "\")
        if (Test-Path -Path $localPath -PathType Container) {
            $localPath = Join-Path $localPath "index.html"
        }

        if (Test-Path $localPath -PathType Leaf) {
            try {
                $content = [System.IO.File]::ReadAllBytes($localPath)
                $response.ContentLength64 = $content.Length
                if ($localPath -match "\.css$") { $response.ContentType = "text/css" }
                elseif ($localPath -match "\.js$") { $response.ContentType = "application/javascript" }
                elseif ($localPath -match "\.json$") { $response.ContentType = "application/json" }
                elseif ($localPath -match "\.html$") { $response.ContentType = "text/html" }
                elseif ($localPath -match "\.png$") { $response.ContentType = "image/png" }
                $response.OutputStream.Write($content, 0, $content.Length)
            } catch {
                $response.StatusCode = 500
            }
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
