using Caffe_Cache.Models;

namespace Caffe_Cache.Repositories
{
    public interface IUserRepository
    {
        User GetUserByUID(string uid);
        bool UserExists(string uid);
        int CreateUser(User user);
    }
}
