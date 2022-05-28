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

        [HttpGet("Detail/{id}")]
        public IActionResult GetCoffeeById(int id)
        {
            var coffee = _coffeeRepository.GetCoffeeById(id);
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

        [HttpPut("Edit/{id}")]
        public IActionResult UpdateCoffee(int id, [FromBody] Coffee coffeeObj)
        {
            try
            {
                _coffeeRepository.UpdateCoffee(id, coffeeObj);

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
