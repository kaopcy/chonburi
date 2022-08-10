// sanity exec --with-user-token migrate/migrate.js

import sanityClient from "part:@sanity/base/client";

const client = sanityClient.withConfig({ apiVersion: "2021-10-21" });

const fetchDocuments = () =>
    client.fetch(
        `*[_type == 'restaurant' && defined(title)][0...100] {_id, _rev, title}`
    );

// const buildPatches = (docs) =>
//     docs.map((doc) => ({
//         id: doc._id,
//         patch: {
//             set: { fullname: doc.name },
//             unset: ["name"],
//             ifRevisionID: doc._rev,
//         },
//     }));

// const createTransaction = (patches) =>
//     patches.reduce(
//         (tx, patch) => tx.patch(patch.id, patch.patch),
//         client.transaction()
//     );

// const commitTransaction = (tx) => tx.commit();

// const migrateNextBatch = async () => {
//     const documents = await fetchDocuments();
//     const patches = buildPatches(documents);
//     if (patches.length === 0) {
//         console.log("No more documents to migrate!");
//         return null;
//     }
//     console.log(
//         `Migrating batch:\n %s`,
//         patches
//             .map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
//             .join("\n")
//     );
//     const transaction = createTransaction(patches);
//     await commitTransaction(transaction);
//     return migrateNextBatch();
// };

// migrateNextBatch().catch((err) => {
//     console.error(err);
//     process.exit(1);
// });

const test = async () => {
    const document = await fetchDocuments()
};

test()
