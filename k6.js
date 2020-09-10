import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 15 },
    { duration: '30s', target: 30 },
  ],
  // vus: 15,
  // duration: "60s",
};

// export default function() {
//   let id = Math.floor(Math.random() * 10000000) + 1;
//   let res = http.get(`http://localhost:3002/rooms/${id}/reservation`);
//   check(res, { 'status was 200': r => r.status == 200 });
//   sleep(1);
// }

export default function() {
  let room = Math.floor(Math.random() * 10000000);
  let address = `http://localhost:3002/rooms/${room}/reservation`;
  let response = http.get(address);
};