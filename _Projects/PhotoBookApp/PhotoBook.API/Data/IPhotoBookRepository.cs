using System.Collections.Generic;
using System.Threading.Tasks;
using PhotoBook.API.Models;

namespace PhotoBook.API.Data
{
    public interface IPhotoBookRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
    }
}