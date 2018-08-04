import * as index from '../index';
import fetch from 'node-fetch';

describe('Index', () => {

  const server = index.server;

  afterAll(() => {
    console.log('afterAll: server.close()');
    server.close();
  });

  describe('server name', () => {
    it('should be valid server name', () => {
      const serverName = 'Restify TypeScript Echo Server';
      expect(server.name).toBe(serverName);
    });
  });

  describe('GET hello', () => {

    it('should be greet', async() => {
      const url = 'http://localhost:8080/hello/';
      const name = 'bathtimefish';
      const res = await fetch(url + name, {method: 'GET'});
      const json = await res.json();
      expect(json).toBe('hello ' + name);
    });

    it('content-type should be text/plain', async() => {
      const url = 'http://localhost:8080/hello/';
      const name = 'bathtimefish';
      const res = await fetch(url + name, {
        method: 'GET',
        headers: {'accept': 'text/plain'}
      });
      const contentType = res.headers.get('content-type');
      expect(contentType).toBe('text/plain');
      const json = await res.text();
      expect(json).toBe('hello ' + name);
    });

  });

  describe('HEAD hello', () => {
    it('connection should be close', async() => {
      const url = 'http://localhost:8080/hello/';
      const name = 'bathtimefish';
      const res = await fetch(url + name, {
        method: 'HEAD',
        headers: {'connection': 'close'}
      });
      const connection = res.headers.get('connection');
      expect(connection).toBe('close');
    });
  });

});