using UserManagement.Models;
using UserManagement.DTOs;

namespace UserManagement.Services
{
    public interface IUserService
    {
        List<User> GetAll();
        User? GetById(Guid id);
        User Create(UserCreateUpdateDto userDto);
        User? Update(Guid id, UserCreateUpdateDto userDto);
        bool ToggleStatus(Guid id);
        bool Delete(Guid id);
    }

    public class UserService : IUserService
    {
        private static readonly List<User> _users = new List<User>();

        public List<User> GetAll() => _users;

        public User? GetById(Guid id) => _users.FirstOrDefault(u => u.Id == id);

        public User Create(UserCreateUpdateDto userDto)
        {
            var newUser = new User
            {
                Id = Guid.NewGuid(),
                FullName = userDto.FullName,
                Email = userDto.Email,
                Role = userDto.Role,
                IsActive = userDto.IsActive
            };
            _users.Add(newUser);
            return newUser;
        }

        public User? Update(Guid id, UserCreateUpdateDto userDto)
        {
            var existingUser = GetById(id);
            if (existingUser == null) return null;
            existingUser.FullName = userDto.FullName;
            existingUser.Email = userDto.Email;
            existingUser.Role = userDto.Role;
            return existingUser;
        }

        public bool ToggleStatus(Guid id)
        {
            var user = GetById(id);
            if (user == null) return false;
            user.IsActive = !user.IsActive;
            return true;
        }

        public bool Delete(Guid id)
        {
            var user = GetById(id);
            if (user == null) return false;
            _users.Remove(user);
            return true;
        }
    }
}
