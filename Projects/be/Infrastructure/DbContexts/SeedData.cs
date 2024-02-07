using Infrastructur.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DbContexts;

public static class InitialDataManager
{
    public static async Task SeedAsync(MainContext mainContext)
    {
        try
        {
            if (!mainContext.roles.Any())
            {
                await mainContext.roles.AddAsync(new role
                {
                    name = "admin"
                });
                await mainContext.SaveChangesAsync();
            }

            if (!mainContext.external_login_providers.Any())
            {
                await mainContext.external_login_providers.AddAsync(new external_login_provider
                {
                    name = "google"
                });
                await mainContext.SaveChangesAsync();
            }
        }
        catch (Exception e)
        {
            System.Console.WriteLine($"{e.Source}: {e.Message}");
        }
    }
}
