using System;
using System.Collections.Generic;

namespace PhotoBook.API.Dtos
{
    public class UserForDetailsDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Introduction  { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotoDetailsDto> Photos { get; set; }
    }
}