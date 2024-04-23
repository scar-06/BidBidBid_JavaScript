class BidCollectionsDTO {
    constructor(id, collectionName, descriptions, stocks, price, bidsInCollection) {
        this._id = id;
        this._collectionName = collectionName;
        this._descriptions = descriptions;
        this._stocks = stocks;
        this._price = price;
        this._bidsInCollection = bidsInCollection;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get collectionName() {
        return this._collectionName;
    }

    set collectionName(value) {
        this._collectionName = value;
    }

    get descriptions() {
        return this._descriptions;
    }

    set descriptions(value) {
        this._descriptions = value;
    }

    get stocks() {
        return this._stocks;
    }

    set stocks(value) {
        this._stocks = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get bidsInCollection() {
        return this._bidsInCollection;
    }

    set bidsInCollection(value) {
        this._bidsInCollection = value;
    }
}

module.exports = BidCollectionsDTO;
