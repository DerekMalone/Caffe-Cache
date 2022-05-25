using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Caffe_Cache.Models;
using Caffe_Cache.Repositories;

namespace Caffe_Cache.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class MachineController : Controller
    {
        private readonly IMachineRepository _machineRepo;

        public MachineController(IMachineRepository machineRepository)
        {
            _machineRepo = machineRepository;
        }

        [HttpGet("{uid}")]
        public IActionResult GetAllMachines(string uid)
        {
            List<Machine> machines = _machineRepo.GetAllMachines(uid);
            if (machines == null) return NotFound();
            return Ok(machines);
        }

        [HttpGet("{uid}/{id}")]
        public IActionResult GetMachineById(string uid, int id)
        {
            var machine = _machineRepo.GetMachineById(uid, id);
            if (machine == null) return NotFound();
            return Ok(machine);
        }

        [HttpPost]
        public IActionResult AddMachine([FromBody] Machine newMachine)
        {
            if (newMachine == null)
            {
                return NotFound();
            }
            else
            {
                _machineRepo.AddMachine(newMachine);
                return Ok(newMachine);
            }
        }

        [HttpPut("Edit/{uid}/{id}")]
        public IActionResult UpdateMachine(string uid, int id, [FromBody] Machine machineObj)
        {
            try
            {
                _machineRepo.UpdateMachine(uid, id, machineObj);

                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteMachine(int id)
        {
            try
            {
                _machineRepo.DeleteMachine(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
