import { join } from 'path'

import express from 'express'
import fileUpload from 'express-fileupload'

import { t, setLocale } from './translations'
import rnd from './rnd'
const port = 3000
const app = express()
const accceptedTypes = ['image/png', 'image/jpeg', 'image/webp']
const filePath = process.env.NODE_ENV === 'production' ? '../.env' : '../.env.development'
require('dotenv').config({ path: filePath })

// @ODO

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))

app.post('/', (req, res) => {
  const key = req.body && req.body.apiKey ? req.body.apiKey : false
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
        rnd(8, (id) => {
          if (id) {
            const fileName = `${id}.${ext}`
            file.mv(join(__dirname, '../public', fileName), (err) => {
              if (err) {
                res.status(500).json({ err })
              } else {
                res.status(200).json({ id: fileName, status: t('uploaded') })
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
