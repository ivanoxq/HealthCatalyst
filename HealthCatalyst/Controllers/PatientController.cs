using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HealthCatalyst.Controllers
{
    [ApiController]
    public class PatientController : ControllerBase
    {
        [HttpPost]
        [Route("api/Patient/InsertPatient")]
        public void InsertPatient(Core.DAO.Patient patient)
        {
            new Core.Patient().InsertPatient(patient);
        }

        [HttpPost]
        [Route("api/Patient/SearchPatients")]
        public List<Core.DAO.Patient> SearchPatients(Core.DAO.SearchCriteria search)
        {
           return (List<Core.DAO.Patient>) new Core.Patient().SearchPatient(search);
        }
    }
}
