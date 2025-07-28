using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Api.Domain.Dto
{
    public class MessageDto
    {
        public Guid Id { get; set; }

        [Required]
        public string ChatBotId{ get; set; }

        [Required]
        [DefaultValue("Olá")]
        public string Context { get; set; }

        [Required]
        [DefaultValue("user")]
        public string Role { get; set; }

    }
}
