﻿using Caffe_Cache.Models;
using Microsoft.AspNetCore.Mvc;

namespace Caffe_Cache.Repositories
{
    public interface ICoffeeRepository
    {
        List<Coffee> GetAllCoffee(string uid);
        Coffee? GetCoffeeById(string uid, int id);
        void AddCoffee(Coffee coffee);
        void DeleteCoffee(int id);
        void UpdateCoffee(int id);
    }
}
