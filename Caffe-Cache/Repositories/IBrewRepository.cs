using Caffe_Cache.Models;

namespace Caffe_Cache.Repositories
{
    public interface IBrewRepository
    {
        List<Brew> GetAllBrews(string uid);
        Brew GetBrewById(int id);
        void AddBrew(Brew brew);
        void UpdateBrew(int id, Brew brewObj);
        void DeleteBrew(int id);


        List<Brew> GetBrewsByMachineId(int machineId);
        List<Brew> GetBrewsByCoffeeId(int coffeeId);
        Machine GetMachineByBrewId(int id);
        Coffee GetCoffeeByBrewId(int id);


        // Below is valid. Not sure if needed yet though.
        //List<Coffee> GetAllCoffees(string uid);
        //List<Machine> GetAllMachines(string uid);
    }
}
