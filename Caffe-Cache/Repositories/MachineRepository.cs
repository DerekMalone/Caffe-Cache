using Caffe_Cache.Models;
using Microsoft.Data.SqlClient;

namespace Caffe_Cache.Repositories
{
    public class MachineRepository : IMachineRepository
    {
        private readonly IConfiguration _config;

        public MachineRepository(IConfiguration config)
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


        public List<Machine> GetAllMachines(string uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               [Name] AS MachineName,
                                               UserId
                                        FROM Machine
                                        WHERE UserId = @uid
                                        ";
                    cmd.Parameters.AddWithValue("uid", uid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Machine> list = new List<Machine>();
                        while (reader.Read())
                        {
                            Machine machine = new Machine
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),                                
                                Name = reader.GetString(reader.GetOrdinal("MachineName")),
                                UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            };

                            list.Add(machine);
                        }
                        return list;
                    }
                }
            }
        }

        public Machine? GetMachineById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id,
                                               [Name] AS MachineName,
                                               UserId
                                        FROM Machine
                                        WHERE Id = @id
                                        ";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Machine machine = new Machine
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("MachineName")),
                                UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            };

                            return machine;
                        }
                        else return null;
                    }
                }
            }
        }

        public void AddMachine(Machine machine)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO Machine ([Name],
                                                            UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@name, @userId);
                                        ";

                    cmd.Parameters.AddWithValue("@name", machine.Name);
                    cmd.Parameters.AddWithValue("@userId", machine.UserId);

                    int id = (int)cmd.ExecuteScalar();

                    machine.Id = id;
                }
            }
        }

        public void UpdateMachine(int id, Machine machine)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Machine
                                        SET [Name] = @name,
                                            UserId = @userId
                                        WHERE Id = @id
                                        ";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@name", machine.Name);
                    cmd.Parameters.AddWithValue("@userId", machine.UserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteMachine(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM Machine
                                        WHERE Id = @id
                                        ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
