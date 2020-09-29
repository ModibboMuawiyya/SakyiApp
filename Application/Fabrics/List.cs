using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Fabrics
{
    public class List
    {
        public class Query : IRequest<List<FabricDto>> { }

        public class Handler : IRequestHandler<Query, List<FabricDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;

                _context = context;

            }
            public async Task<List<FabricDto>> Handle(Query request, CancellationToken cancellationToken)
            {

                var fabrics = await _context.Fabrics
                .ToListAsync();

                return _mapper.Map<List<Fabric>, List<FabricDto>>(fabrics);
            }
        }
    }
}