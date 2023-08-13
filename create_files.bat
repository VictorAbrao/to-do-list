@echo off

:: Criar estrutura de pastas
mkdir src\components
mkdir src\pages
mkdir public

:: Criar arquivos
echo. > src\firebaseConfig.js
echo. > src\index.js
echo. > src\App.js
echo. > src\pages\Home.js
echo. > src\pages\Login.js
echo. > src\components\TodoItem.js
echo. > src\components\Filter.js
echo. > src\components\TodoItem.css
echo. > src\index.css
echo. > public\index.html
echo. > public\manifest.json
echo. > package.json
echo. > README.md

echo Estrutura de arquivos criada!
pause