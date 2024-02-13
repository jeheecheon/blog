FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
EXPOSE 8080
COPY . .
RUN dotnet clean
RUN dotnet publish -c Release --framework net8.0


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS final-env
WORKDIR /app
COPY --from=build-env /app/bin/Release/net8.0 .
ENV ASPNETCORE_HTTP_PORTS=8080
ENTRYPOINT ["dotnet", "WebApi.dll"]