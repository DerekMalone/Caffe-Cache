using Caffe_Cache.Models;

namespace Caffe_Cache.Repositories
{
    public class UserRepository : IUserRepository
    {
        public int CreateUser(User user)
        {
            throw new NotImplementedException();
        }

        public User GetUserByUID(string uid)
        {
            throw new NotImplementedException();
        }

        public bool UserExists(string uid)
        {
            throw new NotImplementedException();
        }
    }
}
