using App.Infrastructure.Extensions;
using FluentAssertions;
using Xunit;

namespace Test.Infrastructure.Extensions
{
    public class StringExtensionsTests
    {
        [Fact]
        public void IsEqualToTests()
        {
            "Test".IsEqualTo("Test").Should().BeTrue();
            "Test".IsEqualTo("test").Should().BeFalse();
            "Test".IsEqualTo(null).Should().BeFalse();
        }

        [Fact]
        public void IsEqualToIgnoreCaseTests()
        {
            "Test".IsEqualToIgnoreCase("test").Should().BeTrue();
            "Test".IsEqualToIgnoreCase("testt").Should().BeFalse();
            "Test".IsEqualToIgnoreCase(null).Should().BeFalse();
        }

        [Fact]
        public void IsNotEqualToTests()
        {
            "Test".IsNotEqualTo("Test").Should().BeFalse();
            "Test".IsNotEqualTo("test").Should().BeTrue();
            "Test".IsNotEqualTo(null).Should().BeTrue();
        }

        [Fact]
        public void IsNotEqualToIgnoreTests()
        {
            "Test".IsNotEqualToIgnoreCase("test").Should().BeFalse();
            "Test".IsNotEqualToIgnoreCase("testt").Should().BeTrue();
            "Test".IsNotEqualToIgnoreCase(null).Should().BeTrue();
        }
    }
}
