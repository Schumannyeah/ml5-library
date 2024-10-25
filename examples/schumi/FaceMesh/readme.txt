Test 1: index_net_singleimage.html

When running index_net_singleimage, it returns error for downloading:
https://storage.googleapis.com/kagglesdsdata/models/1458/1724/group1-shard1of1.bin?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20241024%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241024T065048Z&X-Goog-Expires=259200&X-Goog-SignedHeaders=host&X-Goog-Signature=0025400503a6f0de0982c11718e15992fdb1541f479533ead7382caeb1c347389d92b58767a00db158ffaef872bcec76840a9e5747dac7ee3fe394a0d0c2104f7c7343813d64f1edf28130b5d8c5484c27424f4f617491df1256cb336c38a6dc654b13000941bbf76a3b82a6f3c211193d9c948ce857bcbe51e3807a246f9a5c4aa36486dcacc4088a8923570ab06d9bff6c8bdd65b4af1b09bb58cd0714c4cb5ebca5064f6d57f27fafedfb76494a2004d55299a043f5363bd49d25b9f32270513338c5f4e1c1e212f22f849c429d8045a867ededd123a3e957aad04a62c3dfe68a94c8b9708c015f696964b6812000dc86e9998d9d64200daed3ff80ea201d

Even after downloading the model.json through VPN,
we are still missing the bin setting and it also refers to tensorflow which requires google service.

Temperarily stop trying!


Test 2: index_net_keypoints.html

It's working even without VPN, however, we might have to try some more times.

So far the index_local_keypoints.html is not working.
Strange!!!