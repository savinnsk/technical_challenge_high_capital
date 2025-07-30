using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Api.Domain.Dto
{
    public class MessageDto
    {
        public string? Role { get; set; }

        [Required]
        public string ChatBotId{ get; set; }

        [Required]
        [DefaultValue("Olá")]
        public string Content { get; set; }

   

    }
}
