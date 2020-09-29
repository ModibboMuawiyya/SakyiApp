using System;

namespace Domain
{
    public class UserActivity
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid FabricId { get; set; }
        public virtual Fabric Fabric { get; set; }
        public DateTime DateVisited { get; set; }
        public bool IsOwner { get; set; }

    }

}