using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context){
            if (!context.Fabrics.Any())
            {
                var fabrics = new List<Fabric>{
                    new Fabric
                    {
                        Title = "Cashmere",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Quantity = 10,
                        Price = 2500,
                    },
                    new Fabric
                    {
                        Title = "Getzner",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Quantity = 10,
                        Price = 2500,
                    },
                    new Fabric
                    {
                        Title = "Satin",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Quantity = 10,
                        Price = 2500,
                    },
                    new Fabric
                    {
                        Title = "Shadda",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Quantity = 10,
                        Price = 2500,
                    },
                    new Fabric
                    {
                        Title = "Lace",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Quantity = 10,
                        Price = 2500,
                    },
                    new Fabric
                    {
                        Title = "Silk",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future",
                       Quantity = 10,
                        Price = 2500,
                    },
                    new Fabric
                    {
                        Title = "Wool",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Quantity = 10,
                        Price = 2500,
                    },
                    new Fabric
                    {
                        Title = "Polymer",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Quantity = 10,
                        Price = 2500,
                    },
                    new Fabric
                    {
                        Title = "Waax",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 2 months ago",
                        Quantity = 10,
                        Price = 2500,
                    },
                    new Fabric
                    {
                        Title = "Ankara",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Quantity = 10,
                        Price = 2500,
                    }
                };
                context.Fabrics.AddRange(fabrics);
                context.SaveChanges();
            }
        }
    }
}