using System.Text.Json.Serialization;
namespace WorkoutTracker.Models
{
    public class WorkoutSet
    {
        public int Id { get; set; }
        public int Reps { get; set; }
        public double Weight { get; set; }


        public int WorkoutLogId { get; set; }
        [JsonIgnore]
        public WorkoutLog? WorkoutLog { get; set; }

        public int ExerciseId { get; set; }
        [JsonIgnore]
        public Exercise? Exercise { get; set; }
    }
}
