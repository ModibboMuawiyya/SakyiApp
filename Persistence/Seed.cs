using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$word1");
                }
            }

            if (!context.Fabrics.Any())
            {
                var fabrics = new List<Fabric>
                {
                    new Fabric
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Price = 3000,
                        Quantity = 10,
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateVisited = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Fabric
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 months ago",
                        Price = 3000,
                        Quantity = 10,
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateVisited = DateTime.Now.AddMonths(-2)
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Fabric
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Price = 3000,
                        Quantity = 10,
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateVisited = DateTime.Now.AddMonths(-2)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                        }

                    },
                    new Fabric
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Price = 3000,
                        Quantity = 10,
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateVisited = DateTime.Now.AddMonths(-2)
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },new Fabric
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Price = 3000,
                        Quantity = 10,
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateVisited = DateTime.Now.AddMonths(-2)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Fabric
                    {
                        Title = "Past Activity 7",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Price = 3000,
                        Quantity = 10,
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateVisited = DateTime.Now.AddMonths(-2)
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                             new UserActivity
                            {
                                AppUserId = "c",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Fabric
                    {
                        Title = "Past Activity 7",
                        Date = DateTime.Now.AddMonths(-3),
                        Description = "Activity 2 months ago",
                        Price = 3000,
                        Quantity = 10,
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateVisited = DateTime.Now.AddMonths(-2)
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                             new UserActivity
                            {
                                AppUserId = "c",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Fabric
                    {
                        Title = "Past Activity 7",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Price = 3000,
                        Quantity = 10,
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateVisited = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                   new Fabric
                    {
                        Title = "Past Activity 7",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 6 months ago",
                        Price = 3000,
                        Quantity = 10,
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateVisited = DateTime.Now.AddMonths(-2)
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                             new UserActivity
                            {
                                AppUserId = "c",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Fabric
                    {
                        Title = "Past Activity 7",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Price = 3000,
                        Quantity = 10,
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateVisited = DateTime.Now.AddMonths(-2)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                             new UserActivity
                            {
                                AppUserId = "b",
                                IsOwner = false,
                                DateVisited = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Fabric
                    {
                        Title = "Past Activity 7",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Price = 3000,
                        Quantity = 10,
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateVisited = DateTime.Now.AddMonths(-2)
                            }
                        }
                    }
                };

                await context.Fabrics.AddRangeAsync(fabrics);
                await context.SaveChangesAsync();
            }
        }
    }
}