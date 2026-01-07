using System.ComponentModel.DataAnnotations;
namespace UserManagement.DTOs
{
    public class UserCreateUpdateDto
    {
        [Required(ErrorMessage = "Full Name is required")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [RegularExpression("Admin|User", ErrorMessage = "Role must be 'Admin' or 'User'")]
        public string Role { get; set; } = "User";
        
        public bool IsActive { get; set; } = true;
    }
}
