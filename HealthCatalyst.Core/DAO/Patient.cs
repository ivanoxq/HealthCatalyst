using System;
using System.Collections.Generic;
using System.Text;

namespace HealthCatalyst.Core.DAO
{
    public class Patient
    {
        public Patient()
        {

        }

        internal Patient(Data.DAO.Patient patient)
        {
            this.FirstName = patient.FirstName;
            this.LastName = patient.LastName;
            this.Gender = patient.Gender;
            this.DOB = patient.DOB;
            this.Age = patient.Age;

            this.Communication = new Communication();
            this.Communication.Address = patient.Communication.Address;
            this.Communication.Zip = patient.Communication.Zip;
            this.Communication.Country = patient.Communication.Country;
            this.Communication.Email = patient.Communication.Email;
            this.Communication.Phone = patient.Communication.Phone;

            this.Description = new Description();
            this.Description.Interest = patient.Description.Interest;
            this.Description.Charateristics = patient.Description.Charateristics;

            this.Image = new Image();
            this.Image.ImageCodeBase64 = patient.Image.ImageCodeBase64;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string DOB { get; set; }
        public long Age { get; set; }
        public Communication Communication { get; set; }
        public Description Description { get; set; }
        public Image Image { get; set; }

        internal Data.DAO.Patient DataObject
        {
            get
            {
                return new Data.DAO.Patient
                {
                    FirstName = this.FirstName,
                    LastName = this.LastName,
                    Gender = this.Gender,
                    DOB = this.DOB,
                    Age = this.Age,
                    Communication = new Data.DAO.Communication
                    {
                        Address = this.Communication.Address,
                        Zip = this.Communication.Zip,
                        Country = this.Communication.Country,
                        Email = this.Communication.Email,
                        Phone = this.Communication.Phone
                    },
                    Image = new Data.DAO.Image
                    {
                        ImageCodeBase64 = this.Image.ImageCodeBase64
                    },
                    Description = new Data.DAO.Description
                    {
                        Interest = this.Description.Interest,
                        Charateristics = this.Description.Charateristics
                    }
                };
            }

        }
    }
}
