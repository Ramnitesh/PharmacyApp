using ABCPharmacyAPI.Models;

namespace ABCPharmacyAPI.Repositories
{
    public interface IMedicineRepository
    {
        Task<List<Medicine>> GetAllAsync();
        Task<Medicine?> GetByIdAsync(int id);
        Task<Medicine> AddAsync(Medicine medicine);
        Task<Medicine?> UpdateAsync(Medicine medicine);
        Task<bool> DeleteAsync(int id);
    }
}
