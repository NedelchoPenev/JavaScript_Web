namespace PhotoBook.API.Models
{
    public class PhotoLike
    {
        public int PhotoId { get; set; }
        public int LikerId { get; set; }
        public Photo Photo { get; set; }
        public User Liker { get; set; }
    }
}