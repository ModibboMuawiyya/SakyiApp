using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Fabrics
{
    public class Unlike
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

                if (likes == null)
                    return Unit.Value;

                if (likes.IsOwner)
                    throw new RestException(HttpStatusCode.BadRequest, new { likes = "You cannot unlike your fabric" });

                _context.UserActivities.Remove(likes);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}