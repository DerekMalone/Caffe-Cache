using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Caffe_Cache.Models;
using Caffe_Cache.Repositories;

namespace Caffe_Cache.Controllers
{
        [Route("[controller]")]
        [ApiController]

    public class CoffeeController : Controller
    {
        private readonly ICoffeeRepository _coffeeRepository;

        public CoffeeController(ICoffeeRepository coffeeRepository)
        {
            _coffeeRepository = coffeeRepository;
        }
        
        [HttpGet("{uid}")]
        public IActionResult GetAllCoffee(string uid)
        {
            List<Coffee> coffees = _coffeeRepository.GetAllCoffee(uid);
            if (coffees == null) return NotFound();
            return Ok(coffees);
        }

        [HttpGet("{uid}/{id}")]
        public IActionResult GetCoffeeById(string uid, int id)
        {
            var coffee = _coffeeRepository.GetCoffeeById(uid, id);
            if (coffee == null) return NotFound();
            return Ok(coffee);
        }


    }
}
