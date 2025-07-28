using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Dto
{
    public class LoginDto
    {
        [Required]
        [DefaultValue("12345")]
        public required string Password { get; set; }

        [Required]
        [EmailAddress]
        [DefaultValue("jonh@mail.com")]
        public required string Email { get; set; }
    }
}
