using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Linq;
using HealthCatalyst.Core.Extensions;

namespace HealthCatalyst.Core
{
    public class Patient
    {
        private Data.Repositories.IPatient _patientRepo;

        public Patient()
        {
            _patientRepo = new Data.Repositories.SQLite.Patient();
        }

        public Patient(Data.Repositories.IPatient patientRepo)
        {
            _patientRepo = patientRepo;
        }

        public void InsertPatient(DAO.Patient patient)
        {
            Exceptions.ValidationException valErr = new Exceptions.ValidationException();

            if (string.IsNullOrWhiteSpace(patient.FirstName) || string.IsNullOrWhiteSpace(patient.LastName))
            {
                valErr.ValidationErrors.Add("First or Last name must be populated.");
            }

            if (!Regex.IsMatch(patient.DOB, @"^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$")
                && !Regex.IsMatch(patient.DOB, @"^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$")
                && !Regex.IsMatch(patient.DOB, @"^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$"))
            {
                valErr.ValidationErrors.Add("Date Of Birth is incorrectly formatted.");
            }

            if (patient.Age < 18)
            {
                valErr.ValidationErrors.Add("You are under Age, so you cannot register on this site.");
            }

            if (string.IsNullOrWhiteSpace(patient.Communication.Address)
                || string.IsNullOrWhiteSpace(patient.Communication.Zip)
                || string.IsNullOrWhiteSpace(patient.Communication.Country))
            {
                valErr.ValidationErrors.Add("A complete address must be filled out.");
            }

            if (!Regex.IsMatch(patient.Communication.Email, @"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*"
                                                            + "@"
                                                            + @"((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$"))
            {
                valErr.ValidationErrors.Add("Email is incorrectly formatted.");
            }

            if (!Regex.IsMatch(patient.Communication.Phone, @"^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"))
            {
                valErr.ValidationErrors.Add("Phone is incorrectly formatted.");
            }

            if (!patient.Image.ImageCodeBase64.IsBase64())
            {
                valErr.ValidationErrors.Add("Picture stream is not coded in Base64.");
            }

            if (valErr.ValidationErrors.Count > 0)
            {
                throw valErr;
            }

            _patientRepo.InsertPatient(patient.DataObject);
        }

        public IList<DAO.Patient> SearchPatient(DAO.SearchCriteria search)
        {
            if (!string.IsNullOrWhiteSpace(search.SearchPattern))
            {
                var patients = _patientRepo.SearchPatient(new Data.DAO.SearchCriteria
                {
                    SearchPattern = search.SearchPattern
                });

                return patients?.Select(p => new DAO.Patient(p)).ToList();
            }

            return null;
        }
    }
}
