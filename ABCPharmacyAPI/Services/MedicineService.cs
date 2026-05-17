using ABCPharmacyAPI.DTOs;
using ABCPharmacyAPI.Exceptions;
using ABCPharmacyAPI.Models;
using ABCPharmacyAPI.Repositories;

namespace ABCPharmacyAPI.Services
{
    public class MedicineService : IMedicineService
    {
        private readonly IMedicineRepository _repo;
        private readonly ILogger<MedicineService> _logger;

        public MedicineService(IMedicineRepository repo, ILogger<MedicineService> logger)
        {
            _repo = repo;
            _logger = logger;
        }

        public async Task<List<MedicineResponse>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list.Select(Map).ToList();
        }

        public async Task<MedicineResponse?> GetByIdAsync(int id)
        {
            var item = await _repo.GetByIdAsync(id);
            return item == null ? null : Map(item);
        }

        public async Task<MedicineResponse> CreateAsync(CreateMedicineRequest request)
        {
            await ValidateBusinessRulesForDuplicatesAsync(request.FullName, request.Brand);

            var newMed = new Medicine
            {
                FullName = request.FullName!.Trim(),
                Brand = request.Brand!.Trim(),
                Quantity = request.Quantity,
                Price = request.Price,
                ExpiryDate = request.ExpiryDate,
                Notes = request.Notes
            };

            var created = await _repo.AddAsync(newMed);
            _logger.LogInformation("Created medicine {Id} - {Name} ({Brand})", created.Id, created.FullName, created.Brand);
            return Map(created);
        }

        public async Task<MedicineResponse?> UpdateAsync(int id, UpdateMedicineRequest request)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) return null;

            // Duplicate check excluding current record
            var all = await _repo.GetAllAsync();
            var duplicate = all.Any(m => m.Id != id
                && string.Equals(m.FullName?.Trim(), request.FullName?.Trim(), StringComparison.OrdinalIgnoreCase)
                && string.Equals(m.Brand?.Trim(), request.Brand?.Trim(), StringComparison.OrdinalIgnoreCase));

            if (duplicate)
            {
                throw new DuplicateMedicineException("Medicine with same name and brand already exists.");
            }

            existing.FullName = request.FullName!.Trim();
            existing.Brand = request.Brand!.Trim();
            existing.Quantity = request.Quantity;
            existing.Price = request.Price;
            existing.ExpiryDate = request.ExpiryDate;
            existing.Notes = request.Notes;

            var updated = await _repo.UpdateAsync(existing);
            _logger.LogInformation("Updated medicine {Id}", id);
            return updated == null ? null : Map(updated);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var deleted = await _repo.DeleteAsync(id);
            if (deleted)
                _logger.LogInformation("Deleted medicine {Id}", id);
            return deleted;
        }

        private async Task ValidateBusinessRulesForDuplicatesAsync(string name, string brand)
        {
            var trimmedName = name?.Trim() ?? string.Empty;
            var trimmedBrand = brand?.Trim() ?? string.Empty;

            var all = await _repo.GetAllAsync();
            var exists = all.Any(m => string.Equals(m.FullName?.Trim(), trimmedName, StringComparison.OrdinalIgnoreCase)
                && string.Equals(m.Brand?.Trim(), trimmedBrand, StringComparison.OrdinalIgnoreCase));

            if (exists)
                throw new DuplicateMedicineException("Medicine with same name and brand already exists.");
        }

        private static MedicineResponse Map(Medicine m) => new MedicineResponse
        {
            Id = m.Id,
            FullName = m.FullName,
            Brand = m.Brand,
            Quantity = m.Quantity,
            Price = m.Price,
            ExpiryDate = m.ExpiryDate,
            Notes = m.Notes
        };
    }
}
