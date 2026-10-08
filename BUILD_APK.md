# Generar APK instalable

El repositorio incluye `.github/workflows/android-apk.yml`.

Al ejecutar el workflow **Build Android APK**, GitHub genera el artefacto:

`SlotSec-Lab.apk`

También puedes compilar localmente:

```bash
npm install
npx expo prebuild --platform android --clean
cd android
./gradlew assembleDebug
```

El APK queda en `android/app/build/outputs/apk/debug/app-debug.apk`.
