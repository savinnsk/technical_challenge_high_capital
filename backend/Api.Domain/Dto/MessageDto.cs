using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Text.Json.Serialization;

namespace Api.Domain.Dto
{
    public class MessageDto
    {
        [JsonIgnore]
        public string? Role { get; set; }

        [Required]
        public Guid ChatBotId { get; set; }

        [Required]
        [DefaultValue("Olá")]
        public string Content { get; set; }



    }
    

        public class MessageDtoList
    {
        [Required]
        public string Role { get; set; }

        [Required]
        public Guid ChatBotId{ get; set; }

        [Required]
        [DefaultValue("Olá")]
        public string Content { get; set; }

   

    }
}
