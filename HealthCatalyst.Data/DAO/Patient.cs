using System;
using System.Collections.Generic;
using System.Text;

namespace HealthCatalyst.Data.DAO
{
    public class Patient
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string DOB { get; set; }
        public long Age { get; set; }
        public Communication Communication { get; set; }
        public Description Description { get; set; }
        public Image Image { get; set; }
    }
}
