using System.ComponentModel.DataAnnotations;

namespace ABCPharmacyAPI.DTOs
{
    public class UpdateMedicineRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string FullName { get; set; } = string.Empty!;

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Brand { get; set; } = string.Empty!;

        [Required]
        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        [Range(0.01, 999999.99)]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "Price must have at most two decimal places.")]
        public decimal Price { get; set; }

        [Required]
        public DateTime ExpiryDate { get; set; }

        [StringLength(500)]
        public string Notes { get; set; } = string.Empty!;
    }
}
