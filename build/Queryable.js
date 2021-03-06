'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Builder = require('./Query/Builder');

var _Builder2 = _interopRequireDefault(_Builder);

var _Create = require('./Services/Create');

var _Create2 = _interopRequireDefault(_Create);

var _DeleteAll = require('./Services/DeleteAll');

var _DeleteAll2 = _interopRequireDefault(_DeleteAll);

var _FindAll = require('./Services/FindAll');

var _FindAll2 = _interopRequireDefault(_FindAll);

var _MergeOn = require('./Services/MergeOn');

var _MergeOn2 = _interopRequireDefault(_MergeOn);

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queryable = function () {

    /**
     * @constructor
     *
     * @param Neode neode
     */
    function Queryable(neode) {
        _classCallCheck(this, Queryable);

        this._neode = neode;
    }

    /**
     * Create a new instance of this Model
     *
     * @param  {object} properties
     * @return {Promise}
     */


    _createClass(Queryable, [{
        key: 'create',
        value: function create(properties) {
            var _this = this;

            return (0, _Create2.default)(this._neode, this, properties).then(function (node) {
                return new _Node2.default(_this._neode, _this, node);
            });
        }

        /**
         * Merge a node based on the defined indexes
         *
         * @param  {Object} properties
         * @return {Promise}
         */

    }, {
        key: 'merge',
        value: function merge(properties) {
            var _this2 = this;

            var merge_on = this.mergeFields();

            return (0, _MergeOn2.default)(this._neode, this, merge_on, properties).then(function (node) {
                return new _Node2.default(_this2._neode, _this2, node);
            });
        }

        /**
         * Merge a node based on the supplied properties
         *
         * @param  {Object} match Specific properties to merge on
         * @param  {Object} set   Properties to set
         * @return {Promise}
         */

    }, {
        key: 'mergeOn',
        value: function mergeOn(match, set) {
            var _this3 = this;

            var merge_on = Object.keys(match);
            var properties = Object.assign({}, match, set);

            return (0, _MergeOn2.default)(this._neode, this, merge_on, properties).then(function (node) {
                return new _Node2.default(_this3._neode, _this3, node);
            });
        }

        /**
         * Delete all nodes for this model
         *
         * @return {Promise}
         */

    }, {
        key: 'deleteAll',
        value: function deleteAll() {
            return (0, _DeleteAll2.default)(this._neode, this);
        }

        /**
         * Get a collection of nodes for this label
         *
         * @param  {Object}              properties
         * @param  {String|Array|Object} order
         * @param  {Int}                 limit
         * @param  {Int}                 skip
         * @return {Promise}
         */

    }, {
        key: 'all',
        value: function all(properties, order, limit, skip) {
            return (0, _FindAll2.default)(this._neode, this, properties, order, limit, skip);
        }

        /**
         * Find a Node by its Primary Key
         *
         * @param  {mixed} id
         * @return {Promise}
         */

    }, {
        key: 'find',
        value: function find(id) {
            var primary_key = this.primaryKey();

            return this.first(primary_key, id);
        }

        /**
         * Find a Node by it's internal node ID
         *
         * @param  {String} model
         * @param  {int}    id
         * @return {Promise}
         */

    }, {
        key: 'findById',
        value: function findById(id) {
            var _this4 = this;

            var alias = 'this';

            return new _Builder2.default(this._neode).match(alias, this).whereId(alias, id).return(alias).limit(1).execute().then(function (res) {
                return _this4._neode.hydrateFirst(res, alias);
            });
        }

        /**
         * Find a Node by properties
         *
         * @param  {String} label
         * @param  {mixed}  key     Either a string for the property name or an object of values
         * @param  {mixed}  value   Value
         * @return {Promise}
         */

    }, {
        key: 'first',
        value: function first(key, value) {
            var _this5 = this;

            var alias = 'this';
            var builder = new _Builder2.default(this._neode);

            builder.match(alias, this);

            if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) == 'object') {
                Object.keys(key).map(function (property) {
                    builder.where(alias + '.' + property, key[property]);
                });
            } else {
                builder.where(alias + '.' + key, value);
            }

            return builder.return(alias).limit(1).execute().then(function (res) {
                return _this5._neode.hydrateFirst(res, alias);
            });
        }
    }]);

    return Queryable;
}();

exports.default = Queryable;