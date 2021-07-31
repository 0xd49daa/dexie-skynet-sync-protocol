# dexie-skynet-sync-protocol

## Synopsis

This is a simple implementation of the [ISyncProtocol](https://github.com/dfahlander/Dexie.js/wiki/Dexie.Syncable.ISyncProtocol) to work with [Skynet SkyDB](https://siasky.net/docs/?javascript--browser#skydb) and [Sia Skynet](https://siasky.net/)

## Installation

```bash
npm install --save dexie-skynet-sync-protocol
```

## Basic Usage

```js
import Dexie from 'dexie'
import 'dexie-observable'
import 'dexie-syncable'

// import skynet sync protocol
import 'dexie-skynet-sync-protocol'

...
// at some point you want to start sync with skynet

db.syncable.connect('skynet', 'https://siasky.net', {
    seed: '[user-seed]', // for genKeyPairFromSeed
    poolInterval: 10000, // milliseconds
    rootItem: '[any-unique-name]'
})

```

## Contributing

If you feel you can help in any way, be it with documentation, examples, extra testing, or new features please open an [issue](https://github.com/ivan-selchenkov-otg/dexie-skynet-sync-protocol/issues) or [pull request](https://github.com/ivan-selchenkov-otg/dexie-skynet-sync-protocol/pulls).
If you have any questions feel free to open an [issue](https://github.com/ivan-selchenkov-otg/dexie-skynet-sync-protocol/issues) with your question.

## License
[MIT License](./LICENSE)
