
using System.Net;
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
           public async Task<IActionResult> GetAll(){

            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            
            var userEmail = HttpContext.User.Identity?.Name;
            
            try
            {

                var result = await this._chatbotService.GetAll(userEmail);

                return Ok(result);

            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }

       }
           [HttpGet]
           [Route("{id}", Name = "GetChatborWithId")]
           [Authorize("Bearer")]
           public async Task<IActionResult> Get(Guid id){

            if (!ModelState.IsValid){ 
                return BadRequest(ModelState); 
            }
            
            var userEmail = HttpContext.User.Identity?.Name;
            
            try
            {

                var result = await this._chatbotService.GetOneById(id,userEmail);

                return Ok(result);

            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }

       }

           [HttpPost]
           [Authorize("Bearer")]
           public async Task<IActionResult> Create([FromBody]ChatbotDto chatbot){

            var userEmail = HttpContext.User.Identity?.Name;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            try {

                var result = await this._chatbotService.Create(chatbot, userEmail);
                
                
                return Ok(result);

             

            }catch(ArgumentException ex){
                return StatusCode((int) HttpStatusCode.InternalServerError, ex.Message);
            }

       }


           [HttpPut]
           [Authorize("Bearer")]
           public async Task<IActionResult> Update([FromBody]ChatbotUpdateDto chatbot){

            
   
             
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var userEmail = HttpContext.User.Identity?.Name;
            
            try
            {

                var result = await this._chatbotService.Update(chatbot,userEmail);

                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest();
                }



            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }

       }
           [Authorize("Bearer")]
           [HttpDelete ("{id}")]
           public async Task<IActionResult> Delete(Guid id){

            if (!ModelState.IsValid){ 
                return BadRequest(ModelState); 
            }
            
            var userEmail = HttpContext.User.Identity?.Name;

            try
            {

                var result = await this._chatbotService.Delete(id,userEmail);

                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest();
                }



            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }

    }
  }
}