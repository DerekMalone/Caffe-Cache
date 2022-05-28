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
        private readonly IMachineRepository _machineReposoitory;

        public MachineController(IMachineRepository machineRepository)
        {
            _machineReposoitory = machineRepository;
        }

        [HttpGet("{uid}")]
        public IActionResult GetAllMachines(string uid)
        {
            List<Machine> machines = _machineReposoitory.GetAllMachines(uid);
            if (machines == null) return NotFound();
            return Ok(machines);
        }

        [HttpGet("Detail/{id}")]
        public IActionResult GetMachineById(int id)
        {
            var machine = _machineReposoitory.GetMachineById(id);
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
                _machineReposoitory.AddMachine(newMachine);
                return Ok(newMachine);
            }
        }

        [HttpPut("Edit/{id}")]
        public IActionResult UpdateMachine(int id, [FromBody] Machine machineObj)
        {
            try
            {
                _machineReposoitory.UpdateMachine(id, machineObj);

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
                _machineReposoitory.DeleteMachine(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
