# Koa + Prometheus Spike

[Koa](https://koajs.com/) is a NodeJS based web framework written by the authors of Express. [Prometheus](https://prometheus.io/) is a framework for time series based metrics. This spike is using the [prom-client](https://www.npmjs.com/package/prom-client) npm module to experiment with Prometheus data model.

## Running

- Clone repo
- `yarn && yarn build && yarn start`

Using Postman or other http client, send a couple of POST requests with metric data to `http://localhost:3000/metric`.

POST payloads should look something like:

```json
{
  "tag": "someTag",
  "duration": 975,
  "intervals": [25, 400, 1000],
  "labels": ["one", "two", "three", "four"]
}
```

Metrics can be received by a GET request to `http://localhost:3000`

```json
[
  {
    "help": "someTag_help",
    "name": "someTag",
    "type": "gauge",
    "values": [
      {
        "value": 975,
        "labels": {
          "id": "ede7b201-3e2a-476c-a3c8-9a350d367f2e",
          "label": "duration",
          "createdAt": "2020-03-10T13:40:08.248Z"
        }
      },
      {
        "value": 25,
        "labels": {
          "id": "ede7b201-3e2a-476c-a3c8-9a350d367f2e",
          "label": "interval:one_two",
          "createdAt": "2020-03-10T13:40:08.248Z"
        }
      },
      {
        "value": 400,
        "labels": {
          "id": "ede7b201-3e2a-476c-a3c8-9a350d367f2e",
          "label": "interval:two_three",
          "createdAt": "2020-03-10T13:40:08.248Z"
        }
      },
      {
        "value": 1000,
        "labels": {
          "id": "ede7b201-3e2a-476c-a3c8-9a350d367f2e",
          "label": "interval:three_four",
          "createdAt": "2020-03-10T13:40:08.248Z"
        }
      },
      {
        "value": 975,
        "labels": {
          "id": "acfa8fa1-f5e9-4987-b017-07b0891bb580",
          "label": "duration",
          "createdAt": "2020-03-10T13:40:14.021Z"
        }
      },
      {
        "value": 25,
        "labels": {
          "id": "acfa8fa1-f5e9-4987-b017-07b0891bb580",
          "label": "interval:one_two",
          "createdAt": "2020-03-10T13:40:14.021Z"
        }
      },
      {
        "value": 400,
        "labels": {
          "id": "acfa8fa1-f5e9-4987-b017-07b0891bb580",
          "label": "interval:two_three",
          "createdAt": "2020-03-10T13:40:14.021Z"
        }
      },
      {
        "value": 1000,
        "labels": {
          "id": "acfa8fa1-f5e9-4987-b017-07b0891bb580",
          "label": "interval:three_four",
          "createdAt": "2020-03-10T13:40:14.021Z"
        }
      }
    ],
    "aggregator": "sum"
  }
]
```
