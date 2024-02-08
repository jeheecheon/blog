using Infrastructur.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.DbContexts;

public static class InitialDataManager
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        if (serviceProvider is null)
            return;

        using (var scope = serviceProvider.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<MainContext>();
            try
            {
                await context.Database.ExecuteSqlAsync(@$"
INSERT INTO role (name) VALUES ('admin');
                ");

            }
            catch (Exception e)
            {
                System.Console.WriteLine($"{e.Source}: {e.Message}");
            }

            try
            {
                await context.Database.ExecuteSqlAsync(@$"
INSERT INTO external_login_provider (name) VALUES ('google');
                ");

            }
            catch (Exception e)
            {
                System.Console.WriteLine($"{e.Source}: {e.Message}");
            }

            try
            {
                await context.Database.ExecuteSqlAsync(@$"
INSERT INTO category (id, is_bottom_level) VALUES ('ASP.NET', true);
                ");
            }
            catch (Exception e)
            {
                System.Console.WriteLine($"{e.Source}: {e.Message}");
            }

            try
            {
                var admin = context.roles.FromSql(@$"
SELECT * FROM role WHERE name = 'admin';
                ")
                    .AsEnumerable()
                    .FirstOrDefault();

                if (admin is not null)
                {
                    var jeheecheon = context.accounts.FromSql(@$"
SELECT * FROM account WHERE normalized_email = 'JEHEECHEON@GMAIL.COM';
                    ")
                        .AsEnumerable()
                        .FirstOrDefault();

                    if (jeheecheon is not null)
                    {
                        await context.Database.ExecuteSqlInterpolatedAsync(@$"
INSERT INTO account_role (account_id, role_id) VALUES ({jeheecheon.id}, {admin.id});
                        ");
                    }
                }
            }
            catch (Exception e)
            {
                System.Console.WriteLine($"{e.Source}: {e.Message}");
            }
        }
    }
}
