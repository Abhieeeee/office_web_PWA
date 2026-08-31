Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\DELL\.gemini\antigravity\brain\765e1a88-e3f6-4fcb-897e-985097eddfe8\.user_uploaded\media_1788162780833.jpg"

if (-not (Test-Path $srcPath)) {
    Write-Error "Source image not found: $srcPath"
    exit 1
}

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $bmp.Width
$h = $bmp.Height
Write-Output "Source Dimensions: $w x $h"

# In media_1788162780833.jpg, the emblem is in the center of the 1024x558 canvas.
# Center X = w/2 = 512, Center Y = h/2 = 279
# The emblem diameter/height is approx 0.90 * h = 502px.
$centerY = $h / 2.0
$centerX = $w / 2.0
$emblemDim = [int]($h * 0.92)

$cropX = [int]($centerX - ($emblemDim / 2.0))
$cropY = [int]($centerY - ($emblemDim / 2.0))

if ($cropX -lt 0) { $cropX = 0 }
if ($cropY -lt 0) { $cropY = 0 }
if (($cropX + $emblemDim) -gt $w) { $cropX = $w - $emblemDim }
if (($cropY + $emblemDim) -gt $h) { $cropY = $h - $emblemDim }

Write-Output "Cropping central emblem at X=$cropX, Y=$cropY, Size=$emblemDim x $emblemDim"

$cropRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $emblemDim, $emblemDim
$emblemBmp = $bmp.Clone($cropRect, $bmp.PixelFormat)

# Create high-res 800x800 square output
$targetSize = 800
$finalBmp = New-Object System.Drawing.Bitmap $targetSize, $targetSize
$g = [System.Drawing.Graphics]::FromImage($finalBmp)
$g.Clear([System.Drawing.Color]::White)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

# Draw the cropped emblem with 15px margin
$margin = 15
$drawDim = $targetSize - ($margin * 2)
$g.DrawImage($emblemBmp, $margin, $margin, $drawDim, $drawDim)

# Mask out the outer checkered background to pure solid white #FFFFFF
# The circular/oval emblem has radius roughly 45% of targetSize
$cx = $targetSize / 2.0
$cy = $targetSize / 2.0
$radius = $targetSize * 0.455

$rect = New-Object System.Drawing.Rectangle 0, 0, $targetSize, $targetSize
$fullPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$fullPath.AddRectangle($rect)

$circleRect = New-Object System.Drawing.RectangleF ($cx - $radius), ($cy - $radius), ($radius * 2.0), ($radius * 2.0)
$circlePath = New-Object System.Drawing.Drawing2D.GraphicsPath
$circlePath.AddEllipse($circleRect)

$region = New-Object System.Drawing.Region $fullPath
$region.Exclude($circlePath)

$whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$g.FillRegion($whiteBrush, $region)

$bmp.Dispose()
$emblemBmp.Dispose()
$g.Dispose()

# Save to assets/logo.png and assets/logo.jpg (Navbar logo)
$outPng = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\logo.png"
$outJpg = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\logo.jpg"

if (Test-Path $outPng) { Remove-Item $outPng -Force }
if (Test-Path $outJpg) { Remove-Item $outJpg -Force }

$finalBmp.Save($outPng, [System.Drawing.Imaging.ImageFormat]::Png)
$finalBmp.Save($outJpg, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$finalBmp.Dispose()

Write-Output "SUCCESS: Nav logo created from new central emblem with clean pure white background!"
