namespace WorkoutTracker.Models
{
    public class WorkoutSet
    {
        public int Id { get; set; }
        public int Reps { get; set; }
        public double Weight { get; set; }


        public int WorkoutLogId { get; set; }
        public WorkoutLog? WorkoutLog { get; set; }

        public int ExerciseId { get; set; }
        public Exercise? Exercise { get; set; }
    }
}
