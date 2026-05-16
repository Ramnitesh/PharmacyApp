using Microsoft.AspNetCore.Mvc;
using ABCPharmacyAPI.Models;
using System.Text.Json;

namespace ABCPharmacyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicineController : ControllerBase
    {
        private const string DataFile = "Data/medicines.json";

        [HttpGet]
        public IActionResult GetMedicines()
        {
            if (!System.IO.File.Exists(DataFile))
            {
                return Ok(new List<Medicine>());
            }

            var jsonData = System.IO.File.ReadAllText(DataFile);
            var medicines = JsonSerializer.Deserialize<List<Medicine>>(jsonData);
            return Ok(medicines);
        }

        [HttpPost]
        public IActionResult AddMedicine([FromBody] Medicine medicine)
        {
            if (medicine == null)
            {
                return BadRequest("Invalid medicine data.");
            }

            var medicines = new List<Medicine>();

            if (System.IO.File.Exists(DataFile))
            {
                var jsonData = System.IO.File.ReadAllText(DataFile);
                medicines = JsonSerializer.Deserialize<List<Medicine>>(jsonData);
            }

            // Generate ID based on max ID + 1
            if (medicines.Count > 0)
            {
                medicine.Id = medicines.Max(m => m.Id) + 1;
            }
            else
            {
                medicine.Id = 1;
            }

            medicines.Add(medicine);
            System.IO.File.WriteAllText(DataFile, JsonSerializer.Serialize(medicines));

            return CreatedAtAction(nameof(GetMedicines), new { id = medicine.Id }, medicine);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateMedicine(int id, [FromBody] Medicine medicine)
        {
            if (medicine == null)
            {
                return BadRequest("Invalid medicine data.");
            }

            var medicines = new List<Medicine>();

            if (System.IO.File.Exists(DataFile))
            {
                var jsonData = System.IO.File.ReadAllText(DataFile);
                medicines = JsonSerializer.Deserialize<List<Medicine>>(jsonData);
            }

            var existingMedicine = medicines.FirstOrDefault(m => m.Id == id);
            if (existingMedicine == null)
            {
                return NotFound($"Medicine with ID {id} not found.");
            }

            // Update the medicine
            existingMedicine.FullName = medicine.FullName;
            existingMedicine.Brand = medicine.Brand;
            existingMedicine.ExpiryDate = medicine.ExpiryDate;
            existingMedicine.Quantity = medicine.Quantity;
            existingMedicine.Price = medicine.Price;
            existingMedicine.Notes = medicine.Notes;

            System.IO.File.WriteAllText(DataFile, JsonSerializer.Serialize(medicines));

            return Ok(existingMedicine);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMedicine(int id)
        {
            var medicines = new List<Medicine>();

            if (System.IO.File.Exists(DataFile))
            {
                var jsonData = System.IO.File.ReadAllText(DataFile);
                medicines = JsonSerializer.Deserialize<List<Medicine>>(jsonData);
            }

            var medicineToDelete = medicines.FirstOrDefault(m => m.Id == id);
            if (medicineToDelete == null)
            {
                return NotFound($"Medicine with ID {id} not found.");
            }

            medicines.Remove(medicineToDelete);
            System.IO.File.WriteAllText(DataFile, JsonSerializer.Serialize(medicines));

            return NoContent();
        }
    }
}