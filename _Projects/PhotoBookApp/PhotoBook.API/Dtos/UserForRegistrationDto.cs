using System;
using System.ComponentModel.DataAnnotations;

namespace PhotoBook.API.Dtos
{
    public class UserForRegistrationDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password must be between 8 and 4 characters")]
        public string Password { get; set; }
        

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Country { get; set; }

        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserForRegistrationDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}