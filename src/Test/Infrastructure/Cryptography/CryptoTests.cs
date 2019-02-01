using App.Infrastructure.Cryptography;
using FluentAssertions;
using System;
using Xunit;

namespace Test.Infrastructure.Cryptography
{
    public class CryptoTests
    {
        [Fact]
        public void HashPasswordTest()
        {
            var salt = new Guid("{B66D28C8-1960-4DF8-A335-C00BDC42B8F6}");
            Crypto.HashPassword("password", salt).Should().Be("99e2636be81a77b7af9b02567d764ff1");
        }
    }
}
