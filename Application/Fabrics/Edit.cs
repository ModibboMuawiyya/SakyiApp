using System;
using System.Threading;
using System.Threading.Tasks;
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
                {
                  throw new Exception("Could not find Fabric");   
                }

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