using System;
using System.Collections.Generic;

namespace Domain
{
    public class Fabric
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public virtual ICollection<UserActivity> UserActivities { get; set; }
    }
}