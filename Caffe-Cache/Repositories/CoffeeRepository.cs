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
                                        SELECT Id,
                                               Brand,
                                               [Name] AS CoffeeName,
                                               RoastType
                                        FROM Coffee
                                        WHERE UserId = @uid
                                        ";
                    cmd.Parameters.AddWithValue("@uid", uid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Coffee> coffees = new List<Coffee>();
                        while (reader.Read())
                        {
                            Coffee coffee = new Coffee
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Brand = reader.GetString(reader.GetOrdinal("Brand")),
                                Name = reader.GetString(reader.GetOrdinal("CoffeeName")),
                                RoastType = reader.GetString(reader.GetOrdinal("RoastType")),

                            };
                            coffees.Add(coffee);
                        }
                        return coffees;
                    }
                }
            }
        }

        public Coffee? GetCoffeeById(string uid, int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id,
                                               Brand,
                                               [Name] AS CoffeeName,
                                               RoastType
                                        FROM Coffee
                                        WHERE UserId = @uid
                                        ";
                    cmd.Parameters.AddWithValue("@uid", uid);
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {                        
                        if (reader.Read())
                        {
                            Coffee coffee = new Coffee
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Brand = reader.GetString(reader.GetOrdinal("Brand")),
                                Name = reader.GetString(reader.GetOrdinal("CoffeeName")),
                                RoastType = reader.GetString(reader.GetOrdinal("RoastType")),
                            };                            
                        return coffee;
                        }
                        else return null;
                    }
                }
            }
        }

        public void UpdateCoffee(int id)
        {
            throw new NotImplementedException();
        }
    }
}
