using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;

namespace HealthCatalyst.Test
{
    [TestClass]
    public class PatientTests
    {
        Mock<Data.Repositories.IPatient> mock;

        [TestInitialize]
        public void Setup()
        {
            var patient = new Data.DAO.Patient
            {
                Communication = new Data.DAO.Communication(),
                Description = new Data.DAO.Description(),
                Image = new Data.DAO.Image()
            };

            mock = new Mock<Data.Repositories.IPatient>();
            mock.Setup(p => p.InsertPatient(It.IsAny<Data.DAO.Patient>()));
            mock.Setup(p => p.SearchPatient(It.IsAny<Data.DAO.SearchCriteria>())).Returns(new List<Data.DAO.Patient>() { patient });
        }

        [TestMethod]
        public void FirstOrLastNameEmptied()
        {

            var patient = new Core.DAO.Patient
            {
                FirstName = "Test1",
                LastName = "",
                Age = 20,
                DOB = "12/13/2008",
                Gender = "M",
                Communication = new Core.DAO.Communication
                {
                    Address = "1056 NW 34 St",
                    Country = "USA",
                    Zip = "33321",
                    Phone = "3056783432",
                    Email = "tst@me.com"
                },
                Description = new Core.DAO.Description
                {
                    Interest = "",
                    Charateristics = ""
                },
                Image = new Core.DAO.Image
                {
                    ImageCodeBase64 = "fw+YcMuJih0o5nnkDGaZhg=="
                }
            };
            var ex = Assert.ThrowsException<Core.Exceptions.ValidationException>(() => new Core.Patient(mock.Object).InsertPatient(patient));

            Assert.IsTrue(ex.Message.Contains("First or Last name must be populated."));

            mock.VerifyNoOtherCalls();
        }

        [TestMethod]
        public void DOBIncorrect()
        {
            var patient = new Core.DAO.Patient
            {
                FirstName = "Test1",
                LastName = "Test2",
                Age = 20,
                DOB = "12/13/2",
                Gender = "M",
                Communication = new Core.DAO.Communication
                {
                    Address = "1056 NW 34 St",
                    Country = "USA",
                    Zip = "33321",
                    Phone = "3056783432",
                    Email = "tst@me.com"
                },
                Description = new Core.DAO.Description
                {
                    Interest = "",
                    Charateristics = ""
                },
                Image = new Core.DAO.Image
                {
                    ImageCodeBase64 = "fw+YcMuJih0o5nnkDGaZhg=="
                }
            };
            var ex = Assert.ThrowsException<Core.Exceptions.ValidationException>(() => new Core.Patient(mock.Object).InsertPatient(patient));

            Assert.IsTrue(ex.Message.Contains("Date Of Birth is incorrectly formatted."));

            mock.VerifyNoOtherCalls();

        }

        [TestMethod]
        public void InvalidAge()
        {
            var patient = new Core.DAO.Patient
            {
                FirstName = "Test1",
                LastName = "Test2",
                Age = 17,
                DOB = "12/13/2008",
                Gender = "M",
                Communication = new Core.DAO.Communication
                {
                    Address = "1056 NW 34 St",
                    Country = "USA",
                    Zip = "33321",
                    Phone = "3056783432",
                    Email = "tst@me.com"
                },
                Description = new Core.DAO.Description
                {
                    Interest = "",
                    Charateristics = ""
                },
                Image = new Core.DAO.Image
                {
                    ImageCodeBase64 = "fw+YcMuJih0o5nnkDGaZhg=="
                }
            };
            var ex = Assert.ThrowsException<Core.Exceptions.ValidationException>(() => new Core.Patient(mock.Object).InsertPatient(patient));

            Assert.IsTrue(ex.Message.Contains("You are under Age, so you cannot register on this site."));

            mock.VerifyNoOtherCalls();
        }

        [TestMethod]
        public void AddressIsNotFilledOut()
        {
            var patient = new Core.DAO.Patient
            {
                FirstName = "Test1",
                LastName = "Test2",
                Age = 19,
                DOB = "12/13/2008",
                Gender = "M",
                Communication = new Core.DAO.Communication
                {
                    Address = "1056 NW 34 St",
                    Country = "",
                    Zip = "33321",
                    Phone = "3056783432",
                    Email = "tst@me.com"
                },
                Description = new Core.DAO.Description
                {
                    Interest = "",
                    Charateristics = ""
                },
                Image = new Core.DAO.Image
                {
                    ImageCodeBase64 = "fw+YcMuJih0o5nnkDGaZhg=="
                }
            };
            var ex = Assert.ThrowsException<Core.Exceptions.ValidationException>(() => new Core.Patient(mock.Object).InsertPatient(patient));

            Assert.IsTrue(ex.Message.Contains("A complete address must be filled out."));

            mock.VerifyNoOtherCalls();
        }

        [TestMethod]
        public void EmailIsNotFormatted()
        {
            var patient = new Core.DAO.Patient
            {
                FirstName = "Test1",
                LastName = "Test2",
                Age = 19,
                DOB = "12/13/2008",
                Gender = "M",
                Communication = new Core.DAO.Communication
                {
                    Address = "1056 NW 34 St",
                    Country = "",
                    Zip = "33321",
                    Phone = "3056783432",
                    Email = "tst@me"
                },
                Description = new Core.DAO.Description
                {
                    Interest = "",
                    Charateristics = ""
                },
                Image = new Core.DAO.Image
                {
                    ImageCodeBase64 = "fw+YcMuJih0o5nnkDGaZhg=="
                }
            };
            var ex = Assert.ThrowsException<Core.Exceptions.ValidationException>(() => new Core.Patient(mock.Object).InsertPatient(patient));

            Assert.IsTrue(ex.Message.Contains("Email is incorrectly formatted."));

            mock.VerifyNoOtherCalls();
        }

        [TestMethod]
        public void PhoneIsNotFormatted()
        {
            var patient = new Core.DAO.Patient
            {
                FirstName = "Test1",
                LastName = "Test2",
                Age = 19,
                DOB = "12/13/2008",
                Gender = "M",
                Communication = new Core.DAO.Communication
                {
                    Address = "1056 NW 34 St",
                    Country = "",
                    Zip = "33321",
                    Phone = "3056783432Zd",
                    Email = "tst@me.com"
                },
                Description = new Core.DAO.Description
                {
                    Interest = "",
                    Charateristics = ""
                },
                Image = new Core.DAO.Image
                {
                    ImageCodeBase64 = "fw+YcMuJih0o5nnkDGaZhg=="
                }
            };
            var ex = Assert.ThrowsException<Core.Exceptions.ValidationException>(() => new Core.Patient(mock.Object).InsertPatient(patient));

            Assert.IsTrue(ex.Message.Contains("Phone is incorrectly formatted."));

            mock.VerifyNoOtherCalls();
        }

        [TestMethod]
        public void PictureCorrupted()
        {
            var patient = new Core.DAO.Patient
            {
                FirstName = "Test1",
                LastName = "Test2",
                Age = 19,
                DOB = "12/13/2008",
                Gender = "M",
                Communication = new Core.DAO.Communication
                {
                    Address = "1056 NW 34 St",
                    Country = "",
                    Zip = "33321",
                    Phone = "3056783432",
                    Email = "tst@me.com"
                },
                Description = new Core.DAO.Description
                {
                    Interest = "",
                    Charateristics = ""
                },
                Image = new Core.DAO.Image
                {
                    ImageCodeBase64 = "fw+YcMuJih0o5nnkGaZhg=="
                }
            };
            var ex = Assert.ThrowsException<Core.Exceptions.ValidationException>(() => new Core.Patient(mock.Object).InsertPatient(patient));

            Assert.IsTrue(ex.Message.Contains("Picture stream is not coded in Base64."));

            mock.VerifyNoOtherCalls();
        }

        [TestMethod]
        public void SearchPatternEmptied()
        {
            Assert.IsNull(new Core.Patient(mock.Object).SearchPatient(new Core.DAO.SearchCriteria
            {
                SearchPattern = ""
            }));

            mock.VerifyNoOtherCalls();
        }

        [TestMethod]
        public void InsertPatientSuccessfully()
        {
            var patient = new Core.DAO.Patient
            {
                FirstName = "Test1",
                LastName = "Test2",
                Age = 19,
                DOB = "12/13/2008",
                Gender = "M",
                Communication = new Core.DAO.Communication
                {
                    Address = "1056 NW 34 St",
                    Country = "USA",
                    Zip = "33321",
                    Phone = "3056783432",
                    Email = "tst@me.com"
                },
                Description = new Core.DAO.Description
                {
                    Interest = "",
                    Charateristics = ""
                },
                Image = new Core.DAO.Image
                {
                    ImageCodeBase64 = "fw+YcMuJih0o5nnkDGaZhg=="
                }
            };

            new Core.Patient(mock.Object).InsertPatient(patient);

            mock.Verify(p => p.InsertPatient(It.IsAny<Data.DAO.Patient>()));
        }

        [TestMethod]
        public void SearchReturnPatient()
        {
            var patients = new Core.Patient(mock.Object).SearchPatient(new Core.DAO.SearchCriteria
            {
                SearchPattern = "Test1"
            });

            Assert.AreEqual(1, patients.Count);

            mock.Verify(p => p.SearchPatient(It.IsAny<Data.DAO.SearchCriteria>()));
        }
    }
}
