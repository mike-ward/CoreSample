﻿import stream from 'mithril/stream';
import { IGridModel, IGridFilter } from "../grid-types";
import { gridViewModel } from '../grid-view-model';
import { evalFilter } from '../grid-filter';

test('filter equals', () => {
    expect(evalFilter(f('companyName', '$eq', 'Overstock.com Inc.', false), gvm()().vrows).length).toBe(1);
    expect(evalFilter(f('companyName', '$eq', 'Overstock.com Inc.', true), gvm()().vrows).length).toBe(9);
});

test('filter not equals', () => {
  expect(evalFilter(f('companyName', '$neq', 'Overstock.com Inc.', false), gvm()().vrows).length).toBe(9);
  expect(evalFilter(f('companyName', '$neq', 'Overstock.com Inc.', true), gvm()().vrows).length).toBe(1);
});

test('filter less than', () => {
  expect(evalFilter(f('latestPrice', '$lt', '25', false), gvm()().vrows).length).toBe(7);
  expect(evalFilter(f('latestPrice', '$lt', '25', true), gvm()().vrows).length).toBe(3);
});

test('filter greater than', () => {
  expect(evalFilter(f('latestPrice', '$gt', '25', false), gvm()().vrows).length).toBe(2);
  expect(evalFilter(f('latestPrice', '$gt', '25', true), gvm()().vrows).length).toBe(8);
});

test('filter less than or equal', () => {
  expect(evalFilter(f('latestPrice', '$lte', '25', false), gvm()().vrows).length).toBe(8);
  expect(evalFilter(f('latestPrice', '$lte', '25', true), gvm()().vrows).length).toBe(2);
});

test('filter greater than or equal', () => {
  expect(evalFilter(f('latestPrice', '$gte', '25', false), gvm()().vrows).length).toBe(3);
  expect(evalFilter(f('latestPrice', '$gte', '25', true), gvm()().vrows).length).toBe(7);
});

test('filter starts with', () => {
  expect(evalFilter(f('primaryExchange', '$starts-with', 'NASDAQ', false), gvm()().vrows).length).toBe(9);
  expect(evalFilter(f('primaryExchange', '$starts-with', 'nAsDAq', false), gvm()().vrows).length).toBe(9);
  expect(evalFilter(f('primaryExchange', '$starts-with', 'NASDAQ', true), gvm()().vrows).length).toBe(1);
  expect(evalFilter(f('primaryExchange', '$starts-with', 'XASDAQ', false), gvm()().vrows).length).toBe(0);
});

test('filter ends with', () => {
  expect(evalFilter(f('primaryExchange', '$ends-with', 'Market', false), gvm()().vrows).length).toBe(2);
  expect(evalFilter(f('primaryExchange', '$ends-with', 'market', false), gvm()().vrows).length).toBe(2);
  expect(evalFilter(f('primaryExchange', '$ends-with', 'Market', true), gvm()().vrows).length).toBe(8);
  expect(evalFilter(f('primaryExchange', '$ends-with', 'arkets', false), gvm()().vrows).length).toBe(0);
});

function f(field: string, operator: string, arg: string, exclude: boolean = false) {
    return {
        field: field,
        operator: operator,
        arg: arg,
        exclude: exclude
    } as IGridFilter;
}

function gvm() {
    const columns = JSON.parse(`[
  {
    "id": "symbol",
    "name": "Symbol",
    "css": null,
    "sortEnable": true,
    "cellRenderer": null
  },
  {
    "id": "companyName",
    "name": "Company Name",
    "css": null,
    "sortEnable": true,
    "cellRenderer": null
  },
  {
    "id": "primaryExchange",
    "name": "Primary Exchange",
    "css": null,
    "sortEnable": true,
    "cellRenderer": null
  },
  {
    "id": "sector",
    "name": "Sector",
    "css": null,
    "sortEnable": true,
    "cellRenderer": null
  },
  {
    "id": "latestPrice",
    "name": "Latest Price",
    "css": {
      "text-align": "right"
    },
    "sortEnable": true
  },
  {
    "id": "open",
    "name": "Open",
    "css": {
      "text-align": "right"
    },
    "sortEnable": true
  },
  {
    "id": "close",
    "name": "Close",
    "css": {
      "text-align": "right"
    },
    "sortEnable": true
  },
  {
    "id": "high",
    "name": "High",
    "css": {
      "text-align": "right"
    },
    "sortEnable": true
  },
  {
    "id": "low",
    "name": "Low",
    "css": {
      "text-align": "right"
    },
    "sortEnable": true
  },
  {
    "id": "week52High",
    "name": "Week52 High",
    "css": {
      "text-align": "right"
    },
    "sortEnable": true
  },
  {
    "id": "week52Low",
    "name": "Week52 Low",
    "css": {
      "text-align": "right"
    },
    "sortEnable": true
  }
]`);

    const rows = JSON.parse(`[
  {
    "symbol": "WINS",
    "companyName": "Wins Finance Holdings Inc.",
    "primaryExchange": "NASDAQ Capital Market",
    "sector": "Financial Services",
    "calculationPrice": "close",
    "open": 25.2,
    "openTime": 1548426600676,
    "close": 25,
    "closeTime": 1548450000699,
    "high": 25.5,
    "low": 24.25,
    "latestPrice": 25,
    "latestSource": "Close",
    "latestTime": "January 25, 2019",
    "latestUpdate": 1548450000699,
    "latestVolume": 2368,
    "iexRealtimePrice": null,
    "iexRealtimeSize": null,
    "iexLastUpdated": null,
    "delayedPrice": 25,
    "delayedPriceTime": 1548450000699,
    "extendedPrice": 27.75,
    "extendedChange": 2.75,
    "extendedChangePercent": 0.11,
    "extendedPriceTime": 1547848085332,
    "previousClose": 24.8842,
    "change": 0.1158,
    "changePercent": 0.00465,
    "iexMarketPercent": null,
    "iexVolume": null,
    "avgTotalVolume": 4485,
    "iexBidPrice": null,
    "iexBidSize": null,
    "iexAskPrice": null,
    "iexAskSize": null,
    "marketCap": 495941050,
    "peRatio": null,
    "week52High": 165,
    "week52Low": 20.98,
    "ytdChange": 0.13946615978211524
  },
  {
    "symbol": "SRRK",
    "companyName": "Scholar Rock Holding Corporation",
    "primaryExchange": "Nasdaq Global Select",
    "sector": "Healthcare",
    "calculationPrice": "close",
    "open": 14.5,
    "openTime": 1548426600422,
    "close": 16.59,
    "closeTime": 1548450000289,
    "high": 16.61,
    "low": 14.5,
    "latestPrice": 16.59,
    "latestSource": "Close",
    "latestTime": "January 25, 2019",
    "latestUpdate": 1548450000289,
    "latestVolume": 154170,
    "iexRealtimePrice": null,
    "iexRealtimeSize": null,
    "iexLastUpdated": null,
    "delayedPrice": 16.59,
    "delayedPriceTime": 1548450000289,
    "extendedPrice": 16.59,
    "extendedChange": 0,
    "extendedChangePercent": 0,
    "extendedPriceTime": 1548451202224,
    "previousClose": 14.24,
    "change": 2.35,
    "changePercent": 0.16503,
    "iexMarketPercent": null,
    "iexVolume": null,
    "avgTotalVolume": 85474,
    "iexBidPrice": null,
    "iexBidSize": null,
    "iexAskPrice": null,
    "iexAskSize": null,
    "marketCap": 434951660,
    "peRatio": null,
    "week52High": 29.9999,
    "week52Low": 13.09,
    "ytdChange": -0.0669144444444445
  },
  {
    "symbol": "OSTK",
    "companyName": "Overstock.com Inc.",
    "primaryExchange": "NASDAQ Global Market",
    "sector": "Consumer Cyclical",
    "calculationPrice": "close",
    "open": 16.27,
    "openTime": 1548426600668,
    "close": 18.38,
    "closeTime": 1548450000460,
    "high": 19.52,
    "low": 15.61,
    "latestPrice": 18.38,
    "latestSource": "Close",
    "latestTime": "January 25, 2019",
    "latestUpdate": 1548450000460,
    "latestVolume": 10137229,
    "iexRealtimePrice": null,
    "iexRealtimeSize": null,
    "iexLastUpdated": null,
    "delayedPrice": 18.38,
    "delayedPriceTime": 1548450000460,
    "extendedPrice": 18.45,
    "extendedChange": 0.07,
    "extendedChangePercent": 0.00381,
    "extendedPriceTime": 1548453588305,
    "previousClose": 15.81,
    "change": 2.57,
    "changePercent": 0.16256,
    "iexMarketPercent": null,
    "iexVolume": null,
    "avgTotalVolume": 2317865,
    "iexBidPrice": null,
    "iexBidSize": null,
    "iexAskPrice": null,
    "iexAskSize": null,
    "marketCap": 590844675,
    "peRatio": -2.24,
    "week52High": 80.4,
    "week52Low": 12.33,
    "ytdChange": 0.4633384854918612
  },
  {
    "symbol": "AGYS",
    "companyName": "Agilysys Inc.",
    "primaryExchange": "Nasdaq Global Select",
    "sector": "Technology",
    "calculationPrice": "close",
    "open": 15,
    "openTime": 1548426600583,
    "close": 16.42,
    "closeTime": 1548450000433,
    "high": 16.7,
    "low": 15,
    "latestPrice": 16.42,
    "latestSource": "Close",
    "latestTime": "January 25, 2019",
    "latestUpdate": 1548450000433,
    "latestVolume": 306824,
    "iexRealtimePrice": null,
    "iexRealtimeSize": null,
    "iexLastUpdated": null,
    "delayedPrice": 16.42,
    "delayedPriceTime": 1548450000433,
    "extendedPrice": 16.42,
    "extendedChange": 0,
    "extendedChangePercent": 0,
    "extendedPriceTime": 1548450004593,
    "previousClose": 14.14,
    "change": 2.28,
    "changePercent": 0.16124,
    "iexMarketPercent": null,
    "iexVolume": null,
    "avgTotalVolume": 72022,
    "iexBidPrice": null,
    "iexBidSize": null,
    "iexAskPrice": null,
    "iexAskSize": null,
    "marketCap": 386334867,
    "peRatio": null,
    "week52High": 17.52,
    "week52Low": 10.77,
    "ytdChange": 0.2936537931034484
  },
  {
    "symbol": "OSIS",
    "companyName": "OSI Systems Inc.",
    "primaryExchange": "Nasdaq Global Select",
    "sector": "Technology",
    "calculationPrice": "close",
    "open": 84.5,
    "openTime": 1548426600702,
    "close": 86.06,
    "closeTime": 1548450000318,
    "high": 86.76,
    "low": 81.46,
    "latestPrice": 86.06,
    "latestSource": "Close",
    "latestTime": "January 25, 2019",
    "latestUpdate": 1548450000318,
    "latestVolume": 1041338,
    "iexRealtimePrice": null,
    "iexRealtimeSize": null,
    "iexLastUpdated": null,
    "delayedPrice": 86.06,
    "delayedPriceTime": 1548450000318,
    "extendedPrice": 86.04,
    "extendedChange": -0.02,
    "extendedChangePercent": -0.00023,
    "extendedPriceTime": 1548452164376,
    "previousClose": 75.84,
    "change": 10.22,
    "changePercent": 0.13476,
    "iexMarketPercent": null,
    "iexVolume": null,
    "avgTotalVolume": 173588,
    "iexBidPrice": null,
    "iexBidSize": null,
    "iexAskPrice": null,
    "iexAskSize": null,
    "marketCap": 1562257765,
    "peRatio": 23.64,
    "week52High": 86.76,
    "week52Low": 50.5,
    "ytdChange": 0.3317001947148817
  },
  {
    "symbol": "OPI",
    "companyName": "Office Properties Income Trust",
    "primaryExchange": "Nasdaq Global Select",
    "sector": "Real Estate",
    "calculationPrice": "close",
    "open": 31,
    "openTime": 1548426600157,
    "close": 31.73,
    "closeTime": 1548450000259,
    "high": 31.77,
    "low": 30.7,
    "latestPrice": 31.73,
    "latestSource": "Close",
    "latestTime": "January 25, 2019",
    "latestUpdate": 1548450000259,
    "latestVolume": 453846,
    "iexRealtimePrice": null,
    "iexRealtimeSize": null,
    "iexLastUpdated": null,
    "delayedPrice": 31.73,
    "delayedPriceTime": 1548450000259,
    "extendedPrice": 31.73,
    "extendedChange": 0,
    "extendedChangePercent": 0,
    "extendedPriceTime": 1548452461000,
    "previousClose": 31.16,
    "change": 0.57,
    "changePercent": 0.01829,
    "iexMarketPercent": null,
    "iexVolume": null,
    "avgTotalVolume": 799620,
    "iexBidPrice": null,
    "iexBidSize": null,
    "iexAskPrice": null,
    "iexAskSize": null,
    "marketCap": 49184070,
    "peRatio": 3.78,
    "week52High": 72.04,
    "week52Low": 25.05,
    "ytdChange": 0.20629685921388616
  },
  {
    "symbol": "IIJI",
    "companyName": "Internet Initiative Japan Inc.",
    "primaryExchange": "Nasdaq Global Select",
    "sector": "Technology",
    "calculationPrice": "close",
    "open": 11.78,
    "openTime": 1548426600631,
    "close": 11.8056,
    "closeTime": 1548450000372,
    "high": 11.806,
    "low": 11.47,
    "latestPrice": 11.8056,
    "latestSource": "Close",
    "latestTime": "January 25, 2019",
    "latestUpdate": 1548450000372,
    "latestVolume": 2466,
    "iexRealtimePrice": null,
    "iexRealtimeSize": null,
    "iexLastUpdated": null,
    "delayedPrice": 11.78,
    "delayedPriceTime": 1548450000372,
    "extendedPrice": 11.62,
    "extendedChange": -0.1856,
    "extendedChangePercent": -0.01572,
    "extendedPriceTime": 1548167347159,
    "previousClose": 11.55,
    "change": 0.2556,
    "changePercent": 0.02213,
    "iexMarketPercent": null,
    "iexVolume": null,
    "avgTotalVolume": 4112,
    "iexBidPrice": null,
    "iexBidSize": null,
    "iexAskPrice": null,
    "iexAskSize": null,
    "marketCap": 1064168377,
    "peRatio": 22.7,
    "week52High": 12.4299,
    "week52Low": 8.76,
    "ytdChange": 0.05318676855895203
  },
  {
    "symbol": "FPRX",
    "companyName": "Five Prime Therapeutics Inc.",
    "primaryExchange": "Nasdaq Global Select",
    "sector": "Healthcare",
    "calculationPrice": "close",
    "open": 10.43,
    "openTime": 1548426600676,
    "close": 11.64,
    "closeTime": 1548450000499,
    "high": 11.68,
    "low": 10.43,
    "latestPrice": 11.64,
    "latestSource": "Close",
    "latestTime": "January 25, 2019",
    "latestUpdate": 1548450000499,
    "latestVolume": 344390,
    "iexRealtimePrice": null,
    "iexRealtimeSize": null,
    "iexLastUpdated": null,
    "delayedPrice": 11.64,
    "delayedPriceTime": 1548450000499,
    "extendedPrice": 12.14,
    "extendedChange": 0.5,
    "extendedChangePercent": 0.04296,
    "extendedPriceTime": 1548453423764,
    "previousClose": 10.35,
    "change": 1.29,
    "changePercent": 0.12464,
    "iexMarketPercent": null,
    "iexVolume": null,
    "avgTotalVolume": 491770,
    "iexBidPrice": null,
    "iexBidSize": null,
    "iexAskPrice": null,
    "iexAskSize": null,
    "marketCap": 412821004,
    "peRatio": -2.89,
    "week52High": 22.75,
    "week52Low": 7.84,
    "ytdChange": 0.3682297435897437
  },
  {
    "symbol": "IRCP",
    "companyName": "IRSA Propiedades Comerciales S.A.",
    "primaryExchange": "Nasdaq Global Select",
    "sector": "Real Estate",
    "calculationPrice": "close",
    "open": 20.88,
    "openTime": 1548426600432,
    "close": 21.79,
    "closeTime": 1548450000435,
    "high": 21.79,
    "low": 20.515,
    "latestPrice": 21.79,
    "latestSource": "Close",
    "latestTime": "January 25, 2019",
    "latestUpdate": 1548450000435,
    "latestVolume": 6049,
    "iexRealtimePrice": null,
    "iexRealtimeSize": null,
    "iexLastUpdated": null,
    "delayedPrice": 21.45,
    "delayedPriceTime": 1548450000435,
    "extendedPrice": 22.95,
    "extendedChange": 1.16,
    "extendedChangePercent": 0.05324,
    "extendedPriceTime": 1548363630098,
    "previousClose": 21.032,
    "change": 0.758,
    "changePercent": 0.03604,
    "iexMarketPercent": null,
    "iexVolume": null,
    "avgTotalVolume": 31319,
    "iexBidPrice": null,
    "iexBidSize": null,
    "iexAskPrice": null,
    "iexAskSize": null,
    "marketCap": 686461526,
    "peRatio": null,
    "week52High": 56,
    "week52Low": 16.82,
    "ytdChange": 0.2465955555555555
  },
  {
    "symbol": "JKS",
    "companyName": "JinkoSolar Holding Company Limited American Depositary Shares (each representing 4)",
    "primaryExchange": "New York Stock Exchange",
    "sector": "Technology",
    "calculationPrice": "close",
    "open": 13.75,
    "openTime": 1548426600452,
    "close": 15.24,
    "closeTime": 1548450124625,
    "high": 15.725,
    "low": 13.75,
    "latestPrice": 15.24,
    "latestSource": "Close",
    "latestTime": "January 25, 2019",
    "latestUpdate": 1548450124625,
    "latestVolume": 1843996,
    "iexRealtimePrice": null,
    "iexRealtimeSize": null,
    "iexLastUpdated": null,
    "delayedPrice": 15.24,
    "delayedPriceTime": 1548450124625,
    "extendedPrice": 15.22,
    "extendedChange": -0.02,
    "extendedChangePercent": -0.00131,
    "extendedPriceTime": 1548453232643,
    "previousClose": 13.56,
    "change": 1.68,
    "changePercent": 0.12389,
    "iexMarketPercent": null,
    "iexVolume": null,
    "avgTotalVolume": 562342,
    "iexBidPrice": null,
    "iexBidSize": null,
    "iexAskPrice": null,
    "iexAskSize": null,
    "marketCap": 597598256,
    "peRatio": null,
    "week52High": 23.82,
    "week52Low": 7.11,
    "ytdChange": 0.6194739057899903
  }
]`);

    const gridModel: IGridModel = {
        columns: columns,
        rows: rows
    }

    return gridViewModel(stream(gridModel));
    
}