import S3 from 'aws-sdk/clients/s3'
import fs from 'fs'
import config from './.aws-config'

const s3 = new S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
})

export type MetricData = Record<string, number | string>

export interface Metric<T extends MetricData = MetricData> {
  tag: string
  createdAt?: string
  data?: T
}

export class MetricService {
  log<T extends MetricData>(metric: Metric<T>): void {
    if (!metric.createdAt) {
      const createdAt = new Date().toISOString()

      metric = {
        ...metric,
        createdAt,
      }
    }

    console.log({ metric })

    // const file = fs.createWriteStream('./big.file')

    // for (let i = 0; i <= 1e4; i++) {
    //   file.write(
    //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n',
    //   )
    // }

    // file.end()

    s3.upload(
      {
        Bucket: 'koa-spike',
        Body: 'testing', // fs.createReadStream('./big.file'),
        Key: 'test.log',
      },
      (err, data) => {
        console.log(err, data)
      },
    )
  }
}
