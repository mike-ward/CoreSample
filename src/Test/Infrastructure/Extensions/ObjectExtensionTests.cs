using App.Infrastructure.Extensions;
using FluentAssertions;
using System;
using Xunit;

namespace Test.Infrastructure.Extensions
{
    public class ObjectExtensionTests
    {
        [Theory]
        [InlineData(7e5, "700000")]
        [InlineData(7e-10, "0.0000000007")]
        public void DoubleToStringTests(double value, string expected)
        {
            value.ToStringInvariant().Should().Be(expected);
        }

        [Fact]
        public void DateToStringTest()
        {
            var date = new DateTime(2018, 12, 3, 11, 59, 0, DateTimeKind.Utc);
            date.ToStringInvariant().Should().Be("2018-12-03 11:59:00Z");
        }

        [Fact]
        public void StringToStringTests()
        {
            "Trump".ToStringInvariant().Should().Be("Trump");
            "Mir geht es gut, danke!".Should().Be("Mir geht es gut, danke!");
        }
    }
}
