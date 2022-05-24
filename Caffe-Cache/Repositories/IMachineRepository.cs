using Caffe_Cache.Models;

namespace Caffe_Cache.Repositories
{
    public interface IMachineRepository
    {
        List<Machine> GetAllMachines(string uid);
        Machine? GetMachineById(string uid, int id);
        void AddMachine(Machine machine);
        void DeleteMachine(int id);
        void UpdateMachine(int id);
    }
}
