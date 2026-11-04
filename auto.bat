@echo off
title Auto Create Private Repo ^& Push

echo =========================================
echo  Auto Create Private Repo ^& Push GitHub
echo =========================================
echo.

:: Pindah ke folder bot
cd /d "C:\Users\ArourL\Downloads\auto-contribution-bot-main"

:: Menentukan nama repo acak agar tidak bentrok
set REPO_NAME=自由-温柔 -%RANDOM%

echo [1/4] Menjalankan bot (membuat commit lokal)...
node index.js

echo [2/4] Membersihkan remote origin lama...
git remote remove origin >nul 2>&1

echo [3/4] Membuat repository PRIVATE baru di GitHub (%REPO_NAME%)...
gh repo create %REPO_NAME% --private --source=. --remote=origin

echo [4/4] Mengunggah (push) commit ke GitHub...
git branch -M main
git push -u origin main

echo.
echo =========================================
echo  Selesai! Repo "%REPO_NAME%" berhasil dibuat (PRIVATE) ^& di-push.
echo =========================================
pause