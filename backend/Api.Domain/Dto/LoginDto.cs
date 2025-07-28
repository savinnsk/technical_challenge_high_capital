using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Dto
{
    public class LoginDto
    {
        [Required]
        [DefaultValue("1234")]
        public required string Password { get; set; }

        [Required]
        [EmailAddress]
        [DefaultValue("savio@mail.com")]
        public required string Email { get; set; }
    }
}
