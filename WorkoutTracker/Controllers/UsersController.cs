using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkoutTracker.Data;
using WorkoutTracker.Models;

namespace WorkoutTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Users/register (REGISZTRÁCIÓ)
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
            {
                return BadRequest("A felhasználónév már foglalt!");
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = passwordHash
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Sikeres regisztráció!", userId = user.Id });
        }

        // POST: api/Users/login (BEJELENTKEZÉS)
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);


            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return Unauthorized("Hibás felhasználónév vagy jelszó!");
            }

            return Ok(new { message = "Sikeres bejelentkezés!", userId = user.Id, username = user.Username });
        }

        // PUT: api/Users/change-password
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            var user = await _context.Users.FindAsync(dto.UserId);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            {
                return BadRequest("Hibás jelenlegi jelszó!");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _context.SaveChangesAsync();

            return Ok("Jelszó sikeresen megváltoztatva!");
        }

        // GET: api/Users (Felhasználók listázása)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetUsers()
        {
            return await _context.Users
                .Select(u => new { u.Id, u.Username, u.Email })
                .ToListAsync();
        }
    }
}
