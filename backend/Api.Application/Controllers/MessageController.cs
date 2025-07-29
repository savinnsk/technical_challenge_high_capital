
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
           public async Task<IActionResult> GetAll(Guid id){

            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            
            try {

                var result = await this._messageService.GetAll(new Guid());

                return Ok(result);

            }catch(ArgumentException ex){
                return StatusCode((int) HttpStatusCode.InternalServerError, ex.Message);
            }

       }
           
           [HttpPost]
           [Authorize("Bearer")]
           public async Task<IActionResult> Create([FromBody]MessageDto message){

            if (!ModelState.IsValid){ 
                return BadRequest(ModelState); 
            }
            
            try {

                var result = await this._messageService.Create(message);
                
                
                return Ok(result);

             

            }catch(ArgumentException ex){
                return StatusCode((int) HttpStatusCode.InternalServerError, ex.Message);
            }

       }


        

  }
}