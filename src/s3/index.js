import Amplify, { Storage } from 'aws-amplify'
import { get } from 'axios'

import awsmobile from '../aws-exports'
const level = 'public'
Amplify.configure(awsmobile)
Storage.configure({ level: level })

export const getData = (id, done) => {
  Storage.get(id, { level: level })
    .then((res) => {
      get(res).then((response) => {
        if (response.data) {
          done(false, response.data)
        } else {
          done('No such data.')
        }
      }).catch((error) => {
        done(error)
      })
    }).catch((err) => done(err))
}

export const save = (id, data, done) => {
  if (data) {
    Storage.put(id, data, {
      level: level
    }).then((res) => done(false, res))
      .catch((err) => done(err))
  }
}

export const remove = (id, done) => {
  Storage.remove(id, { level: level })
    .then((res) => done(false, res))
    .catch((err) => done(err))
}

export const list = (dir, done) => {
  Storage.list(`${dir}/`, { level: level })
    .then((res) => done(false, res))
    .catch((err) => done(err))
}
