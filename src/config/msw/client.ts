import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';
import { data } from './data';

const address = '/search/get-address';

export const handleGet = http.get(address, async ({ request }) => {
  const url = new URL(request.url);
  const lat = parseFloat(url.searchParams.get('lat') || '0');
  const lng = parseFloat(url.searchParams.get('lng') || '0');

  console.log(`🔍 دریافت مختصات: lat=${lat}, lng=${lng}`);

  // فیلتر داده‌ها براساس lat و lng
  const filteredData = data.filter((item) => {
    return Math.abs(item.lat - lat) < 0.1 && Math.abs(item.lng - lng) < 0.1;
  });

  return HttpResponse.json(filteredData.length > 0 ? filteredData : { message: 'موقعیت یافت نشد' });
});

export const worker = setupWorker(handleGet);

