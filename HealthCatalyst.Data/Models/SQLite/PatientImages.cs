using System;
using System.Collections.Generic;

namespace HealthCatalyst.Data.Models.SQLite
{
    public partial class PatientImages
    {
        public string Id { get; set; }
        public string PatientInfoId { get; set; }
        public byte[] Image { get; set; }

        public virtual PatientInfo PatientInfo { get; set; }
    }
}
