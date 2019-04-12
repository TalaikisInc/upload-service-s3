import { resolve } from 'path'

import express from 'express'
import fileUpload from 'express-fileupload'

import { t, setLocale } from './translations'
import rnd from './utils/rnd'
import datLlib from './data'
import dataLib from './data';
const port = 3000
const app = express()
const accceptedTypes = ['image/png', 'image/jpeg', 'image/webp']
const filePath = process.env.NODE_ENV === 'production' ? resolve(__dirname, '../.env') : resolve(__dirname, '../.env.development')
require('dotenv').config({ path: filePath })


app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))

app.post('/', (req, res) => {
  const key = req.body && req.body.apiKey.length === 13 ? req.body.apiKey : false
  const locale = req.body && req.body.locale ? req.body.locale : false
  if (locale) {
    setLocale(locale)
  }

  if (key && process.env.API_KEY === key) {
    const length = Object.keys(req.files).length
    if (length === 0) {
      res.status(400).json({ err: t('error_data') })
    } else if (length === 1) {
      const file = req.files.file
      const ext = file.name.split('.')[1]
      if (accceptedTypes.includes(file.mimetype)) {
        rnd(16, (id) => {
          if (id) {
            const fileName = `${id}.${ext}`
            dataLib.create('images', fileName, file.data, (err, aws) => {
              if (!err && aws) {
                res.status(200).json({ id: fileName, status: t('uploaded'), res: aws })
              } else {
                res.status(500).json({ err })
              }
            })
          } else {
            res.status(500).json({ err: t('error_create') })
          }
        })
      } else {
        res.status(400).json({ err: t('error_type') })
      }
    } else {
      res.status(400).json({ err: t('error_one') })
    }
  } else {
    res.status(401).json({ err: t('error_key') })
  }
})

app.listen(port, (err) => {
  if (err) {
    console.log(`Failed: ${err}`)
  } else {
    console.log(`Listening to port ${port}`)
  }
})

module.exports = app
