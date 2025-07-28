using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Api.Domain.Dto
{
    public class ChatbotDto
    {
        public Guid Id { get; set; }

        [Required]
        [DefaultValue("Bender")]
        public string Name { get; set; }

        [Required]
        [DefaultValue("um assistente")]
        public string Context { get; set; }

    }

    public class ChatbotDtoList
    {


        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Context { get; set; }

   
    }
}
