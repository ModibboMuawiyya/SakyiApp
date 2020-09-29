using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Fabrics
{
    public class Liked
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var fabric = await _context.Fabrics.FindAsync(request.Id);
                if (fabric == null)
                    throw new RestException(HttpStatusCode.NotFound,
                    new { Fabric = "Could not find Fabric" });

                var user = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var likes = await _context.UserActivities
                    .SingleOrDefaultAsync(x => x.FabricId == fabric.Id &&
                        x.AppUserId == user.Id);

                if (likes != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { likes = "Already liked Fabric" });

                likes = new UserActivity
                {
                    Fabric = fabric,
                    AppUser = user,
                    IsOwner = false,
                    DateVisited = DateTime.Now
                };

                _context.UserActivities.Add(likes);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}