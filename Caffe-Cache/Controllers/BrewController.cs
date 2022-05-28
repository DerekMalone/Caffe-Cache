using Caffe_Cache.Models;
using Caffe_Cache.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Caffe_Cache.Controllers
{
        [Route("[controller]")]
        [ApiController]
    public class BrewController : Controller
    {

            private readonly IBrewRepository _brewRepository;

            public BrewController(IBrewRepository coffeeRepository)
            {
                _brewRepository = coffeeRepository;
            }

            //[HttpGet("{uid}")]
            [HttpGet("{uid}")]
            public IActionResult GetAllBrews(string uid)
            {
                List<Brew> brews = _brewRepository.GetAllBrews(uid);
                if (brews == null) return NotFound();
                return Ok(brews);
            }

            [HttpGet("Detail/{id}")]
            public IActionResult GetBrewById(int id)
            {
                var brew = _brewRepository.GetBrewById(id);
                if (brew == null) return NotFound();
                return Ok(brew);
            }

            [HttpPost]
            public IActionResult AddBrew([FromBody] Brew newBrew)
            {
                if (newBrew == null)
                {
                    return NotFound();
                }
                else
                {
                    _brewRepository.AddBrew(newBrew);
                    return Ok(newBrew);
                }
            }

            [HttpPut("Edit/{id}")]
            public IActionResult UpdateBrew(int id, [FromBody] Brew brewObj)
            {
                try
                {
                _brewRepository.UpdateBrew(id, brewObj);

                    return Ok();
                }
                catch (Exception ex)
                {
                    return NotFound();
                }
            }
        
            [HttpDelete("Delete/{id}")]
            public IActionResult DeleteBrew(int id)
            {
                try
                {
                _brewRepository.DeleteBrew(id);
                    return Ok();
                }
                catch
                {
                    return BadRequest();
                }
            }

            [HttpGet("Machine/{machineId}")]
            public IActionResult GetBrewsByMachineId(int machineId)
            {
                List<Brew> brews = _brewRepository.GetBrewsByMachineId(machineId);
                if (brews == null) return NotFound();
                return Ok(brews);
            }

            [HttpGet("Coffee/{coffeeId}")]
            public IActionResult GetBrewsByCoffeeId(int coffeeId)
            {
                List<Brew> brews = _brewRepository.GetBrewsByCoffeeId(coffeeId);
                if (brews == null) return NotFound();
                return Ok(brews);
            }

        [HttpGet("Detail/Machine/{id}")]
        public IActionResult GetMachineByBrewId(int id)
        {
            Machine brewsMachine = _brewRepository.GetMachineByBrewId(id);
            if (brewsMachine == null) return NotFound();
            return Ok(brewsMachine);
        }

        [HttpGet("Detail/Coffee/{id}")]
        public IActionResult GetCoffeeByBrewId(int id)
        {
            Coffee brewsCoffee = _brewRepository.GetCoffeeByBrewId(id);
            if (brewsCoffee == null) return NotFound();
            return Ok(brewsCoffee);
        }
        // make three repo calls and use view model here.
    }
}
