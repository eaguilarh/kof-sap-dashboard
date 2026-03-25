Add-Type -AssemblyName System.Drawing

$imgDir = "C:\Users\eaguilarher2\Documents\Antigravity\kof-sap-dashboard\img"
$images = Get-ChildItem -Path $imgDir -Filter *.png | Where-Object { $_.Name -like "ref_*_*.png" }

foreach ($imgFile in $images) {
    # Skip logos
    if ($imgFile.Name -eq "kof-logo.png" -or $imgFile.Name -eq "dxc-logo.png") { continue }

    try {
        $srcBitmap = New-Object System.Drawing.Bitmap $imgFile.FullName
        $newWidth = $srcBitmap.Width * 2
        $newHeight = $srcBitmap.Height * 2
        
        $destBitmap = New-Object System.Drawing.Bitmap $newWidth, $newHeight
        $destBitmap.SetResolution($srcBitmap.HorizontalResolution, $srcBitmap.VerticalResolution)
        
        $graphics = [System.Drawing.Graphics]::FromImage($destBitmap)
        $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        
        $rect = New-Object System.Drawing.Rectangle(0, 0, $newWidth, $newHeight)
        $graphics.DrawImage($srcBitmap, $rect, 0, 0, $srcBitmap.Width, $srcBitmap.Height, [System.Drawing.GraphicsUnit]::Pixel)
        
        $srcBitmap.Dispose()
        $graphics.Dispose()
        
        # Save overwrite
        $destBitmap.Save($imgFile.FullName, [System.Drawing.Imaging.ImageFormat]::Png)
        $destBitmap.Dispose()
        
        Write-Host "Upscaled $($imgFile.Name) successfully to ${newWidth}x${newHeight}."
    } catch {
        Write-Host "Failed to upscale $($imgFile.Name): $_"
    }
}
Write-Host "All images processed."
