using Caffe_Cache.Models;
using Microsoft.Data.SqlClient;

namespace Caffe_Cache.Repositories
{
    public class BrewRepository : IBrewRepository
    {
        private readonly IConfiguration _config;

        public BrewRepository(IConfiguration config)
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


        public void AddBrew(Brew brew)
        {
            throw new NotImplementedException();
        }

        public void DeleteBrew(int id)
        {
            throw new NotImplementedException();
        }

        public List<Brew> GetAllBrews(string uid)
        {
            throw new NotImplementedException();
        }

        public Brew GetBrew(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateBrew(int id)
        {
            throw new NotImplementedException();
        }
    }
}
