using System;

namespace App.Infrastructure.Extensions
{
    public static class StringExtensions
    {
        public static bool IsEqualTo(this string left, string right) => string.CompareOrdinal(left, right) == 0;

        public static bool IsNotEqualTo(this string left, string right) => !IsEqualTo(left, right);

        public static bool IsEqualToIgnoreCase(this string left, string right) => string.Compare(left, right, StringComparison.OrdinalIgnoreCase) == 0;

        public static bool IsNotEqualToIgnoreCase(this string left, string right) => !IsEqualToIgnoreCase(left, right);
    }
}