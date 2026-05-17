namespace ABCPharmacyAPI.DTOs
{
    public class MedicineResponse
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty!;
        public string Brand { get; set; } = string.Empty!;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Notes { get; set; } = string.Empty!;
    }
}
