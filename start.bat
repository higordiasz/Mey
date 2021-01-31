@echo off
cd E:\DiscordBot\Mey\app
node . > log\log%date:~0,2%-%date:~3,2%-%date:~6,10%-%time:~0,2%-%time:~3,2%.txt
call start.bat