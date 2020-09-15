using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Fabrics
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public DateTime? Date { get; set; }
            public int? Quantity { get; set; }
            public int? Price { get; set; }

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
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var fabric = await _context.Fabrics.FindAsync(request.Id);
                if (fabric == null)
                    throw new RestException(HttpStatusCode.NotFound, new { fabric = "Not Found" });

                fabric.Title = request.Title ?? fabric.Title;
                fabric.Description = request.Description ?? fabric.Description;
                fabric.Date = request.Date ?? fabric.Date;
                fabric.Quantity = request.Quantity ?? fabric.Quantity;
                fabric.Price = request.Price ?? fabric.Price;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }


        }
    }
}