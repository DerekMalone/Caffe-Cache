using Caffe_Cache.Models;

namespace Caffe_Cache.Repositories
{
    public interface IBrewRepository
    {
        List<Brew> GetAllBrews();
        Brew GetBrew(int id);
        void AddBrew(Brew brew);
        void UpdateBrew(int id);
        void DeleteBrew(int id);
    }
}
