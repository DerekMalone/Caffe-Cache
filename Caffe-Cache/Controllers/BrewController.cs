using Caffe_Cache.Models;
using Caffe_Cache.Repositories;
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

            [HttpGet("{uid}")]
            public IActionResult GetAllCoffee(string uid)
            {
                List<Brew> brews = _brewRepository.GetAllBrews(uid);
                if (brews == null) return NotFound();
                return Ok(brews);
            }

            [HttpGet("{uid}/{id}")]
            public IActionResult GetBrewById(string uid, int id)
            {
                var brew = _brewRepository.GetBrewById(uid, id);
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

            [HttpPut("Edit/{uid}/{id}")]
            public IActionResult UpdateBrew(string uid, int id, [FromBody] Brew brewObj)
            {
                try
                {
                _brewRepository.UpdateBrew(uid, id, brewObj);

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
    }
}
