@echo off
REM Setup 100% Free Windows Task Scheduler for Daily Video Generation & Publishing
echo ======================================================================
echo  100%% FREE WINDOWS AUTOMATION SCHEDULER SETUP
echo ======================================================================
echo.
echo Adding 2 daily automated tasks to Windows Task Scheduler:
echo 1. Daily US Shorts: Runs every day at 5:30 PM IST (8:00 AM EST)
echo 2. Daily Long Video: Runs every day at 11:30 PM IST (2:00 PM EST)
echo.

set SCRIPT_DIR=%~dp0

REM Task 1: Daily Shorts at 17:30 (5:30 PM IST)
schtasks /create /tn "Daily_YouTube_Shorts" /tr "python \"%SCRIPT_DIR%generate_reel_pipeline.py\" --preset random" /sc daily /st 17:30 /f

REM Task 2: Daily Long Explainer at 23:30 (11:30 PM IST)
schtasks /create /tn "Daily_YouTube_Longform" /tr "python \"%SCRIPT_DIR%render_longform_video.py\"" /sc daily /st 23:30 /f

echo.
echo [SUCCESS] Windows automated schedule configured!
echo Your PC will now automatically generate videos at the exact US peak hours.
pause
