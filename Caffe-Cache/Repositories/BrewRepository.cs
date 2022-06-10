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

        public List<Brew> GetAllBrews(string uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                                [Name] AS BrewName,
                                                GrindSize,
                                                CoffeeWeight,
                                                WaterVolume,
                                                BrewTemp,
                                                BrewDurationHour,
                                                BrewDurationMin,
                                                BrewDurationSec,
                                                BrewInstructions,
                                                UserId,
                                                MachineId,
                                                CoffeeId
                                        FROM Brew
                                        WHERE UserId = @uid
                                        ";
                    cmd.Parameters.AddWithValue("uid", uid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Brew> list = new List<Brew>();
                        while (reader.Read())
                        {
                            Brew brew = new Brew
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("BrewName")),
                                GrindSize = reader.GetString(reader.GetOrdinal("GrindSize")),
                                CoffeeWeight = reader.GetInt32(reader.GetOrdinal("CoffeeWeight")),
                                WaterVolume = reader.GetInt32(reader.GetOrdinal("WaterVolume")),
                                BrewTemp = reader.GetInt32(reader.GetOrdinal("BrewTemp")),
                                BrewDurationHour = reader.GetInt32(reader.GetOrdinal("BrewDurationHour")),
                                BrewDurationMin = reader.GetInt32(reader.GetOrdinal("BrewDurationMin")),
                                BrewDurationSec = reader.GetInt32(reader.GetOrdinal("BrewDurationSec")),
                                BrewInstructions = reader.GetString(reader.GetOrdinal("BrewInstructions")),
                                UserId = reader.GetString(reader.GetOrdinal("UserId")),
                                MachineId = reader.GetInt32(reader.GetOrdinal("MachineId")),
                                CoffeeId = reader.GetInt32(reader.GetOrdinal("CoffeeId")),
                            };

                            list.Add(brew);
                        }
                        return list;
                    }
                }
            }
        }

        public Brew GetBrewById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                                [Name] AS BrewName,
                                                GrindSize,
                                                CoffeeWeight,
                                                WaterVolume,
                                                BrewTemp,
                                                BrewDurationHour,
                                                BrewDurationMin,
                                                BrewDurationSec,
                                                BrewInstructions,
                                                UserId,
                                                MachineId,
                                                CoffeeId
                                        FROM Brew
                                        WHERE Id = @id
                                        ";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Brew brew = new Brew
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("BrewName")),
                                GrindSize = reader.GetString(reader.GetOrdinal("GrindSize")),
                                CoffeeWeight = reader.GetInt32(reader.GetOrdinal("CoffeeWeight")),
                                WaterVolume = reader.GetInt32(reader.GetOrdinal("WaterVolume")),
                                BrewTemp = reader.GetInt32(reader.GetOrdinal("BrewTemp")),
                                BrewDurationHour = reader.GetInt32(reader.GetOrdinal("BrewDurationHour")),
                                BrewDurationMin = reader.GetInt32(reader.GetOrdinal("BrewDurationMin")),
                                BrewDurationSec = reader.GetInt32(reader.GetOrdinal("BrewDurationSec")),
                                BrewInstructions = reader.GetString(reader.GetOrdinal("BrewInstructions")),
                                UserId = reader.GetString(reader.GetOrdinal("UserId")),
                                MachineId = reader.GetInt32(reader.GetOrdinal("MachineId")),
                                CoffeeId = reader.GetInt32(reader.GetOrdinal("CoffeeId")),
                            };
                            return brew;
                        }
                        else return null;
                    }
                }
            }
        }

        public void AddBrew(Brew brewObj)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO Brew (
                                                            [Name],
                                                            GrindSize,
                                                            CoffeeWeight,
                                                            WaterVolume,
                                                            BrewTemp,
                                                            BrewDurationHour,
                                                            BrewDurationMin,
                                                            BrewDurationSec,
                                                            BrewInstructions,
                                                            UserId,
                                                            MachineId,
                                                            CoffeeId
                                                          )
                                        OUTPUT INSERTED.ID
                                        VALUES (
                                                @name,
                                                @grindSize,
                                                @coffeeWeight,
                                                @waterVolume,
                                                @brewTemp,
                                                @brewDurationHour,
                                                @brewDurationMin,
                                                @brewDurationSec,
                                                @brewInstructions,
                                                @userId,
                                                @machineId,
                                                @coffeeId
                                                );
                                        ";

                    cmd.Parameters.AddWithValue("@name", brewObj.Name);
                    cmd.Parameters.AddWithValue("@grindSize", brewObj.GrindSize);
                    cmd.Parameters.AddWithValue("@coffeeWeight", brewObj.CoffeeWeight);
                    cmd.Parameters.AddWithValue("@waterVolume", brewObj.WaterVolume);
                    cmd.Parameters.AddWithValue("@brewTemp", brewObj.BrewTemp);
                    cmd.Parameters.AddWithValue("@brewDurationHour", brewObj.BrewDurationHour);
                    cmd.Parameters.AddWithValue("@brewDurationMin", brewObj.BrewDurationMin);
                    cmd.Parameters.AddWithValue("@brewDurationSec", brewObj.BrewDurationSec);
                    cmd.Parameters.AddWithValue("@brewInstructions", brewObj.BrewInstructions);
                    cmd.Parameters.AddWithValue("@userId", brewObj.UserId);
                    cmd.Parameters.AddWithValue("@machineId", brewObj.MachineId);
                    cmd.Parameters.AddWithValue("@coffeeId", brewObj.CoffeeId);


                    int id = (int)cmd.ExecuteScalar();

                    brewObj.Id = id;
                }
            }
        }


        public void UpdateBrew(int id, Brew brewObj)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Brew                                            
                                            SET [Name] = @name,
                                                GrindSize = @grindSize,
                                                CoffeeWeight = @coffeeWeight,
                                                WaterVolume = @waterVolume,
                                                BrewTemp = @brewTemp,
                                                BrewDurationHour = @brewDurationHour,
                                                BrewDurationMin = @brewDurationMin,
                                                BrewDurationSec = @brewDurationSec,
                                                BrewInstructions = @brewInstructions,
                                                UserId = @userId,
                                                MachineId = @machineId,
                                                CoffeeId = @coffeeId
                                        WHERE Id = @id
                                        ";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@name", brewObj.Name);
                    cmd.Parameters.AddWithValue("@grindSize", brewObj.GrindSize);
                    cmd.Parameters.AddWithValue("@coffeeWeight", brewObj.CoffeeWeight);
                    cmd.Parameters.AddWithValue("@waterVolume", brewObj.WaterVolume);
                    cmd.Parameters.AddWithValue("@brewTemp", brewObj.BrewTemp);
                    cmd.Parameters.AddWithValue("@brewDurationHour", brewObj.BrewDurationHour);
                    cmd.Parameters.AddWithValue("@brewDurationMin", brewObj.BrewDurationMin);
                    cmd.Parameters.AddWithValue("@brewDurationSec", brewObj.BrewDurationSec);
                    cmd.Parameters.AddWithValue("@brewInstructions", brewObj.BrewInstructions);
                    cmd.Parameters.AddWithValue("@userId", brewObj.UserId);
                    cmd.Parameters.AddWithValue("@machineId", brewObj.MachineId);
                    cmd.Parameters.AddWithValue("@coffeeId", brewObj.CoffeeId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteBrew(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM Brew
                                        WHERE Id = @id
                                        ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Brew> GetBrewsByMachineId(int machineId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                                [Name] AS BrewName,
                                                GrindSize,
                                                CoffeeWeight,
                                                WaterVolume,
                                                BrewTemp,
                                                BrewDurationHour,
                                                BrewDurationMin,
                                                BrewDurationSec,
                                                BrewInstructions,
                                                UserId,
                                                MachineId,
                                                CoffeeId
                                        FROM Brew
                                        WHERE MachineId = @machineId
                                        ";
                    cmd.Parameters.AddWithValue("@machineId", machineId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Brew> list = new List<Brew>();
                        while (reader.Read())
                        {
                            Brew brew = new Brew
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("BrewName")),
                                GrindSize = reader.GetString(reader.GetOrdinal("GrindSize")),
                                CoffeeWeight = reader.GetInt32(reader.GetOrdinal("CoffeeWeight")),
                                WaterVolume = reader.GetInt32(reader.GetOrdinal("WaterVolume")),
                                BrewTemp = reader.GetInt32(reader.GetOrdinal("BrewTemp")),
                                BrewDurationHour = reader.GetInt32(reader.GetOrdinal("BrewDurationHour")),
                                BrewDurationMin = reader.GetInt32(reader.GetOrdinal("BrewDurationMin")),
                                BrewDurationSec = reader.GetInt32(reader.GetOrdinal("BrewDurationSec")),
                                BrewInstructions = reader.GetString(reader.GetOrdinal("BrewInstructions")),
                                UserId = reader.GetString(reader.GetOrdinal("UserId")),
                                MachineId = reader.GetInt32(reader.GetOrdinal("MachineId")),
                                CoffeeId = reader.GetInt32(reader.GetOrdinal("CoffeeId")),
                            };

                            list.Add(brew);
                        }
                        return list;
                    }
                }

            }
        }

        public List<Brew> GetBrewsByCoffeeId(int coffeeId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                                [Name] AS BrewName,
                                                GrindSize,
                                                CoffeeWeight,
                                                WaterVolume,
                                                BrewTemp,
                                                BrewDurationHour,
                                                BrewDurationMin,
                                                BrewDurationSec,
                                                BrewInstructions,
                                                UserId,
                                                MachineId,
                                                CoffeeId
                                        FROM Brew
                                        WHERE CoffeeId = @coffeeId
                                        ";
                    cmd.Parameters.AddWithValue("@coffeeId", coffeeId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Brew> list = new List<Brew>();
                        while (reader.Read())
                        {
                            Brew brew = new Brew
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("BrewName")),
                                GrindSize = reader.GetString(reader.GetOrdinal("GrindSize")),
                                CoffeeWeight = reader.GetInt32(reader.GetOrdinal("CoffeeWeight")),
                                WaterVolume = reader.GetInt32(reader.GetOrdinal("WaterVolume")),
                                BrewTemp = reader.GetInt32(reader.GetOrdinal("BrewTemp")),
                                BrewDurationHour = reader.GetInt32(reader.GetOrdinal("BrewDurationHour")),
                                BrewDurationMin = reader.GetInt32(reader.GetOrdinal("BrewDurationMin")),
                                BrewDurationSec = reader.GetInt32(reader.GetOrdinal("BrewDurationSec")),
                                BrewInstructions = reader.GetString(reader.GetOrdinal("BrewInstructions")),
                                UserId = reader.GetString(reader.GetOrdinal("UserId")),
                                MachineId = reader.GetInt32(reader.GetOrdinal("MachineId")),
                                CoffeeId = reader.GetInt32(reader.GetOrdinal("CoffeeId")),
                            };

                            list.Add(brew);
                        }
                        return list;
                    }
                }
            }
        }

        public Machine GetMachineByBrewId(int brewId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT  m.Id,
                                        		m.[Name],
                                        		m.UserId
                                        FROM Machine m
                                        INNER JOIN Brew b ON b.MachineId = m.Id
                                        WHERE b.Id = @brewId
                                        ";
                    cmd.Parameters.AddWithValue("@brewId", brewId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Machine brewsMachine = new Machine
                            {                            
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                UserId= reader.GetString(reader.GetOrdinal("UserId")),                                
                            };

                            return brewsMachine;
                        }
                        return null;
                    }
                }
            }
        }

        public Coffee GetCoffeeByBrewId(int brewId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT  c.Id,
                                                c.Brand,
                                        		c.[Name],
                                                c.RoastType,
                                        		c.UserId
                                        FROM Coffee c
                                        INNER JOIN Brew b ON b.CoffeeId = c.Id
                                        WHERE b.Id = @brewId
                                        ";
                    cmd.Parameters.AddWithValue("@brewId", brewId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Coffee brewsCoffee = new Coffee
                            {                                
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Brand = reader.GetString(reader.GetOrdinal("Brand")),
                                RoastType = reader.GetString(reader.GetOrdinal("RoastType")),
                                UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            };

                            return brewsCoffee;
                        }
                        return null;
                    }
                }
            }
        }
    }
}
