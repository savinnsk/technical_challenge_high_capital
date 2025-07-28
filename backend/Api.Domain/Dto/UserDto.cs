using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Domain.Dto
{
    public class UserDto
    {

        [JsonIgnore]
        public Guid Id { get; set; }

        [Required]
        [SwaggerSchema("John Doe")]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(5)]
        [SwaggerSchema("12345")]
        public string Password { get; set; }
    }
}
