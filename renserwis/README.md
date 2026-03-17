# REN-Serwis (React CDN)

Ta strona działa jako **Reactowa aplikacja** przy pomocy **React + ReactDOM CDN** i **Babel w przeglądarce**.

## Jak uruchomić

### 1) Najprościej (bez serwera)
Po prostu otwórz:

- `index.html`

w przeglądarce (dwuklik lub `Plik > Otwórz`).

### 2) (Rekomendowane) Uruchomienie lokalnego serwera
Jeśli chcesz mieć pewność, że wszystko działa jak w środowisku webowym:

1. Otwórz PowerShell w katalogu projektu:
   ```powershell
   cd c:\Users\oliwier\Desktop\stronki\renserwis
   ```
2. Uruchom serwer:
   ```powershell
   .\start.ps1
   ```

To otworzy stronę automatycznie w domyślnej przeglądarce.

## Co znajduje się w projekcie

- `index.html` – ładuje React + Babel z CDN i renderuje aplikację w `<div id="root">`.
- `script.js` – cała logika React (UI, formularz, nawigacja, animacje).
- `style.css` – styl strony.
- `start.ps1` – prosty skrypt uruchamiający serwer HTTP.
