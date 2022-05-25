using Caffe_Cache.Models;

namespace Caffe_Cache.Repositories
{
    public interface IMachineRepository
    {
        List<Machine> GetAllMachines(string uid);
        Machine? GetMachineById(string uid, int id);
        void AddMachine(Machine machine);
        void UpdateMachine(string uid, int id, Machine machine);
        void DeleteMachine(int id);
    }
}
