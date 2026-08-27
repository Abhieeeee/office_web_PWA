@echo off
title Shree Anjani Multi-Agent Swarm Orchestrator
color 0b
echo ======================================================================
echo    SHREE ANJANI BELT & BEARING -- MULTI-AGENT SWARM ORCHESTRATOR
echo    Location: Siddharthanagar (Bhairahawa), Nepal
echo ======================================================================
echo.
echo Running 6-Agent Swarm with Gated 4-Phase Pipeline...
echo.

node "%~dp0orchestrator.js"

echo.
echo ======================================================================
echo Multi-Agent Execution Complete!
echo Press any key to open the Agent Manager Dashboard in your browser...
echo ======================================================================
pause >nul
start "" "%~dp0..\internal\agent-manager.html"
