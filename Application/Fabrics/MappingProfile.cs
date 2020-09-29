using AutoMapper;
using Domain;

namespace Application.Fabrics
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Fabric, FabricDto>();
            CreateMap<UserActivity, ClientDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}