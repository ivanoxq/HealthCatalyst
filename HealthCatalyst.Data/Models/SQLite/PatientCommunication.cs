using System;
using System.Collections.Generic;

namespace HealthCatalyst.Data.Models.SQLite
{
    public partial class PatientCommunication
    {
        public string Id { get; set; }
        public string PatientInfoId { get; set; }
        public string Address { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public virtual PatientInfo PatientInfo { get; set; }
    }
}
