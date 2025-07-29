
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Api.Domain.Dto;
using Api.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Api.Aplication.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ChatbotsController  : ControllerBase
    {
            private readonly IChatbotService _chatbotService;


            public  ChatbotsController(IChatbotService chatbotService){
                _chatbotService = chatbotService;
            }

         
           [HttpGet]
           [Authorize("Bearer")]
           public async Task<IActionResult> GetAll(Guid id){

            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            
            try {

                var result = await this._chatbotService.GetAll();

                return Ok(result);

            }catch(ArgumentException ex){
                return StatusCode((int) HttpStatusCode.InternalServerError, ex.Message);
            }

       }
           [HttpGet]
           [Route("{id}", Name = "GetChatborWithId")]
           [Authorize("Bearer")]
           public async Task<IActionResult> Get(Guid id){

            if (!ModelState.IsValid){ 
                return BadRequest(ModelState); 
            }
            
            try {

                var result = await this._chatbotService.GetOneById(id);

                return Ok(result);

            }catch(ArgumentException ex){
                return StatusCode((int) HttpStatusCode.InternalServerError, ex.Message);
            }

       }

           [HttpPost]
           [Authorize("Bearer")]
           public async Task<IActionResult> Create([FromBody]ChatbotDto chatbot){

             var user = HttpContext.User;
             var claims = HttpContext.User.Claims.Select(c => new { c.Type, c.Value }).ToList();

             Console.Write(claims);
             if (user?.Identity?.IsAuthenticated != true)
                return Unauthorized();

    

            
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            try {

                var result = await this._chatbotService.Create(chatbot);
                
                
                return Ok(result);

             

            }catch(ArgumentException ex){
                return StatusCode((int) HttpStatusCode.InternalServerError, ex.Message);
            }

       }


           [HttpPut]
           [Authorize("Bearer")]
           public async Task<IActionResult> Update([FromBody]ChatbotDto chatbot){

            if (!ModelState.IsValid){ 
                return BadRequest(ModelState); 
            }
            
            try {

                var result = await this._chatbotService.Update(chatbot);

                if (result != null){
                    return Ok(result);
                }else{
                    return BadRequest();
                }

             

            }catch(ArgumentException ex){
                return StatusCode((int) HttpStatusCode.InternalServerError, ex.Message);
            }

       }
           [Authorize("Bearer")]
           [HttpDelete ("{id}")]
           public async Task<IActionResult> Delete(Guid id){

            if (!ModelState.IsValid){ 
                return BadRequest(ModelState); 
            }
            
            try {

                var result = await this._chatbotService.Delete(id);

                if (result != null){
                    return Ok(result);
                }else{
                    return BadRequest();
                }

             

            }catch(ArgumentException ex){
                return StatusCode((int) HttpStatusCode.InternalServerError, ex.Message);
            }

    }
  }
}