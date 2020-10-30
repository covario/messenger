# FROM node:12.18.2-alpine as nodebuild
# WORKDIR /app
# COPY OpenFin/src/. .
# RUN npm install
# RUN npm run build

FROM node:12.18.2-alpine as telegrambuild
WORKDIR /app
COPY ["Telegram/package.json", ""]
COPY ["Telegram/package-lock.json", ""]
RUN npm install
COPY Telegram/. .
ENV CI true
RUN npm test
ENV CI false
RUN npm run build

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS dotnetbuild
WORKDIR /src
RUN mkdir Services
WORKDIR /src/Services
COPY ["Services/src/messenger/messenger.csproj", "src/messenger/messenger.csproj"]
RUN dotnet restore "./src/messenger/messenger.csproj"
COPY Services/. .
COPY Landing/. src/messenger/wwwroot
#COPY --from=nodebuild /app/out wwwroot
RUN mkdir src/messenger/wwwroot/telegram
COPY --from=telegrambuild /app/build src/messenger/wwwroot/telegram
RUN dotnet build "messenger.sln" -c Release -o /app/build

FROM dotnetbuild AS publish
RUN dotnet publish "src/messenger/messenger.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine AS final
WORKDIR /app
EXPOSE 80
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "messenger.dll"]
