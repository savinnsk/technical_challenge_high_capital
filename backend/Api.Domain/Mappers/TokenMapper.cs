
using Api.Domain.Dto;

namespace Api.Domain.Mappers
{
    public class TokenMapper
    {
        
        public object SuccessResponse(DateTime createDate, DateTime expirationDate, string token, LoginDto user){
            return new{
                authenticated = true,
                created = createDate.ToString("yyyy-MM-dd HH:mm:ss"),
                expirationDate = expirationDate.ToString("yyyy-MM-dd HH:mm:ss"),
                acessToken = token,
                userName = user.Email,
                message = "user authenticated"
            };
        }
        public object FailedResponse(){
             return new {
                authenticated = false,
                message = "error to authenticate"
            };
        }
    }
}