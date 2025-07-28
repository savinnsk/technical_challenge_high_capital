using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.ComponentModel;

namespace Api.Domain.Dto
{
    public class UserDto
    {

        [JsonIgnore]
        public Guid Id { get; set; }

        [Required]
        [DefaultValue("jonh doe")]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [DefaultValue("jonh@mail.com")]
        public string Email { get; set; }

        [Required]
        [MinLength(5)]
        [DefaultValue("12345")]
        public string Password { get; set; }
    }
}
