using System.ComponentModel.DataAnnotations;

namespace PhotoBook.API.Dtos
{
    public class UserForRegistrationDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password must be between 8 and 4 characters")]
        public string Password { get; set; }
    }
}