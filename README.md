# oh-storage

## Description

### Mechanics

## How to install and run

## How to use

### scripts

#### init tree

it create initial tree from schema.json which actually is clean tree containing basic structure.

example:
```
ts-node scripts/tree_init.ts
```

#### add file to ipfs and then add file to tree json

it add given file to ipfs storage and add file metadata to newest tree json in tree file.

example:
```
ts-node scripts/file_to_ipfs_and_tree.ts /Users/user/Documents/sarcoma/scRNA_seq_for_ewing_sarcoma_CHLA9_CHLA10_TC71.zip oh-root/sarcoma/bone-sarcoma/ewing-sarcoma/genomics
```

#### add updated tree to ipfs

it add updated newest tree from tree/ folder to ipfs storage, in addition it add cid, tree name and size to cid_tree_registry.txt in root directory.

```
ts-node scripts/tree_to_ipfs.ts
```

## License

