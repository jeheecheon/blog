FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
EXPOSE 8080
COPY ./*.sln .
COPY ./WebApi/*.csproj ./WebApi/
COPY ./Application/*.csproj ./Application/
COPY ./Infrastructure/*.csproj ./Infrastructure/
COPY ./Core/*.csproj ./Core/
RUN dotnet restore .
COPY . .
RUN dotnet publish -c Release -o out --framework net8.0


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS final-env
WORKDIR /app
COPY --from=build-env /app/out .
ENV ASPNETCORE_HTTP_PORTS=8080
ENTRYPOINT ["dotnet", "WebApi.dll"]