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

        public void DeleteMachine(int id)
        {
            throw new NotImplementedException();
        }

        public List<Machine> GetAllMachines(string uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               [Name] AS MachineName
                                        FROM Machine
                                        WHERE UserId = @uid
                                        ";
                    cmd.Parameters.AddWithValue("@uid", uid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Machine> list = new List<Machine>();
                        while (reader.Read())
                        {
                            Machine machine = new Machine
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),                                
                                Name = reader.GetString(reader.GetOrdinal("MachineName")),                                
                            };

                            list.Add(machine);
                        }
                        return list;
                    }
                }
            }
        }

        public Machine? GetMachineById(string uid, int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id,
                                               [Name] AS MachineName
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
                            };

                            return machine;
                        }
                        else return null;
                    }
                }
            }
        }

        public void UpdateMachine(int id)
        {
            throw new NotImplementedException();
        }
    }
}
