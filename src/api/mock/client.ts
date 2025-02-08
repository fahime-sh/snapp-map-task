import { setupWorker } from "msw/browser";
import { http, HttpResponse } from "msw";
import {data} from "./data";

type City = string;
type Street = string;

interface IGetAddressResponse {
  address: [City, Street];
}

interface ISearchAddressResponse {
  lat: number;
  lng: number;
}

const handlers = [
  http.get("/search/get-address", async ({ request }) => {
    const url = new URL(request.url);
    const lat = parseFloat(url.searchParams.get("lat") || "0");
    const lng = parseFloat(url.searchParams.get("lng") || "0");

    console.log(` دریافت مختصات: lat=${lat}, lng=${lng}`);

    const filteredData = data.filter(
        (item) => Math.abs(item.lat - lat) < 0.1 && Math.abs(item.lng - lng) < 0.1
    );

    if (filteredData.length > 0) {
      const { city, street } = filteredData[0];
      return HttpResponse.json<IGetAddressResponse>({ address: [city, street] });
    } else {
      return HttpResponse.json({ message: "موقعیت یافت نشد" }, { status: 404 });
    }
  }),

  http.get("/search/search-address", async ({ request }) => {
    const url = new URL(request.url);
    const searchedAddress = url.searchParams.get("address");

    console.log(" مکان جست‌وجو:", searchedAddress);

    if (!searchedAddress) {
      return HttpResponse.json({ message: "آدرس وارد نشده است" }, { status: 400 });
    }

    const filteredData = data.filter((item) => item.street === searchedAddress);

    if (filteredData.length > 0) {
      const { lat, lng } = filteredData[0]; // ✅ Ensure `lat` and `lng` exist
      return HttpResponse.json<ISearchAddressResponse>({ lat, lng });
    } else {
      return HttpResponse.json({ message: "موقعیت یافت نشد" }, { status: 404 });
    }
  }),
];
export { handlers };

export const worker = setupWorker(...handlers);
