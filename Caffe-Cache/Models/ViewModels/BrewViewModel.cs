namespace Caffe_Cache.Models.ViewModels
{
    public class BrewViewModel
    {
        public User User { get; set; }
        public List<Machine> Machines { get; set; }
        public List<Coffee> Coffees { get; set; }
        public List<Brew> Brew { get; set; }
    }
}
