namespace WorkoutTracker.Models
{
    public class WorkoutLog
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }
        public User? User { get; set; }

        public List<WorkoutSet> Sets { get; set; } = new();
    }
}
