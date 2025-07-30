using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Api.Domain.Dto
{
    public class ChatbotDto
    {

        [Required]
        [DefaultValue("Bender")]
        public string Name { get; set; }

        [Required]
        [DefaultValue("um assistente")]
        public string Context { get; set; }

        [Required]
        public Guid UserId;

    }

    public class ChatbotUpdateDto
    {

        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Context { get; set; }

   
    }
}
