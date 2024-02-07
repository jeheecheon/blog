using Infrastructur.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DbContexts;

public static class InitialDataManager
{
    public static async Task SeedAsync(MainContext mainContext)
    {
        try
        {
            await mainContext.Database.ExecuteSqlAsync(@$"
INSERT INTO role (name) VALUES ('admin');
            ");

        }
        catch (Exception e)
        {
            System.Console.WriteLine($"{e.Source}: {e.Message}");
        }

        try
        {
            await mainContext.Database.ExecuteSqlAsync(@$"
INSERT INTO external_login_provider (name) VALUES ('google');
            ");

        }
        catch (Exception e)
        {
            System.Console.WriteLine($"{e.Source}: {e.Message}");
        }

        try
        {
            await mainContext.Database.ExecuteSqlAsync(@$"
INSERT INTO category (id, is_bottom_level) VALUES ('ASP.NET', true);
            ");
        }
        catch (Exception e)
        {
            System.Console.WriteLine($"{e.Source}: {e.Message}");
        }
    }
}
