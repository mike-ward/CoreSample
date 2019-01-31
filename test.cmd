@echo off
pushd src\Test\bin\Release\netcoreapp2.1
call vstest.console Test.dll
popd
if ERRORLEVEL 1 goto END

pushd src\App\js
call npm test
popd

:END
