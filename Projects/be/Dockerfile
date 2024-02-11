FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
EXPOSE 8080
EXPOSE 7130
COPY ./*.sln .
COPY ./WebApi/*.csproj ./WebApi/
COPY ./Application/*.csproj ./Application/
COPY ./Infrastructure/*.csproj ./Infrastructure/
COPY ./Core/*.csproj ./Core/
RUN dotnet restore .
COPY . .
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS final-env
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "ASPNETCORE_HTTPS_PORTS=7130", "ASPNETCORE_HTTP_PORTS=8080", "dotnet", "WebApi.dll" ]