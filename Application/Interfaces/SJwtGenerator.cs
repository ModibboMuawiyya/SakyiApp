using Domain;

namespace Application.Interfaces
{
    public interface SJwtGenerator
    {
        string CreateToken(AppUser user);
    }
}