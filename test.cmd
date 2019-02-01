@echo off
pushd src\Test\bin\Release\netcoreapp2.2
call vstest.console Test.dll
popd
if ERRORLEVEL 1 goto END

pushd src\App\js
call npm test
popd

:END
