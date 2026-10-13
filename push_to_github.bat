@echo off
title Push Automated Video Studio to GitHub
color 0a
echo ======================================================================
echo   PUSHING TO GITHUB (cschandan-01/youtube-ai-automation)
echo ======================================================================
echo.

cd /d "C:\Users\MyPC\.gemini\antigravity-ide\scratch\video-agent-kit\video-agent-kit"

echo Pushing main branch to GitHub...
git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo ======================================================================
    echo   [SUCCESS] Code successfully pushed to GitHub!
    echo   GitHub Actions Cloud Automation is now ACTIVE!
    echo ======================================================================
) else (
    echo.
    echo [Notice] If GitHub requested sign-in, please complete it in your browser.
)

echo.
pause
