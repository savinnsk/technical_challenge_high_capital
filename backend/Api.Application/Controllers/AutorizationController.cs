
using System.Net;
using Api.Domain.Dto;
using Api.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Aplication.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthorizationService _authService;


        public  AuthorizationController(IAuthorizationService authService){
                _authService = authService;
        }


        [HttpPost]
           public async Task<IActionResult> Login([FromBody]LoginDto loginDto ){

            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            
            try {

                var result = await this._authService.Login(loginDto);

                if(result == null ){
                    return NotFound();
                }
                return Ok(result);

            }catch(ArgumentException ex){
                return StatusCode((int) HttpStatusCode.InternalServerError, ex.Message);
            }

       }

    }
}