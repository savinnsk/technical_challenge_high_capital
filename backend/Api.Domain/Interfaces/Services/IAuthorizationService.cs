using Api.Domain.Dto;



namespace Api.Domain.Interfaces.Services
{
    public interface IAuthorizationService
    {
        Task<object>Login(LoginDto loginDto);

        
    }
}