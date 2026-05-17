using Microsoft.AspNetCore.Mvc;
using ABCPharmacyAPI.Services;
using ABCPharmacyAPI.DTOs;
using ABCPharmacyAPI.Exceptions;

namespace ABCPharmacyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicineController : ControllerBase
    {
        private readonly IMedicineService _service;
        private readonly ILogger<MedicineController> _logger;

        public MedicineController(IMedicineService service, ILogger<MedicineController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetMedicines()
        {
            var list = await _service.GetAllAsync();
            return Ok(list);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> AddMedicine([FromBody] CreateMedicineRequest request)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            try
            {
                var created = await _service.CreateAsync(request);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
            }
            catch (DuplicateMedicineException dex)
            {
                _logger.LogWarning(dex, "Duplicate create attempt: {Name} - {Brand}", request.FullName, request.Brand);
                return Conflict(new { message = dex.Message });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateMedicine(int id, [FromBody] UpdateMedicineRequest request)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            try
            {
                var updated = await _service.UpdateAsync(id, request);
                if (updated == null) return NotFound(new { message = $"Medicine with ID {id} not found." });
                return Ok(updated);
            }
            catch (DuplicateMedicineException dex)
            {
                _logger.LogWarning(dex, "Duplicate update attempt for {Id}: {Name} - {Brand}", id, request.FullName, request.Brand);
                return Conflict(new { message = dex.Message });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteMedicine(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound(new { message = $"Medicine with ID {id} not found." });
            return NoContent();
        }
    }
}