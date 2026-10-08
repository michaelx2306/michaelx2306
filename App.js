import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";

const LAB_ENDPOINTS = [
  "http://192.168.4.1/profile",
  "http://192.168.4.1/slotsec/profile",
  "http://slotsec.local/profile",
  "http://aladdin-01.local/profile",
];

const demo = {
  signature: "SLOTSEC-WIFI-V1",
  name: "ALADDIN-01",
  vendor: "HET",
  model: "HET-VER3.1",
  product: "Aladdin Lamp",
  firmware: "3.1-lab",
  encryptedTransport: false,
  authenticatedApi: true,
  debugEnabled: false,
  defaultCredentials: false,
  signedFirmware: false,
  secureBoot: false,
  services: ["HTTP diagnostic"],
};

function assess(device) {
  const findings = [];
  let score = 100;

  const deduct = (points, title, detail) => {
    score -= points;
    findings.push({ title, detail, points });
  };

  if (device.encryptedTransport === false) {
    deduct(20, "Tráfico sin cifrar", "El perfil de diagnóstico se comunica por HTTP local.");
  }
  if (device.authenticatedApi === false) {
    deduct(25, "API sin autenticación", "El módulo declara que su API no exige autenticación.");
  }
  if (device.defaultCredentials === true) {
    deduct(25, "Credenciales predeterminadas", "El módulo declara credenciales de fábrica activas.");
  }
  if (device.debugEnabled === true) {
    deduct(15, "Modo debug activo", "El perfil indica funciones de depuración habilitadas.");
  }
  if (device.signedFirmware === false) {
    deduct(10, "Firmware sin firma confirmada", "No se confirma verificación criptográfica del firmware.");
  }
  if (device.secureBoot === false) {
    deduct(5, "Secure Boot no confirmado", "El perfil no confirma arranque seguro.");
  }

  score = Math.max(0, score);
  const risk = score >= 80 ? "BAJO" : score >= 55 ? "MEDIO" : "ALTO";
  return { score, risk, findings };
}

async function fetchWithTimeout(url, ms = 1800) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "X-SlotSec-Client": "mobile-lab" },
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

export default function App() {
  const [device, setDevice] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState("Conéctate al Wi‑Fi de tu módulo SlotSec autorizado.");
  const result = useMemo(() => (device ? assess(device) : null), [device]);

  const scan = async () => {
    setScanning(true);
    setDevice(null);
    setMessage("Buscando módulos SlotSec autorizados por Wi‑Fi…");

    for (const url of LAB_ENDPOINTS) {
      try {
        const data = await fetchWithTimeout(url);
        if (data?.signature === "SLOTSEC-WIFI-V1") {
          setDevice(data);
          setMessage("Módulo autorizado identificado automáticamente.");
          setScanning(false);
          return;
        }
      } catch (_) {}
    }

    setMessage("No encontré un módulo SlotSec autorizado. Verifica el Wi‑Fi o usa el modo demo.");
    setScanning(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.kicker}>SLOTSEC LAB</Text>
        <Text style={styles.title}>Diagnóstico Wi‑Fi autorizado</Text>
        <Text style={styles.subtitle}>
          Identifica únicamente módulos de laboratorio con firma SLOTSEC-WIFI-V1 y evalúa su configuración sin explotar ni modificar el equipo.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Descubrimiento automático</Text>
          <Text style={styles.info}>{message}</Text>

          <TouchableOpacity style={styles.primary} onPress={scan} disabled={scanning}>
            {scanning ? <ActivityIndicator color="#07110F" /> : <Text style={styles.primaryText}>BUSCAR POR WI‑FI</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondary}
            onPress={() => {
              setDevice(demo);
              setMessage("Perfil demo HET-VER3.1 cargado.");
            }}
          >
            <Text style={styles.secondaryText}>ABRIR DEMO HET-VER3.1</Text>
          </TouchableOpacity>
        </View>

        {device && result && (
          <>
            <View style={styles.card}>
              <Text style={styles.label}>DISPOSITIVO</Text>
              <Text style={styles.device}>{device.name || "Módulo SlotSec"}</Text>
              <Text style={styles.row}>Producto: {device.product || "No confirmado"}</Text>
              <Text style={styles.row}>Fabricante: {device.vendor || "No confirmado"}</Text>
              <Text style={styles.row}>Modelo: {device.model || "No confirmado"}</Text>
              <Text style={styles.row}>Firmware: {device.firmware || "No confirmado"}</Text>
            </View>

            <View style={styles.scoreCard}>
              <Text style={styles.label}>PUNTUACIÓN DE CONFIGURACIÓN</Text>
              <Text style={styles.score}>{result.score}/100</Text>
              <Text style={styles.risk}>RIESGO {result.risk}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Hallazgos</Text>
              {result.findings.length === 0 ? (
                <Text style={styles.good}>No se declararon configuraciones inseguras en el perfil.</Text>
              ) : (
                result.findings.map((f, i) => (
                  <View key={i} style={styles.finding}>
                    <Text style={styles.findingTitle}>−{f.points} · {f.title}</Text>
                    <Text style={styles.findingText}>{f.detail}</Text>
                  </View>
                ))
              )}
            </View>
          </>
        )}

        <Text style={styles.footer}>
          Uso defensivo y educativo. La app no prueba contraseñas, no altera créditos, premios, RNG ni firmware.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#07110F" },
  container: { padding: 22, paddingBottom: 40 },
  kicker: { color: "#50F5A4", fontWeight: "800", letterSpacing: 2, marginTop: 8 },
  title: { color: "#FFFFFF", fontSize: 30, fontWeight: "900", marginTop: 8 },
  subtitle: { color: "#AFC2BC", fontSize: 15, lineHeight: 22, marginTop: 10, marginBottom: 22 },
  card: { backgroundColor: "#0E1C19", borderColor: "#1D332D", borderWidth: 1, borderRadius: 20, padding: 18, marginBottom: 14 },
  scoreCard: { backgroundColor: "#0D221B", borderColor: "#2D6A51", borderWidth: 1, borderRadius: 20, padding: 20, marginBottom: 14, alignItems: "center" },
  cardTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", marginBottom: 10 },
  info: { color: "#B8C8C3", lineHeight: 20, marginBottom: 16 },
  primary: { backgroundColor: "#50F5A4", borderRadius: 14, padding: 15, alignItems: "center", marginBottom: 10 },
  primaryText: { color: "#07110F", fontWeight: "900" },
  secondary: { borderColor: "#50F5A4", borderWidth: 1, borderRadius: 14, padding: 14, alignItems: "center" },
  secondaryText: { color: "#50F5A4", fontWeight: "800" },
  label: { color: "#74A897", fontSize: 12, fontWeight: "800", letterSpacing: 1.4 },
  device: { color: "#FFFFFF", fontSize: 23, fontWeight: "900", marginVertical: 8 },
  row: { color: "#C6D4D0", marginTop: 5 },
  score: { color: "#50F5A4", fontSize: 54, fontWeight: "900", marginTop: 6 },
  risk: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  finding: { borderTopColor: "#1D332D", borderTopWidth: 1, paddingTop: 12, marginTop: 12 },
  findingTitle: { color: "#FFD27A", fontWeight: "800" },
  findingText: { color: "#AFC2BC", marginTop: 5, lineHeight: 19 },
  good: { color: "#50F5A4" },
  footer: { color: "#6E8B82", fontSize: 12, lineHeight: 18, marginTop: 8, textAlign: "center" },
});
