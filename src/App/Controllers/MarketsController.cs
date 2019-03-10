using System;
using System.Net;
using System.Threading.Tasks;
using Carter;
using Microsoft.AspNetCore.Http;

namespace App.Controllers
{
    public class MarketsController : CarterModule
    {
        public MarketsController() : base("api/markets")
        {
            Get("news", async (ctx) => await Api(ctx, "https://api.iextrading.com/1.0/stock/aapl/news"));

            Get("most-active", async (ctx) => await Api(ctx, "https://api.iextrading.com/1.0/stock/market/list/mostactive"));

            Get("gainers", async (ctx) => await Api(ctx, "https://api.iextrading.com/1.0/stock/market/list/gainers"));

            Get("losers", async (ctx) => await Api(ctx, "https://api.iextrading.com/1.0/stock/market/list/losers"));

            Get("symbols", async (ctx) => await Api(ctx, "https://api.iextrading.com/1.0/ref-data/symbols"));
        }

        private static async Task Api(HttpContext ctx, string url)
        {
            using (var client = new WebClient())
            {
                var data = await client.DownloadStringTaskAsync(new Uri(url));
                if (data is null) throw new InvalidProgramException("oops");
                await ctx.Response.WriteAsync(data);
            }
        }
    }
}