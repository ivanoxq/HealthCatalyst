using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace HealthCatalyst.Core.Exceptions
{
    public class ValidationException : Exception
    {
        internal List<string> ValidationErrors { get; set; } = new List<string>();

        public override string Message
        {
            get
            {
                StringBuilder sb = new StringBuilder();
                
                if (ValidationErrors.Count > 0)
                {
                    sb.Append("Validation Errors:\n");
                    sb.Append(ValidationErrors.Aggregate((p, q) => String.Format("\n{0}\n{1}", p, q)));

                    return sb.ToString();
                }

                return null;
            }
        }
    }
}
