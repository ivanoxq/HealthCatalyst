using System;
using System.Collections.Generic;
using System.Text;
using HealthCatalyst.Data.DAO;
using HealthCatalyst.Data.Models.SQLite;
using HealthCatalyst.Data.Common;
using System.Linq;
using NinjaNye.SearchExtensions;

namespace HealthCatalyst.Data.Repositories.SQLite
{
    public class Patient : IPatient
    {
        public void InsertPatient(DAO.Patient patient)
        {
            HealthDataContext db = new HealthDataContext();

            var patientInfo = new PatientInfo
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                Gender = patient.Gender,
                Age = patient.Age,
                Dob = patient.DOB,
            };

            var patientCommunication = new PatientCommunication
            {
                Id = Guid.NewGuid().ToString(),
                Address = patient.Communication.Address,
                Zip = patient.Communication.Zip,
                Country = patient.Communication.Country,
                Email = patient.Communication.Email,
                Phone = patient.Communication.Phone,
                PatientInfoId = patientInfo.Id
            };

            var patientImage = new PatientImages
            {
                Id = Guid.NewGuid().ToString(),
                Image = Convert.FromBase64String(patient.Image.ImageCodeBase64),
                PatientInfoId = patientInfo.Id
            };

            var patientDesc = new PatientDescriptions
            {
                Id = Guid.NewGuid().ToString(),
                Interest = patient.Description.Interest,
                Charateristics = patient.Description.Charateristics,
                PatientInfoId = patientInfo.Id
            };

            db.PatientInfo.Add(patientInfo);
            db.PatientCommunication.Add(patientCommunication);
            db.PatientImages.Add(patientImage);
            db.PatientDescriptions.Add(patientDesc);

            db.SaveChanges();
        }

        public IList<DAO.Patient> SearchPatient(SearchCriteria search)
        {
            HealthDataContext db = new HealthDataContext();

            return db.PatientInfo.AsStringComparison(StringComparison.OrdinalIgnoreCase)
                                  .Search(x => x.FirstName,
                                          x => x.LastName)
                                          .Containing(search.SearchPattern)
                                          .Select(p => new DAO.Patient
                                          {
                                              FirstName = p.FirstName,
                                              LastName = p.LastName,
                                              Gender = p.Gender,
                                              DOB = p.Dob,
                                              Age = p.Age,
                                              Image = new Image
                                              {
                                                  ImageCodeBase64 = Convert.ToBase64String(p.PatientImages.Image)
                                              },
                                              Communication = new Communication
                                              {
                                                  Address = p.PatientCommunication.Address,
                                                  Zip = p.PatientCommunication.Zip,
                                                  Country = p.PatientCommunication.Country,
                                                  Email = p.PatientCommunication.Email,
                                                  Phone = p.PatientCommunication.Phone
                                              },
                                              Description = new Description
                                              {
                                                  Interest = p.PatientDescriptions.Interest,
                                                  Charateristics = p.PatientDescriptions.Charateristics
                                              }
                                          }).ToList();
        }
    }
}
