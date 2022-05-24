using Caffe_Cache.Models;

namespace Caffe_Cache.Repositories
{
    public interface IBrewRepository
    {
        List<Brew> GetAllBrews(string uid);
        Brew GetBrew(int id);
        void AddBrew(Brew brew);
        void UpdateBrew(int id);
        void DeleteBrew(int id);

        // Below is valid. Not sure if needed yet though.
        //List<Coffee> GetAllCoffees(string uid);
        //List<Machine> GetAllMachines(string uid);
    }
}
