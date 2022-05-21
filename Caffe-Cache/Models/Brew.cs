﻿

namespace Caffe_Cache.Models
{
    public class Brew
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string GrindSize { get; set; }
        public int CoffeeWeight { get; set; }
        public int WaterVolume { get; set; }
        public TimeOnly BrewDuration { get; set; }
        public string BrewInstructions { get; set; }
        public string UserId { get; set; }
        public int MachineId { get; set; }
        public int CoffeeId { get; set; }
    }
}
