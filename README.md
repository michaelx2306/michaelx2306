# SlotSec Lab V3 — Wi‑Fi Auto Audit

Aplicación móvil defensiva para identificar y evaluar automáticamente **máquinas propias, simuladores y equipos expresamente autorizados** mediante Wi‑Fi.

## Qué hace automáticamente

1. Detecta la IPv4 privada del teléfono.
2. Recorre solo la subred `/24` local y consulta únicamente `TCP/8765`.
3. Acepta únicamente respuestas con firma `SLOTSEC-WIFI-V1`.
4. Carga fabricante, modelo, revisión, firmware, controles y servicios reportados por el agente de solo lectura.
5. Busca un CPE en NVD y solo atribuye CVE si obtiene una coincidencia suficientemente fiable o si el agente ya proporciona el CPE exacto.
6. Evalúa cifrado, autenticación, debug, credenciales predeterminadas, Secure Boot, firma de firmware, versión mínima y servicios inseguros.
7. Genera score 0–100, riesgo, remediaciones, historial SQLite y PDF.

## Aladdin Lamp / HET-VER3.1

Incluye un perfil para `HET-VER3.1`. La foto permite reconocer la familia/revisión, pero la app **no puede inventar** firmware ni estados internos que la placa no exponga. Por eso los campos no verificables quedan como `null / No confirmado` hasta conectar una interfaz documentada de solo lectura.

Hay dos puentes incluidos:

- `firmware/esp32-slotsec-wifi-bridge/`: crea el AP `SLOTSEC-ALADDIN-01` y permite probar la app en `192.168.4.1`.
- `agent/`: agente para Raspberry Pi/Linux, recomendado cuando haga falta inventario USB/serial o comprobaciones de servicios autorizadas.

## Seguridad del diseño

No contiene fuerza bruta, exploits, escritura de firmware ni funciones para modificar créditos, pagos, jackpots o RNG. El escaneo automático no es un port scanner general: solo busca el agente SlotSec en `TCP/8765` dentro de IPv4 privada.

## Ejecutar

```bash
npm install
npm run validate
npx expo prebuild --platform android
npx expo run:android
```

Para generar APK con GitHub Actions, usa `.github/workflows/android-apk.yml`.
