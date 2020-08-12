using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Fabrics
{
    public class List
    {
        public class Query : IRequest<List<Fabric>> { }

        public class Handler : IRequestHandler<Query, List<Fabric>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
               
                _context = context;

            }
            public async Task<List<Fabric>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                var fabrics = await _context.Fabrics.ToListAsync();

                return fabrics;
            }
        }
    }
}