using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace PhotoBook.API.Models
{
    public class User : IdentityUser<int>
    {
        public string Introduction  { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Country { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Like> Likers { get; set; }
        public ICollection<Like> Likees { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}