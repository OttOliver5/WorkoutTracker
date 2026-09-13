using Microsoft.AspNetCore.Mvc;
using WorkoutTracker.Data;
using WorkoutTracker.Models;

namespace WorkoutTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutSetsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public WorkoutSetsController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET: api/WorkoutSets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutSet>> GetWorkoutSet(int id)
        {
            var workoutSet = await _context.WorkoutSets.FindAsync(id);

            if (workoutSet == null)
            {
                return NotFound();
            }

            return workoutSet;
        }

        // POST: api/WorkoutSets
        [HttpPost]
        public async Task<ActionResult<WorkoutSet>> PostWorkoutSet(WorkoutSet workoutSet)
        {
            _context.WorkoutSets.Add(workoutSet);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWorkoutSet), new { id = workoutSet.Id }, workoutSet);
        }

        // DELETE: api/WorkoutSets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkoutSet(int id)
        {
            var workoutSet = await _context.WorkoutSets.FindAsync(id);

            if (workoutSet == null)
            {
                return NotFound();
            }

            _context.WorkoutSets.Remove(workoutSet);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
