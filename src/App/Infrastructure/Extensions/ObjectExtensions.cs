using System;
using System.Globalization;

namespace App.Infrastructure.Extensions
{
    public static class ObjectExtensions
    {
        public static string ToStringInvariant(this object item)
        {
            // Insure numbers like 7E-06 are expressed as 0.000007
            if (item is double dbl)
            {
                return dbl.ToString("0.###################", CultureInfo.InvariantCulture);
            }

            // Dates are always expressed in universal time format
            if (item is DateTime date)
            {
                return date.ToUniversalTime().ToString("u", CultureInfo.InvariantCulture);
            }

            // Other stuff is just invariant culture
            return Convert.ToString(item, CultureInfo.InvariantCulture);
        }
    }
}