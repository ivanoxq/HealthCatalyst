using System;
using System.Collections.Generic;
using System.Text;

namespace HealthCatalyst.Data.Repositories
{
    public interface IPatient
    {
        void InsertPatient(DAO.Patient patient);
        IList<DAO.Patient> SearchPatient(DAO.SearchCriteria search);
    }
}
