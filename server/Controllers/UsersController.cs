using Microsoft.AspNetCore.Mvc;
using UserManagement.DTOs;
using UserManagement.Services;

namespace UserManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_userService.GetAll());

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var user = _userService.GetById(id);
            return user != null ? Ok(user) : NotFound();
        }

        [HttpPost]
        public IActionResult Create([FromBody] UserCreateUpdateDto userDto)
        {
            var createdUser = _userService.Create(userDto);
            return CreatedAtAction(nameof(GetById), new { id = createdUser.Id }, createdUser);
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, [FromBody] UserCreateUpdateDto userDto)
        {
            var updatedUser = _userService.Update(id, userDto);
            return updatedUser != null ? Ok(updatedUser) : NotFound();
        }

        [HttpPatch("{id}/toggle-status")]
        public IActionResult ToggleStatus(Guid id)
        {
            return _userService.ToggleStatus(id) ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            return _userService.Delete(id) ? NoContent() : NotFound();
        }
    }
}