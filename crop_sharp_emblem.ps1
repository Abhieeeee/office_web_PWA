Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\DELL\.gemini\antigravity\brain\765e1a88-e3f6-4fcb-897e-985097eddfe8\.user_uploaded\media_1788162020481.jpg"

if (-not (Test-Path $srcPath)) {
    Write-Error "Source image not found: $srcPath"
    exit 1
}

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $bmp.Width
$h = $bmp.Height
Write-Output "Source Dimensions: $w x $h"

# 1. Save Full Brand Lockup Banner
$lockupPng = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\brand_lockup.png"
$lockupJpg = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\brand_lockup.jpg"

if (Test-Path $lockupPng) { Remove-Item $lockupPng -Force }
if (Test-Path $lockupJpg) { Remove-Item $lockupJpg -Force }

$bmp.Save($lockupPng, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save($lockupJpg, [System.Drawing.Imaging.ImageFormat]::Jpeg)
Write-Output "Saved full brand lockup to assets/brand_lockup.png"

# 2. Precise Circular Medallion Center & Diameter Calculation
# Center Y is h/2 = 279
# Center X is around 0.728 * w = 745
# Diameter of the emblem is approx 0.76 * h = 424px
$centerY = $h / 2.0
$centerX = $w * 0.728
$diameter = $h * 0.77

$cropX = [int]($centerX - ($diameter / 2.0))
$cropY = [int]($centerY - ($diameter / 2.0))
$cropSize = [int]$diameter

Write-Output "Cropping tight emblem at X=$cropX, Y=$cropY, Size=$cropSize"

$cropRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropSize, $cropSize
$emblemBmp = $bmp.Clone($cropRect, $bmp.PixelFormat)

# 3. Create a High-Definition 600x600 Square Output with Clean White Background
$targetSize = 600
$finalLogo = New-Object System.Drawing.Bitmap $targetSize, $targetSize
$g = [System.Drawing.Graphics]::FromImage($finalLogo)
$g.Clear([System.Drawing.Color]::White)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

# Draw cropped emblem filling the canvas with 10px margin
$margin = 12
$drawDim = $targetSize - ($margin * 2)
$g.DrawImage($emblemBmp, $margin, $margin, $drawDim, $drawDim)

$g.Dispose()
$emblemBmp.Dispose()
$bmp.Dispose()

# 4. Save to assets/logo.png and assets/logo.jpg
$logoPng = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\logo.png"
$logoJpg = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\logo.jpg"

if (Test-Path $logoPng) { Remove-Item $logoPng -Force }
if (Test-Path $logoJpg) { Remove-Item $logoJpg -Force }

$finalLogo.Save($logoPng, [System.Drawing.Imaging.ImageFormat]::Png)
$finalLogo.Save($logoJpg, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$finalLogo.Dispose()

Write-Output "SUCCESS: Razor-sharp logo.png and logo.jpg created!"
