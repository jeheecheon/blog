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
INSERT INTO category (id, is_bottom_level) VALUES
    ('backend', false),
    ('frontend', false),
    ('Algorithm', false);

INSERT INTO category (id, parent_category_id, is_bottom_level) VALUES 
    ('ASP.NET', 'backend', true),
    ('Spring', 'backend', true);
                ");
                // ('test1', false);
                // ('test2', 'test1', false),
                // ('test3', 'test2', false),
                // ('test4', 'test3', false),
                // ('test5', 'test4', true);
            }
            catch (Exception e)
            {
                System.Console.WriteLine($"{e.Source}: {e.Message}");
            }

            try
            {
                var admin = context.Role.FromSql(@$"
SELECT * FROM role WHERE name = 'admin';
                ")
                    .AsEnumerable()
                    .FirstOrDefault();

                if (admin is not null)
                {
                    var jeheecheon = context.Account.FromSql(@$"
SELECT * FROM account WHERE normalized_email = 'JEHEECHEON@GMAIL.COM';
                    ")
                        .AsEnumerable()
                        .FirstOrDefault();

                    if (jeheecheon is not null)
                    {
                        await context.Database.ExecuteSqlInterpolatedAsync(@$"
INSERT INTO account_role (account_id, role_id) VALUES ({jeheecheon.Id}, {admin.Id});
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
