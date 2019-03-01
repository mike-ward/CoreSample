using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;

namespace App.Controllers
{
  [ApiController]
  [Route("api/[controller]/[action]")]
  public class MarketsController : ControllerBase
  {
    public ActionResult News() => Get("https://api.iextrading.com/1.0/stock/aapl/news");

    [ActionName("most-active")]
    public ActionResult MostActive() => Get("https://api.iextrading.com/1.0/stock/market/list/mostactive");

    public ActionResult Gainers() => Get("https://api.iextrading.com/1.0/stock/market/list/gainers");

    public ActionResult Losers() => Get("https://api.iextrading.com/1.0/stock/market/list/losers");

    public ActionResult Symbols() => Get("https://api.iextrading.com/1.0/ref-data/symbols");

    private static ContentResult Get(string url)
    {
      using (var client = new WebClient())
      {
        var data = client.DownloadString(new Uri(url));
        if (data is null) throw new InvalidProgramException("oops");
        return new ContentResult { Content = data, ContentType = "application/json" };
      }
    }
  }
}