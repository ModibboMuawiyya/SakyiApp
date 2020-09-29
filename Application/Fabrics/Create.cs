using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using System.Linq;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Fabrics
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public DateTime Date { get; set; }
            public int Quantity { get; set; }
            public int Price { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.Quantity).NotEmpty();
                RuleFor(x => x.Price).NotEmpty();
            }
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
                var fabric = new Fabric
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Date = request.Date,
                    Quantity = request.Quantity,
                    Price = request.Price
                };
                _context.Fabrics.Add(fabric);

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetCurrentUsername());

                var client = new UserActivity
                {
                    AppUser = user,
                    Fabric = fabric,
                    IsOwner = true,
                    DateVisited = DateTime.Now
                };

                _context.UserActivities.Add(client);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}