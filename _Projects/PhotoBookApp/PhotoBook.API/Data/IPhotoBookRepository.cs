using System.Collections.Generic;
using System.Threading.Tasks;
using PhotoBook.API.Helpers;
using PhotoBook.API.Models;

namespace PhotoBook.API.Data
{
    public interface IPhotoBookRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams UserParams);
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);
        Task<IEnumerable<Photo>> GetPhotos();
        Task<IEnumerable<Photo>> GetFavoritePhotos(int userId);
        Task<Photo> GetMainPhoto(int userId);
        Task<UserLike> GetLikeUser(int userId, int recipientId);
        Task<PhotoLike> GetLikePhoto(int userId, int photoId);
        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}