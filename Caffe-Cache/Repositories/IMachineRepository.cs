using Caffe_Cache.Models;

namespace Caffe_Cache.Repositories
{
    public interface IMachineRepository
    {
        List<Machine> GetAllMachines(string uid);
        Machine? GetMachineById(int id);
        void AddMachine(Machine machine);
        void UpdateMachine(int id, Machine machine);
        void DeleteMachine(int id);
    }
}
