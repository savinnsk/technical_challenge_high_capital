FROM mcr.microsoft.com/dotnet/sdk:8.0

# Instala dotnet-ef global
RUN dotnet tool install --global dotnet-ef

# Adiciona o path do dotnet tools global ao PATH da imagem
ENV PATH="$PATH:/root/.dotnet/tools"

EXPOSE 5201

WORKDIR /app
