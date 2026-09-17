# MikroTrader

Institutional multi-asset trading terminal (MetaTrader-style desk).

## Features

- Live simulated feeds: Forex, Crypto, Indices, Commodities, IDX + US stocks
- Chart types (candles, hollow, Heikin Ashi, bars, line, area, baseline, …) with zoom/pan
- Indicators: MA / EMA / BB / VWAP overlays; RSI / MACD / volume panels
- Market & pending orders, SL/TP, positions, history, journal
- Dual wallets: **Real** and **Demo**
- Full-screen **Saham** desk (IDX / US) with portfolio P/L
- Themes: Dark / Neutral / Light · density & motion settings
- Account tools: Reset Balance, Reset Portfolio (Account only)

## Run

```bash
python3 -m http.server 8080 --bind 0.0.0.0
# open http://127.0.0.1:8080/
```

Or open `index.html` in a modern browser (hard-refresh after updates).

## Brand

**MikroTrader** — Terminal v10 · Institutional Desk
