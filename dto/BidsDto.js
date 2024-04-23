class BidsDTO {
    constructor(collection, price, user, status) {
        this.collection = collection;
        this.price = price;
        this.user = user;
        this.status = status;
    }
    get collection() {
        return this._collection;
    }

    set collection(value) {
        this._collection = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    }

module.exports = BidsDTO;
