/* ═══════════════════════════════════════════════════════
   MikroTrader v10.3 — Saham back button
   ═══════════════════════════════════════════════════════ */

(() => {
  'use strict';

  // ─── Symbols ─────────────────────────────────────────
  const SYMBOLS = [
    // ── Forex ──
    { symbol: 'EURUSD', name: 'Euro vs US Dollar', cat: 'forex', digits: 5, pip: 0.0001, spread: 1.2, base: 1.08420, vol: 0.00012 },
    { symbol: 'GBPUSD', name: 'British Pound vs US Dollar', cat: 'forex', digits: 5, pip: 0.0001, spread: 1.4, base: 1.26350, vol: 0.00015 },
    { symbol: 'USDJPY', name: 'US Dollar vs Japanese Yen', cat: 'forex', digits: 3, pip: 0.01, spread: 1.1, base: 149.850, vol: 0.018 },
    { symbol: 'AUDUSD', name: 'Australian Dollar vs US Dollar', cat: 'forex', digits: 5, pip: 0.0001, spread: 1.3, base: 0.65280, vol: 0.00014 },
    { symbol: 'USDCAD', name: 'US Dollar vs Canadian Dollar', cat: 'forex', digits: 5, pip: 0.0001, spread: 1.5, base: 1.36120, vol: 0.00013 },
    { symbol: 'USDCHF', name: 'US Dollar vs Swiss Franc', cat: 'forex', digits: 5, pip: 0.0001, spread: 1.4, base: 0.88450, vol: 0.00012 },
    { symbol: 'NZDUSD', name: 'New Zealand Dollar vs US Dollar', cat: 'forex', digits: 5, pip: 0.0001, spread: 1.6, base: 0.59840, vol: 0.00015 },
    { symbol: 'EURGBP', name: 'Euro vs British Pound', cat: 'forex', digits: 5, pip: 0.0001, spread: 1.3, base: 0.85820, vol: 0.00010 },
    { symbol: 'EURJPY', name: 'Euro vs Japanese Yen', cat: 'forex', digits: 3, pip: 0.01, spread: 1.5, base: 162.420, vol: 0.022 },
    { symbol: 'GBPJPY', name: 'British Pound vs Japanese Yen', cat: 'forex', digits: 3, pip: 0.01, spread: 1.8, base: 189.350, vol: 0.028 },
    // ── Crypto ──
    { symbol: 'BTCUSD', name: 'Bitcoin vs US Dollar', cat: 'crypto', digits: 2, pip: 1, spread: 25, base: 67250.00, vol: 85 },
    { symbol: 'ETHUSD', name: 'Ethereum vs US Dollar', cat: 'crypto', digits: 2, pip: 0.1, spread: 3.5, base: 3450.50, vol: 8.5 },
    { symbol: 'XRPUSD', name: 'Ripple vs US Dollar', cat: 'crypto', digits: 4, pip: 0.0001, spread: 0.8, base: 0.6280, vol: 0.004 },
    { symbol: 'SOLUSD', name: 'Solana vs US Dollar', cat: 'crypto', digits: 2, pip: 0.01, spread: 1.2, base: 148.75, vol: 0.45 },
    { symbol: 'BNBUSD', name: 'Binance Coin vs US Dollar', cat: 'crypto', digits: 2, pip: 0.01, spread: 1.5, base: 598.40, vol: 1.2 },
    // ── Indices ──
    { symbol: 'US30', name: 'Dow Jones Industrial Average', cat: 'indices', digits: 1, pip: 1, spread: 2.5, base: 39150.5, vol: 12 },
    { symbol: 'NAS100', name: 'NASDAQ 100', cat: 'indices', digits: 1, pip: 1, spread: 1.8, base: 17850.2, vol: 8 },
    { symbol: 'SPX500', name: 'S&P 500', cat: 'indices', digits: 1, pip: 0.1, spread: 0.6, base: 5220.5, vol: 2.5 },
    { symbol: 'GER40', name: 'DAX 40', cat: 'indices', digits: 1, pip: 1, spread: 1.5, base: 18240.0, vol: 6 },
    { symbol: 'UK100', name: 'FTSE 100', cat: 'indices', digits: 1, pip: 1, spread: 1.5, base: 7945.5, vol: 4 },
    // ── Commodities ──
    { symbol: 'XAUUSD', name: 'Gold vs US Dollar', cat: 'commodities', digits: 2, pip: 0.01, spread: 2.5, base: 2345.80, vol: 0.85 },
    { symbol: 'XAGUSD', name: 'Silver vs US Dollar', cat: 'commodities', digits: 3, pip: 0.001, spread: 2.0, base: 27.850, vol: 0.025 },
    { symbol: 'USOIL', name: 'Crude Oil WTI', cat: 'commodities', digits: 2, pip: 0.01, spread: 3.0, base: 78.45, vol: 0.12 },
    { symbol: 'UKOIL', name: 'Brent Crude Oil', cat: 'commodities', digits: 2, pip: 0.01, spread: 3.0, base: 82.30, vol: 0.11 },
    { symbol: 'NATGAS', name: 'Natural Gas', cat: 'commodities', digits: 3, pip: 0.001, spread: 4.0, base: 2.145, vol: 0.015 },
    // ── US / Global Stocks (CFD) ──
    // Mega-cap Tech
    { symbol: 'AAPL', name: 'Apple Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 228.40, vol: 0.42 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.8, base: 428.75, vol: 0.55 },
    { symbol: 'GOOGL', name: 'Alphabet Inc. Class A', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.6, base: 175.20, vol: 0.38 },
    { symbol: 'GOOG', name: 'Alphabet Inc. Class C', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.6, base: 176.80, vol: 0.38 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 198.65, vol: 0.48 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.5, base: 128.50, vol: 0.72 },
    { symbol: 'META', name: 'Meta Platforms Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.2, base: 572.30, vol: 0.85 },
    { symbol: 'TSLA', name: 'Tesla Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 5.0, base: 248.90, vol: 1.15 },
    { symbol: 'NFLX', name: 'Netflix Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.0, base: 712.45, vol: 1.05 },
    { symbol: 'AMD', name: 'Advanced Micro Devices', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 162.80, vol: 0.68 },
    { symbol: 'INTC', name: 'Intel Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.2, base: 22.45, vol: 0.18 },
    { symbol: 'AVGO', name: 'Broadcom Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.0, base: 178.50, vol: 0.85 },
    { symbol: 'ORCL', name: 'Oracle Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.8, base: 168.20, vol: 0.48 },
    { symbol: 'CRM', name: 'Salesforce Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 312.40, vol: 0.72 },
    { symbol: 'ADBE', name: 'Adobe Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.2, base: 498.60, vol: 0.95 },
    { symbol: 'CSCO', name: 'Cisco Systems Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.8, base: 54.80, vol: 0.14 },
    { symbol: 'IBM', name: 'IBM Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 228.90, vol: 0.42 },
    { symbol: 'QCOM', name: 'Qualcomm Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 168.40, vol: 0.55 },
    { symbol: 'TXN', name: 'Texas Instruments', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 198.20, vol: 0.45 },
    { symbol: 'AMAT', name: 'Applied Materials', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.2, base: 188.50, vol: 0.65 },
    { symbol: 'MU', name: 'Micron Technology', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 98.40, vol: 0.72 },
    { symbol: 'NOW', name: 'ServiceNow Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 5.0, base: 918.00, vol: 1.8 },
    { symbol: 'INTU', name: 'Intuit Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.0, base: 628.50, vol: 1.2 },
    { symbol: 'SHOP', name: 'Shopify Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 82.40, vol: 0.55 },
    { symbol: 'SQ', name: 'Block Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 78.20, vol: 0.48 },
    { symbol: 'PYPL', name: 'PayPal Holdings', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 78.90, vol: 0.42 },
    { symbol: 'UBER', name: 'Uber Technologies', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 72.80, vol: 0.38 },
    { symbol: 'ABNB', name: 'Airbnb Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 138.50, vol: 0.65 },
    { symbol: 'SNAP', name: 'Snap Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 11.85, vol: 0.12 },
    { symbol: 'SPOT', name: 'Spotify Technology', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.5, base: 378.20, vol: 1.1 },
    { symbol: 'PLTR', name: 'Palantir Technologies', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 42.80, vol: 0.55 },
    { symbol: 'SNOW', name: 'Snowflake Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.0, base: 128.40, vol: 0.85 },
    { symbol: 'COIN', name: 'Coinbase Global', cat: 'stocks', digits: 2, pip: 0.01, spread: 5.0, base: 218.60, vol: 1.4 },
    { symbol: 'RBLX', name: 'Roblox Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 48.20, vol: 0.48 },
    { symbol: 'U', name: 'Unity Software', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 22.40, vol: 0.35 },
    { symbol: 'PANW', name: 'Palo Alto Networks', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.0, base: 348.50, vol: 0.95 },
    { symbol: 'CRWD', name: 'CrowdStrike Holdings', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.5, base: 298.40, vol: 1.1 },
    { symbol: 'DDOG', name: 'Datadog Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 128.40, vol: 0.75 },
    { symbol: 'NET', name: 'Cloudflare Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 88.50, vol: 0.55 },
    { symbol: 'ZS', name: 'Zscaler Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 188.20, vol: 0.85 },
    { symbol: 'MDB', name: 'MongoDB Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.0, base: 268.40, vol: 1.0 },
    { symbol: 'TEAM', name: 'Atlassian Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 218.50, vol: 0.85 },
    { symbol: 'WDAY', name: 'Workday Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 248.20, vol: 0.75 },
    { symbol: 'VEEV', name: 'Veeva Systems', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 218.40, vol: 0.72 },
    { symbol: 'TTD', name: 'The Trade Desk', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 118.50, vol: 0.65 },
    { symbol: 'ROKU', name: 'Roku Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 72.40, vol: 0.55 },
    { symbol: 'DKNG', name: 'DraftKings Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 38.80, vol: 0.35 },
    { symbol: 'SOFI', name: 'SoFi Technologies', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 12.40, vol: 0.15 },
    { symbol: 'HOOD', name: 'Robinhood Markets', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 28.50, vol: 0.28 },
    // Finance
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.4, base: 214.60, vol: 0.35 },
    { symbol: 'BAC', name: 'Bank of America', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 42.80, vol: 0.12 },
    { symbol: 'WFC', name: 'Wells Fargo & Co.', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.8, base: 58.40, vol: 0.16 },
    { symbol: 'GS', name: 'Goldman Sachs Group', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.0, base: 518.20, vol: 0.95 },
    { symbol: 'MS', name: 'Morgan Stanley', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 118.40, vol: 0.32 },
    { symbol: 'C', name: 'Citigroup Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.8, base: 68.50, vol: 0.22 },
    { symbol: 'V', name: 'Visa Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 285.40, vol: 0.40 },
    { symbol: 'MA', name: 'Mastercard Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 498.20, vol: 0.75 },
    { symbol: 'AXP', name: 'American Express', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.8, base: 268.40, vol: 0.55 },
    { symbol: 'BLK', name: 'BlackRock Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 5.0, base: 948.00, vol: 1.5 },
    { symbol: 'SCHW', name: 'Charles Schwab Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 72.40, vol: 0.22 },
    { symbol: 'BX', name: 'Blackstone Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 158.20, vol: 0.48 },
    { symbol: 'USB', name: 'U.S. Bancorp', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 48.20, vol: 0.14 },
    { symbol: 'PNC', name: 'PNC Financial Services', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 188.40, vol: 0.42 },
    { symbol: 'TFC', name: 'Truist Financial', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.8, base: 44.80, vol: 0.14 },
    { symbol: 'COF', name: 'Capital One Financial', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 158.20, vol: 0.45 },
    // Consumer / Retail
    { symbol: 'WMT', name: 'Walmart Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.8, base: 82.40, vol: 0.18 },
    { symbol: 'COST', name: 'Costco Wholesale', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.0, base: 898.50, vol: 1.4 },
    { symbol: 'TGT', name: 'Target Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 148.20, vol: 0.42 },
    { symbol: 'HD', name: 'Home Depot Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 398.40, vol: 0.65 },
    { symbol: 'LOW', name: "Lowe's Companies", cat: 'stocks', digits: 2, pip: 0.01, spread: 2.8, base: 258.60, vol: 0.55 },
    { symbol: 'NKE', name: 'Nike Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.2, base: 82.40, vol: 0.28 },
    { symbol: 'SBUX', name: 'Starbucks Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 98.50, vol: 0.28 },
    { symbol: 'MCD', name: "McDonald's Corp.", cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 298.40, vol: 0.42 },
    { symbol: 'KO', name: 'Coca-Cola Co.', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.8, base: 68.45, vol: 0.12 },
    { symbol: 'PEP', name: 'PepsiCo Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 168.20, vol: 0.28 },
    { symbol: 'PG', name: 'Procter & Gamble', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 168.80, vol: 0.25 },
    { symbol: 'UL', name: 'Unilever PLC ADR', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.8, base: 58.40, vol: 0.14 },
    { symbol: 'DIS', name: 'The Walt Disney Co.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.8, base: 98.75, vol: 0.32 },
    { symbol: 'CMCSA', name: 'Comcast Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 42.80, vol: 0.12 },
    { symbol: 'TMUS', name: 'T-Mobile US', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 218.40, vol: 0.42 },
    { symbol: 'VZ', name: 'Verizon Communications', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 42.20, vol: 0.10 },
    { symbol: 'T', name: 'AT&T Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.2, base: 22.40, vol: 0.08 },
    { symbol: 'BKNG', name: 'Booking Holdings', cat: 'stocks', digits: 2, pip: 0.01, spread: 8.0, base: 4280.00, vol: 8.5 },
    { symbol: 'MAR', name: 'Marriott International', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 248.50, vol: 0.55 },
    { symbol: 'HLT', name: 'Hilton Worldwide', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 228.40, vol: 0.55 },
    { symbol: 'YUM', name: 'Yum! Brands', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.2, base: 138.20, vol: 0.32 },
    { symbol: 'CMG', name: 'Chipotle Mexican Grill', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.0, base: 58.40, vol: 0.35 },
    { symbol: 'EL', name: 'Estee Lauder', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 78.40, vol: 0.35 },
    { symbol: 'LULU', name: 'Lululemon Athletica', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 298.50, vol: 0.85 },
    // Healthcare
    { symbol: 'JNJ', name: 'Johnson & Johnson', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 158.40, vol: 0.28 },
    { symbol: 'UNH', name: 'UnitedHealth Group', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.5, base: 548.20, vol: 1.1 },
    { symbol: 'LLY', name: 'Eli Lilly & Co.', cat: 'stocks', digits: 2, pip: 0.01, spread: 5.0, base: 812.40, vol: 1.6 },
    { symbol: 'ABBV', name: 'AbbVie Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 188.50, vol: 0.42 },
    { symbol: 'MRK', name: 'Merck & Co.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.2, base: 112.40, vol: 0.28 },
    { symbol: 'PFE', name: 'Pfizer Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.6, base: 28.90, vol: 0.10 },
    { symbol: 'BMY', name: 'Bristol-Myers Squibb', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.8, base: 52.40, vol: 0.16 },
    { symbol: 'AMGN', name: 'Amgen Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 298.50, vol: 0.65 },
    { symbol: 'GILD', name: 'Gilead Sciences', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.2, base: 88.40, vol: 0.28 },
    { symbol: 'MDT', name: 'Medtronic PLC', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 88.20, vol: 0.22 },
    { symbol: 'ISRG', name: 'Intuitive Surgical', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.5, base: 498.00, vol: 1.2 },
    { symbol: 'CVS', name: 'CVS Health Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 58.40, vol: 0.22 },
    { symbol: 'ABT', name: 'Abbott Laboratories', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.2, base: 118.40, vol: 0.28 },
    { symbol: 'TMO', name: 'Thermo Fisher Scientific', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.5, base: 548.20, vol: 1.1 },
    { symbol: 'DHR', name: 'Danaher Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 248.50, vol: 0.65 },
    { symbol: 'SYK', name: 'Stryker Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 348.20, vol: 0.75 },
    { symbol: 'BSX', name: 'Boston Scientific', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 82.40, vol: 0.28 },
    { symbol: 'VRTX', name: 'Vertex Pharmaceuticals', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.5, base: 468.50, vol: 1.2 },
    { symbol: 'REGN', name: 'Regeneron Pharmaceuticals', cat: 'stocks', digits: 2, pip: 0.01, spread: 6.0, base: 998.00, vol: 2.0 },
    // Energy / Industrials
    { symbol: 'XOM', name: 'Exxon Mobil Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.2, base: 112.80, vol: 0.28 },
    { symbol: 'CVX', name: 'Chevron Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 148.20, vol: 0.35 },
    { symbol: 'COP', name: 'ConocoPhillips', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 108.40, vol: 0.32 },
    { symbol: 'SLB', name: 'Schlumberger Ltd.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 42.80, vol: 0.18 },
    { symbol: 'OXY', name: 'Occidental Petroleum', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.2, base: 52.40, vol: 0.28 },
    { symbol: 'EOG', name: 'EOG Resources', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 128.40, vol: 0.42 },
    { symbol: 'BA', name: 'Boeing Co.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 178.30, vol: 0.55 },
    { symbol: 'CAT', name: 'Caterpillar Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 378.40, vol: 0.75 },
    { symbol: 'GE', name: 'GE Aerospace', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 188.20, vol: 0.48 },
    { symbol: 'HON', name: 'Honeywell International', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.8, base: 218.40, vol: 0.42 },
    { symbol: 'UPS', name: 'United Parcel Service', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 128.40, vol: 0.35 },
    { symbol: 'FDX', name: 'FedEx Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 268.50, vol: 0.65 },
    { symbol: 'LMT', name: 'Lockheed Martin', cat: 'stocks', digits: 2, pip: 0.01, spread: 4.0, base: 548.20, vol: 0.95 },
    { symbol: 'RTX', name: 'RTX Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 118.40, vol: 0.32 },
    { symbol: 'DE', name: 'Deere & Co.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 398.50, vol: 0.85 },
    { symbol: 'MMM', name: '3M Co.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.2, base: 128.40, vol: 0.32 },
    { symbol: 'UNP', name: 'Union Pacific', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 248.50, vol: 0.55 },
    { symbol: 'CSX', name: 'CSX Corp.', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.8, base: 34.80, vol: 0.12 },
    { symbol: 'NSC', name: 'Norfolk Southern', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 248.20, vol: 0.55 },
    { symbol: 'DAL', name: 'Delta Air Lines', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 52.40, vol: 0.28 },
    { symbol: 'UAL', name: 'United Airlines', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.2, base: 68.50, vol: 0.35 },
    { symbol: 'AAL', name: 'American Airlines', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 14.80, vol: 0.12 },
    // Auto / EV / Asia ADRs
    { symbol: 'F', name: 'Ford Motor Co.', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.2, base: 11.85, vol: 0.08 },
    { symbol: 'GM', name: 'General Motors', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.8, base: 48.20, vol: 0.22 },
    { symbol: 'RIVN', name: 'Rivian Automotive', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 12.40, vol: 0.18 },
    { symbol: 'LCID', name: 'Lucid Group', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 2.85, vol: 0.06 },
    { symbol: 'BABA', name: 'Alibaba Group Holding', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.8, base: 98.20, vol: 0.45 },
    { symbol: 'JD', name: 'JD.com Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 38.40, vol: 0.28 },
    { symbol: 'PDD', name: 'PDD Holdings (Pinduoduo)', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.5, base: 118.50, vol: 0.75 },
    { symbol: 'BIDU', name: 'Baidu Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 98.40, vol: 0.55 },
    { symbol: 'NIO', name: 'NIO Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 5.28, vol: 0.12 },
    { symbol: 'XPEV', name: 'XPeng Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 12.40, vol: 0.18 },
    { symbol: 'LI', name: 'Li Auto Inc.', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 24.80, vol: 0.28 },
    { symbol: 'TSM', name: 'Taiwan Semiconductor ADR', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 188.40, vol: 0.65 },
    { symbol: 'SONY', name: 'Sony Group ADR', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 22.40, vol: 0.12 },
    { symbol: 'TM', name: 'Toyota Motor ADR', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 188.20, vol: 0.42 },
    { symbol: 'HMC', name: 'Honda Motor ADR', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.8, base: 32.40, vol: 0.12 },
    { symbol: 'SSNLF', name: 'Samsung Electronics', cat: 'stocks', digits: 2, pip: 0.01, spread: 5.0, base: 48.50, vol: 0.35 },
    { symbol: 'ASML', name: 'ASML Holding NV', cat: 'stocks', digits: 2, pip: 0.01, spread: 5.0, base: 818.40, vol: 1.8 },
    { symbol: 'SAP', name: 'SAP SE ADR', cat: 'stocks', digits: 2, pip: 0.01, spread: 3.0, base: 228.50, vol: 0.55 },
    { symbol: 'NVO', name: 'Novo Nordisk ADR', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 118.40, vol: 0.42 },
    { symbol: 'AZN', name: 'AstraZeneca ADR', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.2, base: 78.40, vol: 0.28 },
    { symbol: 'SHEL', name: 'Shell PLC ADR', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 68.50, vol: 0.22 },
    { symbol: 'BP', name: 'BP PLC ADR', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 34.80, vol: 0.12 },
    { symbol: 'BHP', name: 'BHP Group ADR', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 58.40, vol: 0.22 },
    { symbol: 'RIO', name: 'Rio Tinto ADR', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.0, base: 68.20, vol: 0.25 },
    // Popular ETFs
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 568.40, vol: 0.55 },
    { symbol: 'QQQ', name: 'Invesco QQQ Trust', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.8, base: 488.20, vol: 0.65 },
    { symbol: 'IWM', name: 'iShares Russell 2000', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 218.40, vol: 0.42 },
    { symbol: 'DIA', name: 'SPDR Dow Jones ETF', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 428.50, vol: 0.48 },
    { symbol: 'GLD', name: 'SPDR Gold Shares', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 238.40, vol: 0.35 },
    { symbol: 'SLV', name: 'iShares Silver Trust', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.2, base: 28.40, vol: 0.12 },
    { symbol: 'USO', name: 'United States Oil Fund', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 78.20, vol: 0.28 },
    { symbol: 'ARKK', name: 'ARK Innovation ETF', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 48.80, vol: 0.42 },
    { symbol: 'XLF', name: 'Financial Select Sector SPDR', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.2, base: 48.20, vol: 0.14 },
    { symbol: 'XLE', name: 'Energy Select Sector SPDR', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.2, base: 92.40, vol: 0.22 },
    { symbol: 'XLK', name: 'Technology Select Sector SPDR', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 228.50, vol: 0.42 },
    { symbol: 'SMH', name: 'VanEck Semiconductor ETF', cat: 'stocks', digits: 2, pip: 0.01, spread: 2.5, base: 248.40, vol: 0.75 },
    { symbol: 'EEM', name: 'iShares MSCI Emerging Markets', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.2, base: 44.80, vol: 0.14 },
    { symbol: 'VTI', name: 'Vanguard Total Stock Market', cat: 'stocks', digits: 2, pip: 0.01, spread: 1.5, base: 288.40, vol: 0.35 },
    // ── IDX / Saham Indonesia ──
    // Banks
    { symbol: 'BBCA', name: 'Bank Central Asia Tbk', cat: 'idx', digits: 0, pip: 25, spread: 25, base: 6350, vol: 14, ccy: 'IDR' },
    { symbol: 'BBRI', name: 'Bank Rakyat Indonesia Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 3390, vol: 9, ccy: 'IDR' },
    { symbol: 'BMRI', name: 'Bank Mandiri Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 4450, vol: 12, ccy: 'IDR' },
    { symbol: 'BBNI', name: 'Bank Negara Indonesia Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 3940, vol: 11, ccy: 'IDR' },
    { symbol: 'BRIS', name: 'Bank Syariah Indonesia Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2480, vol: 8, ccy: 'IDR' },
    { symbol: 'BTPS', name: 'Bank BTPN Syariah Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1280, vol: 4, ccy: 'IDR' },
    { symbol: 'ARTO', name: 'Bank Jago Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2450, vol: 8, ccy: 'IDR' },
    { symbol: 'BBHI', name: 'Allo Bank Indonesia Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 980, vol: 4, ccy: 'IDR' },
    { symbol: 'BBYB', name: 'Bank Neo Commerce Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 198, vol: 2.4, ccy: 'IDR' },
    { symbol: 'BNGA', name: 'Bank CIMB Niaga Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1720, vol: 6, ccy: 'IDR' },
    { symbol: 'MEGA', name: 'Bank Mega Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 4980, vol: 14, ccy: 'IDR' },
    { symbol: 'NISP', name: 'Bank OCBC NISP Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1320, vol: 5, ccy: 'IDR' },
    { symbol: 'PNBN', name: 'Bank Pan Indonesia Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1180, vol: 4, ccy: 'IDR' },
    { symbol: 'BBTN', name: 'Bank Tabungan Negara Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1120, vol: 4, ccy: 'IDR' },
    { symbol: 'BJBR', name: 'Bank BJB Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 980, vol: 4, ccy: 'IDR' },
    { symbol: 'BJTM', name: 'Bank Jatim Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 520, vol: 4, ccy: 'IDR' },
    { symbol: 'SDRA', name: 'Bank Woori Saudara Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 720, vol: 4, ccy: 'IDR' },
    { symbol: 'DNAR', name: 'Bank Oke Indonesia Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 112, vol: 1.5, ccy: 'IDR' },
    // Telco
    { symbol: 'TLKM', name: 'Telkom Indonesia Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2780, vol: 8, ccy: 'IDR' },
    { symbol: 'ISAT', name: 'Indosat Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2180, vol: 8, ccy: 'IDR' },
    { symbol: 'EXCL', name: 'XL Axiata Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1980, vol: 7, ccy: 'IDR' },
    { symbol: 'FREN', name: 'Smartfren Telecom Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 42, vol: 0.8, ccy: 'IDR' },
    { symbol: 'TOWR', name: 'Sarana Menara Nusantara Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 720, vol: 4, ccy: 'IDR' },
    { symbol: 'TBIG', name: 'Tower Bersama Infrastructure', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1680, vol: 6, ccy: 'IDR' },
    { symbol: 'MTEL', name: 'Dayamitra Telekomunikasi Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 580, vol: 4, ccy: 'IDR' },
    // Consumer
    { symbol: 'ASII', name: 'Astra International Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 4580, vol: 13, ccy: 'IDR' },
    { symbol: 'UNVR', name: 'Unilever Indonesia Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1980, vol: 7, ccy: 'IDR' },
    { symbol: 'ICBP', name: 'Indofood CBP Sukses Makmur', cat: 'idx', digits: 0, pip: 25, spread: 25, base: 10250, vol: 23, ccy: 'IDR' },
    { symbol: 'INDF', name: 'Indofood Sukses Makmur Tbk', cat: 'idx', digits: 0, pip: 25, spread: 25, base: 5980, vol: 13, ccy: 'IDR' },
    { symbol: 'GGRM', name: 'Gudang Garam Tbk', cat: 'idx', digits: 0, pip: 50, spread: 50, base: 15200, vol: 33, ccy: 'IDR' },
    { symbol: 'HMSP', name: 'HM Sampoerna Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 620, vol: 4, ccy: 'IDR' },
    { symbol: 'MYOR', name: 'Mayora Indah Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2180, vol: 8, ccy: 'IDR' },
    { symbol: 'KLBF', name: 'Kalbe Farma Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1480, vol: 5, ccy: 'IDR' },
    { symbol: 'SIDO', name: 'Sido Muncul Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 580, vol: 4, ccy: 'IDR' },
    { symbol: 'KAEF', name: 'Kimia Farma Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 720, vol: 4, ccy: 'IDR' },
    { symbol: 'DVLA', name: 'Darya-Varia Laboratoria', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1580, vol: 6, ccy: 'IDR' },
    { symbol: 'TSPC', name: 'Tempo Scan Pacific Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1780, vol: 6, ccy: 'IDR' },
    { symbol: 'CPIN', name: 'Charoen Pokphand Indonesia', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 4280, vol: 12, ccy: 'IDR' },
    { symbol: 'JPFA', name: 'Japfa Comfeed Indonesia Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1480, vol: 5, ccy: 'IDR' },
    { symbol: 'MAIN', name: 'Malindo Feedmill Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 720, vol: 4, ccy: 'IDR' },
    { symbol: 'ACES', name: 'Ace Hardware Indonesia Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 680, vol: 4, ccy: 'IDR' },
    { symbol: 'MAPI', name: 'Mitra Adiperkasa Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1320, vol: 5, ccy: 'IDR' },
    { symbol: 'LPPF', name: 'Matahari Department Store', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1980, vol: 7, ccy: 'IDR' },
    { symbol: 'RALS', name: 'Ramayana Lestari Sentosa', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 420, vol: 5.0, ccy: 'IDR' },
    { symbol: 'ERAA', name: 'Erajaya Swasembada Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 398, vol: 4.8, ccy: 'IDR' },
    { symbol: 'AMRT', name: 'Sumber Alfaria Trijaya Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2480, vol: 8, ccy: 'IDR' },
    { symbol: 'MIDI', name: 'Midi Utama Indonesia Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 348, vol: 4.2, ccy: 'IDR' },
    { symbol: 'GOOD', name: 'Garudafood Putra Putri Jaya', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 420, vol: 5.0, ccy: 'IDR' },
    { symbol: 'ROTI', name: 'Nippon Indosari Corpindo', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1080, vol: 4, ccy: 'IDR' },
    { symbol: 'ULTJ', name: 'Ultrajaya Milk Industry', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1520, vol: 5, ccy: 'IDR' },
    { symbol: 'MLBI', name: 'Multi Bintang Indonesia Tbk', cat: 'idx', digits: 0, pip: 25, spread: 25, base: 7200, vol: 16, ccy: 'IDR' },
    { symbol: 'DLTA', name: 'Delta Djakarta Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 3980, vol: 11, ccy: 'IDR' },
    { symbol: 'WOOD', name: 'Integra Indocabinet Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 420, vol: 5.0, ccy: 'IDR' },
    { symbol: 'CASA', name: 'Capital Financial Indonesia', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 52, vol: 1.0, ccy: 'IDR' },
    // Mining / Energy
    { symbol: 'ADRO', name: 'Adaro Energy Indonesia Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2180, vol: 8, ccy: 'IDR' },
    { symbol: 'PTBA', name: 'Bukit Asam Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2480, vol: 8, ccy: 'IDR' },
    { symbol: 'ITMG', name: 'Indo Tambangraya Megah Tbk', cat: 'idx', digits: 0, pip: 50, spread: 50, base: 22400, vol: 40, ccy: 'IDR' },
    { symbol: 'ANTM', name: 'Aneka Tambang Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1380, vol: 5, ccy: 'IDR' },
    { symbol: 'INCO', name: 'Vale Indonesia Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 3280, vol: 9, ccy: 'IDR' },
    { symbol: 'MDKA', name: 'Merdeka Copper Gold Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2280, vol: 8, ccy: 'IDR' },
    { symbol: 'PGAS', name: 'Perusahaan Gas Negara Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1480, vol: 5, ccy: 'IDR' },
    { symbol: 'MEDC', name: 'Medco Energi Internasional', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1120, vol: 4, ccy: 'IDR' },
    { symbol: 'BUMI', name: 'Bumi Resources Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 98, vol: 2.0, ccy: 'IDR' },
    { symbol: 'HRUM', name: 'Harum Energy Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1120, vol: 4, ccy: 'IDR' },
    { symbol: 'DOID', name: 'Delta Dunia Makmur Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 420, vol: 5.0, ccy: 'IDR' },
    { symbol: 'INDY', name: 'Indika Energy Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1280, vol: 4, ccy: 'IDR' },
    { symbol: 'TPIA', name: 'Chandra Asri Pacific Tbk', cat: 'idx', digits: 0, pip: 25, spread: 25, base: 7850, vol: 17, ccy: 'IDR' },
    { symbol: 'BRPT', name: 'Barito Pacific Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 880, vol: 4, ccy: 'IDR' },
    { symbol: 'BREN', name: 'Barito Renewables Energy', cat: 'idx', digits: 0, pip: 25, spread: 25, base: 8750, vol: 19, ccy: 'IDR' },
    { symbol: 'CUAN', name: 'Petrindo Jaya Kreasi Tbk', cat: 'idx', digits: 0, pip: 25, spread: 25, base: 6850, vol: 15, ccy: 'IDR' },
    { symbol: 'AMMN', name: 'Amman Mineral Internasional', cat: 'idx', digits: 0, pip: 25, spread: 25, base: 8450, vol: 19, ccy: 'IDR' },
    { symbol: 'NCKL', name: 'Trimegah Bangun Persada', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 780, vol: 4, ccy: 'IDR' },
    { symbol: 'BRMS', name: 'Bumi Resources Minerals Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 248, vol: 3.0, ccy: 'IDR' },
    { symbol: 'ESSA', name: 'Surya Esa Perkasa Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 720, vol: 4, ccy: 'IDR' },
    { symbol: 'RAJA', name: 'Rukun Raharja Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1320, vol: 5, ccy: 'IDR' },
    { symbol: 'PGEO', name: 'Pertamina Geothermal Energy', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1080, vol: 4, ccy: 'IDR' },
    { symbol: 'AALI', name: 'Astra Agro Lestari Tbk', cat: 'idx', digits: 0, pip: 25, spread: 25, base: 6250, vol: 14, ccy: 'IDR' },
    { symbol: 'LSIP', name: 'London Sumatra Indonesia', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 880, vol: 4, ccy: 'IDR' },
    { symbol: 'SMAR', name: 'Sinar Mas Agro Resources', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 3980, vol: 11, ccy: 'IDR' },
    { symbol: 'SSMS', name: 'Sawit Sumbermas Sarana Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1080, vol: 4, ccy: 'IDR' },
    { symbol: 'TAPG', name: 'Triputra Agro Persada Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 720, vol: 4, ccy: 'IDR' },
    { symbol: 'SIMP', name: 'Salim Ivomas Pratama Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 420, vol: 5.0, ccy: 'IDR' },
    { symbol: 'DSNG', name: 'Dharma Satya Nusantara Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 620, vol: 4, ccy: 'IDR' },
    // Tech / Media
    { symbol: 'GOTO', name: 'GoTo Gojek Tokopedia Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 58, vol: 1.2, ccy: 'IDR' },
    { symbol: 'BUKA', name: 'Bukalapak.com Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 142, vol: 1.7, ccy: 'IDR' },
    { symbol: 'EMTK', name: 'Elang Mahkota Teknologi Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 480, vol: 5.8, ccy: 'IDR' },
    { symbol: 'SCMA', name: 'Surya Citra Media Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 148, vol: 1.8, ccy: 'IDR' },
    { symbol: 'MNCN', name: 'Media Nusantara Citra Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 320, vol: 3.8, ccy: 'IDR' },
    { symbol: 'DCII', name: 'DCI Indonesia Tbk', cat: 'idx', digits: 0, pip: 100, spread: 100, base: 38500, vol: 69, ccy: 'IDR' },
    { symbol: 'EDGE', name: 'Indointernet Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 4280, vol: 12, ccy: 'IDR' },
    { symbol: 'FILM', name: 'MD Pictures Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 3980, vol: 11, ccy: 'IDR' },
    { symbol: 'WIFI', name: 'Solusi Sinergi Digital Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2980, vol: 8, ccy: 'IDR' },
    { symbol: 'BELI', name: 'Global Digital Niaga (Blibli)', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 128, vol: 1.5, ccy: 'IDR' },
    // Infra / Property
    { symbol: 'JSMR', name: 'Jasa Marga Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 4280, vol: 12, ccy: 'IDR' },
    { symbol: 'CMNP', name: 'Citra Marga Nusaphala Persada', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1320, vol: 5, ccy: 'IDR' },
    { symbol: 'WIKA', name: 'Wijaya Karya Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 220, vol: 2.6, ccy: 'IDR' },
    { symbol: 'WSKT', name: 'Waskita Karya Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 148, vol: 1.8, ccy: 'IDR' },
    { symbol: 'PTPP', name: 'PP (Pembangunan Perumahan)', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 420, vol: 5.0, ccy: 'IDR' },
    { symbol: 'ADHI', name: 'Adhi Karya Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 248, vol: 3.0, ccy: 'IDR' },
    { symbol: 'SMGR', name: 'Semen Indonesia Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 3280, vol: 9, ccy: 'IDR' },
    { symbol: 'INTP', name: 'Indocement Tunggal Prakarsa', cat: 'idx', digits: 0, pip: 25, spread: 25, base: 5980, vol: 13, ccy: 'IDR' },
    { symbol: 'SMBR', name: 'Semen Baturaja Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 248, vol: 3.0, ccy: 'IDR' },
    { symbol: 'BSDE', name: 'Bumi Serpong Damai Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 920, vol: 4, ccy: 'IDR' },
    { symbol: 'CTRA', name: 'Ciputra Development Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 980, vol: 4, ccy: 'IDR' },
    { symbol: 'PWON', name: 'Pakuwon Jati Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 398, vol: 4.8, ccy: 'IDR' },
    { symbol: 'SMRA', name: 'Summarecon Agung Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 620, vol: 4, ccy: 'IDR' },
    { symbol: 'DMAS', name: 'Puradelta Lestari Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 148, vol: 1.8, ccy: 'IDR' },
    { symbol: 'JRPT', name: 'Jaya Real Property Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 720, vol: 4, ccy: 'IDR' },
    { symbol: 'ASRI', name: 'Alam Sutera Realty Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 148, vol: 1.8, ccy: 'IDR' },
    { symbol: 'APLN', name: 'Agung Podomoro Land Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 112, vol: 1.5, ccy: 'IDR' },
    { symbol: 'BKSL', name: 'Sentul City Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 42, vol: 0.8, ccy: 'IDR' },
    { symbol: 'LPKR', name: 'Lippo Karawaci Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 78, vol: 1.6, ccy: 'IDR' },
    { symbol: 'DILD', name: 'Intiland Development Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 220, vol: 2.6, ccy: 'IDR' },
    // Hospitals
    { symbol: 'MIKA', name: 'Mitra Keluarga Karyasehat', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2480, vol: 8, ccy: 'IDR' },
    { symbol: 'HEAL', name: 'Medikaloka Hermina Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1280, vol: 4, ccy: 'IDR' },
    { symbol: 'SILO', name: 'Siloam International Hospitals', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2180, vol: 8, ccy: 'IDR' },
    { symbol: 'SRAJ', name: 'Sejahteraraya Anugrahjaya', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 620, vol: 4, ccy: 'IDR' },
    // Auto / Logistics / Industrials
    { symbol: 'AUTO', name: 'Astra Otoparts Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 2280, vol: 8, ccy: 'IDR' },
    { symbol: 'GJTL', name: 'Gajah Tunggal Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1080, vol: 4, ccy: 'IDR' },
    { symbol: 'IMAS', name: 'Indomobil Sukses Internasional', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1320, vol: 5, ccy: 'IDR' },
    { symbol: 'SMDR', name: 'Samudera Indonesia Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 312, vol: 3.7, ccy: 'IDR' },
    { symbol: 'BIRD', name: 'Blue Bird Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1320, vol: 5, ccy: 'IDR' },
    { symbol: 'ASSA', name: 'Adi Sarana Armada Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 780, vol: 4, ccy: 'IDR' },
    { symbol: 'AKRA', name: 'AKR Corporindo Tbk', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1320, vol: 5, ccy: 'IDR' },
    { symbol: 'UNTR', name: 'United Tractors Tbk', cat: 'idx', digits: 0, pip: 50, spread: 50, base: 24200, vol: 44, ccy: 'IDR' },
    { symbol: 'HEXA', name: 'Hexindo Adiperkasa Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 4980, vol: 14, ccy: 'IDR' },
    { symbol: 'INKP', name: 'Indah Kiat Pulp & Paper', cat: 'idx', digits: 0, pip: 25, spread: 25, base: 6850, vol: 15, ccy: 'IDR' },
    { symbol: 'TKIM', name: 'Pabrik Kertas Tjiwi Kimia', cat: 'idx', digits: 0, pip: 25, spread: 25, base: 5980, vol: 13, ccy: 'IDR' },
    { symbol: 'FASW', name: 'Fajar Surya Wisesa Tbk', cat: 'idx', digits: 0, pip: 10, spread: 10, base: 4850, vol: 14, ccy: 'IDR' },
    { symbol: 'KRAS', name: 'Krakatau Steel Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 312, vol: 3.7, ccy: 'IDR' },
    { symbol: 'ISSP', name: 'Steel Pipe Industry of Indonesia', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 348, vol: 4.2, ccy: 'IDR' },
    { symbol: 'GIAA', name: 'Garuda Indonesia Tbk', cat: 'idx', digits: 0, pip: 1, range: 1, base: 88, vol: 1.8, ccy: 'IDR' },
    { symbol: 'IATA', name: 'Indonesia Transport & Infrastructure', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 48, vol: 1.0, ccy: 'IDR' },
    { symbol: 'BULL', name: 'Buana Lintas Lautan Tbk', cat: 'idx', digits: 0, pip: 2, spread: 2, base: 220, vol: 2.6, ccy: 'IDR' },
    { symbol: 'MBSS', name: 'Mitrabahtera Segara Sejati', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1320, vol: 5, ccy: 'IDR' },
    { symbol: 'PPRO', name: 'PP Properti Tbk', cat: 'idx', digits: 0, pip: 1, spread: 1, base: 42, vol: 0.8, ccy: 'IDR' },
    { symbol: 'SRTG', name: 'Saratoga Investama Sedaya', cat: 'idx', digits: 0, pip: 5, spread: 5, base: 1780, vol: 6, ccy: 'IDR' },
  ];

  // ─── State ───────────────────────────────────────────
  const state = {
    user: null,
    // Active trading mode: 'demo' | 'real'
    accountMode: 'demo',
    // Separate books per account
    wallets: {
      demo: { balance: 10000, positions: [], orders: [], history: [], ticketSeq: 100001 },
      real: { balance: 0, positions: [], orders: [], history: [], ticketSeq: 200001 },
    },
    balance: 10000,
    equity: 10000,
    margin: 0,
    leverage: 100,
    positions: [],
    orders: [],
    history: [],
    journal: [],
    activeSymbol: 'EURUSD',
    timeframe: '15m',
    chartType: 'candle',
    category: 'all',
    stockMarket: 'idx', // 'idx' | 'us'
    stockSymbol: null, // set only after user picks a product
    stocksTab: 'market', // 'market' | 'portfolio'
    pfFilter: 'all', // all | idx | us
    prices: {},
    candles: {},
    ticketSeq: 100001,
    indicators: { ma: false, ema: false, bb: false, rsi: false, macd: false, vwap: false, volume: true, grid: true, crosshair: true },
    // market control
    volatility: 1,
    trendBias: 0,
    // independent natural market state (always runs)
    market: {}, // symbol -> { phase, phaseLeft, mom, trend, ticks, seed }
    // equity market common factors (IHSG-like / SPX-like beta)
    eqBeta: {
      idx: { level: 0, mom: 0, phase: 'drift', phaseLeft: 80, shockLeft: 0, shockDir: 0 },
      us:  { level: 0, mom: 0, phase: 'drift', phaseLeft: 80, shockLeft: 0, shockDir: 0 },
    },
    // cheats
    autoTrader: false,
    autoMode: 'smart',
    autoLot: 0.1,
    autoInterval: 8,
    autoTimer: null,
    luck: false,
    luckMode: 'cepat', // 'cepat' | 'normal'
    luckStrength: 6,
    luckDir: 0, // 1 buy impulse, -1 sell impulse
    luckTicks: 0,
    luckSymbol: null, // symbol receiving impulse
    luckPhase: 0,
    // luck normal-mode organic state machine
    luckNormal: {},
    godMode: false,
    adminUnlocked: false,
    ballInvisible: false,
    ballOpacity: 0, // 0–40 when invisible
    depositMethod: 'bank',
  };

  const TF_MS = { '1m': 60000, '5m': 300000, '15m': 900000, '1h': 3600000, '4h': 14400000, '1d': 86400000 };
  const TF_BARS = { '1m': 120, '5m': 100, '15m': 100, '1h': 80, '4h': 60, '1d': 50 };

  // ─── Utils ───────────────────────────────────────────
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const fmt = (n, d = 2) => {
    if (n == null || isNaN(n)) return '—';
    return Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  };
  const fmtMoney = (n) => {
    const sign = n < 0 ? '-' : '';
    return sign + '$' + fmt(Math.abs(n), 2);
  };
  const fmtPrice = (sym, p) => {
    const s = getSym(sym);
    return Number(p).toFixed(s.digits);
  };
  const getSym = (sym) => SYMBOLS.find(s => s.symbol === sym) || SYMBOLS[0];
  const now = () => Date.now();
  const uid = () => state.ticketSeq++;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function snapshotActiveWallet() {
    const mode = state.accountMode === 'real' ? 'real' : 'demo';
    if (!state.wallets[mode]) {
      state.wallets[mode] = { balance: 0, positions: [], orders: [], history: [], ticketSeq: mode === 'real' ? 200001 : 100001 };
    }
    state.wallets[mode] = {
      balance: state.balance,
      positions: state.positions,
      orders: state.orders,
      history: (state.history || []).slice(0, 200),
      ticketSeq: state.ticketSeq,
    };
  }

  function applyWallet(mode) {
    mode = mode === 'real' ? 'real' : 'demo';
    if (!state.wallets[mode]) {
      state.wallets[mode] = {
        balance: mode === 'demo' ? 10000 : 0,
        positions: [],
        orders: [],
        history: [],
        ticketSeq: mode === 'real' ? 200001 : 100001,
      };
    }
    const w = state.wallets[mode];
    state.accountMode = mode;
    state.balance = w.balance ?? (mode === 'demo' ? 10000 : 0);
    state.positions = Array.isArray(w.positions) ? w.positions : [];
    state.orders = Array.isArray(w.orders) ? w.orders : [];
    state.history = Array.isArray(w.history) ? w.history : [];
    state.ticketSeq = w.ticketSeq || (mode === 'real' ? 200001 : 100001);
    // recompute equity/margin from open positions
    try {
      if (typeof updatePositionPnL === 'function') updatePositionPnL();
      else { state.equity = state.balance; state.margin = 0; }
    } catch {
      state.equity = state.balance;
      state.margin = 0;
    }
  }

  function ensureWalletsFromLegacy(data) {
    // Migrate old single-balance saves into dual wallets
    const wallets = data.wallets || {
      demo: { balance: 10000, positions: [], orders: [], history: [], ticketSeq: 100001 },
      real: { balance: 0, positions: [], orders: [], history: [], ticketSeq: 200001 },
    };
    if (!data.wallets && typeof data.balance === 'number') {
      const mode = (data.accountMode === 'real') ? 'real' : 'demo';
      // put legacy book into the mode user was on (default demo)
      wallets[mode] = {
        balance: data.balance ?? 10000,
        positions: data.positions || [],
        orders: data.orders || [],
        history: data.history || [],
        ticketSeq: data.ticketSeq || (mode === 'real' ? 200001 : 100001),
      };
      if (mode === 'demo' && wallets.real.balance == null) {
        wallets.real = { balance: 0, positions: [], orders: [], history: [], ticketSeq: 200001 };
      }
      if (mode === 'real' && !wallets.demo) {
        wallets.demo = { balance: 10000, positions: [], orders: [], history: [], ticketSeq: 100001 };
      }
    }
    // normalize
    ['demo', 'real'].forEach(m => {
      if (!wallets[m]) wallets[m] = { balance: m === 'demo' ? 10000 : 0, positions: [], orders: [], history: [], ticketSeq: m === 'real' ? 200001 : 100001 };
      wallets[m].balance = Number(wallets[m].balance) || 0;
      wallets[m].positions = wallets[m].positions || [];
      wallets[m].orders = wallets[m].orders || [];
      wallets[m].history = wallets[m].history || [];
      wallets[m].ticketSeq = wallets[m].ticketSeq || (m === 'real' ? 200001 : 100001);
    });
    return wallets;
  }

  function save() {
    if (!state.user) return;
    snapshotActiveWallet();
    const data = {
      user: state.user,
      accountMode: state.accountMode,
      wallets: state.wallets,
      // legacy fields for older readers
      balance: state.balance,
      positions: state.positions,
      orders: state.orders,
      history: state.history.slice(0, 200),
      ticketSeq: state.ticketSeq,
      adminUnlocked: state.adminUnlocked,
    };
    localStorage.setItem('mikrotrader_v5', JSON.stringify(data));
  }

  function load() {
    try {
      const raw = localStorage.getItem('mikrotrader_v5');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch { return null; }
  }

  function hydrateFromData(data) {
    if (!data) return;
    state.wallets = ensureWalletsFromLegacy(data);
    state.adminUnlocked = !!data.adminUnlocked;
    const mode = data.accountMode === 'real' ? 'real' : 'demo';
    applyWallet(mode);
  }

  function updateAccountModeUI() {
    const mode = state.accountMode === 'real' ? 'real' : 'demo';
    const isReal = mode === 'real';
    const wrap = $('#accountSwitcher');
    if (wrap) wrap.dataset.mode = mode;
    const app = $('#app');
    if (app) app.dataset.accMode = mode;

    const badge = $('#accModeBadge');
    if (badge) {
      badge.textContent = isReal ? 'REAL' : 'DEMO';
      badge.className = 'acc-mode-badge ' + mode;
    }
    const hint = $('#bcAccHint');
    if (hint) hint.textContent = isReal ? 'Akun Real · klik ganti' : 'Akun Demo · klik ganti';

    const pill = $('#asAccModeBtn');
    const pillLbl = $('#asAccModeLabel');
    if (pill) {
      pill.classList.toggle('real', isReal);
      pill.classList.toggle('demo', !isReal);
    }
    if (pillLbl) pillLbl.textContent = isReal ? 'REAL' : 'DEMO';

    const pfMode = $('#pfMode');
    if (pfMode) pfMode.textContent = isReal ? 'REAL' : 'DEMO';

    // dropdown options
    $$('#accDropdown .acc-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.acc === mode);
    });

    // show both wallet balances in menu
    const demoBal = state.wallets?.demo?.balance ?? 10000;
    const realBal = state.wallets?.real?.balance ?? 0;
    // If viewing one, the other is from wallets; active is state.balance
    const showDemo = mode === 'demo' ? state.balance : demoBal;
    const showReal = mode === 'real' ? state.balance : realBal;
    if ($('#accDemoBal')) $('#accDemoBal').textContent = fmtMoney(showDemo);
    if ($('#accRealBal')) $('#accRealBal').textContent = fmtMoney(showReal);

    // server name flavor
    const sn = $('#serverName');
    if (sn) sn.textContent = isReal ? 'Mikro-Live-01' : 'Mikro-Demo-01';
  }

  function closeAccDropdown() {
    const dd = $('#accDropdown');
    const chip = $('#balanceChip');
    if (dd) {
      dd.hidden = true;
      dd.setAttribute('hidden', '');
    }
    if (chip) {
      chip.classList.remove('open');
      chip.setAttribute('aria-expanded', 'false');
    }
  }

  function toggleAccDropdown(force) {
    const dd = $('#accDropdown');
    const chip = $('#balanceChip');
    if (!dd || !chip) return;
    const currentlyHidden = dd.hasAttribute('hidden') || dd.hidden === true;
    const open = force != null ? !!force : currentlyHidden;
    // refresh balances before show
    try { snapshotActiveWallet(); } catch {}
    try { updateAccountModeUI(); } catch {}
    if (open) {
      dd.hidden = false;
      dd.removeAttribute('hidden');
      dd.style.display = '';
    } else {
      dd.hidden = true;
      dd.setAttribute('hidden', '');
    }
    chip.classList.toggle('open', open);
    chip.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function switchAccountMode(mode, { silent = false } = {}) {
    mode = mode === 'real' ? 'real' : 'demo';
    if (mode === state.accountMode) {
      closeAccDropdown();
      if (!silent) toast('Akun Aktif', mode === 'real' ? 'Sudah di Akun Real' : 'Sudah di Akun Demo', 'info');
      return;
    }
    // save current book
    snapshotActiveWallet();
    applyWallet(mode);
    closeAccDropdown();
    updateAccountModeUI();
    renderPositions();
    renderOrders();
    renderHistory();
    renderAccount();
    updateMarginInfo();
    try { renderPortfolio(); } catch {}
    save();
    journal(`Switched to ${mode.toUpperCase()} account · balance ${fmtMoney(state.balance)}`, 'info');
    if (!silent) {
      toast(
        mode === 'real' ? 'Akun Real' : 'Akun Demo',
        mode === 'real'
          ? `Mode live · Balance ${fmtMoney(state.balance)}`
          : `Mode latihan · Balance ${fmtMoney(state.balance)}`,
        'success'
      );
    }
  }

  // ─── Toast ───────────────────────────────────────────
  function toast(title, msg, type = 'info') {
    const icons = { success: '✓', error: '✕', info: 'ℹ', warn: '⚠' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<div class="toast-icon">${icons[type] || 'ℹ'}</div>
      <div class="toast-body"><div class="toast-title">${title}</div><div class="toast-msg">${msg}</div></div>`;
    $('#toasts').appendChild(el);
    setTimeout(() => {
      el.classList.add('out');
      setTimeout(() => el.remove(), 200);
    }, 3500);
  }

  function journal(msg, type = 'info') {
    const t = new Date().toLocaleTimeString('en-GB', { hour12: false });
    state.journal.unshift({ t, msg, type });
    if (state.journal.length > 200) state.journal.pop();
    renderJournal();
  }

  // ─── Price Engine ────────────────────────────────────
  // Bump when listed bases change so stale candles/prices reseed near real board
  const PRICE_BOOK_VER = 9;

  function initPrices() {
    SYMBOLS.forEach(s => {
      const saved = state.prices[s.symbol];
      let price = s.base;
      // Only reuse saved mid if still near current listed base (avoid stale 9750→ghost books)
      if (saved && saved.mid && isFinite(saved.mid)) {
        const drift = Math.abs(saved.mid - s.base) / Math.max(s.base, 1);
        if (!(isEquitySym(s)) && drift < 0.25) price = saved.mid;
        else if (isEquitySym(s) && drift < 0.06) price = saved.mid;
      }
      const half = (s.spread * s.pip) / 2;
      // Session open: offset from last so day-change % is non-zero (like real board)
      let sessionOpen = price;
      if (s.cat === 'idx' || s.cat === 'stocks') {
        // realistic overnight gap ±0.3%–2.2%
        const gap = (Math.random() < 0.5 ? -1 : 1) * rand(0.003, 0.022);
        sessionOpen = price * (1 - gap * rand(0.4, 1)); // open earlier; mid already drifted
        // keep open near base-ish
        sessionOpen = Math.max((s.pip || 0.01), sessionOpen);
      }
      state.prices[s.symbol] = {
        mid: price,
        bid: price - half,
        ask: price + half,
        open: sessionOpen,
        high: Math.max(price, sessionOpen),
        low: Math.min(price, sessionOpen),
        change: ((price - sessionOpen) / sessionOpen) * 100,
        dir: 0,
        lastPrint: price,
        printDir: 0,
      };
      const needHist = !state.candles[s.symbol] || !state.candles[s.symbol].length
        || state._priceBookVer !== PRICE_BOOK_VER
        || (isEquitySym(s) && state.candles[s.symbol].length && (
              Math.abs(state.candles[s.symbol][state.candles[s.symbol].length - 1].c - s.base) / s.base > 0.08
            ));
      if (needHist) {
        state.candles[s.symbol] = generateHistory(s);
      }
      // Align live mid to last history close; open = session reference earlier in day
      const hist = state.candles[s.symbol];
      if (hist && hist.length) {
        const last = hist[hist.length - 1];
        const half = (s.spread * s.pip) / 2;
        let mid = last.c;
        // Equity: pin near listed base (real board), allow small session noise only
        if (isEquitySym(s)) {
          mid = s.base * (1 + rand(-0.012, 0.012));
          mid = snapEquityPrice(s, mid);
        }
        const dayRef = hist[Math.max(0, hist.length - 48)] || hist[0];
        let open = isEquitySym(s)
          ? mid * (1 + (Math.random() < 0.48 ? -1 : 1) * rand(0.002, 0.015))
          : (dayRef.o != null ? dayRef.o : dayRef.c);
        if (Math.abs(mid - open) / Math.max(open, 1) < 0.001) {
          open = mid * (1 + (Math.random() < 0.5 ? -1 : 1) * rand(0.004, 0.014));
        }
        if (isEquitySym(s)) open = snapEquityPrice(s, open);
        // Sync last candle close to live mid so chart matches board
        last.c = mid;
        last.h = Math.max(last.h || mid, mid);
        last.l = Math.min(last.l || mid, mid);
        state.prices[s.symbol].mid = mid;
        state.prices[s.symbol].bid = isEquitySym(s) ? snapEquityPrice(s, mid - Math.max(half, getEquityStep(s, mid) / 2)) : mid - half;
        state.prices[s.symbol].ask = isEquitySym(s) ? snapEquityPrice(s, mid + Math.max(half, getEquityStep(s, mid) / 2)) : mid + half;
        if (state.prices[s.symbol].ask <= state.prices[s.symbol].bid) {
          const st = getEquityStep(s, mid);
          state.prices[s.symbol].ask = state.prices[s.symbol].bid + st;
        }
        state.prices[s.symbol].open = open;
        state.prices[s.symbol].high = Math.max(mid, open);
        state.prices[s.symbol].low = Math.min(mid, open);
        state.prices[s.symbol].change = ((mid - open) / open) * 100;
      }
      // Seed independent market engine for every symbol
      ensureMarketState(s.symbol);
    });
    state._priceBookVer = PRICE_BOOK_VER;
  }

  function generateHistory(s) {
    const bars = 500;
    const candles = [];
    const eqHist = (s.cat === 'idx' || s.cat === 'stocks');
    // Start near listed base (real board). Equities: tighter random start.
    let price = s.base * (1 + rand(eqHist ? -0.008 : -0.012, eqHist ? 0.008 : 0.012));
    let t = now() - bars * TF_MS['15m'];

    // Multi-regime path: trends, ranges, breakouts, mean-reversion
    let trend = Math.random() < 0.5 ? -1 : 1;
    let phase = pick(['trend', 'range', 'trend', 'chop']);
    let phaseLeft = Math.floor(rand(12, 40));
    let mom = 0;
    let garch = 1; // local volatility multiplier (clusters)
    let rangeMid = price;
    let rangeHalf = eqHist ? price * rand(0.008, 0.025) : s.vol * rand(8, 22);

    for (let i = 0; i < bars; i++) {
      phaseLeft--;
      if (phaseLeft <= 0) {
        const r = Math.random();
        if (r < 0.32) {
          phase = 'trend';
          phaseLeft = Math.floor(rand(14, 48));
          if (Math.random() < 0.35) trend = -trend;
        } else if (r < 0.52) {
          phase = 'range';
          phaseLeft = Math.floor(rand(18, 55));
          rangeMid = price;
          rangeHalf = s.vol * rand(10, 28);
        } else if (r < 0.72) {
          phase = 'chop';
          phaseLeft = Math.floor(rand(10, 28));
        } else if (r < 0.88) {
          phase = 'pullback';
          phaseLeft = Math.floor(rand(5, 16));
        } else {
          phase = 'breakout';
          phaseLeft = Math.floor(rand(4, 12));
          trend = Math.random() < 0.5 ? -1 : 1;
        }
      }

      // Volatility clustering (GARCH-lite)
      const shock = Math.abs(mom) + Math.random() * 0.15;
      garch = clamp(0.92 * garch + 0.08 * (0.7 + shock * 2.2) + (Math.random() < 0.03 ? rand(0.4, 1.2) : 0), 0.45, 2.8);
      const eq = (s.cat === 'idx' || s.cat === 'stocks');
      // Equities: bar volatility as % of price (realistic daily-ish bar ranges)
      const barVol = eq
        ? price * (0.0012 + (s.vol / Math.max(price, 1)) * 0.08) * garch *
            (phase === 'breakout' ? 1.8 : phase === 'quiet' ? 0.45 : phase === 'range' ? 0.7 : 1)
        : s.vol * garch * (phase === 'breakout' ? 1.55 : phase === 'quiet' ? 0.55 : phase === 'range' ? 0.85 : 1);

      // Momentum target by regime
      let target = 0;
      if (phase === 'trend') target = trend * rand(0.18, 0.42);
      else if (phase === 'pullback') target = -trend * rand(0.12, 0.32);
      else if (phase === 'breakout') target = trend * rand(0.35, 0.7);
      else if (phase === 'range') {
        const d = (price - rangeMid) / (rangeHalf || s.vol);
        target = -d * 0.22 + (Math.random() - 0.5) * 0.12;
      } else {
        target = (Math.random() - 0.5) * 0.22;
      }
      mom = mom * 0.78 + target * 0.22;

      // Simulate intra-bar path for realistic OHLC (not random wicks)
      const ticks = 6 + Math.floor(Math.random() * 10);
      let o = price;
      let hi = o, lo = o, px = o;
      let pathMom = mom;
      for (let k = 0; k < ticks; k++) {
        // Fat-tail noise (mixture of gaussians)
        let noise = (Math.random() - 0.5) * barVol * 1.1;
        if (Math.random() < 0.07) noise *= rand(2.2, 4.5); // jump tick
        if (Math.random() < 0.04) noise = 0; // micro pause
        pathMom = pathMom * 0.9 + (Math.random() - 0.5) * 0.08;
        let step = noise + pathMom * barVol * 0.55;
        // Range mean-reversion soft walls
        if (phase === 'range') {
          if (px > rangeMid + rangeHalf) step -= barVol * rand(0.15, 0.45);
          if (px < rangeMid - rangeHalf) step += barVol * rand(0.15, 0.45);
        }
        px += step;
        if (px > hi) hi = px;
        if (px < lo) lo = px;
      }
      let c = px;

      // Soft anchor toward base over long history (equities stay near real level)
      const dist = (c - s.base) / (s.base || 1);
      if (eq) {
        c -= dist * s.base * 0.04;
        // keep history inside ±10% of base
        c = clamp(c, s.base * 0.9, s.base * 1.1);
      } else {
        c -= dist * s.vol * 0.35;
      }
      hi = Math.max(hi, o, c);
      lo = Math.min(lo, o, c);

      // Ensure minimum wick realism: body + shadows
      const body = Math.abs(c - o);
      const minWick = barVol * (0.15 + Math.random() * 0.5);
      if (hi - Math.max(o, c) < minWick * 0.3 && Math.random() < 0.55) {
        hi = Math.max(o, c) + minWick * rand(0.2, 1.1);
      }
      if (Math.min(o, c) - lo < minWick * 0.3 && Math.random() < 0.55) {
        lo = Math.min(o, c) - minWick * rand(0.2, 1.1);
      }
      // Occasional pin-bar / rejection wick
      if (Math.random() < 0.08) {
        if (Math.random() < 0.5) hi += barVol * rand(1.2, 3.2);
        else lo -= barVol * rand(1.2, 3.2);
      }

      if (eq) {
        // Snap to board ticks so history matches live IDX tape
        const snap = (px) => {
          let step = s.pip || 1;
          if (s.cat === 'idx') {
            if (px < 200) step = 1;
            else if (px < 500) step = 2;
            else if (px < 2000) step = 5;
            else if (px < 5000) step = 10;
            else step = Math.max(25, s.pip || 25);
            step = Math.max(step, s.pip || 1);
          }
          return Math.max(step, Math.round(px / step) * step);
        };
        o = snap(o); c = snap(c); hi = snap(Math.max(hi, o, c)); lo = snap(Math.min(lo, o, c));
        price = c;
      } else {
        price = c;
      }

      const volBase = phase === 'breakout' ? rand(180, 680)
        : phase === 'trend' ? rand(90, 520)
        : phase === 'chop' ? rand(50, 280)
        : rand(40, 360);
      const vol = volBase * (0.7 + garch * 0.5) * (body > barVol * 1.2 ? 1.25 : 1);

      // Snap equity OHLC to tick size (IDX board lots feel)
      if (eq) {
        const tick = s.pip || 1;
        const snap = (x) => Math.max(tick, Math.round(x / tick) * tick);
        c = snap(c); o = snap(o); hi = snap(Math.max(hi, o, c)); lo = snap(Math.min(lo, o, c));
      }
      candles.push({ t, o, h: hi, l: lo, c, v: vol });
      price = c;
      t += TF_MS['15m'];
    }

    // Pin last bar near listed base so board + chart open on real levels
    const last = candles[candles.length - 1];
    let blend = last.c * 0.4 + s.base * 0.6;
    if (eqHist) {
      // keep final close inside a tight band of the real quote
      blend = s.base * (1 + (Math.random() - 0.5) * 0.01);
      const step = s.pip || 1;
      let st = step;
      if (s.cat === 'idx') {
        if (blend < 200) st = 1;
        else if (blend < 500) st = 2;
        else if (blend < 2000) st = 5;
        else if (blend < 5000) st = 10;
        else st = Math.max(25, step);
        st = Math.max(st, step);
      }
      blend = Math.max(st, Math.round(blend / st) * st);
    }
    last.c = blend;
    last.h = Math.max(last.h, last.o, last.c);
    last.l = Math.min(last.l, last.o, last.c);
    return candles;
  }

  // ── Independent natural market engine (runs when luck is OFF) ──
  function isEquitySym(s) {
    return s && (s.cat === 'idx' || s.cat === 'stocks');
  }

  function equityBucket(s) {
    return s.cat === 'idx' ? 'idx' : s.cat === 'stocks' ? 'us' : null;
  }

  // Relative tick volatility — stocks move in % of price, not raw vol units
  function equityTickVol(s) {
    // Engine tick residual size. Must be meaningful vs board tick (e.g. BBCA step 25).
    // Goal: bluechip prints every ~0.6–2s, hot names faster, day-change visibly moves.
    let bps = 0.00055;
    if (s.cat === 'idx') {
      const hot = ['GOTO', 'BUKA', 'BUMI', 'CUAN', 'BREN', 'AMMN', 'ARTO', 'BBHI', 'EMTK', 'FILM', 'WIFI', 'BELI', 'NCKL'];
      const mid = ['ADRO', 'MDKA', 'ANTM', 'INCO', 'BRIS', 'ISAT', 'MAPI', 'HEAL', 'EXCL', 'CPIN', 'MEDC', 'PGAS', 'TOWR', 'TBIG'];
      if (hot.includes(s.symbol)) bps = 0.0014;
      else if (mid.includes(s.symbol)) bps = 0.0009;
      else bps = 0.0006; // BBCA, BBRI, TLKM, BMRI…
    } else if (s.cat === 'stocks') {
      const hot = ['TSLA', 'NVDA', 'AMD', 'NFLX', 'META', 'BA', 'COIN', 'PLTR', 'RIVN', 'SOFI', 'HOOD', 'MARA'];
      const quiet = ['KO', 'PFE', 'JPM', 'V', 'INTC', 'WMT', 'PG', 'JNJ', 'MRK', 'PEP'];
      if (hot.includes(s.symbol)) bps = 0.0011;
      else if (quiet.includes(s.symbol)) bps = 0.00035;
      else bps = 0.0006;
    }
    const fromVol = (s.vol / Math.max(1, s.base));
    // Ensure at least ~8–15% of one board tick of residual energy per engine tick on average
    const step = (typeof getEquityStep === 'function') ? getEquityStep(s, s.base) : (s.pip || 1);
    const minVsTick = step * 0.18;
    const blended = Math.max(s.base * bps, s.base * fromVol * 0.02, minVsTick);
    return blended * (state.volatility || 1);
  }

  // IDX / stock tick snap (fractions not allowed on board)
  function getEquityStep(s, price) {
    if (!isEquitySym(s)) return s.pip || 0.0001;
    const tick = s.pip || (s.cat === 'idx' ? 1 : 0.01);
    let step = tick;
    if (s.cat === 'idx') {
      // Simplified BEI tick size by price band
      if (price < 200) step = 1;
      else if (price < 500) step = 2;
      else if (price < 2000) step = 5;
      else if (price < 5000) step = 10;
      else step = 25;
      step = Math.max(step, s.pip || 1);
    } else {
      // US: penny usually; sub-$1 finer feel still 0.01 for demo
      step = Math.max(0.01, tick);
    }
    return step;
  }

  function snapEquityPrice(s, price) {
    if (!isEquitySym(s)) return price;
    const step = getEquityStep(s, price);
    const snapped = Math.round(price / step) * step;
    // fix float noise for US pennies
    const digits = s.digits != null ? s.digits : (s.cat === 'idx' ? 0 : 2);
    const fixed = Number(snapped.toFixed(Math.max(0, digits + 2)));
    return Math.max(step, fixed);
  }

  function ensureMarketState(sym) {
    if (!state.market) state.market = {};
    if (!state.market[sym]) {
      const trend = Math.random() < 0.5 ? -1 : 1;
      const phases = ['trend', 'chop', 'pullback', 'quiet', 'range', 'impulse'];
      const s = getSym(sym);
      const mid = (state.prices[sym] && state.prices[sym].mid) || s.base;
      const eq = isEquitySym(s);
      state.market[sym] = {
        phase: phases[Math.floor(Math.random() * phases.length)],
        phaseLeft: Math.floor(eq ? rand(50, 160) : rand(35, 110)),
        mom: (Math.random() - 0.5) * (eq ? 0.15 : 0.25),
        trend,
        trendLeft: Math.floor(eq ? rand(300, 1200) : rand(220, 800)),
        ticks: Math.floor(Math.random() * 800),
        seed: Math.random() * 1000,
        spikeLeft: 0,
        spikeDir: 0,
        garch: 0.75 + Math.random() * 0.35,
        lastMove: 0,
        rangeMid: mid,
        rangeHalf: eq ? mid * rand(0.004, 0.012) : s.vol * rand(12, 36),
        microDir: 0,
        microLeft: 0,
        magnet: mid * (1 + rand(-0.003, 0.003)),
        magnetLeft: Math.floor(rand(100, 320)),
        // equity: overnight gap leftover decay
        gapLeft: 0,
        gapMove: 0,
        // flat prints exist but not so often that the board freezes
        flatBias: eq ? 0.06 : 0.05,
        // sub-tick residual pressure — accumulates until a board tick prints
        pressure: 0,
      };
    }
    return state.market[sym];
  }

  function pickNextMarketPhase(ms, s, p) {
    const eq = isEquitySym(s);
    const r = Math.random();
    // Equities: more range + quiet, fewer wild impulses (except small caps)
    if (eq) {
      if (r < 0.24) {
        ms.phase = 'trend';
        ms.phaseLeft = Math.floor(rand(50, 180));
      } else if (r < 0.52) {
        ms.phase = 'range';
        ms.phaseLeft = Math.floor(rand(60, 200));
        ms.rangeMid = p.mid;
        ms.rangeHalf = p.mid * rand(0.0035, 0.011) * (0.85 + ms.garch * 0.3);
      } else if (r < 0.68) {
        ms.phase = 'chop';
        ms.phaseLeft = Math.floor(rand(30, 90));
      } else if (r < 0.82) {
        ms.phase = 'pullback';
        ms.phaseLeft = Math.floor(rand(18, 55));
      } else if (r < 0.94) {
        ms.phase = 'quiet';
        ms.phaseLeft = Math.floor(rand(25, 80));
      } else {
        ms.phase = 'impulse';
        ms.phaseLeft = Math.floor(rand(5, 16));
        ms.trend = Math.random() < 0.5 ? -1 : 1;
      }
      return;
    }
    if (r < 0.28) {
      ms.phase = 'trend';
      ms.phaseLeft = Math.floor(rand(40, 140));
    } else if (r < 0.48) {
      ms.phase = 'range';
      ms.phaseLeft = Math.floor(rand(50, 160));
      ms.rangeMid = p.mid;
      ms.rangeHalf = s.vol * rand(14, 42) * (0.8 + ms.garch * 0.4);
    } else if (r < 0.66) {
      ms.phase = 'chop';
      ms.phaseLeft = Math.floor(rand(25, 75));
    } else if (r < 0.80) {
      ms.phase = 'pullback';
      ms.phaseLeft = Math.floor(rand(14, 45));
    } else if (r < 0.90) {
      ms.phase = 'quiet';
      ms.phaseLeft = Math.floor(rand(20, 55));
    } else {
      ms.phase = 'impulse';
      ms.phaseLeft = Math.floor(rand(6, 18));
      ms.trend = Math.random() < 0.5 ? -1 : 1;
    }
  }

  function marketNoise(scale) {
    let n = (Math.random() + Math.random() + Math.random() - 1.5) * 1.15;
    if (Math.random() < 0.04) n *= rand(2.2, 4.8);
    if (Math.random() < 0.025) n = 0;
    return n * scale;
  }

  // Common market factor: IHSG-like (idx) / SPX-like (us)
  function tickEquityBeta() {
    if (!state.eqBeta) {
      state.eqBeta = {
        idx: { level: 0, mom: 0, phase: 'drift', phaseLeft: 80, shockLeft: 0, shockDir: 0 },
        us:  { level: 0, mom: 0, phase: 'drift', phaseLeft: 80, shockLeft: 0, shockDir: 0 },
      };
    }
    ['idx', 'us'].forEach(key => {
      const b = state.eqBeta[key];
      b.phaseLeft--;
      if (b.phaseLeft <= 0) {
        const r = Math.random();
        if (r < 0.4) { b.phase = 'drift'; b.phaseLeft = Math.floor(rand(60, 160)); }
        else if (r < 0.7) { b.phase = 'chop'; b.phaseLeft = Math.floor(rand(30, 90)); }
        else if (r < 0.9) { b.phase = 'trend'; b.phaseLeft = Math.floor(rand(40, 120)); b.mom = (Math.random() < 0.5 ? -1 : 1) * rand(0.2, 0.6); }
        else { b.phase = 'riskoff'; b.phaseLeft = Math.floor(rand(15, 40)); b.mom = -rand(0.3, 0.8); }
      }
      // rare market-wide shock (news / risk event)
      if (b.shockLeft <= 0 && Math.random() < 0.0018) {
        b.shockLeft = Math.floor(rand(3, 10));
        b.shockDir = Math.random() < 0.45 ? -1 : 1;
      }
      let target = 0;
      if (b.phase === 'drift') target = (Math.random() - 0.48) * 0.15; // mild upward drift bias
      else if (b.phase === 'chop') target = (Math.random() - 0.5) * 0.35;
      else if (b.phase === 'trend') target = b.mom * 0.5;
      else if (b.phase === 'riskoff') target = -0.4 + (Math.random() - 0.5) * 0.2;
      b.mom = b.mom * 0.92 + target * 0.08;
      let d = b.mom * 0.000012 + marketNoise(0.000018);
      if (b.shockLeft > 0) {
        d += b.shockDir * rand(0.00008, 0.00025);
        b.shockLeft--;
      }
      // mean-revert factor level slowly
      d -= b.level * 0.002;
      b.level = clamp(b.level + d, -0.025, 0.025);
    });
  }

  // Stock-specific move (IDX + US)
  function equityMarketMove(s, p) {
    const ms = ensureMarketState(s.symbol);
    ms.ticks++;
    ms.phaseLeft--;
    ms.trendLeft--;
    if (ms.magnetLeft > 0) ms.magnetLeft--;
    if (ms.microLeft > 0) ms.microLeft--;
    if (ms.gapLeft > 0) ms.gapLeft--;

    const bucket = equityBucket(s);
    const beta = state.eqBeta && state.eqBeta[bucket];

    // Session trend flip slower for equities
    if (ms.trendLeft <= 0) {
      if (Math.random() < 0.55) ms.trend = -ms.trend;
      else ms.trend = Math.random() < 0.5 ? -1 : 1;
      ms.trendLeft = Math.floor(rand(350, 1400));
    }
    if (ms.phaseLeft <= 0) pickNextMarketPhase(ms, s, p);

    if (ms.magnetLeft <= 0) {
      ms.magnet = p.mid * (1 + rand(-0.002, 0.002));
      ms.magnetLeft = Math.floor(rand(120, 360));
    }

    // Stock-specific news spike (earnings / rumor) — rarer than FX
    if (ms.spikeLeft <= 0 && Math.random() < 0.0022) {
      ms.spikeLeft = Math.floor(rand(2, 7));
      ms.spikeDir = Math.random() < 0.5 ? -1 : 1;
      ms.garch = Math.min(2.4, ms.garch + rand(0.25, 0.7));
    }

    // Order-flow burst (block trade feel)
    if (ms.microLeft <= 0 && Math.random() < 0.06) {
      ms.microLeft = Math.floor(rand(2, 6));
      ms.microDir = Math.random() < 0.58 ? ms.trend : (Math.random() < 0.5 ? -1 : 1);
    }

    // Occasional gap-style residual (open jump digesting)
    if (ms.gapLeft <= 0 && Math.random() < 0.0009) {
      ms.gapLeft = Math.floor(rand(4, 14));
      ms.gapMove = (Math.random() < 0.5 ? -1 : 1) * p.mid * rand(0.001, 0.004);
    }

    // GARCH clustering
    const tickVol0 = equityTickVol(s);
    const innov = Math.abs(ms.lastMove) / (tickVol0 + 1e-9);
    ms.garch = clamp(
      0.95 * ms.garch + 0.05 * (0.7 + innov * 0.85) + (ms.spikeLeft > 0 ? 0.06 : 0),
      0.45,
      2.5
    );

    // Intraday session clock (UTC hour proxy) — lunch lull for IDX-ish, US open energy
    const hr = new Date().getUTCHours();
    let sessionAmp = 1;
    if (s.cat === 'idx') {
      // Demo always "in session" enough to look live; still shapes the day
      if (hr >= 1 && hr < 4) sessionAmp = 1.2;
      else if (hr >= 4 && hr < 7) sessionAmp = 0.9;
      else if (hr >= 7 && hr < 11) sessionAmp = 1.1;
      else sessionAmp = 0.95; // never go dead — after-hours still prints
    } else {
      if (hr >= 13 && hr < 17) sessionAmp = 1.25;
      else if (hr >= 17 && hr < 21) sessionAmp = 1.05;
      else sessionAmp = 0.95;
    }
    sessionAmp *= 0.92 + 0.16 * Math.sin(ms.ticks * 0.01 + ms.seed);

    const vol = tickVol0 * ms.garch * sessionAmp;

    // Momentum targets
    let targetMom = 0;
    if (ms.phase === 'trend') targetMom = ms.trend * rand(0.12, 0.32);
    else if (ms.phase === 'pullback') targetMom = -ms.trend * rand(0.1, 0.28);
    else if (ms.phase === 'impulse') targetMom = ms.trend * rand(0.35, 0.75);
    else if (ms.phase === 'range') {
      const d = (p.mid - ms.rangeMid) / (ms.rangeHalf || p.mid * 0.008);
      targetMom = -clamp(d, -2.2, 2.2) * 0.25 + (Math.random() - 0.5) * 0.08;
    } else if (ms.phase === 'chop') targetMom = (Math.random() - 0.5) * 0.18;
    else targetMom = (Math.random() - 0.5) * 0.04;

    ms.mom = ms.mom * 0.9 + targetMom * 0.1;

    const breath =
      Math.sin(ms.ticks * 0.037 + ms.seed) * vol * 0.09 +
      Math.sin(ms.ticks * 0.009 + ms.seed * 0.4) * vol * 0.06;

    let move = marketNoise(vol * 0.5) + breath + ms.mom * vol;

    // Market beta contribution (stocks move together)
    if (beta) {
      // beta loading 0.4–1.2 depending on name
      let loading = 0.7;
      if (s.cat === 'idx') {
        const highBeta = ['GOTO', 'BUKA', 'BUMI', 'CUAN', 'BREN', 'AMMN', 'ARTO', 'ADRO', 'MDKA'];
        const lowBeta = ['BBCA', 'UNVR', 'KLBF', 'SIDO', 'HMSP', 'ACES'];
        if (highBeta.includes(s.symbol)) loading = 1.15;
        else if (lowBeta.includes(s.symbol)) loading = 0.45;
        else loading = 0.75;
      } else {
        const highBeta = ['TSLA', 'NVDA', 'AMD', 'NFLX', 'META'];
        const lowBeta = ['KO', 'PFE', 'JPM', 'V'];
        if (highBeta.includes(s.symbol)) loading = 1.25;
        else if (lowBeta.includes(s.symbol)) loading = 0.4;
        else loading = 0.8;
      }
      move += beta.level * p.mid * loading * 0.15;
      move += beta.mom * vol * loading * 0.35;
    }

    if (ms.phase === 'trend') {
      move += ms.trend * vol * rand(0.04, 0.14);
      if (Math.random() < 0.3) move -= ms.trend * vol * rand(0.03, 0.14); // counter prints
      if (Math.random() < 0.12) move *= rand(0.05, 0.3); // flat/doji tick
    } else if (ms.phase === 'pullback') {
      const fade = clamp(ms.phaseLeft / 45, 0.25, 1);
      move += -ms.trend * vol * rand(0.05, 0.18) * fade;
      if (Math.random() < 0.25) move += ms.trend * vol * rand(0.02, 0.1);
    } else if (ms.phase === 'impulse') {
      move += ms.trend * vol * rand(0.25, 0.7);
      if (Math.random() < 0.22) move *= rand(0.25, 0.6);
    } else if (ms.phase === 'range') {
      const upper = ms.rangeMid + ms.rangeHalf;
      const lower = ms.rangeMid - ms.rangeHalf;
      if (p.mid > upper) move -= vol * rand(0.25, 0.6);
      else if (p.mid < lower) move += vol * rand(0.25, 0.6);
      else {
        move = marketNoise(vol * 0.85) + ms.mom * vol * 0.4 + breath * 0.5;
      }
      if (Math.random() < 0.06) move = 0;
    } else if (ms.phase === 'chop') {
      move = marketNoise(vol * 1.1) + (Math.random() - 0.5) * vol * 0.3;
      if (Math.random() < 0.4) move *= rand(0.15, 0.7);
      if (Math.random() < 0.14) move = -ms.lastMove * rand(0.4, 1.0);
    } else if (ms.phase === 'quiet') {
      move *= 0.22;
      if (Math.random() < 0.12) move = 0;
    }

    if (ms.microLeft > 0 && ms.microDir) {
      move += ms.microDir * vol * rand(0.08, 0.22);
    }
    if (ms.spikeLeft > 0) {
      move += ms.spikeDir * vol * rand(0.9, 2.2);
      if (ms.spikeLeft === 1 && Math.random() < 0.5) {
        move -= ms.spikeDir * vol * rand(0.5, 1.3); // rejection
      }
      ms.spikeLeft--;
    }
    if (ms.gapLeft > 0) {
      move += ms.gapMove / Math.max(1, ms.gapLeft + 2);
    }

    // Soft magnet (intraday fair zone)
    move -= (p.mid - ms.magnet) * 0.0004;
    // Anchor to listed fair/base so board stays near real market level
    const dist = (p.mid - s.base) / (s.base || 1);
    move -= dist * s.base * 0.00008;
    // Hard-ish pull if drifted > 8% from base (demo realism, not a free random walk forever)
    if (Math.abs(dist) > 0.08) {
      move -= Math.sign(dist) * vol * (0.15 + Math.min(1.2, Math.abs(dist) * 4));
    }

    // Mild continuation
    move += ms.lastMove * rand(0.06, 0.18);

    // Admin bias
    move += state.trendBias * vol * 0.2;

    // Occasional unchanged print (tape realism) — keep low so UI stays alive
    if (Math.random() < ms.flatBias * (ms.phase === 'quiet' ? 1.4 : 1)) {
      move *= 0.15;
    }

    // Cap — allow multi-tick board jumps
    const maxStep = vol * (ms.spikeLeft > 0 ? 4.5 : 2.8);
    move = clamp(move, -maxStep, maxStep);

    // After move, price will be snapped in tickPrices
    ms.lastMove = move;
    return move;
  }

  // Pure market move — NO knowledge of user trades
  function naturalMarketMove(s, p) {
    if (isEquitySym(s)) return equityMarketMove(s, p);

    const ms = ensureMarketState(s.symbol);
    ms.ticks++;
    ms.phaseLeft--;
    ms.trendLeft--;
    if (ms.magnetLeft > 0) ms.magnetLeft--;
    if (ms.microLeft > 0) ms.microLeft--;

    if (ms.trendLeft <= 0) {
      const flip = Math.random();
      if (flip < 0.5) ms.trend = -ms.trend;
      else if (flip < 0.75) ms.trend = Math.random() < 0.5 ? -1 : 1;
      ms.trendLeft = Math.floor(rand(200, 900));
    }

    if (ms.phaseLeft <= 0) pickNextMarketPhase(ms, s, p);

    if (ms.magnetLeft <= 0) {
      ms.magnet = p.mid * (1 + rand(-0.0025, 0.0025));
      ms.magnetLeft = Math.floor(rand(90, 280));
    }

    if (ms.spikeLeft <= 0 && Math.random() < 0.0035) {
      ms.spikeLeft = Math.floor(rand(2, 8));
      ms.spikeDir = Math.random() < 0.5 ? -1 : 1;
      ms.garch = Math.min(2.6, ms.garch + rand(0.35, 0.9));
    }

    if (ms.microLeft <= 0 && Math.random() < 0.08) {
      ms.microLeft = Math.floor(rand(2, 7));
      ms.microDir = Math.random() < 0.5 ? -1 : 1;
      if (Math.random() < 0.55) ms.microDir = ms.trend;
    }

    const innov = Math.abs(ms.lastMove) / (s.vol * state.volatility + 1e-12);
    ms.garch = clamp(
      0.94 * ms.garch + 0.06 * (0.75 + innov * 0.9) + (ms.spikeLeft > 0 ? 0.08 : 0),
      0.4,
      2.7
    );

    const sessionAmp = 0.75 + 0.35 * Math.sin(ms.ticks * 0.007 + ms.seed)
                     + 0.15 * Math.sin(ms.ticks * 0.031 + ms.seed * 0.6);
    const vol = s.vol * state.volatility * ms.garch * sessionAmp;

    let targetMom = 0;
    if (ms.phase === 'trend') targetMom = ms.trend * rand(0.16, 0.38);
    else if (ms.phase === 'pullback') targetMom = -ms.trend * rand(0.12, 0.34);
    else if (ms.phase === 'impulse') targetMom = ms.trend * rand(0.4, 0.85);
    else if (ms.phase === 'range') {
      const d = (p.mid - ms.rangeMid) / (ms.rangeHalf || vol * 20);
      targetMom = -clamp(d, -2.5, 2.5) * 0.28 + (Math.random() - 0.5) * 0.1;
    } else if (ms.phase === 'chop') targetMom = (Math.random() - 0.5) * 0.22;
    else targetMom = (Math.random() - 0.5) * 0.05;

    ms.mom = ms.mom * 0.88 + targetMom * 0.12;

    const breath =
      Math.sin(ms.ticks * 0.041 + ms.seed) * vol * 0.11 +
      Math.sin(ms.ticks * 0.011 + ms.seed * 0.37) * vol * 0.08 +
      Math.sin(ms.ticks * 0.003 + ms.seed * 0.9) * vol * 0.05;

    let brownian = marketNoise(vol * 0.55);
    let move = brownian + breath + ms.mom * vol;

    if (ms.phase === 'trend') {
      move += ms.trend * vol * rand(0.05, 0.16);
      if (Math.random() < 0.32) move -= ms.trend * vol * rand(0.04, 0.18);
      if (Math.random() < 0.1) move *= rand(0.05, 0.25);
    } else if (ms.phase === 'pullback') {
      const fade = clamp(ms.phaseLeft / 40, 0.25, 1);
      move += -ms.trend * vol * rand(0.06, 0.2) * fade;
      if (Math.random() < 0.28) move += ms.trend * vol * rand(0.03, 0.12);
    } else if (ms.phase === 'impulse') {
      move += ms.trend * vol * rand(0.2, 0.55);
      if (Math.random() < 0.2) move *= rand(0.3, 0.7);
    } else if (ms.phase === 'range') {
      const upper = ms.rangeMid + ms.rangeHalf;
      const lower = ms.rangeMid - ms.rangeHalf;
      if (p.mid > upper) move -= vol * rand(0.2, 0.55);
      else if (p.mid < lower) move += vol * rand(0.2, 0.55);
      else move = brownian * 1.05 + ms.mom * vol * 0.55 + breath * 0.7;
      if (Math.random() < 0.12) move *= 0.15;
    } else if (ms.phase === 'chop') {
      move = brownian * 1.25 + (Math.random() - 0.5) * vol * 0.35 + breath * 0.5;
      if (Math.random() < 0.45) move *= rand(0.2, 0.9);
      if (Math.random() < 0.12) move = -ms.lastMove * rand(0.3, 0.9);
    } else if (ms.phase === 'quiet') {
      move *= 0.28;
      if (Math.random() < 0.22) move = 0;
      else if (Math.random() < 0.15) move = marketNoise(vol * 0.15);
    }

    if (ms.microLeft > 0 && ms.microDir) {
      move += ms.microDir * vol * rand(0.06, 0.2);
    }

    if (ms.spikeLeft > 0) {
      move += ms.spikeDir * vol * rand(0.7, 1.8);
      if (ms.spikeLeft === 1 && Math.random() < 0.45) {
        move -= ms.spikeDir * vol * rand(0.4, 1.1);
      }
      ms.spikeLeft--;
    }

    const magDist = p.mid - ms.magnet;
    move -= (magDist / (s.base || 1)) * s.vol * 0.04;

    const dist = (p.mid - s.base) / (s.base || 1);
    move -= dist * s.vol * 0.07;

    move += ms.lastMove * rand(0.08, 0.22);
    move += state.trendBias * s.vol * 0.14 * state.volatility;

    const maxStep = vol * (ms.spikeLeft > 0 ? 2.8 : 2.1);
    move = clamp(move, -maxStep, maxStep);
    move += (Math.random() - 0.5) * s.pip * rand(0.05, 0.35);

    ms.lastMove = move;
    return move;
  }

  function getLuckBiasMap(mode) {
    const luckBias = {};
    if (!state.luck) return luckBias;
    state.positions.forEach(pos => {
      const dir = pos.type === 'buy' ? 1 : -1;
      luckBias[pos.symbol] = (luckBias[pos.symbol] || 0) + dir * Math.max(0.35, Math.min(2.5, pos.lots));
    });
    if (state.luckTicks > 0 && state.luckSymbol) {
      const boost = mode === 'cepat' ? 3.2 : 0.55;
      luckBias[state.luckSymbol] = (luckBias[state.luckSymbol] || 0) + state.luckDir * boost;
    }
    return luckBias;
  }

  function ensureNormalState(sym) {
    if (!state.luckNormal) state.luckNormal = {};
    if (!state.luckNormal[sym]) {
      state.luckNormal[sym] = {
        phase: 'drift',
        phaseLeft: rand(18, 40),
        mom: 0,
        noiseSeed: Math.random() * 1000,
        ticks: 0,
      };
    }
    return state.luckNormal[sym];
  }

  function pickNextNormalPhase(ns, strength) {
    const r = Math.random();
    const driftW = 0.42 + strength * 0.025;
    const chopW = 0.28 - strength * 0.01;
    const pbW = 0.22 - strength * 0.008;
    if (r < driftW) {
      ns.phase = 'drift';
      ns.phaseLeft = Math.floor(rand(22, 55));
    } else if (r < driftW + chopW) {
      ns.phase = 'chop';
      ns.phaseLeft = Math.floor(rand(10, 28));
    } else if (r < driftW + chopW + pbW) {
      ns.phase = 'pullback';
      ns.phaseLeft = Math.floor(rand(8, 22));
    } else {
      ns.phase = 'surge';
      ns.phaseLeft = Math.floor(rand(6, 16));
    }
  }

  // Luck NORMAL mode — mild edge on top of organic motion
  function normalLuckMove(s, dir, strength, biasMag) {
    const ns = ensureNormalState(s.symbol);
    ns.ticks++;
    ns.phaseLeft--;
    if (ns.phaseLeft <= 0) pickNextNormalPhase(ns, strength);

    const vol = s.vol * state.volatility;
    const edge = 0.04 + strength * 0.018;
    const lotScale = 0.75 + Math.min(1.5, biasMag) * 0.2;
    const brownian = (Math.random() - 0.5) * vol * (1.05 + Math.random() * 0.35);

    const targetMom = {
      drift: dir * (0.15 + strength * 0.035),
      surge: dir * (0.35 + strength * 0.05),
      pullback: -dir * (0.2 + strength * 0.02) * (0.5 + Math.random() * 0.7),
      chop: (Math.random() - 0.5) * 0.25,
    }[ns.phase] || 0;

    ns.mom = ns.mom * 0.82 + targetMom * 0.18;

    const breath = Math.sin(ns.ticks * 0.07 + ns.noiseSeed) * vol * 0.12
                 + Math.sin(ns.ticks * 0.019 + ns.noiseSeed * 0.3) * vol * 0.08;

    let move = brownian + breath + ns.mom * vol * lotScale;

    if (ns.phase === 'drift') {
      move += dir * vol * edge * lotScale * (0.6 + Math.random() * 0.8);
      if (Math.random() < 0.34 - strength * 0.012) move -= dir * vol * rand(0.05, 0.22);
    } else if (ns.phase === 'surge') {
      move += dir * vol * (edge * 1.6) * lotScale * (0.8 + Math.random() * 0.5);
      if (Math.random() < 0.2) move += (Math.random() - 0.5) * vol * 0.3;
    } else if (ns.phase === 'pullback') {
      const fade = Math.max(0.25, ns.phaseLeft / 22);
      move += -dir * vol * (0.1 + strength * 0.012) * fade * (0.5 + Math.random());
      if (Math.random() < 0.28) move += dir * vol * rand(0.04, 0.15);
    } else if (ns.phase === 'chop') {
      move = brownian * 1.15 + dir * vol * edge * 0.15 * lotScale;
      if (Math.random() < 0.5) move *= rand(0.4, 1.1);
    }

    if (Math.random() < 0.08) move *= 0.15;
    const maxStep = vol * (0.55 + strength * 0.08);
    move = clamp(move, -maxStep * 1.15, maxStep * 1.15);
    move *= 0.92 + Math.random() * 0.12;
    return { move, phase: ns.phase };
  }

  function tickPrices() {
    const mode = state.luckMode || 'cepat';
    const luckBias = state.luck ? getLuckBiasMap(mode) : {};
    if (state.luck) state.luckPhase = (state.luckPhase || 0) + 1;

    // Advance common equity factors once per tick (market beta)
    tickEquityBeta();

    let activeNormalPhase = null;

    SYMBOLS.forEach(s => {
      const p = state.prices[s.symbol];
      if (!p) return;
      const strength = state.luckStrength || 6;
      let move = 0;

      // Always advance independent market state (keeps world alive)
      const baseMarketMove = naturalMarketMove(s, p);

      if (state.luck && luckBias[s.symbol]) {
        // Luck only hijacks symbols you are trading
        const dir = Math.sign(luckBias[s.symbol]) || state.luckDir || 0;
        const biasMag = Math.abs(luckBias[s.symbol]);

        if (mode === 'cepat') {
          const power = (0.35 + strength * 0.38) * (0.8 + Math.min(2.2, biasMag) * 0.45);
          let candidate = dir * s.vol * power * state.volatility;
          const noiseAmt = s.vol * state.volatility * (0.08 + (11 - strength) * 0.015);
          candidate += (Math.random() - 0.5) * noiseAmt;
          if (dir !== 0 && Math.sign(candidate) !== dir && Math.random() < 0.6 + strength * 0.035) {
            candidate = Math.abs(candidate) * dir * 0.7;
          }
          if (strength >= 4) candidate += dir * s.vol * (0.2 + strength * 0.1);
          // blend tiny market noise so it still breathes
          move = candidate * 0.92 + baseMarketMove * 0.08;
        } else {
          const res = normalLuckMove(s, dir, strength, biasMag);
          // Mix organic luck with underlying market for realism
          move = res.move * 0.75 + baseMarketMove * 0.25;
          if (s.symbol === state.activeSymbol) activeNormalPhase = res.phase;
        }
      } else {
        // ── LUCK OFF (or no position on this symbol): pure natural market ──
        move = baseMarketMove;
      }

      const prevMid = p.mid;
      let nextMid;

      if (isEquitySym(s)) {
        // Residual pressure model: sub-tick moves accumulate until a board tick prints.
        // This is why real IDX boards "jump" by Rp1/5/10/25 instead of drifting continuously.
        const ms = ensureMarketState(s.symbol);
        ms.pressure = (ms.pressure || 0) + move;
        let step = getEquityStep(s, p.mid);
        // Allow multi-tick jumps on spikes / strong flow
        let jumpTicks = 0;
        if (Math.abs(ms.pressure) >= step * 0.72) {
          jumpTicks = Math.trunc(ms.pressure / step) || (ms.pressure > 0 ? 1 : -1);
          const cap = (ms.spikeLeft > 0) ? 14 : (s.cat === 'idx' ? 5 : 8);
          if (jumpTicks > cap) jumpTicks = cap;
          if (jumpTicks < -cap) jumpTicks = -cap;
          ms.pressure -= jumpTicks * step;
          // keep a little residual for follow-through prints
          ms.pressure *= 0.35;
          nextMid = p.mid + jumpTicks * step;
        } else if (Math.abs(ms.pressure) > step * 0.4 && Math.random() < 0.16) {
          jumpTicks = ms.pressure > 0 ? 1 : -1;
          ms.pressure -= jumpTicks * step * 0.55;
          nextMid = p.mid + jumpTicks * step;
        } else {
          nextMid = p.mid;
        }
        // Soft circuit: keep within realistic band of listed base
        const loBand = s.base * 0.88;
        const hiBand = s.base * 1.12;
        if (nextMid < loBand) nextMid = loBand + (nextMid - loBand) * 0.25;
        if (nextMid > hiBand) nextMid = hiBand + (nextMid - hiBand) * 0.25;
        nextMid = snapEquityPrice(s, nextMid);
        nextMid = Math.max(getEquityStep(s, nextMid), nextMid);
        step = getEquityStep(s, nextMid);
      } else {
        nextMid = Math.max(s.pip * 10, p.mid + move);
      }
      p.mid = nextMid;

      // Spread
      let half;
      if (s.cat === 'idx') {
        const step = getEquityStep(s, p.mid);
        // 1 tick typical; wider for less liquid
        const ticksSpread = s.spread >= 50 ? 2 : 1;
        half = (step * ticksSpread) / 2;
      } else if (s.cat === 'stocks') {
        half = (s.spread * s.pip) / 2;
      } else {
        half = (s.spread * s.pip) / 2;
      }
      const prevBid = p.bid;
      if (isEquitySym(s)) {
        p.bid = snapEquityPrice(s, p.mid - half);
        p.ask = snapEquityPrice(s, p.mid + half);
        const step = getEquityStep(s, p.mid);
        if (p.ask <= p.bid) {
          p.ask = p.bid + step;
          p.mid = snapEquityPrice(s, (p.bid + p.ask) / 2);
        }
      } else {
        p.bid = p.mid - half;
        p.ask = p.mid + half;
      }
      p.dir = p.mid > prevMid + 1e-12 ? 1 : p.mid < prevMid - 1e-12 ? -1 : 0;
      if (p.dir !== 0) {
        p.lastPrint = p.mid;
        p.printDir = p.dir;
      }
      p.high = Math.max(p.high || p.mid, p.mid);
      p.low = Math.min(p.low || p.mid, p.mid);
      if (!p.open || !isFinite(p.open) || p.open <= 0) p.open = p.mid;
      p.change = ((p.mid - p.open) / p.open) * 100;

      updateLiveCandle(s.symbol, p.mid);
    });

    // Luck status only when active
    if (state.luck && state.luckTicks > 0) {
      state.luckTicks--;
      if (state.luckTicks <= 0) {
        state.luckDir = 0;
        state.luckSymbol = null;
        const openN = state.positions.length;
        if (openN > 0) {
          updateLuckStatus(mode === 'cepat'
            ? `Cepat · guiding ${openN}`
            : `Normal · market flow · ${openN} pos`);
        } else {
          updateLuckStatus('Standby — place a trade');
        }
      } else {
        const d = state.luckDir > 0 ? '↑' : '↓';
        if (mode === 'cepat') updateLuckStatus(`Cepat impulse ${d} · ${state.luckTicks}`);
        else updateLuckStatus(`Normal · settling ${d}`);
      }
    } else if (state.luck && state.positions.length > 0) {
      const openN = state.positions.length;
      if (mode === 'cepat') {
        updateLuckStatus(`Cepat · guiding ${openN}`);
      } else {
        const phaseLabel = {
          drift: 'naik pelan',
          surge: 'dorongan',
          pullback: 'pullback',
          chop: 'sideways',
        }[activeNormalPhase] || 'flow';
        updateLuckStatus(`Normal · ${phaseLabel} · ${openN} pos`);
      }
    } else if (!state.luck) {
      // Show live market phase on status if panel open (optional quiet)
      const ms = state.market && state.market[state.activeSymbol];
      if (ms && $('#luckStatus') && $('#cheatLuck') && !$('#cheatLuck').checked) {
        // don't spam — only if luck panel visible opts
      }
    }

    updatePositionPnL();
    renderPrices();
    renderAccount();
  }

  function updateLiveCandle(sym, price) {
    const candles = state.candles[sym];
    if (!candles || !candles.length) return;
    const tf = TF_MS[state.timeframe] || TF_MS['15m'];
    const last = candles[candles.length - 1];
    const bucket = Math.floor(now() / tf) * tf;
    const s = getSym(sym);
    const ms = state.market && state.market[sym];
    const g = ms ? ms.garch : 1;
    const phase = ms ? ms.phase : 'chop';

    if (last.t < bucket) {
      // Seed new bar with tiny realistic open wick noise
      const openJitter = (Math.random() - 0.5) * s.vol * 0.05 * g;
      const o = price - openJitter * 0.15;
      const seedW = s.vol * 0.08 * g * Math.random();
      candles.push({
        t: bucket,
        o,
        h: Math.max(o, price) + seedW * Math.random() * 0.3,
        l: Math.min(o, price) - seedW * Math.random() * 0.3,
        c: price,
        v: rand(8, 40) * (0.8 + g * 0.4),
      });
      if (candles.length > 600) candles.shift();
    } else {
      last.c = price;
      // Build high/low with occasional wick extension (rejection prints)
      let hi = Math.max(last.h, price);
      let lo = Math.min(last.l, price);
      if (Math.random() < 0.04 * g) {
        // brief liquidity sweep wick that doesn't stick as close
        const sweep = s.vol * g * rand(0.35, 1.4);
        if (Math.random() < 0.5) hi = Math.max(hi, price + sweep);
        else lo = Math.min(lo, price - sweep);
      }
      last.h = hi;
      last.l = lo;
      // Volume correlates with move size + regime
      const body = Math.abs(price - last.o);
      const volHit = (phase === 'impulse' || phase === 'trend') ? rand(1.2, 6.5)
        : phase === 'quiet' ? rand(0.2, 1.8)
        : rand(0.5, 4.2);
      last.v += volHit * (0.7 + g * 0.5) * (body > s.vol * 0.5 ? 1.3 : 1);
    }
  }

  // ─── Chart Engine ────────────────────────────────────
  const chart = {
    canvas: null,
    wrap: null,
    ctx: null,
    dpr: 1,
    w: 0,
    h: 0,
    pad: { t: 4, r: 72, b: 22, l: 4 },
    hover: null,
    animId: null,
    _bound: false,
    // zoom & pan (panOffset is fractional for smooth drag)
    barCount: 70,
    panOffset: 0,
    minBars: 8,
    maxBars: 450,
    dragging: false,
    dragMoved: false,
    dragStartX: 0,
    dragStartY: 0,
    dragPanStart: 0,
    dragPriceStart: 0,
    priceOffset: 0,
    priceZoom: 1,
    autoFollow: true,
    pinchDist: 0,
    pinchBars: 0,
    pinchPan: 0,
  };

  function defaultBarCount() {
    return TF_BARS[state.timeframe] || 80;
  }

  function candleLen() {
    return (state.candles[state.activeSymbol] || []).length;
  }

  function maxPanFor(barCount) {
    return Math.max(0, candleLen() - barCount);
  }

  function setPan(v, { follow = null } = {}) {
    const maxP = maxPanFor(chart.barCount);
    chart.panOffset = clamp(v, 0, maxP);
    chart.autoFollow = follow != null ? follow : (chart.panOffset < 0.5);
    if (chart.autoFollow) chart.panOffset = 0;
  }

  function setBarCount(n, anchorFrac = 1) {
    const allLen = candleLen();
    if (allLen < 2) return;
    const oldCount = chart.barCount;
    const next = clamp(n, chart.minBars, Math.min(chart.maxBars, allLen));
    if (next === oldCount) {
      updateZoomLabel();
      return;
    }
    // Keep anchor fraction of the view stable
    const end = allLen - chart.panOffset;
    const start = end - oldCount;
    const anchorIdx = start + clamp(anchorFrac, 0, 1) * oldCount;
    const newStart = anchorIdx - clamp(anchorFrac, 0, 1) * next;
    const newEnd = newStart + next;
    chart.barCount = next;
    setPan(allLen - newEnd);
    updateZoomLabel();
  }

  function resetChartView() {
    chart.barCount = Math.min(defaultBarCount(), Math.max(chart.minBars, candleLen() || defaultBarCount()));
    chart.panOffset = 0;
    chart.priceOffset = 0;
    chart.priceZoom = 1;
    chart.autoFollow = true;
    updateZoomLabel();
  }

  function updateZoomLabel() {
    const el = $('#zoomLevel');
    if (!el) return;
    const base = defaultBarCount();
    const pct = Math.round((base / Math.max(1, chart.barCount)) * 100);
    el.textContent = pct + '%';
  }

  function initChart() {
    chart.canvas = $('#chartCanvas');
    chart.wrap = chart.canvas ? chart.canvas.parentElement : null;
    if (!chart.canvas || !chart.wrap) return;
    chart.ctx = chart.canvas.getContext('2d');
    if (!chart.barCount || chart.barCount < chart.minBars) {
      chart.barCount = defaultBarCount();
    }
    resizeChart();
    if (!chart._bound) {
      window.addEventListener('resize', () => {
        resizeChart();
      });
      bindChartInteractions();
      chart._bound = true;
    }
    if (!chart.animId) loopChart();
    updateZoomLabel();
  }

  function resizeChart() {
    if (!chart.canvas || !chart.wrap) return;
    chart.dpr = Math.min(window.devicePixelRatio || 1, 2);
    chart.w = Math.max(1, chart.wrap.clientWidth);
    chart.h = Math.max(1, chart.wrap.clientHeight);
    chart.canvas.width = Math.floor(chart.w * chart.dpr);
    chart.canvas.height = Math.floor(chart.h * chart.dpr);
    chart.canvas.style.width = chart.w + 'px';
    chart.canvas.style.height = chart.h + 'px';
    chart.ctx.setTransform(chart.dpr, 0, 0, chart.dpr, 0, 0);
  }

  function eventXY(e) {
    const el = chart.canvas || chart.wrap;
    const r = el.getBoundingClientRect();
    let clientX, clientY;
    if (e.touches && e.touches.length) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return { x: clientX - r.left, y: clientY - r.top, clientX, clientY };
  }

  function pinchDistance(touches) {
    const a = touches[0], b = touches[1];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }

  function bindChartInteractions() {
    const target = chart.wrap || chart.canvas;
    if (!target) return;

    const onWheel = (e) => {
      if (!state.user) return;
      e.preventDefault();
      e.stopPropagation();
      const { x } = eventXY(e);
      const plotW = Math.max(1, chart.w - chart.pad.l - chart.pad.r);
      const frac = clamp((x - chart.pad.l) / plotW, 0, 1);

      // Normalize wheel delta across devices
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;
      if (e.deltaMode === 2) dy *= chart.h;

      if (e.ctrlKey || e.metaKey) {
        const factor = dy < 0 ? 1.15 : 1 / 1.15;
        chart.priceZoom = clamp(chart.priceZoom * factor, 0.25, 10);
      } else {
        // scroll up = zoom in (fewer bars)
        const factor = dy < 0 ? 0.82 : 1.22;
        zoomAt(frac, factor);
      }
      updateZoomLabel();
    };

    // Attach wheel on both wrap and canvas (capture) so it always fires
    target.addEventListener('wheel', onWheel, { passive: false, capture: true });
    if (chart.canvas && chart.canvas !== target) {
      chart.canvas.addEventListener('wheel', onWheel, { passive: false, capture: true });
    }

    target.addEventListener('mousemove', (e) => {
      if (chart.dragging) return;
      const { x, y } = eventXY(e);
      chart.hover = { x, y };
    });

    target.addEventListener('mouseleave', () => {
      if (!chart.dragging) chart.hover = null;
    });

    target.addEventListener('dblclick', (e) => {
      e.preventDefault();
      resetChartView();
    });

    const onPointerDown = (e) => {
      // ignore clicks on overlay buttons / UI inside chart
      if (e.target && e.target.closest && e.target.closest('button, a, input, .chart-zoom-fab')) return;
      // ignore non-primary mouse button
      if (e.type === 'mousedown' && e.button !== 0) return;
      if (e.touches && e.touches.length >= 2) {
        chart.dragging = false;
        chart.pinchDist = pinchDistance(e.touches);
        chart.pinchBars = chart.barCount;
        chart.pinchPan = chart.panOffset;
        return;
      }
      const { x, y } = eventXY(e);
      chart.dragging = true;
      chart.dragMoved = false;
      chart.dragStartX = x;
      chart.dragStartY = y;
      chart.dragPanStart = chart.panOffset;
      chart.dragPriceStart = chart.priceOffset;
      chart.autoFollow = false;
      if (chart.canvas) chart.canvas.style.cursor = 'grabbing';
      if (target) target.style.cursor = 'grabbing';
      // Prevent text selection / image drag
      if (e.type === 'mousedown') e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (e.touches && e.touches.length >= 2) {
        if (e.cancelable) e.preventDefault();
        const dist = pinchDistance(e.touches);
        if (chart.pinchDist > 0) {
          const ratio = chart.pinchDist / dist;
          const allLen = candleLen();
          const next = clamp(
            Math.round(chart.pinchBars * ratio),
            chart.minBars,
            Math.min(chart.maxBars, allLen || chart.maxBars)
          );
          chart.barCount = next;
          setPan(chart.pinchPan * (chart.pinchBars / Math.max(1, next)), { follow: false });
          updateZoomLabel();
        }
        return;
      }

      if (!chart.dragging) return;
      if (e.cancelable && e.touches) e.preventDefault();

      const { x, y } = eventXY(e);
      const dx = x - chart.dragStartX;
      const dy = y - chart.dragStartY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) chart.dragMoved = true;

      const plotW = Math.max(1, chart.w - chart.pad.l - chart.pad.r);
      // Smooth fractional pan: drag right → show older (increase pan)
      const barsDelta = (-dx / plotW) * chart.barCount;
      setPan(chart.dragPanStart + barsDelta, { follow: false });

      const volH = state.indicators.volume ? chart.h * 0.15 : 0;
      const plotH = Math.max(1, chart.h - chart.pad.t - chart.pad.b - volH);
      chart.priceOffset = chart.dragPriceStart + (dy / plotH);
      chart.hover = { x, y };
    };

    const onPointerUp = () => {
      if (!chart.dragging && chart.pinchDist === 0) return;
      chart.dragging = false;
      chart.pinchDist = 0;
      // Snap auto-follow if near live edge
      if (chart.panOffset < 0.75) {
        chart.panOffset = 0;
        chart.autoFollow = true;
      }
      if (chart.canvas) chart.canvas.style.cursor = 'crosshair';
      if (chart.wrap) chart.wrap.style.cursor = 'crosshair';
    };

    target.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    target.addEventListener('touchstart', onPointerDown, { passive: true });
    target.addEventListener('touchmove', onPointerMove, { passive: false });
    target.addEventListener('touchend', onPointerUp);
    target.addEventListener('touchcancel', onPointerUp);

    // Keyboard shortcuts when chart focused / always while app open
    window.addEventListener('keydown', (e) => {
      if (!state.user) return;
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomAt(0.85, 0.75);
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        zoomAt(0.85, 1.3);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        panBy(Math.max(2, chart.barCount * 0.15));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        panBy(-Math.max(2, chart.barCount * 0.15));
      } else if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        chart.panOffset = 0;
        chart.autoFollow = true;
        chart.priceOffset = 0;
      } else if (e.key === '0' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        resetChartView();
      }
    });
  }

  function bindZoomControls() {
    // Event delegation — works even if toolbar re-rendered
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('#zoomIn, #zoomOut, #zoomReset, #panLeft, #panRight, #panLive, #fabZoomIn, #fabZoomOut, #fabZoomReset');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const id = btn.id;
      if (id === 'zoomIn' || id === 'fabZoomIn') zoomAt(0.9, 0.65);
      else if (id === 'zoomOut' || id === 'fabZoomOut') zoomAt(0.9, 1.5);
      else if (id === 'zoomReset' || id === 'fabZoomReset') resetChartView();
      else if (id === 'panLeft') panBy(Math.max(4, Math.floor(chart.barCount * 0.25)));
      else if (id === 'panRight') panBy(-Math.max(4, Math.floor(chart.barCount * 0.25)));
      else if (id === 'panLive') {
        chart.panOffset = 0;
        chart.autoFollow = true;
        chart.priceOffset = 0;
      }
      updateZoomLabel();
    });
  }

  function zoomAt(anchorFrac, factor) {
    const allLen = candleLen();
    if (allLen < 2) return;
    const oldCount = chart.barCount;
    // Ensure factor actually changes bar count by at least 1–2 bars
    let next = Math.round(oldCount * factor);
    if (next === oldCount) {
      next = factor < 1 ? oldCount - 2 : oldCount + 2;
    }
    next = clamp(next, chart.minBars, Math.min(chart.maxBars, allLen));
    if (next === oldCount) return;

    const end = allLen - chart.panOffset;
    const start = end - oldCount;
    const af = clamp(anchorFrac, 0, 1);
    const anchorIdx = start + af * oldCount;
    const newStart = anchorIdx - af * next;
    const newEnd = newStart + next;
    chart.barCount = next;
    setPan(allLen - newEnd, { follow: false });
    // If zoomed while near live and anchor on right, stay live
    if (af > 0.85 && chart.panOffset < 1) {
      chart.panOffset = 0;
      chart.autoFollow = true;
    }
    updateZoomLabel();
  }

  function panBy(bars) {
    setPan(chart.panOffset + bars, { follow: false });
    updateZoomLabel();
  }

  function getVisibleCandles() {
    const all = state.candles[state.activeSymbol] || [];
    if (!all.length) return [];
    let n = clamp(Math.round(chart.barCount), chart.minBars, Math.min(chart.maxBars, all.length));
    chart.barCount = n;
    const maxP = Math.max(0, all.length - n);
    if (chart.autoFollow) chart.panOffset = 0;
    chart.panOffset = clamp(chart.panOffset, 0, maxP);
    const end = Math.round(all.length - chart.panOffset);
    const start = Math.max(0, end - n);
    const sliceEnd = Math.min(all.length, start + n);
    return all.slice(start, sliceEnd);
  }

  function ma(data, period, key = 'c') {
    const out = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) { out.push(null); continue; }
      let sum = 0;
      for (let j = i - period + 1; j <= i; j++) sum += data[j][key];
      out.push(sum / period);
    }
    return out;
  }

  function ema(data, period, key = 'c') {
    const out = [];
    const k = 2 / (period + 1);
    let prev = null;
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) { out.push(null); continue; }
      if (prev == null) {
        let sum = 0;
        for (let j = i - period + 1; j <= i; j++) sum += data[j][key];
        prev = sum / period;
      } else {
        prev = data[i][key] * k + prev * (1 - k);
      }
      out.push(prev);
    }
    return out;
  }

  function bollinger(data, period = 20, mult = 2) {
    const mid = ma(data, period);
    const upper = [], lower = [];
    for (let i = 0; i < data.length; i++) {
      if (mid[i] == null) { upper.push(null); lower.push(null); continue; }
      let sum = 0;
      for (let j = i - period + 1; j <= i; j++) sum += Math.pow(data[j].c - mid[i], 2);
      const sd = Math.sqrt(sum / period);
      upper.push(mid[i] + mult * sd);
      lower.push(mid[i] - mult * sd);
    }
    return { mid, upper, lower };
  }


  function heikinAshi(data) {
    const out = [];
    let prevHa = null;
    for (let i = 0; i < data.length; i++) {
      const c = data[i];
      const haC = (c.o + c.h + c.l + c.c) / 4;
      const haO = prevHa ? (prevHa.o + prevHa.c) / 2 : (c.o + c.c) / 2;
      const haH = Math.max(c.h, haO, haC);
      const haL = Math.min(c.l, haO, haC);
      const ha = { t: c.t, o: haO, h: haH, l: haL, c: haC, v: c.v, _src: c };
      out.push(ha);
      prevHa = ha;
    }
    return out;
  }

  function rsi(data, period = 14) {
    const out = new Array(data.length).fill(null);
    if (data.length < period + 1) return out;
    let gain = 0, loss = 0;
    for (let i = 1; i <= period; i++) {
      const d = data[i].c - data[i - 1].c;
      if (d >= 0) gain += d; else loss -= d;
    }
    let avgGain = gain / period;
    let avgLoss = loss / period;
    out[period] = avgLoss === 0 ? 100 : 100 - (100 / (1 + avgGain / avgLoss));
    for (let i = period + 1; i < data.length; i++) {
      const d = data[i].c - data[i - 1].c;
      const g = d > 0 ? d : 0;
      const l = d < 0 ? -d : 0;
      avgGain = (avgGain * (period - 1) + g) / period;
      avgLoss = (avgLoss * (period - 1) + l) / period;
      out[i] = avgLoss === 0 ? 100 : 100 - (100 / (1 + avgGain / avgLoss));
    }
    return out;
  }

  function macd(data, fast = 12, slow = 26, signal = 9) {
    const closes = data.map(c => c.c);
    const emaArr = (arr, p) => {
      const out = new Array(arr.length).fill(null);
      if (arr.length < p) return out;
      let k = 2 / (p + 1);
      let prev = 0;
      for (let i = 0; i < p; i++) prev += arr[i];
      prev /= p;
      out[p - 1] = prev;
      for (let i = p; i < arr.length; i++) {
        prev = arr[i] * k + prev * (1 - k);
        out[i] = prev;
      }
      return out;
    };
    const ef = emaArr(closes, fast);
    const es = emaArr(closes, slow);
    const line = closes.map((_, i) => (ef[i] != null && es[i] != null) ? ef[i] - es[i] : null);
    // signal EMA on macd line values (skip nulls carefully)
    const sig = new Array(line.length).fill(null);
    const hist = new Array(line.length).fill(null);
    let seed = [];
    let prev = null;
    const k = 2 / (signal + 1);
    for (let i = 0; i < line.length; i++) {
      if (line[i] == null) continue;
      if (prev == null) {
        seed.push(line[i]);
        if (seed.length === signal) {
          prev = seed.reduce((a, b) => a + b, 0) / signal;
          sig[i] = prev;
          hist[i] = line[i] - prev;
        }
      } else {
        prev = line[i] * k + prev * (1 - k);
        sig[i] = prev;
        hist[i] = line[i] - prev;
      }
    }
    return { line, signal: sig, hist };
  }

  function vwapSeries(data) {
    const out = new Array(data.length).fill(null);
    let cumPV = 0, cumV = 0;
    for (let i = 0; i < data.length; i++) {
      const c = data[i];
      const tp = (c.h + c.l + c.c) / 3;
      const v = Math.max(0.0001, c.v || 1);
      cumPV += tp * v;
      cumV += v;
      out[i] = cumPV / cumV;
    }
    return out;
  }

  const CHART_TYPES = {
    candle:   { name: 'Candles', icon: '▣' },
    hollow:   { name: 'Hollow', icon: '▢' },
    heikin:   { name: 'Heikin Ashi', icon: '◈' },
    bars:     { name: 'Bars', icon: '⊞' },
    line:     { name: 'Line', icon: '╱' },
    markers:  { name: 'Markers', icon: '⋯' },
    step:     { name: 'Step', icon: '⊟' },
    area:     { name: 'Area', icon: '▭' },
    baseline: { name: 'Baseline', icon: '═' },
    mountain: { name: 'Mountain', icon: '⛰' },
    hlc:      { name: 'High-Low', icon: '↕' },
    columns:  { name: 'Columns', icon: '▮' },
  };

  function setChartType(type, { silent = false } = {}) {
    if (!CHART_TYPES[type]) type = 'candle';
    state.chartType = type;
    const meta = CHART_TYPES[type];
    const icon = $('#ctIcon');
    const label = $('#ctLabel');
    if (icon) icon.textContent = meta.icon;
    if (label) label.textContent = meta.name;
    $$('#chartTypeGrid .ct-item').forEach(el => {
      el.classList.toggle('active', el.dataset.chart === type);
    });
    const btn = $('#chartTypeBtn');
    if (btn) btn.classList.add('active');
    closeChartTypeMenu();
    try { localStorage.setItem('mt_chart_type', type); } catch {}
    if (!silent) toast('Chart Type', meta.name, 'info');
  }

  function closeChartTypeMenu() {
    const menu = $('#chartTypeMenu');
    const btn = $('#chartTypeBtn');
    if (menu) menu.hidden = true;
    if (btn) btn.classList.remove('open');
  }

  function toggleChartTypeMenu(force) {
    const menu = $('#chartTypeMenu');
    const btn = $('#chartTypeBtn');
    if (!menu || !btn) return;
    const open = force != null ? force : menu.hidden;
    menu.hidden = !open;
    btn.classList.toggle('open', open);
  }


  function loopChart() {
    drawChart();
    chart.animId = requestAnimationFrame(loopChart);
  }

  /* ═══════════════════════════════════════════════════════
     MetaTrader 5–style chart renderer
     Classic black chart, OHLC candles, right price axis,
     Ask/Bid lines, trade levels, volume histogram
     ═══════════════════════════════════════════════════════ */

  const MT5 = {
    bg: '#000000',
    grid: '#1A1A1A',
    gridBold: '#2A2A2A',
    axisBg: '#0C0C0C',
    axisBorder: '#333333',
    axisText: '#B0B0B0',
    axisTextDim: '#707070',
    bull: '#00A651',       // MT5 default bullish (green fill)
    bullBorder: '#00C853',
    bear: '#E53935',       // MT5 bearish
    bearBorder: '#FF5252',
    bullWick: '#00A651',
    bearWick: '#E53935',
    bid: '#F0A030',        // orange bid line (classic MT5)
    ask: '#2090E0',        // blue ask line
    ma: '#1E88E5',
    ema: '#AB47BC',
    bb: '#546E7A',
    bbFill: 'rgba(84,110,122,0.08)',
    cross: '#808080',
    volUp: 'rgba(0,166,81,0.45)',
    volDn: 'rgba(229,57,53,0.45)',
    buyLine: '#00A651',
    sellLine: '#E53935',
    slLine: '#E53935',
    tpLine: '#00A651',
    text: '#C8C8C8',
    watermark: 'rgba(255,255,255,0.04)',
  };

  function drawLine(ctx, data, xAt, yAt, color, lw) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lw || 1;
    ctx.lineJoin = 'miter';
    ctx.lineCap = 'butt';
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < data.length; i++) {
      const v = data[i];
      if (v == null || isNaN(v)) { started = false; continue; }
      const x = xAt(i), y = yAt(v);
      if (!started) { ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawSmoothLine(ctx, data, xAt, yAt, color, lw) {
    drawLine(ctx, data, xAt, yAt, color, lw);
  }

  function roundRect(ctx, x, y, w, h, r) {
    const rr = Math.min(r || 0, w / 2, h / 2);
    ctx.beginPath();
    if (rr <= 0) {
      ctx.rect(x, y, w, h);
    } else {
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
    }
    ctx.closePath();
  }

  // MT5-style trade level: dashed line + right-side price tag + left label
  function drawPriceLine(ctx, y, w, pad, color, label, dashed, tagBg) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.setLineDash(dashed ? [4, 3] : [6, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.l, Math.round(y) + 0.5);
    ctx.lineTo(w - pad.r, Math.round(y) + 0.5);
    ctx.stroke();
    ctx.setLineDash([]);

    if (label) {
      ctx.font = '11px Tahoma, Arial, sans-serif';
      const tw = ctx.measureText(label).width + 10;
      const th = 16;
      const lx = pad.l + 2;
      const ly = Math.round(y) - th / 2;
      ctx.fillStyle = tagBg || color;
      ctx.fillRect(lx, ly, tw, th);
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, lx + 5, Math.round(y) + 0.5);
    }
    ctx.restore();
  }

  // Nice MT5-like price step
  function nicePriceStep(range, targetLines) {
    const rough = range / Math.max(2, targetLines);
    if (rough <= 0 || !isFinite(rough)) return 0.0001;
    const exp = Math.floor(Math.log10(rough));
    const base = Math.pow(10, exp);
    const frac = rough / base;
    let nice;
    if (frac < 1.5) nice = 1;
    else if (frac < 3) nice = 2;
    else if (frac < 7) nice = 5;
    else nice = 10;
    return nice * base;
  }

  function formatAxisPrice(p, digits) {
    return Number(p).toFixed(digits);
  }

  function drawChart() {
    const ctx = chart.ctx;
    if (!ctx) return;
    let { w, h } = chart;
    if (!w || !h) return;

    // MT5 layout padding: left gutter, right price scale, bottom time scale
    const pad = { t: 4, r: 72, b: 22, l: 4 };
    chart.pad = pad;

    // Disable fancy smoothing — MT5 is pixel-crisp
    ctx.imageSmoothingEnabled = false;

    // ── Pure black MT5 background ──
    ctx.fillStyle = MT5.bg;
    ctx.fillRect(0, 0, w, h);

    const candles = getVisibleCandles();
    if (candles.length < 2) {
      ctx.fillStyle = MT5.axisTextDim;
      ctx.font = '12px Tahoma, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Waiting for market data...', w / 2, h / 2);
      return;
    }

    const s = getSym(state.activeSymbol);
    const digits = s.digits;
    const plotW = w - pad.l - pad.r;
    const showVol = !!state.indicators.volume;
    const volH = showVol ? Math.max(40, Math.floor(h * 0.16)) : 0;
    const sepH = showVol ? 1 : 0;
    const plotH = h - pad.t - pad.b - volH - sepH;
    const volTop = pad.t + plotH + sepH;

    // ── Price range ──
    let minP = Infinity, maxP = -Infinity, maxV = 1;
    for (let i = 0; i < candles.length; i++) {
      const c = candles[i];
      if (c.l < minP) minP = c.l;
      if (c.h > maxP) maxP = c.h;
      if (c.v > maxV) maxV = c.v;
    }

    if (state.indicators.ma) {
      const m = ma(candles, 20);
      for (let i = 0; i < m.length; i++) if (m[i] != null) { minP = Math.min(minP, m[i]); maxP = Math.max(maxP, m[i]); }
    }
    if (state.indicators.ema) {
      const m = ema(candles, 50);
      for (let i = 0; i < m.length; i++) if (m[i] != null) { minP = Math.min(minP, m[i]); maxP = Math.max(maxP, m[i]); }
    }
    if (state.indicators.bb) {
      const bb = bollinger(candles);
      for (let i = 0; i < bb.upper.length; i++) {
        if (bb.upper[i] != null) maxP = Math.max(maxP, bb.upper[i]);
        if (bb.lower[i] != null) minP = Math.min(minP, bb.lower[i]);
      }
    }

    // Include Bid/Ask + open positions in scale
    const px = state.prices[state.activeSymbol];
    if (px) {
      minP = Math.min(minP, px.bid, px.ask);
      maxP = Math.max(maxP, px.bid, px.ask);
    }
    state.positions.filter(p => p.symbol === state.activeSymbol).forEach(p => {
      minP = Math.min(minP, p.openPrice);
      maxP = Math.max(maxP, p.openPrice);
      if (p.sl) { minP = Math.min(minP, p.sl); maxP = Math.max(maxP, p.sl); }
      if (p.tp) { minP = Math.min(minP, p.tp); maxP = Math.max(maxP, p.tp); }
    });

    let range = (maxP - minP) || s.pip * 40;
    // MT5-like padding (~5%)
    minP -= range * 0.05;
    maxP += range * 0.05;
    range = maxP - minP;

    // Vertical zoom / pan
    const mid = (minP + maxP) / 2;
    const half = (range / 2) / (chart.priceZoom || 1);
    const panShift = (chart.priceOffset || 0) * range;
    minP = mid - half + panShift;
    maxP = mid + half + panShift;
    range = maxP - minP || s.pip;

    const n = candles.length;
    // MT5 candle geometry: bar width based on count, small gap
    const slot = plotW / n;
    const bodyW = Math.max(1, Math.min(17, slot * 0.7));
    const wickW = bodyW >= 4 ? 1 : 1;

    const xAt = (i) => pad.l + (i + 0.5) * slot;
    const yAt = (p) => pad.t + (1 - (p - minP) / range) * plotH;

    // ── Right price scale background (MT5) ──
    ctx.fillStyle = MT5.axisBg;
    ctx.fillRect(w - pad.r, 0, pad.r, h);
    // ── Bottom time scale background ──
    ctx.fillStyle = MT5.axisBg;
    ctx.fillRect(0, h - pad.b, w, pad.b);
    // Scale borders
    ctx.strokeStyle = MT5.axisBorder;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w - pad.r + 0.5, 0);
    ctx.lineTo(w - pad.r + 0.5, h - pad.b);
    ctx.moveTo(0, h - pad.b + 0.5);
    ctx.lineTo(w, h - pad.b + 0.5);
    ctx.stroke();

    // ── Horizontal grid + price labels (MT5 style) ──
    const step = nicePriceStep(range, Math.max(4, Math.floor(plotH / 36)));
    const first = Math.ceil(minP / step) * step;
    ctx.font = '11px Tahoma, Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    for (let price = first; price <= maxP + step * 0.01; price += step) {
      const y = yAt(price);
      if (y < pad.t - 2 || y > pad.t + plotH + 2) continue;
      const yy = Math.round(y) + 0.5;

      // grid line across plot
      if (state.indicators.grid !== false) {
        ctx.strokeStyle = MT5.grid;
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(pad.l, yy);
        ctx.lineTo(w - pad.r, yy);
        ctx.stroke();
      }

      // tick on scale
      ctx.strokeStyle = MT5.axisBorder;
      ctx.beginPath();
      ctx.moveTo(w - pad.r, yy);
      ctx.lineTo(w - pad.r + 4, yy);
      ctx.stroke();

      // price label
      ctx.fillStyle = MT5.axisText;
      ctx.fillText(formatAxisPrice(price, digits), w - pad.r + 7, y);
    }

    // ── Vertical grid + time labels ──
    const timeStep = Math.max(1, Math.floor(n / 8));
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i < n; i += timeStep) {
      const x = Math.round(xAt(i)) + 0.5;
      if (state.indicators.grid !== false) {
        ctx.strokeStyle = MT5.grid;
        ctx.beginPath();
        ctx.moveTo(x, pad.t);
        ctx.lineTo(x, pad.t + plotH);
        ctx.stroke();
      }

      // time tick
      ctx.strokeStyle = MT5.axisBorder;
      ctx.beginPath();
      ctx.moveTo(x, h - pad.b);
      ctx.lineTo(x, h - pad.b + 4);
      ctx.stroke();

      const d = new Date(candles[i].t);
      const label = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
      ctx.fillStyle = MT5.axisTextDim;
      ctx.font = '11px Tahoma, Arial, sans-serif';
      ctx.fillText(label, xAt(i), h - pad.b + 6);
    }

    // Plot area border
    ctx.strokeStyle = MT5.axisBorder;
    ctx.strokeRect(pad.l + 0.5, pad.t + 0.5, plotW - 1, plotH - 1);

    // ── Bollinger (MT5-like thin grey) ──
    if (state.indicators.bb) {
      const bb = bollinger(candles);
      ctx.save();
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < bb.upper.length; i++) {
        if (bb.upper[i] == null) continue;
        const x = xAt(i), y = yAt(bb.upper[i]);
        if (!started) { ctx.moveTo(x, y); started = true; }
        else ctx.lineTo(x, y);
      }
      for (let i = bb.lower.length - 1; i >= 0; i--) {
        if (bb.lower[i] == null) continue;
        ctx.lineTo(xAt(i), yAt(bb.lower[i]));
      }
      ctx.closePath();
      ctx.fillStyle = MT5.bbFill;
      ctx.fill();
      ctx.restore();
      drawLine(ctx, bb.upper, xAt, yAt, MT5.bb, 1);
      drawLine(ctx, bb.lower, xAt, yAt, MT5.bb, 1);
      drawLine(ctx, bb.mid, xAt, yAt, 'rgba(120,144,156,0.7)', 1);
    }

    // ── MA / EMA ──
    if (state.indicators.ma) {
      drawLine(ctx, ma(candles, 20), xAt, yAt, MT5.ma, 1);
    }
    if (state.indicators.ema) {
      drawLine(ctx, ema(candles, 50), xAt, yAt, MT5.ema, 1);
    }

    // ── Series transform (Heikin Ashi) ──
    const ctype = state.chartType || 'candle';
    const series = ctype === 'heikin' ? heikinAshi(candles) : candles;

    // ── VWAP overlay (before main series) ──
    if (state.indicators.vwap) {
      drawLine(ctx, vwapSeries(candles), xAt, yAt, '#FFB300', 1.25);
    }

    // ── Multi chart type renderer ──
    const drawCandleBody = (c, i, { hollow = false } = {}) => {
      const x = Math.round(xAt(i));
      const up = c.c >= c.o;
      const yO = yAt(c.o);
      const yC = yAt(c.c);
      const yH = yAt(c.h);
      const yL = yAt(c.l);
      const top = Math.min(yO, yC);
      const bot = Math.max(yO, yC);
      let bodyH = bot - top;
      if (bodyH < 1) bodyH = 1;
      const col = up ? MT5.bull : MT5.bear;
      const border = up ? MT5.bullBorder : MT5.bearBorder;
      ctx.strokeStyle = col;
      ctx.lineWidth = wickW;
      ctx.beginPath();
      ctx.moveTo(x + 0.5, Math.round(yH) + 0.5);
      ctx.lineTo(x + 0.5, Math.round(yL) + 0.5);
      ctx.stroke();
      const bx = Math.round(x - bodyW / 2);
      const by = Math.round(top);
      const bw = Math.max(1, Math.round(bodyW));
      const bh = Math.max(1, Math.round(bodyH));
      if (hollow && up) {
        ctx.fillStyle = MT5.bg;
        ctx.fillRect(bx, by, bw, bh);
        ctx.strokeStyle = border;
        ctx.lineWidth = 1;
        ctx.strokeRect(bx + 0.5, by + 0.5, Math.max(0, bw - 1), Math.max(0, bh - 1));
      } else {
        ctx.fillStyle = col;
        ctx.fillRect(bx, by, bw, bh);
        if (bw >= 3) {
          ctx.strokeStyle = border;
          ctx.lineWidth = 1;
          ctx.strokeRect(bx + 0.5, by + 0.5, bw - 1, bh - 1);
        }
      }
    };

    if (ctype === 'candle' || ctype === 'heikin') {
      for (let i = 0; i < n; i++) drawCandleBody(series[i], i, { hollow: false });
    } else if (ctype === 'hollow') {
      for (let i = 0; i < n; i++) drawCandleBody(series[i], i, { hollow: true });
    } else if (ctype === 'bars') {
      // Classic OHLC bars
      for (let i = 0; i < n; i++) {
        const c = series[i];
        const x = Math.round(xAt(i)) + 0.5;
        const up = c.c >= c.o;
        const col = up ? MT5.bull : MT5.bear;
        const yH = Math.round(yAt(c.h)) + 0.5;
        const yL = Math.round(yAt(c.l)) + 0.5;
        const yO = Math.round(yAt(c.o)) + 0.5;
        const yC = Math.round(yAt(c.c)) + 0.5;
        const tick = Math.max(2, Math.min(8, bodyW * 0.55));
        ctx.strokeStyle = col;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, yH); ctx.lineTo(x, yL);
        ctx.moveTo(x - tick, yO); ctx.lineTo(x, yO);
        ctx.moveTo(x, yC); ctx.lineTo(x + tick, yC);
        ctx.stroke();
      }
    } else if (ctype === 'hlc') {
      for (let i = 0; i < n; i++) {
        const c = series[i];
        const x = Math.round(xAt(i)) + 0.5;
        const up = c.c >= c.o;
        ctx.strokeStyle = up ? MT5.bull : MT5.bear;
        ctx.lineWidth = Math.max(1, Math.min(3, bodyW * 0.35));
        ctx.beginPath();
        ctx.moveTo(x, Math.round(yAt(c.h)) + 0.5);
        ctx.lineTo(x, Math.round(yAt(c.l)) + 0.5);
        ctx.stroke();
        // close tick
        const tick = Math.max(2, bodyW * 0.4);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, Math.round(yAt(c.c)) + 0.5);
        ctx.lineTo(x + tick, Math.round(yAt(c.c)) + 0.5);
        ctx.stroke();
      }
    } else if (ctype === 'columns') {
      for (let i = 0; i < n; i++) {
        const c = series[i];
        const x = Math.round(xAt(i));
        const up = c.c >= c.o;
        const yO = yAt(c.o);
        const yC = yAt(c.c);
        const top = Math.min(yO, yC);
        const bot = Math.max(yO, yC);
        const bh = Math.max(1, Math.round(bot - top));
        const bw = Math.max(1, Math.round(bodyW));
        ctx.fillStyle = up ? MT5.bull : MT5.bear;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(Math.round(x - bw / 2), Math.round(top), bw, bh);
        ctx.globalAlpha = 1;
      }
    } else if (ctype === 'line' || ctype === 'markers' || ctype === 'step' || ctype === 'area' || ctype === 'mountain' || ctype === 'baseline') {
      const closes = series.map(c => c.c);
      const basePrice = series[0] ? series[0].c : closes[0];
      const yBase = yAt(basePrice);

      if (ctype === 'area' || ctype === 'mountain' || ctype === 'baseline') {
        ctx.save();
        if (ctype === 'baseline') {
          // above baseline
          ctx.beginPath();
          let started = false;
          for (let i = 0; i < n; i++) {
            const x = xAt(i), y = yAt(closes[i]);
            if (!started) { ctx.moveTo(x, yBase); ctx.lineTo(x, y); started = true; }
            else ctx.lineTo(x, y);
          }
          ctx.lineTo(xAt(n - 1), yBase);
          ctx.closePath();
          ctx.fillStyle = 'rgba(0,166,81,0.15)';
          ctx.fill();
          // clip-ish second pass for below: draw segments
          ctx.beginPath();
          started = false;
          for (let i = 0; i < n; i++) {
            const x = xAt(i), y = yAt(closes[i]);
            if (!started) { ctx.moveTo(x, yBase); ctx.lineTo(x, y); started = true; }
            else ctx.lineTo(x, y);
          }
          ctx.lineTo(xAt(n - 1), yBase);
          ctx.closePath();
          // simpler: full fill then overlay baseline color by path color later
        } else {
          ctx.beginPath();
          for (let i = 0; i < n; i++) {
            const x = xAt(i), y = yAt(closes[i]);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.lineTo(xAt(n - 1), pad.t + plotH);
          ctx.lineTo(xAt(0), pad.t + plotH);
          ctx.closePath();
          if (ctype === 'mountain') {
            const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + plotH);
            grad.addColorStop(0, 'rgba(30,136,229,0.35)');
            grad.addColorStop(0.55, 'rgba(30,136,229,0.12)');
            grad.addColorStop(1, 'rgba(30,136,229,0.02)');
            ctx.fillStyle = grad;
          } else {
            ctx.fillStyle = 'rgba(30,136,229,0.14)';
          }
          ctx.fill();
        }
        ctx.restore();
      }

      if (ctype === 'step') {
        ctx.save();
        ctx.strokeStyle = '#1E88E5';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const x = xAt(i), y = yAt(closes[i]);
          if (i === 0) ctx.moveTo(x, y);
          else {
            const prevY = yAt(closes[i - 1]);
            ctx.lineTo(x, prevY);
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.restore();
      } else if (ctype === 'baseline') {
        // colored segments above/below baseline
        ctx.save();
        ctx.lineWidth = 1.6;
        for (let i = 1; i < n; i++) {
          const x0 = xAt(i - 1), y0 = yAt(closes[i - 1]);
          const x1 = xAt(i), y1 = yAt(closes[i]);
          const mid = (closes[i - 1] + closes[i]) / 2;
          ctx.strokeStyle = mid >= basePrice ? MT5.bull : MT5.bear;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }
        // baseline
        ctx.strokeStyle = 'rgba(180,180,180,0.55)';
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(pad.l, Math.round(yBase) + 0.5);
        ctx.lineTo(w - pad.r, Math.round(yBase) + 0.5);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      } else {
        drawLine(ctx, closes, xAt, yAt, ctype === 'mountain' ? '#42A5F5' : '#1E88E5', ctype === 'mountain' ? 1.8 : 1.5);
      }

      if (ctype === 'markers') {
        const stepM = Math.max(1, Math.floor(n / 40));
        for (let i = 0; i < n; i += stepM) {
          const x = xAt(i), y = yAt(closes[i]);
          ctx.fillStyle = '#1E88E5';
          ctx.beginPath();
          ctx.arc(x, y, Math.max(1.5, Math.min(3, bodyW * 0.25)), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // ── Volume histogram (MT5 bottom pane style) ──
    if (showVol && volH > 8) {
      // separator line
      ctx.strokeStyle = MT5.axisBorder;
      ctx.beginPath();
      ctx.moveTo(pad.l, volTop - 0.5);
      ctx.lineTo(w - pad.r, volTop - 0.5);
      ctx.stroke();

      // "Volume" label
      ctx.fillStyle = MT5.axisTextDim;
      ctx.font = '10px Tahoma, Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('Volume', pad.l + 4, volTop + 2);

      const volMaxH = volH - 16;
      for (let i = 0; i < n; i++) {
        const c = candles[i];
        const x = Math.round(xAt(i));
        const vh = Math.max(1, (c.v / maxV) * volMaxH);
        const up = c.c >= c.o;
        const bw = Math.max(1, Math.round(bodyW * 0.85));
        ctx.fillStyle = up ? MT5.volUp : MT5.volDn;
        ctx.fillRect(Math.round(x - bw / 2), Math.round(volTop + volH - 4 - vh), bw, Math.round(vh));
      }

      // volume scale mini labels on right
      ctx.fillStyle = MT5.axisTextDim;
      ctx.font = '10px Tahoma, Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(Math.round(maxV)), w - pad.r + 7, volTop + 10);
    }


    // ── RSI panel ──
    if (state.indicators.rsi) {
      const rsiH = Math.max(36, Math.floor(h * 0.12));
      // squeeze plot already drawn — overlay RSI in bottom of main or above volume
      const rsiTop = showVol ? (volTop - 2) : (pad.t + plotH - rsiH);
      // draw in a strip just above volume / bottom of plot by reusing lower plot area hint
      // Use dedicated strip overlapping lower padding of plot for visibility
      const rTop = pad.t + plotH - rsiH;
      const rH = rsiH - 4;
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(pad.l, rTop, plotW, rH + 4);
      ctx.strokeStyle = MT5.axisBorder;
      ctx.strokeRect(pad.l + 0.5, rTop + 0.5, plotW - 1, rH + 3);
      const rVals = rsi(candles, 14);
      const yR = (v) => rTop + 2 + (1 - v / 100) * rH;
      // bands 30/70
      [30, 70].forEach(lv => {
        const yy = Math.round(yR(lv)) + 0.5;
        ctx.strokeStyle = 'rgba(128,128,128,0.35)';
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(pad.l, yy); ctx.lineTo(w - pad.r, yy); ctx.stroke();
        ctx.setLineDash([]);
      });
      ctx.strokeStyle = '#AB47BC';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      let st = false;
      for (let i = 0; i < rVals.length; i++) {
        if (rVals[i] == null) { st = false; continue; }
        const x = xAt(i), y = yR(rVals[i]);
        if (!st) { ctx.moveTo(x, y); st = true; } else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = MT5.axisTextDim;
      ctx.font = '10px Tahoma, Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('RSI(14)', pad.l + 4, rTop + 3);
      const lastR = [...rVals].reverse().find(v => v != null);
      if (lastR != null) {
        ctx.fillStyle = '#AB47BC';
        ctx.fillText(lastR.toFixed(1), pad.l + 54, rTop + 3);
      }
    }

    // ── MACD panel (compact, above volume label area) ──
    if (state.indicators.macd) {
      const mH = Math.max(32, Math.floor(h * 0.11));
      const mTop = pad.t + 4;
      // small floating panel top-left of plot to avoid clashing volume
      // place just under top of plot as thin strip
      const boxW = plotW;
      const boxTop = pad.t + 2;
      // Actually place near bottom above volume if no RSI, else stack
      const boxY = state.indicators.rsi
        ? (pad.t + plotH - Math.max(36, Math.floor(h * 0.12)) - mH - 2)
        : (showVol ? volTop - mH - 2 : pad.t + plotH - mH);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(pad.l, boxY, boxW, mH);
      ctx.strokeStyle = MT5.axisBorder;
      ctx.strokeRect(pad.l + 0.5, boxY + 0.5, boxW - 1, mH - 1);
      const m = macd(candles);
      let minM = 0, maxM = 0;
      for (let i = 0; i < n; i++) {
        const hst = m.hist[i];
        const ln = m.line[i];
        const sg = m.signal[i];
        if (hst != null) { minM = Math.min(minM, hst); maxM = Math.max(maxM, hst); }
        if (ln != null) { minM = Math.min(minM, ln); maxM = Math.max(maxM, ln); }
        if (sg != null) { minM = Math.min(minM, sg); maxM = Math.max(maxM, sg); }
      }
      let mRange = (maxM - minM) || 1;
      minM -= mRange * 0.1; maxM += mRange * 0.1; mRange = maxM - minM;
      const yM = (v) => boxY + 2 + (1 - (v - minM) / mRange) * (mH - 4);
      // hist
      for (let i = 0; i < n; i++) {
        if (m.hist[i] == null) continue;
        const x = Math.round(xAt(i));
        const y0 = yM(0);
        const y1 = yM(m.hist[i]);
        const top = Math.min(y0, y1);
        const bh = Math.max(1, Math.abs(y1 - y0));
        const bw = Math.max(1, Math.round(bodyW * 0.7));
        ctx.fillStyle = m.hist[i] >= 0 ? 'rgba(0,166,81,0.55)' : 'rgba(229,57,53,0.55)';
        ctx.fillRect(Math.round(x - bw / 2), Math.round(top), bw, Math.round(bh));
      }
      drawLine(ctx, m.line, xAt, yM, '#42A5F5', 1);
      drawLine(ctx, m.signal, xAt, yM, '#FFA726', 1);
      ctx.fillStyle = MT5.axisTextDim;
      ctx.font = '10px Tahoma, Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('MACD', pad.l + 4, boxY + 3);
    }

    // ── Open position levels (MT5 trade lines) ──
    state.positions.filter(p => p.symbol === state.activeSymbol).forEach(p => {
      const isBuy = p.type === 'buy';
      const col = isBuy ? MT5.buyLine : MT5.sellLine;
      const y = yAt(p.openPrice);
      const lbl = (isBuy ? 'buy ' : 'sell ') + p.lots.toFixed(2) + ' ' + fmtPrice(p.symbol, p.openPrice);
      drawPriceLine(ctx, y, w, pad, col, lbl, false, isBuy ? '#006B34' : '#9B1B1B');

      // right scale price marker
      ctx.fillStyle = col;
      const tag = fmtPrice(p.symbol, p.openPrice);
      ctx.font = '11px Tahoma, Arial, sans-serif';
      const tw = ctx.measureText(tag).width + 8;
      ctx.fillRect(w - pad.r + 1, Math.round(y) - 8, Math.min(tw, pad.r - 2), 16);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(tag, w - pad.r + 5, Math.round(y));

      if (p.sl) {
        drawPriceLine(ctx, yAt(p.sl), w, pad, MT5.slLine, 'sl ' + fmtPrice(p.symbol, p.sl), true, '#9B1B1B');
      }
      if (p.tp) {
        drawPriceLine(ctx, yAt(p.tp), w, pad, MT5.tpLine, 'tp ' + fmtPrice(p.symbol, p.tp), true, '#006B34');
      }
    });

    // ── Bid / Ask lines (signature MT5 feature) ──
    if (px) {
      // Bid — orange dashed
      const yBid = yAt(px.bid);
      ctx.save();
      ctx.strokeStyle = MT5.bid;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pad.l, Math.round(yBid) + 0.5);
      ctx.lineTo(w - pad.r, Math.round(yBid) + 0.5);
      ctx.stroke();
      ctx.setLineDash([]);

      // Bid price tag on right scale (MT5 orange box)
      const bidStr = fmtPrice(state.activeSymbol, px.bid);
      ctx.font = 'bold 11px Tahoma, Arial, sans-serif';
      const bidTw = Math.max(pad.r - 4, ctx.measureText(bidStr).width + 10);
      ctx.fillStyle = MT5.bid;
      ctx.fillRect(w - pad.r + 1, Math.round(yBid) - 9, pad.r - 2, 18);
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bidStr, w - pad.r / 2, Math.round(yBid));

      // Ask — blue dashed (if spread visible)
      const yAsk = yAt(px.ask);
      if (Math.abs(yAsk - yBid) > 1.5) {
        ctx.strokeStyle = MT5.ask;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(pad.l, Math.round(yAsk) + 0.5);
        ctx.lineTo(w - pad.r, Math.round(yAsk) + 0.5);
        ctx.stroke();
        ctx.setLineDash([]);

        const askStr = fmtPrice(state.activeSymbol, px.ask);
        ctx.fillStyle = MT5.ask;
        ctx.fillRect(w - pad.r + 1, Math.round(yAsk) - 9, pad.r - 2, 18);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(askStr, w - pad.r / 2, Math.round(yAsk));
      }
      ctx.restore();
    }

    // ── Crosshair (MT5 thin grey) ──
    if (state.indicators.crosshair !== false && chart.hover && !chart.dragging) {
      let { x, y } = chart.hover;
      if (x > pad.l && x < w - pad.r && y > pad.t && y < pad.t + plotH) {
        ctx.save();
        ctx.strokeStyle = MT5.cross;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        const xx = Math.round(x) + 0.5;
        const yy = Math.round(y) + 0.5;
        ctx.beginPath();
        ctx.moveTo(xx, pad.t);
        ctx.lineTo(xx, pad.t + plotH);
        ctx.moveTo(pad.l, yy);
        ctx.lineTo(w - pad.r, yy);
        ctx.stroke();
        ctx.setLineDash([]);

        // Price on right scale at crosshair Y
        const priceAtY = maxP - ((y - pad.t) / plotH) * range;
        const pl = formatAxisPrice(priceAtY, digits);
        ctx.font = '11px Tahoma, Arial, sans-serif';
        ctx.fillStyle = '#404040';
        ctx.fillRect(w - pad.r + 1, Math.round(y) - 9, pad.r - 2, 18);
        ctx.strokeStyle = '#808080';
        ctx.strokeRect(w - pad.r + 1.5, Math.round(y) - 8.5, pad.r - 3, 17);
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(pl, w - pad.r / 2, Math.round(y));

        // Time on bottom scale at crosshair X
        const idx = clamp(Math.floor(((x - pad.l) / plotW) * n), 0, n - 1);
        const c = candles[idx];
        if (c) {
          const d = new Date(c.t);
          const tlabel = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
          ctx.font = '11px Tahoma, Arial, sans-serif';
          const ttw = ctx.measureText(tlabel).width + 10;
          ctx.fillStyle = '#404040';
          ctx.fillRect(Math.round(x) - ttw / 2, h - pad.b + 1, ttw, 18);
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.fillText(tlabel, x, h - pad.b + 10);

          // OHLC status (MT5 Data Window style)
          const chg = c.c - c.o;
          const sign = chg >= 0 ? '+' : '';
          const ohlc = document.getElementById('ohlcInfo');
          if (ohlc) {
            const up = c.c >= c.o;
            ohlc.innerHTML =
              `<b style="color:#aaa">${state.activeSymbol}</b>  ` +
              `<span style="color:#888">O</span> <span style="color:#ddd">${c.o.toFixed(digits)}</span>  ` +
              `<span style="color:#888">H</span> <span style="color:#00A651">${c.h.toFixed(digits)}</span>  ` +
              `<span style="color:#888">L</span> <span style="color:#E53935">${c.l.toFixed(digits)}</span>  ` +
              `<span style="color:#888">C</span> <span style="color:${up ? '#00A651' : '#E53935'}">${c.c.toFixed(digits)}</span>  ` +
              `<span style="color:${up ? '#00A651' : '#E53935'}">${sign}${chg.toFixed(digits)}</span>`;
          }
        }
        ctx.restore();
      }
    } else {
      // Default OHLC = last bar
      const last = candles[candles.length - 1];
      if (last) {
        const ohlc = document.getElementById('ohlcInfo');
        if (ohlc) {
          const up = last.c >= last.o;
          const chg = last.c - last.o;
          const sign = chg >= 0 ? '+' : '';
          ohlc.innerHTML =
            `<b style="color:#aaa">${state.activeSymbol}</b>  ` +
            `<span style="color:#888">O</span> <span style="color:#ddd">${last.o.toFixed(digits)}</span>  ` +
            `<span style="color:#888">H</span> <span style="color:#00A651">${last.h.toFixed(digits)}</span>  ` +
            `<span style="color:#888">L</span> <span style="color:#E53935">${last.l.toFixed(digits)}</span>  ` +
            `<span style="color:#888">C</span> <span style="color:${up ? '#00A651' : '#E53935'}">${last.c.toFixed(digits)}</span>  ` +
            `<span style="color:${up ? '#00A651' : '#E53935'}">${sign}${chg.toFixed(digits)}</span>`;
        }
      }
    }

    // ── Watermark (subtle, MT5-like corner) ──
    ctx.save();
    ctx.fillStyle = MT5.watermark;
    ctx.font = 'bold 28px Tahoma, Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText(state.activeSymbol, pad.l + 10, pad.t + plotH - 10);
    ctx.restore();

    // ── History / pan indicator ──
    if (chart.panOffset > 0.5) {
      ctx.fillStyle = 'rgba(32,144,224,0.9)';
      ctx.font = '11px Tahoma, Arial, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText('◀ History', w - pad.r - 8, pad.t + 6);
    }

    // ── Luck badge (MT5-ish box) ──
    if (state.luck && (state.luckTicks > 0 || state.positions.some(p => p.symbol === state.activeSymbol))) {
      const isNormal = state.luckMode === 'normal';
      const ns = isNormal && state.luckNormal ? state.luckNormal[state.activeSymbol] : null;
      const phase = ns && ns.phase;
      let luckTxt;
      if (isNormal) {
        const map = { drift: 'FLOW', surge: 'PUSH', pullback: 'PULLBACK', chop: 'CHOP' };
        luckTxt = 'NORMAL · ' + (map[phase] || 'ON');
      } else if (state.luckDir > 0) luckTxt = 'CEPAT ↑';
      else if (state.luckDir < 0) luckTxt = 'CEPAT ↓';
      else luckTxt = 'CEPAT ON';
      const isPb = phase === 'pullback';
      ctx.font = 'bold 11px Tahoma, Arial, sans-serif';
      const ltw = ctx.measureText(luckTxt).width + 14;
      ctx.fillStyle = isPb ? '#5A3A12' : '#6B5A12';
      ctx.fillRect(pad.l + 6, pad.t + 6, ltw, 18);
      ctx.strokeStyle = isPb ? '#FFB020' : '#F0C14B';
      ctx.lineWidth = 1;
      ctx.strokeRect(pad.l + 6.5, pad.t + 6.5, ltw - 1, 17);
      ctx.fillStyle = isPb ? '#FFB020' : '#F0C14B';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(luckTxt, pad.l + 13, pad.t + 15);
    }
  }

  // ─── Trading ─────────────────────────────────────────
  function idrToUsd(idr) {
    // Demo FX convert for account currency (USD)
    return idr / 15800;
  }

  function calcMargin(symbol, lots) {
    const s = getSym(symbol);
    const p = state.prices[symbol].mid;
    // simplified: contract size 100000 for forex, 1 for crypto/indices/stocks (CFD shares)
    let contract = 100000;
    if (s.cat === 'crypto') contract = 1;
    else if (s.cat === 'indices') contract = 1;
    else if (s.cat === 'stocks') contract = 1;
    else if (s.cat === 'idx') contract = 100; // 1 lot IDX = 100 saham (board lot)
    else if (s.cat === 'commodities') contract = s.symbol.includes('XAU') ? 100 : 1000;
    const notional = p * lots * (s.cat === 'forex' ? 100000 : contract === 1 ? 1 : contract);
    // simpler realistic margin
    if (s.cat === 'forex') return (lots * 100000 * p) / state.leverage / (s.symbol.startsWith('USD') ? 1 : p) * (s.symbol.endsWith('USD') || s.symbol.startsWith('USD') ? 1 : 1);
    if (s.cat === 'crypto') return (lots * p) / (state.leverage / 5);
    if (s.cat === 'indices') return (lots * p) / state.leverage;
    // Stocks CFD: 1 lot ≈ 100 shares, leverage applied
    if (s.cat === 'stocks') return (lots * p * 100) / Math.max(5, state.leverage / 2);
    // IDX saham: harga IDR, 1 lot = 100 lembar, margin di USD account
    if (s.cat === 'idx') {
      const notionalIdr = lots * 100 * p;
      return idrToUsd(notionalIdr) / Math.max(5, state.leverage / 4);
    }
    return (lots * p * 100) / state.leverage;
  }

  function calcPnL(pos) {
    const s = getSym(pos.symbol);
    const p = state.prices[pos.symbol];
    if (!p) return 0;
    const current = pos.type === 'buy' ? p.bid : p.ask;
    const diff = pos.type === 'buy' ? (current - pos.openPrice) : (pos.openPrice - current);
    let mult = 100000; // forex standard lot
    if (s.cat === 'crypto') mult = 1;
    else if (s.cat === 'indices') mult = 1;
    else if (s.cat === 'stocks') mult = 100; // 1 lot = 100 shares CFD
    else if (s.cat === 'idx') mult = 100; // 1 lot = 100 lembar
    else if (s.cat === 'commodities') {
      if (s.symbol.includes('XAU')) mult = 100;
      else if (s.symbol.includes('XAG')) mult = 5000;
      else mult = 100;
    }
    // For JPY pairs adjust
    let pnl = diff * pos.lots * mult;
    if (s.cat === 'forex' && s.symbol.endsWith('JPY')) {
      pnl = diff * pos.lots * 1000; // approx USD
    } else if (s.cat === 'forex') {
      pnl = diff * pos.lots * 100000;
    } else if (s.cat === 'stocks') {
      pnl = diff * pos.lots * 100; // USD P/L per share × 100
    } else if (s.cat === 'idx') {
      // diff in IDR × lots × 100 lembar → convert to USD account
      pnl = idrToUsd(diff * pos.lots * 100);
    }
    return pnl;
  }

  function placeOrder(type, opts = {}) {
    const symbol = opts.symbol || state.activeSymbol;
    const lots = opts.lots != null ? Number(opts.lots) : Number($('#lotSize').value) || 0.1;
    const sl = opts.sl != null ? opts.sl : (parseFloat($('#slInput').value) || null);
    const tp = opts.tp != null ? opts.tp : (parseFloat($('#tpInput').value) || null);
    const orderType = opts.orderType || $('#orderType').value || 'market';
    const s = getSym(symbol);
    const p = state.prices[symbol];

    if (lots < 0.01 || lots > 100) {
      toast('Invalid Volume', 'Lot size must be between 0.01 and 100', 'error');
      return null;
    }

    const margin = calcMargin(symbol, lots);
    const free = state.equity - state.margin;
    if (margin > free && orderType === 'market') {
      toast('Insufficient Margin', `Required ${fmtMoney(margin)} · Free ${fmtMoney(free)}`, 'error');
      journal(`Order rejected: insufficient margin for ${type.toUpperCase()} ${lots} ${symbol}`, 'warn');
      return null;
    }

    if (orderType !== 'market') {
      const price = parseFloat($('#pendingPrice').value) || p.mid;
      const order = {
        ticket: uid(),
        symbol, type, lots, price, sl, tp,
        orderType, time: now(),
      };
      state.orders.push(order);
      journal(`Pending ${orderType} ${type.toUpperCase()} ${lots} ${symbol} @ ${fmtPrice(symbol, price)}`, 'info');
      toast('Order Placed', `Pending ${type.toUpperCase()} ${lots} ${symbol}`, 'info');
      renderOrders();
      save();
      return order;
    }

    const openPrice = type === 'buy' ? p.ask : p.bid;
    const pos = {
      ticket: uid(),
      symbol,
      type,
      lots,
      openPrice,
      sl, tp,
      margin,
      time: now(),
      comment: opts.comment || '',
    };
    state.positions.push(pos);
    state.margin += margin;

    // Keberuntungan trigger
    if (state.luck) {
      state.luckDir = type === 'buy' ? 1 : -1;
      state.luckSymbol = symbol;
      const mode = state.luckMode || 'cepat';
      const sInfo = getSym(symbol);
      const px = state.prices[symbol];

      if (mode === 'cepat') {
        // Hard push + instant visible jump
        state.luckTicks = 22 + state.luckStrength * 5;
        const jump = state.luckDir * sInfo.vol * (1.4 + state.luckStrength * 0.65);
        if (px) {
          px.mid = Math.max(sInfo.pip * 10, px.mid + jump);
          const half = (sInfo.spread * sInfo.pip) / 2;
          px.bid = px.mid - half;
          px.ask = px.mid + half;
          px.dir = state.luckDir;
          updateLiveCandle(symbol, px.mid);
        }
        updateLuckStatus(type === 'buy' ? 'Cepat · ↑ LONCAT NAIK' : 'Cepat · ↓ LONCAT TURUN');
      } else {
        // Natural start — almost no jump; seed organic phase machine
        state.luckTicks = 6 + Math.floor(state.luckStrength * 0.8); // short settle only
        state.luckPhase = 0;
        const ns = ensureNormalState(symbol);
        ns.phase = 'drift';
        ns.phaseLeft = Math.floor(rand(20, 40));
        ns.mom = state.luckDir * (0.08 + state.luckStrength * 0.01);
        ns.ticks = 0;
        // Tiny imperceptible open tick (spread-scale), not a spike
        const jump = state.luckDir * sInfo.vol * (0.04 + state.luckStrength * 0.02);
        if (px) {
          px.mid = Math.max(sInfo.pip * 10, px.mid + jump);
          const half = (sInfo.spread * sInfo.pip) / 2;
          px.bid = px.mid - half;
          px.ask = px.mid + half;
          px.dir = state.luckDir;
          updateLiveCandle(symbol, px.mid);
        }
        updateLuckStatus(type === 'buy' ? 'Normal · flow naik pelan' : 'Normal · flow turun pelan');
      }
      $('#cheatBall')?.classList.add('pulse-active');
    }

    journal(`${type.toUpperCase()} ${lots} ${symbol} at ${fmtPrice(symbol, openPrice)} · #${pos.ticket}`, type);
    toast(
      `${type === 'buy' ? 'Buy' : 'Sell'} Order Filled`,
      `${lots} lot ${symbol} @ ${fmtPrice(symbol, openPrice)}`,
      'success'
    );

    renderPositions();
    renderAccount();
    updateMarginInfo();
    save();
    return pos;
  }

  function closePosition(ticket, partial = null) {
    const idx = state.positions.findIndex(p => p.ticket === ticket);
    if (idx < 0) return;
    const pos = state.positions[idx];
    let pnl = calcPnL(pos);

    // God mode — force profitable
    if (state.godMode && pnl < 0) {
      pnl = Math.abs(pnl) * rand(0.3, 1.2) + rand(1, 15);
    }

    const closePrice = pos.type === 'buy' ? state.prices[pos.symbol].bid : state.prices[pos.symbol].ask;

    state.balance += pnl;
    state.margin = Math.max(0, state.margin - pos.margin);

    state.history.unshift({
      time: now(),
      ticket: pos.ticket,
      symbol: pos.symbol,
      type: pos.type,
      lots: pos.lots,
      openPrice: pos.openPrice,
      closePrice,
      profit: pnl,
      comment: pos.comment || 'Closed',
    });

    state.positions.splice(idx, 1);

    const pnlStr = fmtMoney(pnl);
    journal(`Closed #${pos.ticket} ${pos.symbol} · P/L ${pnlStr}`, pnl >= 0 ? 'buy' : 'sell');
    toast(
      pnl >= 0 ? 'Position Closed · Profit' : 'Position Closed · Loss',
      `#${pos.ticket} ${pos.symbol} · ${pnlStr}`,
      pnl >= 0 ? 'success' : 'error'
    );

    renderPositions();
    renderHistory();
    renderAccount();
    save();
  }

  function closeAll() {
    if (!state.positions.length) {
      toast('No Positions', 'There are no open positions to close', 'info');
      return;
    }
    const tickets = state.positions.map(p => p.ticket);
    tickets.forEach(t => closePosition(t));
    toast('All Closed', `${tickets.length} position(s) closed`, 'info');
  }

  function cancelOrder(ticket) {
    state.orders = state.orders.filter(o => o.ticket !== ticket);
    renderOrders();
    journal(`Pending order #${ticket} cancelled`, 'info');
    save();
  }

  function checkSLTP() {
    const toClose = [];
    state.positions.forEach(pos => {
      const p = state.prices[pos.symbol];
      if (!p) return;
      if (pos.type === 'buy') {
        if (pos.sl && p.bid <= pos.sl) toClose.push({ t: pos.ticket, reason: 'SL' });
        if (pos.tp && p.bid >= pos.tp) toClose.push({ t: pos.ticket, reason: 'TP' });
      } else {
        if (pos.sl && p.ask >= pos.sl) toClose.push({ t: pos.ticket, reason: 'SL' });
        if (pos.tp && p.ask <= pos.tp) toClose.push({ t: pos.ticket, reason: 'TP' });
      }
    });
    toClose.forEach(({ t, reason }) => {
      const pos = state.positions.find(p => p.ticket === t);
      if (pos) pos.comment = reason;
      closePosition(t);
    });

    // pending orders fill
    const filled = [];
    state.orders.forEach(o => {
      const p = state.prices[o.symbol];
      if (!p) return;
      let hit = false;
      if (o.orderType === 'limit') {
        if (o.type === 'buy' && p.ask <= o.price) hit = true;
        if (o.type === 'sell' && p.bid >= o.price) hit = true;
      } else if (o.orderType === 'stop') {
        if (o.type === 'buy' && p.ask >= o.price) hit = true;
        if (o.type === 'sell' && p.bid <= o.price) hit = true;
      }
      if (hit) filled.push(o);
    });
    filled.forEach(o => {
      state.orders = state.orders.filter(x => x.ticket !== o.ticket);
      placeOrder(o.type, { symbol: o.symbol, lots: o.lots, sl: o.sl, tp: o.tp, orderType: 'market', comment: 'Pending filled' });
    });
  }

  function updatePositionPnL() {
    let totalPnL = 0;
    let usedMargin = 0;
    state.positions.forEach(pos => {
      pos.pnl = calcPnL(pos);
      totalPnL += pos.pnl;
      usedMargin += pos.margin;
    });
    state.margin = usedMargin;
    state.equity = state.balance + totalPnL;

    // margin call
    if (state.margin > 0 && state.equity < state.margin * 0.5 && state.positions.length) {
      journal('MARGIN CALL — equity below 50% of margin. Closing positions.', 'warn');
      toast('Margin Call', 'Positions liquidated due to low margin level', 'error');
      closeAll();
    }
  }

  // ─── Auto Trader (Cheat) ─────────────────────────────
  function startAutoTrader() {
    stopAutoTrader();
    const run = () => {
      if (!state.autoTrader) return;
      const sym = state.activeSymbol;
      const candles = state.candles[sym] || [];
      if (candles.length < 20) return;

      const closes = candles.slice(-20).map(c => c.c);
      const maFast = closes.slice(-5).reduce((a, b) => a + b, 0) / 5;
      const maSlow = closes.reduce((a, b) => a + b, 0) / 20;
      const last = closes[closes.length - 1];
      const prev = closes[closes.length - 2];
      const momentum = last - prev;
      const s = getSym(sym);

      let signal = null;
      let pred = 'NEUTRAL';

      // Smart prediction based on MA crossover + momentum
      if (maFast > maSlow * 1.0001 && momentum >= 0) {
        signal = 'buy';
        pred = 'BUY ↑';
      } else if (maFast < maSlow * 0.9999 && momentum <= 0) {
        signal = 'sell';
        pred = 'SELL ↓';
      } else if (momentum > s.vol * 0.5) {
        signal = 'buy';
        pred = 'BUY ↑';
      } else if (momentum < -s.vol * 0.5) {
        signal = 'sell';
        pred = 'SELL ↓';
      } else {
        // random lean for activity
        if (Math.random() > 0.55) {
          signal = maFast >= maSlow ? 'buy' : 'sell';
          pred = signal === 'buy' ? 'BUY ↑' : 'SELL ↓';
        }
      }

      const mode = $('#autoMode')?.value || state.autoMode;
      if (mode === 'buy') { signal = 'buy'; pred = 'BUY ↑'; }
      if (mode === 'sell') { signal = 'sell'; pred = 'SELL ↓'; }
      if (mode === 'scalp') {
        // close existing first if any on this symbol
        const existing = state.positions.filter(p => p.symbol === sym);
        if (existing.length >= 2) {
          existing.forEach(p => closePosition(p.ticket));
        }
      }

      const predEl = $('#autoPred');
      if (predEl) {
        predEl.textContent = pred;
        predEl.style.color = pred.includes('BUY') ? '#00c853' : pred.includes('SELL') ? '#ff3b57' : '#9aabbe';
      }

      if (signal) {
        const lot = parseFloat($('#autoLot')?.value) || state.autoLot;
        // limit concurrent auto positions
        const autoPos = state.positions.filter(p => p.comment === 'AutoTrader');
        if (autoPos.length >= 3) {
          // close oldest
          closePosition(autoPos[0].ticket);
        }
        // With luck or smart mode, often profitable direction is already predicted
        placeOrder(signal, { lots: lot, comment: 'AutoTrader', orderType: 'market' });
      }
    };

    run();
    const interval = (parseFloat($('#autoInterval')?.value) || state.autoInterval) * 1000;
    state.autoTimer = setInterval(run, interval);
  }

  function stopAutoTrader() {
    if (state.autoTimer) {
      clearInterval(state.autoTimer);
      state.autoTimer = null;
    }
  }

  function updateLuckStatus(msg) {
    const el = $('#luckStatus');
    if (el) el.textContent = msg;
  }

  // ─── Render ──────────────────────────────────────────
  function isEquity(s) {
    return s && (s.cat === 'idx' || s.cat === 'stocks');
  }

  function fmtStockPrice(s, price) {
    if (price == null || isNaN(price)) return '—';
    if (s.cat === 'idx' || s.ccy === 'IDR') {
      return 'Rp' + Number(price).toLocaleString('id-ID', {
        maximumFractionDigits: s.digits || 0,
        minimumFractionDigits: 0,
      });
    }
    return Number(price).toFixed(s.digits);
  }

  function renderSymbols() {
    const q = ($('#symbolSearch')?.value || '').toLowerCase();
    const list = $('#symbolList');
    if (!list) return;
    list.innerHTML = '';
    // Watch = non-equity only (FX, crypto, indices, commodities)
    SYMBOLS.filter(s => {
      if (isEquity(s)) return false;
      if (state.category !== 'all' && s.cat !== state.category) return false;
      if (q && !s.symbol.toLowerCase().includes(q) && !s.name.toLowerCase().includes(q)) return false;
      return true;
    }).forEach(s => {
      const p = state.prices[s.symbol];
      const row = document.createElement('div');
      row.className = 'sym-row' + (s.symbol === state.activeSymbol ? ' active' : '');
      row.innerHTML = `
        <div>
          <div class="sym-name">${s.symbol}</div>
          <div class="sym-cat">${s.cat}</div>
        </div>
        <div class="sym-bid">${p ? p.bid.toFixed(s.digits) : '—'}</div>
        <div class="sym-ask">${p ? p.ask.toFixed(s.digits) : '—'}</div>
      `;
      row.addEventListener('click', () => selectSymbol(s.symbol));
      list.appendChild(row);
    });
  }

  function renderStockList() {
    const q = ($('#stockSearch')?.value || '').toLowerCase();
    const list = $('#stockList');
    if (!list) return;
    const market = state.stockMarket || 'idx';
    list.innerHTML = '';
    const rows = SYMBOLS.filter(s => {
      if (market === 'idx' && s.cat !== 'idx') return false;
      if (market === 'us' && s.cat !== 'stocks') return false;
      if (q && !s.symbol.toLowerCase().includes(q) && !s.name.toLowerCase().includes(q)) return false;
      return true;
    });
    if (!rows.length) {
      list.innerHTML = '<div class="empty-row" style="padding:24px;text-align:center;color:var(--text3)">Tidak ada saham</div>';
      return;
    }
    // Clear selection if it no longer belongs to this market/filter
    if (state.stockSymbol && !rows.some(r => r.symbol === state.stockSymbol)) {
      state.stockSymbol = null;
    }
    rows.forEach(s => {
      const p = state.prices[s.symbol];
      const row = document.createElement('div');
      row.className = 'stock-row' + (s.symbol === state.stockSymbol ? ' active' : '');
      row.dataset.sym = s.symbol;
      const chg = p ? (p.change || 0) : 0;
      const chgCls = chg > 0.005 ? 'up' : chg < -0.005 ? 'down' : '';
      const abs = Math.abs(chg);
      const decimals = abs > 0 && abs < 0.1 ? 3 : 2;
      const chgTxt = p ? ((chg > 0 ? '+' : '') + chg.toFixed(decimals) + '%') : '—';
      row.innerHTML = `
        <div>
          <div class="sr-code">${s.symbol}</div>
          <div class="sr-name">${s.name}</div>
        </div>
        <div class="sr-price ${chgCls}">${p ? fmtStockPrice(s, p.mid) : '—'}</div>
        <div class="sr-chg ${chgCls}">${chgTxt}</div>
      `;
      row.addEventListener('click', () => selectStock(s.symbol, { openChart: false }));
      list.appendChild(row);
    });
    updateStockDetail();
  }

  function syncStockDetailVisibility() {
    const pane = $('#stockDetail');
    const body = $('#svMarketBody');
    const selected = $('#sdSelected');
    const empty = $('#sdEmpty');
    const has = !!(state.stockSymbol && isEquity(getSym(state.stockSymbol)));
    if (pane) {
      pane.classList.toggle('is-empty', !has);
      pane.dataset.selected = has ? '1' : '0';
    }
    if (selected) {
      if (has) selected.removeAttribute('hidden');
      else selected.setAttribute('hidden', '');
    }
    if (empty) empty.style.display = has ? 'none' : '';
    if (body) {
      body.classList.toggle('has-selection', has);
      body.classList.toggle('has-no-selection', !has);
    }
  }

  function clearStockSelection() {
    state.stockSymbol = null;
    $$('.stock-row').forEach(r => r.classList.remove('active'));
    syncStockDetailVisibility();
  }

  function updateStockDetail() {
    syncStockDetailVisibility();
    const sym = state.stockSymbol;
    const s = getSym(sym);
    if (!isEquity(s)) return;
    const p = state.prices[sym];
    const setTxt = (id, v) => { const el = $(id); if (el) el.textContent = v; };
    setTxt('#sdCode', s.symbol);
    setTxt('#sdName', s.name);
    const badge = $('#sdBadge');
    if (badge) badge.textContent = s.cat === 'idx' ? 'IDX · IDR' : 'US · USD';
    const lotLabel = $('#sdLotLabel');
    if (lotLabel) {
      lotLabel.textContent = s.cat === 'idx'
        ? 'Lot (1 lot = 100 lembar)'
        : 'Lot (1 lot = 100 shares CFD)';
    }
    const lotInfo = $('#sdLotInfo');
    if (lotInfo) lotInfo.textContent = '100';
    // sensible default lot when opening a product
    const lotInp = $('#sdLot');
    if (lotInp && (!lotInp.value || parseFloat(lotInp.value) <= 0)) {
      lotInp.value = s.cat === 'idx' ? '1' : '1';
    }
    if (!p) return;
    setTxt('#sdPrice', fmtStockPrice(s, p.mid));
    const chgEl = $('#sdChg');
    if (chgEl) {
      const chg = p.change || 0;
      const abs = Math.abs(chg);
      const decimals = abs > 0 && abs < 0.1 ? 3 : 2;
      chgEl.textContent = (chg > 0 ? '+' : '') + chg.toFixed(decimals) + '%';
      chgEl.className = 'sd-chg ' + (chg > 0.005 ? 'up' : chg < -0.005 ? 'down' : '');
    }
    setTxt('#sdBid', fmtStockPrice(s, p.bid));
    setTxt('#sdAsk', fmtStockPrice(s, p.ask));
    setTxt('#sdSpread', s.cat === 'idx'
      ? String(Math.round(s.spread))
      : s.spread.toFixed(1));
    updateStockNotional();
  }

  function updateStockNotional() {
    const sym = state.stockSymbol;
    const s = getSym(sym);
    const p = state.prices[sym];
    const el = $('#sdNotional');
    if (!el || !p || !isEquity(s)) return;
    const lots = Math.max(0.01, parseFloat($('#sdLot')?.value) || 1);
    const shares = lots * 100;
    if (s.cat === 'idx') {
      const idr = shares * p.ask;
      const usd = idrToUsd(idr);
      el.textContent = 'Rp' + Math.round(idr).toLocaleString('id-ID') + ' · ~' + fmtMoney(usd);
    } else {
      const usd = shares * p.ask;
      el.textContent = fmtMoney(usd) + ' · ' + shares.toFixed(0) + ' sh';
    }
  }

  function selectStock(sym, { openChart = false } = {}) {
    const s = getSym(sym);
    if (!isEquity(s)) return;
    state.stockSymbol = sym;
    state.stockMarket = s.cat === 'idx' ? 'idx' : 'us';
    // highlight
    $$('.stock-row').forEach(r => {
      r.classList.toggle('active', r.dataset.sym === sym);
    });
    updateStockDetail();
    // ensure trade panel visible / scrolled into view on mobile
    const pane = $('#stockDetail');
    if (pane && !openChart) {
      try { pane.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch {}
    }
    if (openChart) {
      selectSymbol(sym);
      closeStocksView();
      toast('Chart', `${sym} · ${s.name}`, 'info');
    }
  }

  function placeStockOrder(type) {
    const sym = state.stockSymbol;
    const s = getSym(sym);
    if (!isEquity(s)) {
      toast('Pilih Saham', 'Klik produk di daftar dulu untuk order Beli/Jual', 'warn');
      return;
    }
    const lots = Math.max(0.01, parseFloat($('#sdLot')?.value) || 1);
    // Sync active symbol so ticket/chart stay consistent
    if (state.activeSymbol !== sym) selectSymbol(sym);
    placeOrder(type, {
      symbol: sym,
      lots,
      orderType: 'market',
      comment: s.cat === 'idx' ? 'IDX Saham' : 'US Stock',
    });
  }


  // ── Stock portfolio (aggregated equity holdings) ──
  function getEquityPositions() {
    return state.positions.filter(pos => {
      const s = getSym(pos.symbol);
      return isEquity(s) || isEquitySym(s);
    });
  }

  function buildPortfolioRows(filter) {
    const map = {};
    getEquityPositions().forEach(pos => {
      const s = getSym(pos.symbol);
      const cat = s.cat === 'idx' ? 'idx' : s.cat === 'stocks' ? 'us' : s.cat;
      if (filter === 'idx' && cat !== 'idx') return;
      if (filter === 'us' && cat !== 'us') return;
      const key = pos.symbol + '|' + pos.type;
      if (!map[key]) {
        map[key] = {
          symbol: pos.symbol,
          type: pos.type,
          name: s.name,
          cat,
          lots: 0,
          costLots: 0, // sum lots*open for avg
          margin: 0,
          tickets: [],
          pnl: 0,
        };
      }
      map[key].lots += pos.lots;
      map[key].costLots += pos.lots * pos.openPrice;
      map[key].margin += pos.margin || 0;
      map[key].tickets.push(pos.ticket);
      map[key].pnl += (pos.pnl != null ? pos.pnl : calcPnL(pos));
    });
    return Object.values(map).map(row => {
      const avg = row.lots > 0 ? row.costLots / row.lots : 0;
      const s = getSym(row.symbol);
      const px = state.prices[row.symbol];
      const last = px ? (row.type === 'buy' ? px.bid : px.ask) : avg;
      const shares = row.lots * 100;
      // Market value in USD
      let valueUsd = 0;
      if (s.cat === 'idx') {
        valueUsd = idrToUsd(shares * last);
      } else {
        valueUsd = shares * last;
      }
      // Cost basis USD approx from avg
      let costUsd = 0;
      if (s.cat === 'idx') costUsd = idrToUsd(shares * avg);
      else costUsd = shares * avg;
      // For sell positions, value/cost signs still use PnL engine
      const pnl = row.pnl;
      const pnlPct = costUsd > 1e-8 ? (pnl / costUsd) * 100 : 0;
      // day change estimate from session open
      let dayPnl = 0;
      if (px && px.open) {
        const dayDiff = row.type === 'buy' ? (last - px.open) : (px.open - last);
        if (s.cat === 'idx') dayPnl = idrToUsd(dayDiff * shares);
        else dayPnl = dayDiff * shares;
      }
      return {
        ...row,
        avg,
        last,
        shares,
        valueUsd,
        costUsd,
        pnl,
        pnlPct,
        dayPnl,
        s,
      };
    }).sort((a, b) => Math.abs(b.valueUsd) - Math.abs(a.valueUsd));
  }

  function renderPortfolio() {
    const filter = state.pfFilter || 'all';
    const rows = buildPortfolioRows(filter);
    const body = $('#pfBody');
    const badge = $('#pfBadge');

    // Totals across ALL equity (badge uses all)
    const allRows = buildPortfolioRows('all');
    if (badge) badge.textContent = String(allRows.length);

    let totalValue = 0, totalPnl = 0, totalCost = 0, totalDay = 0;
    rows.forEach(r => {
      totalValue += r.valueUsd;
      totalPnl += r.pnl;
      totalCost += r.costUsd;
      totalDay += r.dayPnl;
    });
    const ret = totalCost > 1e-8 ? (totalPnl / totalCost) * 100 : 0;

    const setPf = (id, text, cls) => {
      const el = $(id);
      if (!el) return;
      el.textContent = text;
      el.classList.remove('up', 'down');
      if (cls) el.classList.add(cls);
    };
    const pnlCls = totalPnl > 0.01 ? 'up' : totalPnl < -0.01 ? 'down' : '';
    const dayCls = totalDay > 0.01 ? 'up' : totalDay < -0.01 ? 'down' : '';
    const retCls = ret > 0.01 ? 'up' : ret < -0.01 ? 'down' : '';

    setPf('#pfValue', fmtMoney(totalValue));
    if ($('#pfPnL')) {
      $('#pfPnL').textContent = (totalPnl >= 0 ? '+' : '-') + fmtMoney(Math.abs(totalPnl));
      $('#pfPnL').classList.remove('up', 'down');
      if (pnlCls) $('#pfPnL').classList.add(pnlCls);
    }
    if ($('#pfReturn')) {
      $('#pfReturn').textContent = (ret >= 0 ? '+' : '') + ret.toFixed(2) + '%';
      $('#pfReturn').classList.remove('up', 'down');
      if (retCls) $('#pfReturn').classList.add(retCls);
    }
    setPf('#pfCount', String(rows.length));
    setPf('#pfCost', fmtMoney(totalCost));
    if ($('#pfDay')) {
      $('#pfDay').textContent = (totalDay >= 0 ? '+' : '-') + fmtMoney(Math.abs(totalDay));
      $('#pfDay').classList.remove('up', 'down');
      if (dayCls) $('#pfDay').classList.add(dayCls);
    }

    if (!body) return;
    if (!rows.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="12">Belum ada holding saham. Beli dari tab Pasar.</td></tr>';
      return;
    }

    const absSum = rows.reduce((a, r) => a + Math.abs(r.valueUsd), 0) || 1;
    body.innerHTML = rows.map(r => {
      const weight = (Math.abs(r.valueUsd) / absSum) * 100;
      const pnlC = r.pnl >= 0 ? 'up' : 'down';
      const lastTxt = fmtStockPrice(r.s, r.last);
      const avgTxt = fmtStockPrice(r.s, r.avg);
      return `<tr data-pf-sym="${r.symbol}">
        <td><span class="pf-code">${r.symbol}</span></td>
        <td class="pf-name" title="${r.name}">${r.name}</td>
        <td><span class="pf-side ${r.type}">${r.type.toUpperCase()}</span></td>
        <td>${r.lots.toFixed(2)}</td>
        <td>${Math.round(r.shares).toLocaleString('id-ID')}</td>
        <td>${avgTxt}</td>
        <td>${lastTxt}</td>
        <td>${fmtMoney(r.valueUsd)}</td>
        <td class="${pnlC}">${(r.pnl >= 0 ? '+' : '-') + fmtMoney(Math.abs(r.pnl))}</td>
        <td class="${pnlC}">${(r.pnlPct >= 0 ? '+' : '') + r.pnlPct.toFixed(2)}%</td>
        <td>${weight.toFixed(1)}%</td>
        <td>
          <div class="pf-row-actions">
            <button type="button" class="btn-xs edit" data-pf-chart="${r.symbol}">Chart</button>
            <button type="button" class="btn-xs" data-pf-close="${r.symbol}|${r.type}">Close</button>
          </div>
        </td>
      </tr>`;
    }).join('');
  }

  function setStocksTab(tab) {
    state.stocksTab = tab === 'portfolio' ? 'portfolio' : 'market';
    const view = $('#stocksView');
    if (view) {
      view.classList.toggle('tab-portfolio', state.stocksTab === 'portfolio');
      view.classList.toggle('tab-market', state.stocksTab === 'market');
    }
    $$('#svMainTabs .sv-mtab').forEach(b => {
      b.classList.toggle('active', b.dataset.svtab === state.stocksTab);
    });
    const title = $('#svTitle');
    const sub = $('#svSub');
    if (state.stocksTab === 'portfolio') {
      if (title) title.textContent = 'Portofolio';
      if (sub) sub.textContent = 'Holding saham · P/L live';
      renderPortfolio();
    } else {
      if (title) title.textContent = 'Saham';
      if (sub) {
        sub.textContent = state.stockMarket === 'us'
          ? 'US Equities · Live CFD'
          : 'Bursa Efek Indonesia · Live';
      }
      renderStockList();
      updateStockDetail();
    }
  }


  function openStocksView(tab) {
    const view = $('#stocksView');
    if (!view) return;
    view.classList.remove('hidden');
    view.setAttribute('aria-hidden', 'false');
    if (tab === 'portfolio' || tab === 'market') state.stocksTab = tab;
    // Open market from nav/mobile: list only — buy/sell appears after user taps a product
    if (tab === 'market' || (!tab && (state.stocksTab || 'market') === 'market')) {
      state.stockSymbol = null;
    }
    setStocksTab(state.stocksTab || 'market');
    syncStockDetailVisibility();
    // mark mobile nav
    $$('.mn-btn').forEach(b => b.classList.toggle('active', b.dataset.view === 'stocks'));
  }

  function closeStocksView() {
    const view = $('#stocksView');
    if (!view) return;
    view.classList.add('hidden');
    view.setAttribute('aria-hidden', 'true');
    $$('.mn-btn').forEach(b => b.classList.toggle('active', b.dataset.view === 'chart'));
    // restore topbar interaction after leaving saham overlay
    try {
      const tb = document.querySelector('.topbar');
      if (tb) tb.style.pointerEvents = '';
    } catch {}
    requestAnimationFrame(() => { try { resizeChart(); } catch {} });
  }

  function renderPrices() {
    // update symbol list prices in place for performance
    $$('.sym-row').forEach(row => {
      const name = row.querySelector('.sym-name')?.textContent;
      if (!name) return;
      const s = getSym(name);
      const p = state.prices[name];
      if (!p) return;
      const bid = row.querySelector('.sym-bid');
      const ask = row.querySelector('.sym-ask');
      if (bid) {
        bid.textContent = p.bid.toFixed(s.digits);
        bid.style.color = p.dir > 0 ? '#00c853' : p.dir < 0 ? '#ff3b57' : '';
      }
      if (ask) {
        ask.textContent = p.ask.toFixed(s.digits);
        ask.style.color = p.dir > 0 ? '#00c853' : p.dir < 0 ? '#ff3b57' : '';
      }
    });

    // live update saham list rows
    $$('.stock-row').forEach(row => {
      const name = row.dataset.sym || row.querySelector('.sr-code')?.textContent;
      if (!name) return;
      const s = getSym(name);
      const p = state.prices[name];
      if (!p || !isEquity(s)) return;
      const priceEl = row.querySelector('.sr-price');
      const chgEl = row.querySelector('.sr-chg');
      const chg = p.change || 0;
      const chgCls = chg > 0.005 ? 'up' : chg < -0.005 ? 'down' : '';
      const tickCls = p.dir > 0 ? 'tick-up' : p.dir < 0 ? 'tick-dn' : '';
      if (priceEl) {
        const nextTxt = fmtStockPrice(s, p.mid);
        const changed = priceEl.textContent !== nextTxt;
        priceEl.textContent = nextTxt;
        priceEl.className = 'sr-price ' + chgCls + (tickCls ? ' ' + tickCls : '');
        if (changed && p.dir) {
          priceEl.classList.remove('flash-up', 'flash-dn');
          // force reflow for restart animation
          void priceEl.offsetWidth;
          priceEl.classList.add(p.dir > 0 ? 'flash-up' : 'flash-dn');
        }
      }
      if (chgEl) {
        const abs = Math.abs(chg);
        const decimals = abs > 0 && abs < 0.1 ? 3 : 2;
        chgEl.textContent = (chg > 0 ? '+' : '') + chg.toFixed(decimals) + '%';
        chgEl.className = 'sr-chg ' + chgCls;
      }
    });

    // stock detail live
    if (state.stockSymbol && isEquity(getSym(state.stockSymbol))) {
      updateStockDetail();
    }
    // portfolio live when visible
    const sv = $('#stocksView');
    if (sv && !sv.classList.contains('hidden') && state.stocksTab === 'portfolio') {
      renderPortfolio();
    }

    const s = getSym(state.activeSymbol);
    const p = state.prices[state.activeSymbol];
    if (!p) return;

    const priceTxt = (v) => (s.cat === 'idx' ? fmtStockPrice(s, v) : v.toFixed(s.digits));
    if ($('#bidPrice')) $('#bidPrice').textContent = priceTxt(p.bid);
    if ($('#askPrice')) $('#askPrice').textContent = priceTxt(p.ask);
    if ($('#sellBtnPrice')) $('#sellBtnPrice').textContent = priceTxt(p.bid);
    if ($('#buyBtnPrice')) $('#buyBtnPrice').textContent = priceTxt(p.ask);
    if ($('#spreadVal')) {
      $('#spreadVal').textContent = s.cat === 'idx' ? String(Math.round(s.spread)) : s.spread.toFixed(1);
    }

    const chg = $('#pairChange');
    if (chg) {
      chg.textContent = (p.change >= 0 ? '+' : '') + p.change.toFixed(2) + '%';
      chg.className = 'pair-change ' + (p.change >= 0 ? 'up' : 'down');
    }

    // flash bid/ask
    const bidEl = $('#bidPrice');
    const askEl = $('#askPrice');
    if (bidEl) bidEl.style.color = p.dir > 0 ? '#00c853' : p.dir < 0 ? '#ff3b57' : '';
    if (askEl) askEl.style.color = p.dir > 0 ? '#00c853' : p.dir < 0 ? '#ff3b57' : '';
  }

  function selectSymbol(sym) {
    state.activeSymbol = sym;
    const s = getSym(sym);
    if (isEquity(s)) {
      state.stockSymbol = sym;
      state.stockMarket = s.cat === 'idx' ? 'idx' : 'us';
      // sync market tabs UI
      $$('#stockMarketTabs .smt').forEach(b => {
        b.classList.toggle('active', b.dataset.smarket === state.stockMarket);
      });
    }
    if ($('#activePair')) $('#activePair').textContent = sym;
    if ($('#activePairDesc')) $('#activePairDesc').textContent = s.name;
    if ($('#otSymbol')) $('#otSymbol').textContent = sym;
    // Keep zoom level, only snap to live edge on symbol change
    chart.panOffset = 0;
    chart.autoFollow = true;
    chart.priceOffset = 0;
    // Ensure barCount valid for new series length
    const len = candleLen();
    if (len > 0) chart.barCount = clamp(chart.barCount, chart.minBars, Math.min(chart.maxBars, len));
    updateZoomLabel();
    renderSymbols();
    renderStockList();
    updateMarginInfo();
    journal(`Switched to ${sym}`, 'info');
  }

  function renderPositions() {
    const body = $('#positionsBody');
    $('#posCount').textContent = state.positions.length;
    // keep portfolio badge fresh
    try {
      const n = getEquityPositions().length;
      // unique symbols sides
      const keys = new Set(getEquityPositions().map(p => p.symbol + '|' + p.type));
      if ($('#pfBadge')) $('#pfBadge').textContent = String(keys.size);
      const sv = $('#stocksView');
      if (sv && !sv.classList.contains('hidden') && state.stocksTab === 'portfolio') renderPortfolio();
    } catch {}
    if (!state.positions.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="10">No open positions</td></tr>';
      return;
    }
    body.innerHTML = state.positions.map(pos => {
      const pnl = pos.pnl ?? calcPnL(pos);
      const cur = pos.type === 'buy' ? state.prices[pos.symbol]?.bid : state.prices[pos.symbol]?.ask;
      return `<tr>
        <td>${pos.ticket}</td>
        <td><b>${pos.symbol}</b></td>
        <td class="pos-${pos.type}">${pos.type.toUpperCase()}</td>
        <td>${pos.lots.toFixed(2)}</td>
        <td>${fmtPrice(pos.symbol, pos.openPrice)}</td>
        <td>${cur != null ? fmtPrice(pos.symbol, cur) : '—'}</td>
        <td>${pos.sl ? fmtPrice(pos.symbol, pos.sl) : '—'}</td>
        <td>${pos.tp ? fmtPrice(pos.symbol, pos.tp) : '—'}</td>
        <td class="${pnl >= 0 ? 'up' : 'down'}">${fmtMoney(pnl)}</td>
        <td><button class="btn-xs" data-close-pos="${pos.ticket}">Close</button></td>
      </tr>`;
    }).join('');
  }

  function renderOrders() {
    const body = $('#ordersBody');
    $('#ordCount').textContent = state.orders.length;
    if (!state.orders.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="8">No pending orders</td></tr>';
      return;
    }
    body.innerHTML = state.orders.map(o => `<tr>
      <td>${o.ticket}</td>
      <td><b>${o.symbol}</b></td>
      <td class="pos-${o.type}">${o.orderType.toUpperCase()} ${o.type.toUpperCase()}</td>
      <td>${o.lots.toFixed(2)}</td>
      <td>${fmtPrice(o.symbol, o.price)}</td>
      <td>${o.sl ? fmtPrice(o.symbol, o.sl) : '—'}</td>
      <td>${o.tp ? fmtPrice(o.symbol, o.tp) : '—'}</td>
      <td><button class="btn-xs" data-cancel-ord="${o.ticket}">Cancel</button></td>
    </tr>`).join('');
  }

  function renderHistory() {
    const body = $('#historyBody');
    if (!state.history.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="8">No trade history</td></tr>';
      return;
    }
    body.innerHTML = state.history.slice(0, 50).map(h => {
      const t = new Date(h.time).toLocaleString('en-GB', { hour12: false });
      return `<tr>
        <td>${t}</td>
        <td>${h.ticket}</td>
        <td><b>${h.symbol}</b></td>
        <td class="pos-${h.type}">${h.type.toUpperCase()}</td>
        <td>${h.lots.toFixed(2)}</td>
        <td>${fmtPrice(h.symbol, h.closePrice)}</td>
        <td class="${h.profit >= 0 ? 'up' : 'down'}">${fmtMoney(h.profit)}</td>
        <td>${h.comment || ''}</td>
      </tr>`;
    }).join('');
  }

  function renderJournal() {
    const el = $('#journalLog');
    if (!el) return;
    el.innerHTML = state.journal.slice(0, 80).map(j =>
      `<div class="j-line ${j.type}"><span class="jt">${j.t}</span>${j.msg}</div>`
    ).join('') || '<div class="j-line info">Terminal ready. Waiting for activity...</div>';
  }

  function renderAccount() {
    updateAccountModeUI();
    const bal = state.balance;
    const eq = state.equity;
    const pnl = eq - bal;
    const free = eq - state.margin;
    const level = state.margin > 0 ? (eq / state.margin) * 100 : null;

    const set = (id, val, cls) => {
      const el = $(id);
      if (!el) return;
      el.textContent = val;
      if (cls !== undefined) el.className = (el.className.split(' ').filter(c => c !== 'up' && c !== 'down').join(' ') + (cls ? ' ' + cls : '')).trim();
    };

    const pnlCls = pnl > 0.01 ? 'up' : pnl < -0.01 ? 'down' : '';

    set('#headerBalance', fmtMoney(bal));
    set('#headerEquity', fmtMoney(eq));
    set('#headerPnL', (pnl >= 0 ? '+' : '') + fmtMoney(pnl).replace('$-', '-$').replace('$', '$'), pnlCls);
    // fix pnl format
    $('#headerPnL').textContent = (pnl >= 0 ? '+' : '') + fmtMoney(Math.abs(pnl)).replace(/^/, pnl < 0 ? '-' : '').replace('--', '-');
    if (pnl < 0) $('#headerPnL').textContent = '-' + fmtMoney(Math.abs(pnl));
    else if (pnl > 0) $('#headerPnL').textContent = '+' + fmtMoney(pnl);
    else $('#headerPnL').textContent = fmtMoney(0);
    $('#headerPnL').classList.remove('up', 'down');
    if (pnlCls) $('#headerPnL').classList.add(pnlCls);

    set('#asBalance', fmtMoney(bal));
    set('#asEquity', fmtMoney(eq));
    set('#asMargin', fmtMoney(state.margin));
    set('#asFree', fmtMoney(free));
    set('#asLevel', level != null ? fmt(level, 1) + '%' : '—');
    set('#asPnL', (pnl >= 0 ? '+' : '') + (pnl < 0 ? '-' : '') + fmtMoney(Math.abs(pnl)));
    $('#asPnL').classList.remove('up', 'down');
    if (pnlCls) $('#asPnL').classList.add(pnlCls);

    set('#freeMargin', fmtMoney(free));
    if ($('#withdrawAvail')) $('#withdrawAvail').textContent = fmtMoney(Math.max(0, free));

    // live update position PnL cells
    if (state.positions.length) {
      $$('#positionsBody tr').forEach((tr, i) => {
        const pos = state.positions[i];
        if (!pos) return;
        const cells = tr.querySelectorAll('td');
        if (cells.length < 9) return;
        const cur = pos.type === 'buy' ? state.prices[pos.symbol]?.bid : state.prices[pos.symbol]?.ask;
        if (cur != null) cells[5].textContent = fmtPrice(pos.symbol, cur);
        const pnlV = pos.pnl ?? 0;
        cells[8].textContent = fmtMoney(pnlV);
        cells[8].className = pnlV >= 0 ? 'up' : 'down';
      });
    }
  }

  function updateMarginInfo() {
    const lots = parseFloat($('#lotSize')?.value) || 0.1;
    const m = calcMargin(state.activeSymbol, lots);
    $('#reqMargin').textContent = fmtMoney(m);
    $('#freeMargin').textContent = fmtMoney(state.equity - state.margin);
    $('#leverageInfo').textContent = '1:' + state.leverage;
    const s = getSym(state.activeSymbol);
    // pip value approx
    let pipVal = lots * 10;
    if (s.cat === 'crypto') pipVal = lots * s.pip;
    else if (s.cat === 'stocks') pipVal = lots * 100 * s.pip; // $ per 0.01 move × 100 shares
    else if (s.cat === 'idx') pipVal = idrToUsd(lots * 100 * s.pip); // 1 tick × 100 lembar → USD
    else if (s.cat === 'forex') pipVal = lots * 10;
    $('#pipValue').textContent = fmtMoney(pipVal);
    $('#sellLotLabel').textContent = lots.toFixed(2);
    $('#buyLotLabel').textContent = lots.toFixed(2);
  }

  // ─── Modals ──────────────────────────────────────────
  function openModal(id) {
    $('#modalBackdrop').classList.remove('hidden');
    $$('.modal').forEach(m => m.classList.add('hidden'));
    const m = $(id);
    if (m) m.classList.remove('hidden');
  }

  function closeModals() {
    $('#modalBackdrop').classList.add('hidden');
    $$('.modal').forEach(m => m.classList.add('hidden'));
  }

  // ─── Deposit / Withdraw ──────────────────────────────
  function doDeposit() {
    const amt = parseFloat($('#depositAmount').value);
    if (!amt || amt < 10) {
      toast('Invalid Amount', 'Minimum deposit is $10', 'error');
      return;
    }
    // simulate processing
    const btn = $('#confirmDeposit');
    btn.disabled = true;
    btn.textContent = 'Processing...';
    const ref = 'DEP' + Date.now().toString(36).toUpperCase();
    $('#payRef').value = ref;

    setTimeout(() => {
      state.balance += amt;
      state.equity = state.balance + (state.equity - state.balance);
      journal(`Deposit ${fmtMoney(amt)} credited · Ref ${ref}`, 'buy');
      toast('Deposit Successful', `${fmtMoney(amt)} has been credited to your account`, 'success');
      btn.disabled = false;
      btn.textContent = 'Confirm Deposit';
      renderAccount();
      save();
      closeModals();
    }, 1200);
  }

  function doWithdraw() {
    const amt = parseFloat($('#withdrawAmount').value);
    const free = Math.max(0, state.equity - state.margin);
    if (!amt || amt < 10) {
      toast('Invalid Amount', 'Minimum withdrawal is $10', 'error');
      return;
    }
    if (amt > free) {
      toast('Insufficient Funds', `Available: ${fmtMoney(free)}`, 'error');
      return;
    }
    const dest = $('#withdrawDest').value.trim();
    if (!dest) {
      toast('Missing Destination', 'Please enter destination account', 'error');
      return;
    }
    const btn = $('#confirmWithdraw');
    btn.disabled = true;
    btn.textContent = 'Submitting...';

    setTimeout(() => {
      state.balance -= amt;
      updatePositionPnL();
      const ref = 'WD' + Date.now().toString(36).toUpperCase();
      journal(`Withdrawal ${fmtMoney(amt)} submitted · Ref ${ref} → ${dest}`, 'sell');
      toast('Withdrawal Submitted', `${fmtMoney(amt)} · Processing 1–24h · Ref ${ref}`, 'success');
      btn.disabled = false;
      btn.textContent = 'Submit Withdrawal';
      renderAccount();
      save();
      closeModals();
    }, 1000);
  }

  // ─── Admin ───────────────────────────────────────────
  function openAdmin() {
    state.adminUnlocked = true;
    $('#adminBalance').value = Math.round(state.balance);
    openModal('#adminModal');
    // show cheat ball
    $('#cheatBall').classList.remove('hidden');
    save();
    journal('Control Center accessed', 'warn');
  }

  // ─── Cheat Ball Drag ─────────────────────────────────
  function initCheatBall() {
    const ball = $('#cheatBall');
    const panel = $('#cheatPanel');
    let dragging = false, moved = false, ox = 0, oy = 0, sx = 0, sy = 0;

    const getXY = (e) => {
      if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      return { x: e.clientX, y: e.clientY };
    };

    const onStart = (e) => {
      if (e.target.closest && e.target.closest('.cheat-panel')) return;
      dragging = true;
      moved = false;
      const { x, y } = getXY(e);
      const r = ball.getBoundingClientRect();
      ox = x - r.left;
      oy = y - r.top;
      sx = x; sy = y;
      ball.classList.add('dragging');
      e.preventDefault();
    };

    const onMove = (e) => {
      if (!dragging) return;
      const { x, y } = getXY(e);
      if (Math.abs(x - sx) > 5 || Math.abs(y - sy) > 5) moved = true;
      let nx = x - ox;
      let ny = y - oy;
      nx = clamp(nx, 0, window.innerWidth - ball.offsetWidth);
      ny = clamp(ny, 0, window.innerHeight - ball.offsetHeight);
      ball.style.left = nx + 'px';
      ball.style.top = ny + 'px';
      ball.style.right = 'auto';
      ball.style.bottom = 'auto';
      positionPanel();
    };

    const onEnd = () => {
      if (!dragging) return;
      dragging = false;
      ball.classList.remove('dragging');
      if (!moved) toggleCheatPanel();
    };

    ball.addEventListener('mousedown', onStart);
    ball.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);

    function positionPanel() {
      if (panel.classList.contains('hidden')) return;
      const r = ball.getBoundingClientRect();
      const pw = panel.offsetWidth || 300;
      const ph = panel.offsetHeight || 300;
      let left = r.left + r.width / 2 - pw / 2;
      let top = r.top - ph - 12;
      if (top < 8) top = r.bottom + 12;
      left = clamp(left, 8, window.innerWidth - pw - 8);
      top = clamp(top, 8, window.innerHeight - ph - 8);
      panel.style.left = left + 'px';
      panel.style.top = top + 'px';
    }

    function toggleCheatPanel() {
      panel.classList.toggle('hidden');
      if (!panel.classList.contains('hidden')) positionPanel();
    }

    $('#cheatClose').addEventListener('click', () => panel.classList.add('hidden'));

    // expose
    window._positionCheatPanel = positionPanel;
  }

  // ─── Clock ───────────────────────────────────────────
  function updateClock() {
    const d = new Date();
    $('#serverTime').textContent = d.toISOString().substr(11, 8);
  }

  // ─── Auth ────────────────────────────────────────────
  function showApp(user) {
    state.user = user;
    $('#loginScreen').classList.add('hidden');
    $('#app').classList.remove('hidden');
    $('#userName').textContent = user.name;
    $('#userAcc').textContent = '#' + user.account;
    $('#userAvatar').textContent = user.name.charAt(0).toUpperCase();
    $('#pfName').textContent = user.name;
    $('#pfAcc').textContent = '#' + user.account;
    $('#pfEmail').textContent = user.email;
    $('#pfType').textContent = (user.type || 'standard').toUpperCase();
    updateAccountModeUI();

    if (state.adminUnlocked) {
      $('#cheatBall').classList.remove('hidden');
    }

    initPrices();
    initChart();
    renderSymbols();
    renderStockList();
    renderPositions();
    renderOrders();
    renderHistory();
    renderJournal();
    renderAccount();
    updateMarginInfo();
    selectSymbol(state.activeSymbol);

    journal(`Connected to Mikro-Live-01 as ${user.name} (#${user.account})`, 'info');
    journal('Market data feed active · ' + SYMBOLS.length + ' instruments', 'info');
    toast('Connected', `Welcome back, ${user.name}`, 'success');
  }

  function logout() {
    stopAutoTrader();
    save();
    state.user = null;
    state.autoTrader = false;
    state.luck = false;
    state.godMode = false;
    $('#app').classList.add('hidden');
    $('#loginScreen').classList.remove('hidden');
    $('#cheatBall').classList.add('hidden');
    $('#cheatPanel').classList.add('hidden');
    if (chart.animId) cancelAnimationFrame(chart.animId);
  }

  function tryAutoLogin() {
    const data = load();
    if (data && data.user) {
      hydrateFromData(data);
      showApp(data.user);
      return true;
    }
    return false;
  }

  // ─── Splash ──────────────────────────────────────────
  function runSplash() {
    const steps = [
      [15, 'Loading market modules...'],
      [35, 'Connecting to Mikro-Live-01...'],
      [55, 'Synchronizing price feeds...'],
      [75, 'Initializing chart engine...'],
      [90, 'Securing session...'],
      [100, 'Ready'],
    ];
    let i = 0;
    const tick = () => {
      if (i >= steps.length) {
        setTimeout(() => {
          $('#splash').classList.add('hidden');
          if (!tryAutoLogin()) {
            $('#loginScreen').classList.remove('hidden');
          }
        }, 400);
        return;
      }
      const [pct, msg] = steps[i++];
      $('#splashFill').style.width = pct + '%';
      $('#splashStatus').textContent = msg;
      setTimeout(tick, 280 + Math.random() * 200);
    };
    tick();
  }

  // ─── Events ──────────────────────────────────────────
  function bindEvents() {
    // Login tabs
    $$('.login-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.login-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const isSign = tab.dataset.tab === 'signin';
        $('#loginForm').classList.toggle('hidden', !isSign);
        $('#registerForm').classList.toggle('hidden', isSign);
      });
    });

    $('#pwToggle')?.addEventListener('click', () => {
      const inp = $('#loginPass');
      inp.type = inp.type === 'password' ? 'text' : 'password';
    });

    $('#loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = $('#loginUser').value.trim();
      const pass = $('#loginPass').value;
      if (!email || !pass) return;
      const btn = $('#loginBtn');
      btn.textContent = 'Connecting...';
      btn.disabled = true;
      setTimeout(() => {
        const name = email.split('@')[0].replace(/[._]/g, ' ');
        const user = {
          name: name.replace(/\b\w/g, c => c.toUpperCase()) || 'Trader',
          email,
          account: String(1000000 + Math.floor(Math.random() * 900000)),
          type: 'standard',
        };
        // restore dual wallets if same email
        const data = load();
        if (data && data.user && data.user.email === email) {
          hydrateFromData(data);
        } else {
          state.wallets = {
            demo: { balance: 10000, positions: [], orders: [], history: [], ticketSeq: 100001 },
            real: { balance: 0, positions: [], orders: [], history: [], ticketSeq: 200001 },
          };
          // Sign-in defaults to Real account feel, but start demo funded
          applyWallet('demo');
        }
        btn.textContent = 'Connect to Server';
        btn.disabled = false;
        showApp(user);
        save();
      }, 800);
    });

    $('#registerForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#regName').value.trim();
      const email = $('#regEmail').value.trim();
      const type = $('#regType').value;
      if (!name || !email) return;
      const startBal = type === 'vip' ? 50000 : type === 'pro' ? 25000 : 10000;
      state.wallets = {
        demo: { balance: startBal, positions: [], orders: [], history: [], ticketSeq: 100001 },
        real: { balance: 0, positions: [], orders: [], history: [], ticketSeq: 200001 },
      };
      applyWallet('demo');
      const user = {
        name,
        email,
        account: String(1000000 + Math.floor(Math.random() * 900000)),
        type,
      };
      toast('Account Created', `Welcome to MikroTrader, ${name}`, 'success');
      showApp(user);
      save();
    });

    $('#demoBtn').addEventListener('click', () => {
      // Keep existing dual wallets if any; else seed
      const data = load();
      if (data && data.wallets) {
        state.wallets = ensureWalletsFromLegacy(data);
      } else {
        state.wallets = {
          demo: { balance: 10000, positions: [], orders: [], history: [], ticketSeq: 100001 },
          real: { balance: 0, positions: [], orders: [], history: [], ticketSeq: 200001 },
        };
      }
      applyWallet('demo');
      showApp({
        name: 'Demo Trader',
        email: 'demo@mikrotrader.com',
        account: '1000001',
        type: 'demo',
      });
      save();
    });

    $('#forgotLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      toast('Password Reset', 'Reset link sent if account exists', 'info');
    });

    // Brand logo → Admin Control Center
    $('#brandBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      openAdmin();
    });

    // User menu (robust open/close — does not fight document click)
    const closeUserMenu = () => {
      const dd = $('#userDropdown');
      const menu = $('#userMenu');
      if (dd) dd.classList.remove('open');
      if (menu) menu.classList.remove('open');
      $('#userBtn')?.setAttribute('aria-expanded', 'false');
    };
    const toggleUserMenu = (force) => {
      const dd = $('#userDropdown');
      const menu = $('#userMenu');
      if (!dd) return;
      const open = force != null ? !!force : !dd.classList.contains('open');
      dd.classList.toggle('open', open);
      menu?.classList.toggle('open', open);
      $('#userBtn')?.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        // close account dropdown if open
        try { closeAccDropdown(); } catch {}
      }
    };
    $('#userBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleUserMenu();
    });
    $('#userMenu')?.addEventListener('click', (e) => {
      // keep clicks inside menu from bubbling to document closer
      e.stopPropagation();
    });
    $$('#userDropdown button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const a = btn.dataset.action;
        closeUserMenu();
        if (a === 'logout') logout();
        else if (a === 'profile') openModal('#profileModal');
        else if (a === 'history') {
          $$('.bp-tab').forEach(t => t.classList.remove('active'));
          $$('.bp-panel').forEach(p => p.classList.remove('active'));
          $('[data-panel="history"]')?.classList.add('active');
          $('#panel-history')?.classList.add('active');
        } else if (a === 'settings') openModal('#settingsModal');
      });
    });
    document.addEventListener('click', (e) => {
      if (e.target.closest('#userMenu')) return;
      closeUserMenu();
    });

    // Symbol search / tabs
    $('#symbolSearch')?.addEventListener('input', renderSymbols);
    $$('.stab').forEach(t => t.addEventListener('click', () => {
      $$('.stab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      state.category = t.dataset.cat;
      renderSymbols();
    }));

    // Timeframes
    $$('.tf').forEach(t => t.addEventListener('click', () => {
      $$('.tf').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      state.timeframe = t.dataset.tf;
      chart.barCount = defaultBarCount();
      chart.panOffset = 0;
      chart.autoFollow = true;
      chart.priceOffset = 0;
      chart.priceZoom = 1;
      updateZoomLabel();
    }));

    // Chart type picker
    try {
      const savedCt = localStorage.getItem('mt_chart_type');
      if (savedCt && CHART_TYPES[savedCt]) setChartType(savedCt, { silent: true });
      else setChartType(state.chartType || 'candle', { silent: true });
    } catch {
      setChartType(state.chartType || 'candle', { silent: true });
    }
    $('#chartTypeBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const menu = $('#chartTypeMenu');
      toggleChartTypeMenu(menu ? menu.hidden : true);
    });
    $$('#chartTypeGrid .ct-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setChartType(item.dataset.chart);
      });
    });
    document.addEventListener('click', (e) => {
      if (e.target.closest('#chartTypeWrap')) return;
      closeChartTypeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeChartTypeMenu();
    });

    $('#indBtn')?.addEventListener('click', () => {
      // sync checkboxes
      if ($('#indMA')) $('#indMA').checked = !!state.indicators.ma;
      if ($('#indEMA')) $('#indEMA').checked = !!state.indicators.ema;
      if ($('#indBB')) $('#indBB').checked = !!state.indicators.bb;
      if ($('#indRSI')) $('#indRSI').checked = !!state.indicators.rsi;
      if ($('#indMACD')) $('#indMACD').checked = !!state.indicators.macd;
      if ($('#indVWAP')) $('#indVWAP').checked = !!state.indicators.vwap;
      if ($('#indVolume')) $('#indVolume').checked = !!state.indicators.volume;
      if ($('#indGrid')) $('#indGrid').checked = state.indicators.grid !== false;
      if ($('#indCrosshair')) $('#indCrosshair').checked = state.indicators.crosshair !== false;
      openModal('#indModal');
    });
    $('#applyInd')?.addEventListener('click', () => {
      state.indicators.ma = $('#indMA')?.checked || false;
      state.indicators.ema = $('#indEMA')?.checked || false;
      state.indicators.bb = $('#indBB')?.checked || false;
      state.indicators.rsi = $('#indRSI')?.checked || false;
      state.indicators.macd = $('#indMACD')?.checked || false;
      state.indicators.vwap = $('#indVWAP')?.checked || false;
      state.indicators.volume = $('#indVolume')?.checked || false;
      state.indicators.grid = $('#indGrid')?.checked !== false;
      state.indicators.crosshair = $('#indCrosshair')?.checked !== false;
      toast('Indicators', 'Applied', 'success');
    });

    $('#fullscreenChart')?.addEventListener('click', () => {
      const el = $('.chart-wrap');
      if (!document.fullscreenElement) el.requestFullscreen?.();
      else document.exitFullscreen?.();
    });

    // Lots
    $('#lotMinus')?.addEventListener('click', () => {
      const v = Math.max(0.01, (parseFloat($('#lotSize').value) || 0.1) - 0.01);
      $('#lotSize').value = v.toFixed(2);
      updateMarginInfo();
    });
    $('#lotPlus')?.addEventListener('click', () => {
      const v = Math.min(100, (parseFloat($('#lotSize').value) || 0.1) + 0.01);
      $('#lotSize').value = v.toFixed(2);
      updateMarginInfo();
    });
    $('#lotSize')?.addEventListener('input', updateMarginInfo);
    $$('.lot-presets button').forEach(b => b.addEventListener('click', () => {
      $('#lotSize').value = parseFloat(b.dataset.lot).toFixed(2);
      updateMarginInfo();
    }));

    $('#orderType')?.addEventListener('change', () => {
      const v = $('#orderType').value;
      $('#pendingPriceField').classList.toggle('hidden', v === 'market');
      $('#otMarket').textContent = v === 'market' ? 'MARKET' : v.toUpperCase();
      if (v !== 'market') {
        const p = state.prices[state.activeSymbol];
        if (p) $('#pendingPrice').value = p.mid.toFixed(getSym(state.activeSymbol).digits);
      }
    });

    // Trade buttons
    const doBuy = () => placeOrder('buy');
    const doSell = () => placeOrder('sell');
    $('#quickBuy')?.addEventListener('click', doBuy);
    $('#quickSell')?.addEventListener('click', doSell);
    $('#placeBuy')?.addEventListener('click', doBuy);
    $('#placeSell')?.addEventListener('click', doSell);
    $('#closeAllBtn')?.addEventListener('click', closeAll);

    // Position close / order cancel (delegated)
    document.addEventListener('click', (e) => {
      const cp = e.target.closest('[data-close-pos]');
      if (cp) closePosition(Number(cp.dataset.closePos));
      const co = e.target.closest('[data-cancel-ord]');
      if (co) cancelOrder(Number(co.dataset.cancelOrd));
    });

    // Bottom panels
    $$('.bp-tab').forEach(t => t.addEventListener('click', () => {
      $$('.bp-tab').forEach(x => x.classList.remove('active'));
      $$('.bp-panel').forEach(p => p.classList.remove('active'));
      t.classList.add('active');
      $(`#panel-${t.dataset.panel}`)?.classList.add('active');
    }));

    // Deposit / Withdraw
    const openDep = () => {
      $('#depositAmount').value = 500;
      $('#payRef').value = '';
      openModal('#depositModal');
    };
    const openWd = () => {
      $('#withdrawAmount').value = 100;
      $('#withdrawAvail').textContent = fmtMoney(Math.max(0, state.equity - state.margin));
      openModal('#withdrawModal');
    };
    $('#depositBtn')?.addEventListener('click', openDep);
    $('#qaDeposit')?.addEventListener('click', openDep);
    $('#withdrawBtn')?.addEventListener('click', openWd);
    $('#qaWithdraw')?.addEventListener('click', openWd);
    $('#confirmDeposit')?.addEventListener('click', doDeposit);
    $('#confirmWithdraw')?.addEventListener('click', doWithdraw);

    $$('.method').forEach(m => m.addEventListener('click', () => {
      $$('.method').forEach(x => x.classList.remove('active'));
      m.classList.add('active');
      state.depositMethod = m.dataset.method;
    }));
    $$('.amount-presets button[data-amt]').forEach(b => b.addEventListener('click', () => {
      $('#depositAmount').value = b.dataset.amt;
    }));

    // Modal close
    $('#modalBackdrop')?.addEventListener('click', (e) => {
      if (e.target === $('#modalBackdrop') || e.target.closest('[data-close]')) closeModals();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModals();
        $('#cheatPanel')?.classList.add('hidden');
        if ($('#stocksView') && !$('#stocksView').classList.contains('hidden')) {
          closeStocksView();
        }
      }
    });

    // Admin
    $('#adminSetBal')?.addEventListener('click', () => {
      const v = parseFloat($('#adminBalance').value);
      if (isNaN(v) || v < 0) return;
      state.balance = v;
      updatePositionPnL();
      renderAccount();
      save();
      toast('Balance Updated', `${(state.accountMode || 'demo').toUpperCase()} · ${fmtMoney(v)}`, 'success');
      journal(`Balance set to ${fmtMoney(v)} on ${(state.accountMode || 'demo').toUpperCase()} via Control Center`, 'warn');
    });
    $$('[data-admin-amt]').forEach(b => b.addEventListener('click', () => {
      $('#adminBalance').value = b.dataset.adminAmt;
    }));
    function resetBalanceToDefault() {
      const hadPos = state.positions.length;
      state.balance = 10000;
      state.positions = [];
      state.orders = [];
      state.margin = 0;
      state.equity = 10000;
      state.luckDir = 0;
      state.luckTicks = 0;
      state.luckSymbol = null;
      renderPositions();
      renderOrders();
      renderHistory();
      renderAccount();
      updateMarginInfo();
      try { renderPortfolio(); } catch {}
      save();
      journal('Balance reset to $10,000.00 (' + (state.accountMode || 'demo').toUpperCase() + ')' + (hadPos ? ` · ${hadPos} position(s) closed` : ''), 'warn');
      toast('Balance Reset', (state.accountMode === 'real' ? 'Real' : 'Demo') + ' account restored to $10,000.00', 'success');
    }

    function resetStockPortfolio() {
      const equityPos = state.positions.filter(pos => {
        const s = getSym(pos.symbol);
        return s.cat === 'idx' || s.cat === 'stocks';
      });
      if (!equityPos.length) {
        toast('Portofolio Kosong', 'Tidak ada holding saham untuk di-reset', 'info');
        return;
      }
      const n = equityPos.length;
      const tickets = new Set(equityPos.map(p => p.ticket));
      // Remove equity positions only; keep FX/crypto/etc.
      // Realize nothing — hard clear holdings (demo reset)
      state.positions = state.positions.filter(p => !tickets.has(p.ticket));
      // Also drop pending stock orders if any
      state.orders = state.orders.filter(o => {
        const s = getSym(o.symbol);
        return s.cat !== 'idx' && s.cat !== 'stocks';
      });
      // Clear luck lock if it was on a stock
      if (state.luckSymbol) {
        const ls = getSym(state.luckSymbol);
        if (ls.cat === 'idx' || ls.cat === 'stocks') {
          state.luckDir = 0;
          state.luckTicks = 0;
          state.luckSymbol = null;
        }
      }
      updatePositionPnL();
      renderPositions();
      renderOrders();
      renderAccount();
      updateMarginInfo();
      try { renderPortfolio(); } catch {}
      if ($('#pfBadge')) {
        try {
          const keys = new Set(getEquityPositions().map(p => p.symbol + '|' + p.type));
          $('#pfBadge').textContent = String(keys.size);
        } catch { $('#pfBadge').textContent = '0'; }
      }
      save();
      journal(`Portofolio saham di-reset · ${n} posisi dihapus`, 'warn');
      toast('Portofolio Reset', `${n} holding saham dihapus · balance tetap`, 'success');
    }

    $('#adminReset')?.addEventListener('click', resetBalanceToDefault);
    $('#resetBalanceBtn')?.addEventListener('click', () => {
      const m = (state.accountMode === 'real') ? 'REAL' : 'DEMO';
      if (!confirm(`Reset balance akun ${m} ke $10,000?\n\nPosisi & pending di akun ${m} akan dihapus.\nAkun lain tidak terpengaruh.`)) return;
      resetBalanceToDefault();
    });
    const doResetPortfolio = () => {
      const n = state.positions.filter(pos => {
        const s = getSym(pos.symbol);
        return s.cat === 'idx' || s.cat === 'stocks';
      }).length;
      if (!n) {
        toast('Portofolio Kosong', 'Tidak ada holding saham untuk di-reset', 'info');
        return;
      }
      if (!confirm(`Reset Portofolio Saham?\n\n${n} posisi saham (IDX/US) akan dihapus.\nBalance & posisi non-saham tetap.`)) return;
      resetStockPortfolio();
    };
    $('#resetPortfolioBtn')?.addEventListener('click', doResetPortfolio);
    $('#adminClearPos')?.addEventListener('click', () => {
      state.positions = [];
      state.margin = 0;
      updatePositionPnL();
      renderPositions();
      renderAccount();
      save();
      toast('Positions Cleared', 'All positions removed', 'info');
    });
    $('#adminOpenCheat')?.addEventListener('click', () => {
      closeModals();
      $('#cheatBall').classList.remove('hidden');
      $('#cheatPanel').classList.remove('hidden');
      window._positionCheatPanel?.();
    });
    $('#adminVol')?.addEventListener('input', (e) => {
      state.volatility = parseFloat(e.target.value);
    });
    $('#adminTrend')?.addEventListener('change', (e) => {
      state.trendBias = parseFloat(e.target.value);
    });

    // Cheats
    $('#cheatAuto')?.addEventListener('change', (e) => {
      state.autoTrader = e.target.checked;
      $('#autoOpts').classList.toggle('open', state.autoTrader);
      if (state.autoTrader) {
        startAutoTrader();
        toast('Auto Trader ON', 'AI engine analyzing markets', 'success');
        journal('Auto Trader activated', 'warn');
        $('#cheatBall').classList.add('pulse-active');
      } else {
        stopAutoTrader();
        toast('Auto Trader OFF', 'Manual trading resumed', 'info');
        if (!state.luck) $('#cheatBall').classList.remove('pulse-active');
      }
    });
    $('#cheatLuck')?.addEventListener('change', (e) => {
      state.luck = e.target.checked;
      $('#luckOpts').classList.toggle('open', state.luck);
      if (state.luck) {
        const m = state.luckMode === 'normal' ? 'Normal (natural market flow)' : 'Cepat (langsung ikut)';
        toast('Keberuntungan ON', `Mode ${m}`, 'success');
        journal(`Keberuntungan ON · mode ${state.luckMode}`, 'warn');
        if (state.positions.length) {
          updateLuckStatus(`${state.luckMode === 'cepat' ? 'Cepat' : 'Normal'} · guiding ${state.positions.length}`);
        } else {
          updateLuckStatus('Standby — place a BUY or SELL');
        }
        $('#cheatBall').classList.add('pulse-active');
        updateLuckModeHint();
      } else {
        state.luckDir = 0;
        state.luckTicks = 0;
        state.luckSymbol = null;
        state.luckNormal = {};
        // Re-seed market so flow continues cleanly after luck off
        SYMBOLS.forEach(s => {
          const ms = ensureMarketState(s.symbol);
          ms.phase = Math.random() < 0.5 ? 'trend' : 'chop';
          ms.phaseLeft = Math.floor(rand(25, 70));
          ms.mom *= 0.3;
        });
        toast('Keberuntungan OFF', 'Market berjalan normal', 'info');
        updateLuckStatus('Market live · luck off');
        if (!state.autoTrader) $('#cheatBall').classList.remove('pulse-active');
      }
    });

    // Luck mode tabs (Cepat / Normal)
    $$('[data-luck-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('[data-luck-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.luckMode = btn.dataset.luckMode || 'cepat';
        state.luckPhase = 0;
        state.luckNormal = {};
        updateLuckModeHint();
        toast(
          'Mode Keberuntungan',
          state.luckMode === 'cepat'
            ? '⚡ Cepat — loncat ikut order'
            : '🌊 Normal — natural flow (drift · chop · pullback)',
          'info'
        );
        if (state.luck) {
          updateLuckStatus(state.luckMode === 'cepat' ? 'Cepat · siap' : 'Normal · market flow siap');
        }
      });
    });

    function updateLuckModeHint() {
      const el = $('#luckModeHint');
      if (!el) return;
      if (state.luckMode === 'normal') {
        el.textContent = 'Natural: naik pelan, sideways, pullback sebentar, lalu lanjut';
      } else {
        el.textContent = 'Cepat — harga langsung loncat mengikuti order';
      }
    }
    updateLuckModeHint();

    $('#cheatGod')?.addEventListener('change', (e) => {
      state.godMode = e.target.checked;
      toast(state.godMode ? 'God Mode ON' : 'God Mode OFF',
        state.godMode ? 'Forced profitable closes enabled' : 'Normal P/L',
        state.godMode ? 'success' : 'info');
    });
    $('#luckStrength')?.addEventListener('input', (e) => {
      state.luckStrength = parseInt(e.target.value, 10);
    });

    // Invisible floating ball
    function applyBallVisibility() {
      const ball = $('#cheatBall');
      if (!ball) return;
      if (state.ballInvisible) {
        ball.classList.add('invisible-mode');
        const op = Math.max(0, Math.min(40, state.ballOpacity)) / 100;
        ball.style.opacity = String(op);
        // keep clickable even at 0 opacity
        ball.style.pointerEvents = 'auto';
      } else {
        ball.classList.remove('invisible-mode');
        ball.style.opacity = '';
      }
    }

    $('#cheatInvisible')?.addEventListener('change', (e) => {
      state.ballInvisible = e.target.checked;
      applyBallVisibility();
      if (state.ballInvisible) {
        toast('Tombol Disembunyikan', 'Bola ⚡ invisible · tetap bisa diklik · logo brand untuk buka admin', 'info');
        // auto-close panel so it's stealth
        $('#cheatPanel')?.classList.add('hidden');
      } else {
        toast('Tombol Terlihat', 'Bola ⚡ tampil normal', 'success');
      }
      try { localStorage.setItem('mt_ball_invis', state.ballInvisible ? '1' : '0'); } catch {}
    });
    $('#invisOpacity')?.addEventListener('input', (e) => {
      state.ballOpacity = parseInt(e.target.value, 10) || 0;
      if (state.ballInvisible) applyBallVisibility();
      try { localStorage.setItem('mt_ball_op', String(state.ballOpacity)); } catch {}
    });

    // restore invisible prefs
    try {
      if (localStorage.getItem('mt_ball_invis') === '1') {
        state.ballInvisible = true;
        const op = parseInt(localStorage.getItem('mt_ball_op') || '0', 10);
        state.ballOpacity = isNaN(op) ? 0 : op;
        if ($('#cheatInvisible')) $('#cheatInvisible').checked = true;
        if ($('#invisOpacity')) $('#invisOpacity').value = String(state.ballOpacity);
        applyBallVisibility();
      }
    } catch {}
    $('#autoMode')?.addEventListener('change', (e) => { state.autoMode = e.target.value; });
    $('#autoLot')?.addEventListener('change', (e) => { state.autoLot = parseFloat(e.target.value) || 0.1; });
    $('#autoInterval')?.addEventListener('change', (e) => {
      state.autoInterval = parseFloat(e.target.value) || 8;
      if (state.autoTrader) startAutoTrader();
    });

    // Mobile nav
    $$('.mn-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.mn-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const v = btn.dataset.view;
        $('#leftSide')?.classList.remove('mobile-show');
        $('#rightSide')?.classList.remove('mobile-show');
        $('.bottom-panels')?.classList.remove('mobile-show');
        $('.main-area')?.classList.remove('mobile-hide');

        if (v === 'stocks') {
          openStocksView();
          return;
        }
        closeStocksView();
        if (v === 'watch') $('#leftSide')?.classList.add('mobile-show');
        else if (v === 'trade') $('#rightSide')?.classList.add('mobile-show');
        else if (v === 'positions') $('.bottom-panels')?.classList.add('mobile-show');
        else if (v === 'account') {
          $('#rightSide')?.classList.add('mobile-show');
        }
      });
    });

    // Sidebar toggles
    $('#toggleLeft')?.addEventListener('click', () => {
      $('#leftSide').style.display = $('#leftSide').style.display === 'none' ? '' : 'none';
      resizeChart();
    });
    $('#toggleRight')?.addEventListener('click', () => {
      $('#rightSide').style.display = $('#rightSide').style.display === 'none' ? '' : 'none';
      resizeChart();
    });

    // ── Saham full screen ──
    $('#openStocksBtn')?.addEventListener('click', () => openStocksView('market'));
    $('#openPortfolioBtn')?.addEventListener('click', () => openStocksView('portfolio'));
    const bindCloseStocks = (el) => {
      el?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeStocksView();
      });
    };
    bindCloseStocks($('#closeStocksBtn'));
    bindCloseStocks($('#svBackFab'));

    $$('#svMainTabs .sv-mtab').forEach(btn => {
      btn.addEventListener('click', () => setStocksTab(btn.dataset.svtab || 'market'));
    });
    $$('#pfFilters .pf-f').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('#pfFilters .pf-f').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.pfFilter = btn.dataset.pf || 'all';
        renderPortfolio();
      });
    });
    $('#pfRefreshBtn')?.addEventListener('click', () => {
      renderPortfolio();
      toast('Portofolio', 'Data holding diperbarui', 'info');
    });
    $('#pfGoMarketBtn')?.addEventListener('click', () => setStocksTab('market'));

    document.addEventListener('click', (e) => {
      const chartBtn = e.target.closest('[data-pf-chart]');
      if (chartBtn) {
        const sym = chartBtn.dataset.pfChart;
        selectStock(sym, { openChart: true });
        return;
      }
      const closeBtn = e.target.closest('[data-pf-close]');
      if (closeBtn) {
        const [sym, type] = (closeBtn.dataset.pfClose || '').split('|');
        const list = state.positions.filter(p => p.symbol === sym && p.type === type);
        if (!list.length) return;
        if (!confirm(`Close ${list.length} posisi ${type?.toUpperCase()} ${sym}?`)) return;
        list.map(p => p.ticket).forEach(tk => closePosition(tk));
        renderPortfolio();
        return;
      }
      const row = e.target.closest('tr[data-pf-sym]');
      if (row && !e.target.closest('button')) {
        const sym = row.dataset.pfSym;
        if (sym) {
          state.stockSymbol = sym;
          const s = getSym(sym);
          if (isEquity(s)) {
            state.stockMarket = s.cat === 'idx' ? 'idx' : 'us';
            $$('#stockMarketTabs .smt').forEach(b => b.classList.toggle('active', b.dataset.smarket === state.stockMarket));
          }
          setStocksTab('market');
          selectStock(sym, { openChart: false });
        }
      }
    });
    $$('#stockMarketTabs .smt').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('#stockMarketTabs .smt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.stockMarket = btn.dataset.smarket || 'idx';
        const sub = $('#svSub');
        if (sub) {
          sub.textContent = state.stockMarket === 'us'
            ? 'US Equities · Live CFD'
            : 'Bursa Efek Indonesia · Live';
        }
        // reset lot step feel for market
        if ($('#sdLot') && state.stockMarket === 'idx') {
          const v = Math.max(1, Math.round(parseFloat($('#sdLot').value) || 1));
          $('#sdLot').value = String(v);
        }
        // hide buy/sell until user picks a product in this market
        state.stockSymbol = null;
        renderStockList();
        syncStockDetailVisibility();
      });
    });
    $('#stockSearch')?.addEventListener('input', renderStockList);
    $('#sdLot')?.addEventListener('input', updateStockNotional);
    $('#sdLotMinus')?.addEventListener('click', () => {
      const inp = $('#sdLot');
      if (!inp) return;
      const step = state.stockMarket === 'idx' ? 1 : 0.1;
      const v = Math.max(0.01, (parseFloat(inp.value) || 1) - step);
      inp.value = state.stockMarket === 'idx' ? String(Math.max(1, Math.round(v))) : v.toFixed(2);
      updateStockNotional();
    });
    $('#sdLotPlus')?.addEventListener('click', () => {
      const inp = $('#sdLot');
      if (!inp) return;
      const step = state.stockMarket === 'idx' ? 1 : 0.1;
      const v = Math.min(100, (parseFloat(inp.value) || 1) + step);
      inp.value = state.stockMarket === 'idx' ? String(Math.round(v)) : v.toFixed(2);
      updateStockNotional();
    });
    $$('[data-sd-lot]').forEach(b => b.addEventListener('click', () => {
      if ($('#sdLot')) $('#sdLot').value = b.dataset.sdLot;
      updateStockNotional();
    }));
    $('#sdOpenChart')?.addEventListener('click', () => {
      if (!state.stockSymbol) {
        toast('Pilih Saham', 'Pilih produk dulu sebelum buka chart', 'warn');
        return;
      }
      selectStock(state.stockSymbol, { openChart: true });
    });
    $('#sdBuy')?.addEventListener('click', () => placeStockOrder('buy'));
    $('#sdSell')?.addEventListener('click', () => placeStockOrder('sell'));
    $('#sdClearBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearStockSelection();
    });


    // ── Account Real / Demo switcher ──
    const onBalanceChipClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dd = $('#accDropdown');
      const willOpen = dd ? dd.hidden : true;
      toggleAccDropdown(willOpen);
      // close user menu when opening account switcher
      try {
        $('#userDropdown')?.classList.remove('open');
        $('#userMenu')?.classList.remove('open');
      } catch {}
    };
    $('#balanceChip')?.addEventListener('click', onBalanceChipClick);
    // also allow clicking the wrapper
    $('#accountSwitcher')?.addEventListener('click', (e) => {
      if (e.target.closest('.acc-option')) return;
      if (e.target.closest('#balanceChip')) return; // already handled
      // click on switcher chrome opens chip
      if (e.target.closest('#accDropdown')) return;
    });
    $('#asAccModeBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleAccDropdown(true);
      try { $('#balanceChip')?.scrollIntoView({ block: 'nearest' }); } catch {}
    });
    $$('#accDropdown .acc-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        switchAccountMode(opt.dataset.acc);
      });
    });
    // prevent dropdown internal clicks from closing via document
    $('#accDropdown')?.addEventListener('click', (e) => e.stopPropagation());
    document.addEventListener('click', (e) => {
      if (e.target.closest('#accountSwitcher')) return;
      closeAccDropdown();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAccDropdown();
        try {
          $('#userDropdown')?.classList.remove('open');
          $('#userMenu')?.classList.remove('open');
        } catch {}
      }
    });

    // Ping simulation
    setInterval(() => {
      const el = $('#pingMs');
      if (el) el.textContent = String(8 + Math.floor(Math.random() * 20));
    }, 3000);
  }

  // ─── Main Loop ───────────────────────────────────────
  function startEngine() {
    // price ticks ~5 per second — equity boards need frequent residual pressure
    setInterval(() => {
      if (!state.user) return;
      tickPrices();
      checkSLTP();
    }, 200);

    setInterval(updateClock, 1000);
    updateClock();

    // periodic save
    setInterval(() => { if (state.user) save(); }, 15000);
  }

  // ─── Boot ────────────────────────────────────────────

  // ─── Appearance / Theme ────────────────────────────────
  const THEME_KEY = 'mt_ui_theme';
  const DENSITY_KEY = 'mt_ui_density';
  const MOTION_KEY = 'mt_ui_motion';
  const THEMES = ['dark', 'neutral', 'light'];
  const THEME_LABELS = { dark: 'Hitam', neutral: 'Netral', light: 'Putih' };

  function getTheme() {
    try {
      const v = localStorage.getItem(THEME_KEY);
      if (THEMES.includes(v)) return v;
    } catch {}
    return 'dark';
  }

  function applyTheme(theme, { silent = false, animate = true } = {}) {
    if (!THEMES.includes(theme)) theme = 'dark';
    const html = document.documentElement;
    if (animate) {
      html.classList.add('theme-anim');
      setTimeout(() => html.classList.remove('theme-anim'), 320);
    }
    html.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch {}

    const meta = document.getElementById('themeColorMeta') || document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const colors = { dark: '#0a0a0b', neutral: '#141416', light: '#f4f4f5' };
      meta.setAttribute('content', colors[theme] || colors.dark);
    }

    // Sync picker UI
    document.querySelectorAll('#themeGrid .theme-card').forEach(card => {
      const on = card.dataset.theme === theme;
      card.classList.toggle('active', on);
      card.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    const lbl = document.getElementById('themeToggleLabel');
    if (lbl) lbl.textContent = THEME_LABELS[theme] || 'Tema';
    const btn = document.getElementById('themeToggleBtn');
    if (btn) btn.title = `Tema: ${THEME_LABELS[theme]} · klik ganti`;

    if (!silent) {
      toast('Tema Diterapkan', `Tampilan ${THEME_LABELS[theme]} aktif`, 'success');
    }
  }

  function cycleTheme() {
    const cur = getTheme();
    const i = THEMES.indexOf(cur);
    applyTheme(THEMES[(i + 1) % THEMES.length]);
  }

  function applyDensity(density, { silent = true } = {}) {
    density = density === 'compact' ? 'compact' : 'comfortable';
    document.documentElement.setAttribute('data-density', density);
    try { localStorage.setItem(DENSITY_KEY, density); } catch {}
    document.querySelectorAll('#densityTabs .density-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.density === density);
    });
    if (!silent) toast('Density', density === 'compact' ? 'Compact UI' : 'Comfortable UI', 'info');
  }

  function applyReduceMotion(on) {
    document.documentElement.classList.toggle('reduce-motion', !!on);
    try { localStorage.setItem(MOTION_KEY, on ? '1' : '0'); } catch {}
    const cb = document.getElementById('setReduceMotion');
    if (cb) cb.checked = !!on;
  }

  function initAppearance() {
    applyTheme(getTheme(), { silent: true, animate: false });
    let density = 'comfortable';
    try { density = localStorage.getItem(DENSITY_KEY) || 'comfortable'; } catch {}
    applyDensity(density, { silent: true });
    let motion = false;
    try { motion = localStorage.getItem(MOTION_KEY) === '1'; } catch {}
    applyReduceMotion(motion);

    document.getElementById('themeToggleBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      cycleTheme();
    });

    document.querySelectorAll('#themeGrid .theme-card').forEach(card => {
      card.addEventListener('click', () => applyTheme(card.dataset.theme));
    });

    document.querySelectorAll('#densityTabs .density-btn').forEach(btn => {
      btn.addEventListener('click', () => applyDensity(btn.dataset.density, { silent: false }));
    });

    document.getElementById('setReduceMotion')?.addEventListener('change', (e) => {
      applyReduceMotion(e.target.checked);
    });
    const g = document.getElementById('setChartGrid');
    if (g) {
      g.checked = state.indicators.grid !== false;
      g.addEventListener('change', () => { state.indicators.grid = g.checked; });
    };
  }


  // ─── 3D Brand wordmark ───────────────────────────────
  function initBrand3D() {
    document.querySelectorAll('.bn-letter').forEach(el => {
      const ch = el.textContent || '';
      el.setAttribute('data-ch', ch);
      // extrusion pseudo needs content — also set for ::before via attr
    });

    const hosts = document.querySelectorAll('.brand-3d.is-splash, .brand-3d.is-login');
    if (!hosts.length) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      tx = x;
      ty = y;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      raf = 0;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      hosts.forEach(h => {
        const inner = h.querySelector('.brand-3d-inner');
        if (!inner) return;
        h.classList.add('is-tilt');
        const rotY = cx * 16;
        const rotX = -cy * 10 + 6;
        inner.style.transform =
          `translate3d(0, ${(-cy * 4).toFixed(2)}px, 10px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      });
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
  }

  function boot() {
    initBrand3D();
    initAppearance();
    bindEvents();
    bindZoomControls();
    initCheatBall();
    startEngine();
    runSplash();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
