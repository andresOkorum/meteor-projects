import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { WalletsCollection } from './WalletsCollection';

export const TRANSFER_TYPE = 'TRANSFER';
export const ADD_TYPE = 'ADD';

class TransactionsMongoCollection extends Mongo.Collection {
  insert(transactionDocument, callback) {
    if (transactionDocument.type === TRANSFER_TYPE) {
      const sourceWallet = WalletsCollection.findOne(transactionDocument.sourceWalletId);
      if (!sourceWallet) {
        throw new Meteor.Error("Source wallet not found.");
      }
      if (sourceWallet.balance < transactionDocument.amount) {
        throw new Meteor.Error("Insufficient funds.");
      }
      WalletsCollection.update(transactionDocument.sourceWalletId, {
        $inc: { balance: -transactionDocument.amount },
      });
      WalletsCollection.update(transactionDocument.destinationWalletId, {
        $inc: { balance: transactionDocument.amount },
      });
    }
    if (transactionDocument.type === ADD_TYPE) {
      const sourceWallet = WalletsCollection.findOne(transactionDocument.sourceWalletId);
      if (!sourceWallet) {
        throw new Meteor.Error("Source wallet not found.");
      }
      WalletsCollection.update(transactionDocument.sourceWalletId, {
        $inc: { balance: transactionDocument.amount },
      });
    }
    return super.insert(transactionDocument, callback);
  }
}

export const TransactionsCollection = new TransactionsMongoCollection('transactions');

const TransactionsSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [TRANSFER_TYPE, ADD_TYPE],
  },
  sourceWalletId: {
    type: String,
  },
  destinationWalletId: {
    type: String,
    optional: true,
  },
  amount: {
    type: Number,
  },
  createdAt: {
    type: Date,
  },
});

TransactionsCollection.attachSchema(TransactionsSchema);