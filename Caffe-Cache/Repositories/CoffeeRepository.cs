using Caffe_Cache.Models;
using Microsoft.Data.SqlClient;

namespace Caffe_Cache.Repositories
{
    public class CoffeeRepository : ICoffeeRepository
    {
        private readonly IConfiguration _config;

        public CoffeeRepository(IConfiguration config)
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

        public void AddCoffee(Coffee coffee)
        {
            throw new NotImplementedException();
        }

        public void DeleteCoffee(int id)
        {
            throw new NotImplementedException();
        }

        public List<Coffee> GetAllCoffee(string uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT c.Id
                                                c.Brand,
                                                c.[Name] AS CoffeeName,
                                                c.RoastType,
                                                u.[Name] AS UserName
                                        FROM Coffee c
                                        LEFT JOIN [User] u ON c.UserId = u.UID
                                        WHERE UserId = @uid
                                        ";
                    cmd.Parameters.AddWithValue("@uid", uid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Coffee> list = new List<Coffee>();
                        while (reader.Read())
                        {
                            Coffee coffee = new Coffee
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Brand = reader.GetString(reader.GetOrdinal("Brand")),
                                Name = reader.GetString(reader.GetOrdinal("CoffeeName")),
                                RoastType = reader.GetString(reader.GetOrdinal("RoastType")),
                                /*Name = reader.GetString(reader.GetOrdinal("UserName"))*/
                            };

                            list.Add(coffee);
                        }
                        return list;
                    }
                }
            }
        }

        public Coffee? GetCoffeeById(string uid, int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateCoffee(int id)
        {
            throw new NotImplementedException();
        }
    }
}
