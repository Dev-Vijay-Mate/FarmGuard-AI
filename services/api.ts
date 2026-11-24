export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export const isApiConfigured = Boolean(API_BASE_URL);

type FarmerPayload = { name: string; phone: string; village: string; district: string };
type ReportPayload = { farmer_id: number; concern_type: "plant" | "livestock"; symptoms: string; description: string; image_url?: string; latitude?: string; longitude?: string };

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API_BASE_URL) throw new Error("Set EXPO_PUBLIC_API_URL before connecting to the backend.");
  const response = await fetch(`${API_BASE_URL}${path}`, { headers: { "Content-Type": "application/json" }, ...options });
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.detail ?? "Unable to connect to FarmGuard AI");
  return response.json() as Promise<T>;
}

export const api = {
  health: () => request<{ status: string }>("/health"),
  createFarmer: (farmer: FarmerPayload) => request<{ id: number }>("/farmers", { method: "POST", body: JSON.stringify(farmer) }),
  createReport: (report: ReportPayload) => request<{ id: number; status: string }>("/reports", { method: "POST", body: JSON.stringify(report) }),
};
