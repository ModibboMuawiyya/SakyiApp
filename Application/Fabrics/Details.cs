using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Fabrics
{
    public class Details
    {
        public class Query : IRequest<FabricDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, FabricDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<FabricDto> Handle(Query request, CancellationToken cancellationToken)
            {

                var fabric = await _context.Fabrics
                .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (fabric == null)
                    throw new RestException(HttpStatusCode.NotFound, new { fabric = "Not Found" });

                var fabricToReturn = _mapper.Map<Fabric, FabricDto>(fabric);

                return fabricToReturn;
            }
        }
    }
}