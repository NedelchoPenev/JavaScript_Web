using System;

namespace PhotoBook.API.Dtos
{
    public class MessageCreationDto
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public DateTime MessageSent { get; set; }
        public string Content { get; set; }

        public MessageCreationDto()
        {
            this.MessageSent = DateTime.Now;
        }
    }
}