using ABCPharmacyAPI.DTOs;

namespace ABCPharmacyAPI.Services
{
    public interface IMedicineService
    {
        Task<List<MedicineResponse>> GetAllAsync();
        Task<MedicineResponse?> GetByIdAsync(int id);
        Task<MedicineResponse> CreateAsync(CreateMedicineRequest request);
        Task<MedicineResponse?> UpdateAsync(int id, UpdateMedicineRequest request);
        Task<bool> DeleteAsync(int id);
    }
}
