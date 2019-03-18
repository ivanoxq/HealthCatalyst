using System;
using System.Collections.Generic;

namespace HealthCatalyst.Data.Models.SQLite
{
    public partial class PatientDescriptions
    {
        public string Id { get; set; }
        public string PatientInfoId { get; set; }
        public string Interest { get; set; }
        public string Charateristics { get; set; }

        public virtual PatientInfo PatientInfo { get; set; }
    }
}
