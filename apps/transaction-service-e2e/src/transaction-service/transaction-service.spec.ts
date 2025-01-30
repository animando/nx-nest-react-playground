import axios from 'axios';
import {
  WireMock,
  IWireMockRequest,
  IWireMockResponse,
} from 'wiremock-captain';

const wiremockEndpoint = 'http://localhost:8080';
const mock = new WireMock(wiremockEndpoint);

const request: IWireMockRequest = {
  method: 'GET',
  endpoint: '/api',
};
const response: IWireMockResponse = {
  status: 200,
  body: { message: 'boo' },
};

describe('GET /api', () => {
  it('should return a message', async () => {
    await mock.register(request, response);
    const res = await axios.get(`http://localhost:8080/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'boo' });
  });
});
