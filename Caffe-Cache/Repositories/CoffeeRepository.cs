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
                                               RoastType,
                                               UserId
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
                                UserId = reader.GetString(reader.GetOrdinal("UserId")),
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
                                               RoastType,
                                               UserId
                                        FROM Coffee
                                        WHERE UserId = @uid AND Id = @id
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
                                UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            };                            
                        return coffee;
                        }
                        else return null;
                    }
                }
            }
        }

        public void AddCoffee(Coffee coffee)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO Coffee (Brand,
                                                            [Name],
                                                            RoastType,
                                                            UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@brand, @name, @roastType, @userId);
                                        ";

                    cmd.Parameters.AddWithValue("@brand", coffee.Brand);
                    cmd.Parameters.AddWithValue("@name", coffee.Name);
                    cmd.Parameters.AddWithValue("@roastType", coffee.RoastType);
                    cmd.Parameters.AddWithValue("@userId", coffee.UserId);

                    int id = (int)cmd.ExecuteScalar();

                    coffee.Id = id;
                }
            }
        }
        
        public void UpdateCoffee(string uid, int id, Coffee coffeeObj)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Coffee                                            
                                            SET Brand = @brand,
                                                [Name] = @name,
                                                RoastType = @roastType,
                                                UserId = @uid
                                        WHERE Id = @id AND UserId = @uid
                                        ";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@brand", coffeeObj.Brand);
                    cmd.Parameters.AddWithValue("@name", coffeeObj.Name);
                    cmd.Parameters.AddWithValue("@roastType", coffeeObj.RoastType);
                    cmd.Parameters.AddWithValue("@uid", uid);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCoffee(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM Coffee
                                        WHERE Id = @id
                                        ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
