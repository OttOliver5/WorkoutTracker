using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkoutTracker.Data;
using WorkoutTracker.Models;

namespace WorkoutTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutLogsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WorkoutLogsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/WorkoutLogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutLog>>> GetWorkoutLogs()
        {
            return await _context.WorkoutLogs
                .Include(w => w.Sets)
                    .ThenInclude(s => s.Exercise)
                .ToListAsync();
        }

        // GET: api/WorkoutLogs/user/1
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<WorkoutLog>>> GetUserWorkoutLogs(int userId)
        {
            return await _context.WorkoutLogs
                .Where(w => w.UserId == userId)
                .Include(w => w.Sets)
                    .ThenInclude(s => s.Exercise)
                .ToListAsync();
        }

        // GET: api/WorkoutLogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutLog>> GetWorkoutLog(int id)
        {
            var workoutLog = await _context.WorkoutLogs
                .Include(w => w.Sets)
                    .ThenInclude(s => s.Exercise)
                .FirstOrDefaultAsync(w => w.Id == id);

            if (workoutLog == null)
            {
                return NotFound();
            }

            return workoutLog;
        }

        // PUT: api/WorkoutLogs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkoutLog(int id, WorkoutLog workoutLog)
        {
            if (id != workoutLog.Id)
            {
                return BadRequest();
            }

            var existingLog = await _context.WorkoutLogs.FindAsync(id);
            if (existingLog == null)
            {
                return NotFound();
            }

            existingLog.Name = workoutLog.Name;
            existingLog.Date = workoutLog.Date;
            existingLog.UserId = workoutLog.UserId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/WorkoutLogs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WorkoutLog>> PostWorkoutLog(WorkoutLog workoutLog)
        {
            _context.WorkoutLogs.Add(workoutLog);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWorkoutLog), new { id = workoutLog.Id }, workoutLog);
        }

        // DELETE: api/WorkoutLogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkoutLog(int id)
        {
            var workoutLog = await _context.WorkoutLogs.FindAsync(id);
            if (workoutLog == null)
            {
                return NotFound();
            }

            _context.WorkoutLogs.Remove(workoutLog);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
