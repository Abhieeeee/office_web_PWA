Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\DELL\.gemini\antigravity\brain\765e1a88-e3f6-4fcb-897e-985097eddfe8\.user_uploaded\media_1788161127783.jpg"

if (-not (Test-Path $srcPath)) {
    Write-Error "Source image not found: $srcPath"
    exit 1
}

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $bmp.Width
$h = $bmp.Height
Write-Output "Source Dimensions: $w x $h"

# 1. Save Full Brand Lockup to assets/brand_lockup.png and assets/brand_lockup.jpg
$lockupPng = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\brand_lockup.png"
$lockupJpg = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\brand_lockup.jpg"

if (Test-Path $lockupPng) { Remove-Item $lockupPng -Force }
if (Test-Path $lockupJpg) { Remove-Item $lockupJpg -Force }

$bmp.Save($lockupPng, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save($lockupJpg, [System.Drawing.Imaging.ImageFormat]::Jpeg)
Write-Output "Saved full brand lockup to assets/brand_lockup.png"

# 2. Extract the Circular Medallion Icon from the right side of the image
# In the image, the circular emblem is centered around x = 0.726 * w, y = 0.5 * h, radius = 0.40 * h
$medallionSize = [int]($h * 0.88)
$centerY = [int]($h / 2.0)
$centerX = [int]($w * 0.726)

$cropX = [int]($centerX - ($medallionSize / 2.0))
$cropY = [int]($centerY - ($medallionSize / 2.0))

# Ensure within bounds
if ($cropX -lt 0) { $cropX = 0 }
if ($cropY -lt 0) { $cropY = 0 }
if (($cropX + $medallionSize) -gt $w) { $cropX = $w - $medallionSize }
if (($cropY + $medallionSize) -gt $h) { $cropY = $h - $medallionSize }

Write-Output "Cropping Medallion at ($cropX, $cropY) with size $medallionSize x $medallionSize"

$cropRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $medallionSize, $medallionSize
$medallionBmp = $bmp.Clone($cropRect, $bmp.PixelFormat)

# Now create an 800x800 high-res square logo with clean white circular backdrop
$targetSize = 800
$finalLogo = New-Object System.Drawing.Bitmap $targetSize, $targetSize
$g = [System.Drawing.Graphics]::FromImage($finalLogo)
$g.Clear([System.Drawing.Color]::White)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Draw the cropped medallion with slight margin
$pad = 20
$drawSize = $targetSize - ($pad * 2)
$g.DrawImage($medallionBmp, $pad, $pad, $drawSize, $drawSize)

$g.Dispose()
$medallionBmp.Dispose()
$bmp.Dispose()

# Save to assets/logo.png and assets/logo.jpg
$logoPng = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\logo.png"
$logoJpg = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\logo.jpg"

if (Test-Path $logoPng) { Remove-Item $logoPng -Force }
if (Test-Path $logoJpg) { Remove-Item $logoJpg -Force }

$finalLogo.Save($logoPng, [System.Drawing.Imaging.ImageFormat]::Png)
$finalLogo.Save($logoJpg, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$finalLogo.Dispose()

Write-Output "SUCCESS: Generated high-definition logo.png and logo.jpg from new emblem!"
