@echo off
echo ===================================================
echo Pushing Shree Anjani B2B Portal to GitHub
echo Repo: https://github.com/Abhieeeee/office_web_PWA.git
echo ===================================================

git init
git remote remove origin 2>nul
git remote add origin https://github.com/Abhieeeee/office_web_PWA.git
git branch -M main
git add .
git commit -m "feat: complete public B2B wholesale website with PWA and internal system scaffold"
git push -u origin main --force

echo.
echo ===================================================
echo Done! Pushed to GitHub.
echo Enable GitHub Pages in your repo Settings -> Pages
echo ===================================================
pause
