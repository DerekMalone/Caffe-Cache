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

        [HttpPost]
        public IActionResult AddCoffee([FromBody] Coffee newCoffee)
        {
            if (newCoffee== null)
            {
                return NotFound();
            }
            else
            {
                _coffeeRepository.AddCoffee(newCoffee);
                return Ok(newCoffee);
            }
        }

        [HttpPut("Edit/{uid}/{id}")]
        public IActionResult UpdateCoffee(string uid, int id, [FromBody] Coffee coffeeObj)
        {
            try
            {
                _coffeeRepository.UpdateCoffee(uid, id, coffeeObj);

                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteCoffee(int id)
        {
            try
            {
                _coffeeRepository.DeleteCoffee(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
