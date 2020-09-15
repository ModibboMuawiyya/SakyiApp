using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Fabrics
{
    public class Details
    {
        public class Query : IRequest<Fabric>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Fabric>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Fabric> Handle(Query request, CancellationToken cancellationToken)
            {

                var fabric = await _context.Fabrics.FindAsync(request.Id);

                if (fabric == null)
                    throw new RestException(HttpStatusCode.NotFound, new { fabric = "Not Found" });

                return fabric;
            }
        }
    }
}