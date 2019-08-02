const db = require('../helpers/firebaseConfig');

const algolia = require('../helpers/aloglia');

const index_name = 'records';
exports.manageRecords = async (change, context) => {
    var id = context.params.id;
    // Get an object with the current document value.
    // If the document does not exist, it has been deleted.
    const document = change.after.exists ? change.after.data() : null;

    // Get an object with the previous document value (for update or delete)
    const oldDocument = change.before.data();
    if (document) {
        document['createdBy'] ? delete document['createdBy'] : '';
        document['modifiedBy'] ? delete document['modifiedBy'] : '';
        if (document['createdAt']) {
            document['createdAt'] = document['createdAt'].toDate();
        }
        if (document['modifiedAt']) {
            document['modifiedAt'] = document['modifiedAt'].toDate();
        }
        document['objectID'] = id;
    }
    // add to algolia
    if (document && !oldDocument) {
        algolia.addObject(index_name, document)
        console.log("----- add -------");
    } else if (oldDocument) {
        // edit doc on algolia
        if (document) {
            algolia.updateObject(index_name, id, document)
            console.log("----- edit -------");
        }
        // delete from algolia
        else {
            algolia.deleteObject(index_name, id)
            console.log("----- Delete -------");
        }
    }
    return 1;
}
