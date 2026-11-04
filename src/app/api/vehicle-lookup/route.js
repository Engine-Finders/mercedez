export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const vrm = searchParams.get("vrm") || searchParams.get("reg") || "";

  if (!vrm.trim()) {
    return Response.json({ error: "Registration number is required" }, { status: 400 });
  }

  const cleanReg = vrm.replace(/\s+/g, "").toUpperCase();
  const apiKey =
    process.env.CHECKCARDETAILS_API_KEY ||
    process.env.VEHICLE_API_KEY ||
    process.env.API_KEY ||
    "157be19933d191db7628a7a7afa10bc9";

  if (!apiKey) {
    return Response.json({ error: "Vehicle lookup API key is not configured" }, { status: 500 });
  }

  const url = `https://api.checkcardetails.co.uk/vehicledata/ukvehicledata?apikey=${apiKey}&vrm=${encodeURIComponent(cleanReg)}`;

  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("GET vehicle-lookup upstream", res.status, detail.slice(0, 300));
      return Response.json({ error: `Vehicle lookup failed with status ${res.status}` }, { status: 502 });
    }
    const data = await res.json();
    const regData = data?.VehicleRegistration || data?.vehicle || {};

    if (!regData.Model && !regData.Make) {
      return Response.json({ error: "No vehicle details found for that registration" }, { status: 404 });
    }

    const make = regData.Make || "";
    const model = regData.Model || "";
    const year = regData.YearOfManufacture || "";
    const fuel = regData.FuelType || "";
    const colour = regData.Colour || "";
    const wheelplan = regData.WheelPlan || "";
    const engineCapacity = regData.EngineCapacity
      ? String(Math.round(Number(regData.EngineCapacity)))
      : "";

    // Shape used by FloatingQuoteModal / QuoteForm (vrm, series, fuelType).
    // Keep legacy aliases (VRM, model, fuel) for older callers.
    const vehicle = {
      vrm: cleanReg,
      VRM: cleanReg,
      brand: make,
      make,
      series: model,
      model,
      year,
      fuelType: fuel,
      fuel,
      engineCapacity,
      colour,
      wheelplan,
    };

    return Response.json({ vehicle, raw: data });
  } catch (error) {
    console.error("GET vehicle-lookup failed", error);
    return Response.json({ error: error.message || "Failed to fetch vehicle details" }, { status: 502 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const reg = body?.reg || body?.vrm || "";

    if (!reg || typeof reg !== "string" || !reg.trim()) {
      return Response.json(
        { success: false, message: "Please provide a vehicle registration number." },
        { status: 400 }
      );
    }

    const cleanReg = reg.replace(/\s+/g, "").toUpperCase();
    const apiKey =
      process.env.CHECKCARDETAILS_API_KEY ||
      process.env.VEHICLE_API_KEY ||
      process.env.API_KEY ||
      "157be19933d191db7628a7a7afa10bc9";

    if (!apiKey) {
      return Response.json(
        { success: false, message: "Vehicle lookup API key is not configured." },
        { status: 500 }
      );
    }

    const url = `https://api.checkcardetails.co.uk/vehicledata/ukvehicledata?apikey=${apiKey}&vrm=${encodeURIComponent(cleanReg)}`;

    const res = await fetch(url, { headers: { Accept: "application/json" } });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("POST vehicle-lookup upstream", res.status, detail.slice(0, 300));
      return Response.json(
        { success: false, message: `Vehicle lookup service responded with status ${res.status}.` },
        { status: 502 }
      );
    }

    const data = await res.json();

    if (!data || !data.VehicleRegistration) {
      return Response.json(
        { success: false, message: data?.Message || "Vehicle details not found for this registration." },
        { status: 404 }
      );
    }

    const regData = data.VehicleRegistration;

    return Response.json({
      success: true,
      data: {
        VRM: cleanReg,
        Make: regData.Make || "",
        Model: regData.Model || "",
        YearOfManufacture: regData.YearOfManufacture || "",
        FuelType: regData.FuelType || "",
        EngineCapacity: regData.EngineCapacity
          ? Math.round(Number(regData.EngineCapacity) / 1000)
          : "",
      },
    });
  } catch (error) {
    console.error("POST vehicle-lookup error:", error);
    return Response.json(
      { success: false, message: error.message || "Error during vehicle lookup." },
      { status: 500 }
    );
  }
}
