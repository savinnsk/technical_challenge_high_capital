
using System.Net;
using Api.Domain.Dto;
using Api.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Api.Aplication.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class MessagesController  : ControllerBase
    {
            private readonly IMessageService _messageService;


            public  MessagesController(IMessageService messageService){
                _messageService = messageService;
            }


           [HttpGet]
           [Authorize("Bearer")]
           [Route("{chatbotId}")]
           public async Task<IActionResult> GetAll(Guid chatbotId)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userEmail = HttpContext.User.Identity?.Name;

            try
            {

                var result = await this._messageService.GetAll(chatbotId, userEmail);

                return Ok(result);

            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }

        }
           
           [HttpPost]
           [Authorize("Bearer")]
           public async Task<IActionResult> Create([FromBody]MessageDto message){

            if (!ModelState.IsValid){ 
                return BadRequest(ModelState); 
            }
            var userEmail = HttpContext.User.Identity?.Name;
            
            try
            {

                var result = await this._messageService.Create(message,userEmail);


                return Ok(result);



            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }

       }


        

  }
}