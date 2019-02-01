using System;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using App.Infrastructure.Validatation;

namespace App.Infrastructure.Cryptography
{
    public class Crypto
    {
        public static string HashPassword(string password, Guid salt)
        {
            Require.ArgumentNotNullEmpty(password, nameof(password));
            Require.True(() => salt != Guid.Empty, nameof(salt));

            using (var md5 = MD5.Create())
            {
                var bytes = md5.ComputeHash(Encoding.UTF8.GetBytes(password + salt));
                return string.Join(null, bytes.Select(b => b.ToString("x2", CultureInfo.InvariantCulture)));
            }
        }
    }
}