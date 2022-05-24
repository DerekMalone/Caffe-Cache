using Caffe_Cache.Models;
using Microsoft.Data.SqlClient;

namespace Caffe_Cache.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;

        public UserRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }
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
