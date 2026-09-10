using System.Text.Json.Serialization;
namespace WorkoutTracker.Models
{
    public class WorkoutLog
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string Notes { get; set; } = string.Empty;
        public int UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }

        public List<WorkoutSet> Sets { get; set; } = new();
    }
}
