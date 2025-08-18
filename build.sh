npm --prefix ./frontend run build || echo "⚠️ Erro no build do frontend, continuando..."

rm -r ./backend/Api.Application/frontend/dist/** 2>/dev/null || echo "⚠️ Erro ao remover dist antigo, continuando..."

cp -r ./frontend/dist/ ./backend/Api.Application/frontend/ || echo "⚠️ Erro ao copiar dist para backend, continuando..."

dotnet build ./backend/Api.Application/Api.Aplication.csproj -c Release || echo "⚠️ Erro no build do .NET, continuando..."

dotnet run --project ./backend/Api.Application/Api.Aplication.csproj --configuration Release || echo "⚠️ Erro ao rodar .NET, continuando..."
