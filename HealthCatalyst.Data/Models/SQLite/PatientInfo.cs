using System;
using System.Collections.Generic;

namespace HealthCatalyst.Data.Models.SQLite
{
    public partial class PatientInfo
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Dob { get; set; }
        public long Age { get; set; }

        public virtual PatientCommunication PatientCommunication { get; set; }
        public virtual PatientDescriptions PatientDescriptions { get; set; }
        public virtual PatientImages PatientImages { get; set; }
    }
}
