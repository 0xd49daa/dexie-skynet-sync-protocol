import Dexie from 'dexie'
import 'dexie-syncable'

import { genKeyPairFromSeed, SkynetClient } from 'skynet-js'

import ShortUniqueId from 'short-unique-id'

async function getNextRevision (client, publicKey, revision, rootItem) {
  if (revision === null) {
    return { nextRevision: rootItem, changes: null }
  }

  const { data } = await client.db.getJSON(publicKey, revision)

  if (!data) {
    return { nextRevision: null, changes: null }
  }

  return {
    nextRevision: data.nextRevision || null,
    changes: data.changes || null
  }
}

Dexie.Syncable.registerSyncProtocol('skynet', {
  sync: async function (context, url, options, baseRevision, syncedRevision, changes, partial, applyRemoteChanges, onChangesAccepted, onSuccess, onError) {
    const uid = new ShortUniqueId()
    const client = new SkynetClient(url)

    const { publicKey, privateKey } = genKeyPairFromSeed(options.seed)

    let currentRevision = syncedRevision
    let nextRevision

    while (true) {
      const response = await getNextRevision(client, publicKey, currentRevision, options.rootItem)

      if (!response.nextRevision) {
        break
      }

      nextRevision = response.nextRevision

      if (currentRevision !== syncedRevision) {
        applyRemoteChanges(response.changes, currentRevision, false, false)
      }

      currentRevision = nextRevision
    }

    if (changes.length > 0) {
      const nextNextRevision = uid()
      await client.db.setJSON(privateKey, nextRevision, {
        nextRevision: nextNextRevision,
        changes
      })
      applyRemoteChanges([], nextRevision, false, false)
    }

    onChangesAccepted()
    onSuccess({ again: options.poolInterval })
  }
})
