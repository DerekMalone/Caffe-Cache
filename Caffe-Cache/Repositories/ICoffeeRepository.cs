using Caffe_Cache.Models;
using Microsoft.AspNetCore.Mvc;

namespace Caffe_Cache.Repositories
{
    public interface ICoffeeRepository
    {
        List<Coffee> GetAllCoffee(string uid);
        Coffee? GetCoffeeById(int id);
        void AddCoffee(Coffee coffee);
        void UpdateCoffee(int id, Coffee coffeeObj);
        void DeleteCoffee(int id);
    }
}
