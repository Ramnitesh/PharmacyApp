using ABCPharmacyAPI.Models;
using System.Text.Json;

namespace ABCPharmacyAPI.Repositories
{
    public class MedicineRepository : IMedicineRepository
    {
        private readonly string _filePath;
        private readonly SemaphoreSlim _semaphore = new SemaphoreSlim(1, 1);
        private readonly ILogger<MedicineRepository> _logger;

        public MedicineRepository(string filePath, ILogger<MedicineRepository> logger)
        {
            _filePath = filePath;
            _logger = logger;
        }

        public async Task<List<Medicine>> GetAllAsync()
        {
            try
            {
                if (!File.Exists(_filePath))
                {
                    return new List<Medicine>();
                }

                var json = await File.ReadAllTextAsync(_filePath);
                if (string.IsNullOrWhiteSpace(json))
                    return new List<Medicine>();

                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var list = JsonSerializer.Deserialize<List<Medicine>>(json, options);
                return list ?? new List<Medicine>();
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Invalid JSON in data file: {File}", _filePath);
                return new List<Medicine>();
            }
        }

        public async Task<Medicine?> GetByIdAsync(int id)
        {
            var list = await GetAllAsync();
            return list.FirstOrDefault(m => m.Id == id);
        }

        public async Task<Medicine> AddAsync(Medicine medicine)
        {
            await _semaphore.WaitAsync();
            try
            {
                var list = await GetAllAsync();
                medicine.Id = list.Count > 0 ? list.Max(m => m.Id) + 1 : 1;
                list.Add(medicine);
                await WriteAllAsync(list);
                return medicine;
            }
            finally
            {
                _semaphore.Release();
            }
        }

        public async Task<Medicine?> UpdateAsync(Medicine medicine)
        {
            await _semaphore.WaitAsync();
            try
            {
                var list = await GetAllAsync();
                var idx = list.FindIndex(m => m.Id == medicine.Id);
                if (idx == -1) return null;
                list[idx] = medicine;
                await WriteAllAsync(list);
                return medicine;
            }
            finally
            {
                _semaphore.Release();
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            await _semaphore.WaitAsync();
            try
            {
                var list = await GetAllAsync();
                var item = list.FirstOrDefault(m => m.Id == id);
                if (item == null) return false;
                list.Remove(item);
                await WriteAllAsync(list);
                return true;
            }
            finally
            {
                _semaphore.Release();
            }
        }

        private async Task WriteAllAsync(List<Medicine> list)
        {
            var dir = Path.GetDirectoryName(_filePath);
            if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }

            var options = new JsonSerializerOptions { WriteIndented = true };
            var json = JsonSerializer.Serialize(list, options);
            await File.WriteAllTextAsync(_filePath, json);
        }
    }
}
