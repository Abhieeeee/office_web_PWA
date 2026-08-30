Add-Type -AssemblyName System.Drawing

$inputPath = "C:\Users\DELL\.gemini\antigravity\brain\765e1a88-e3f6-4fcb-897e-985097eddfe8\.user_uploaded\media_1788008467061.jpg"
if (-not (Test-Path $inputPath)) {
    $inputPath = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\logo.png"
}

$bmp = [System.Drawing.Bitmap]::FromFile($inputPath)
$w = $bmp.Width
$h = $bmp.Height

# Create a new 800x800 white bitmap
$targetSize = 800
$newBmp = New-Object System.Drawing.Bitmap $targetSize, $targetSize
$g = [System.Drawing.Graphics]::FromImage($newBmp)
$g.Clear([System.Drawing.Color]::White)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Draw the original logo in the center
$g.DrawImage($bmp, 0, 0, $targetSize, $targetSize)

# The circular emblem is in the center. Let's replace the outer faux-checkerboard background with pure solid white #FFFFFF
$cx = $targetSize / 2.0
$cy = $targetSize / 2.0
# The outer circle radius of the emblem is approx 44% of width
$radius = $targetSize * 0.44

# Create outer region path
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

# Optional: Draw a thin subtle border or leave crisp
$bmp.Dispose()
$g.Dispose()

# Save updated files
$outPng = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\logo.png"
$outJpg = "C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b\assets\logo.jpg"

if (Test-Path $outPng) { Remove-Item $outPng -Force }
if (Test-Path $outJpg) { Remove-Item $outJpg -Force }

$newBmp.Save($outPng, [System.Drawing.Imaging.ImageFormat]::Png)
$newBmp.Save($outJpg, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$newBmp.Dispose()

Write-Output "SUCCESS: Logo saved with 100% pure solid white background!"
