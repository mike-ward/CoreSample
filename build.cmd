pushd src\App\js
call npm i
popd
pushd src
msbuild CoreSample.sln /t:Restore;Rebuild /p:Configuration=Release /p:DeployOnBuild=true /verbosity:minimal
popd