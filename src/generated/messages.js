/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.drama = (function() {

    /**
     * Namespace drama.
     * @exports drama
     * @namespace
     */
    var drama = {};

    drama.BaseMessage = (function() {

        /**
         * Properties of a BaseMessage.
         * @memberof drama
         * @interface IBaseMessage
         * @property {string|null} [command] BaseMessage command
         * @property {string|null} [data] BaseMessage data
         */

        /**
         * Constructs a new BaseMessage.
         * @memberof drama
         * @classdesc Represents a BaseMessage.
         * @implements IBaseMessage
         * @constructor
         * @param {drama.IBaseMessage=} [properties] Properties to set
         */
        function BaseMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BaseMessage command.
         * @member {string} command
         * @memberof drama.BaseMessage
         * @instance
         */
        BaseMessage.prototype.command = "";

        /**
         * BaseMessage data.
         * @member {string} data
         * @memberof drama.BaseMessage
         * @instance
         */
        BaseMessage.prototype.data = "";

        /**
         * Creates a new BaseMessage instance using the specified properties.
         * @function create
         * @memberof drama.BaseMessage
         * @static
         * @param {drama.IBaseMessage=} [properties] Properties to set
         * @returns {drama.BaseMessage} BaseMessage instance
         */
        BaseMessage.create = function create(properties) {
            return new BaseMessage(properties);
        };

        /**
         * Encodes the specified BaseMessage message. Does not implicitly {@link drama.BaseMessage.verify|verify} messages.
         * @function encode
         * @memberof drama.BaseMessage
         * @static
         * @param {drama.IBaseMessage} message BaseMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BaseMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.command);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
            return writer;
        };

        /**
         * Encodes the specified BaseMessage message, length delimited. Does not implicitly {@link drama.BaseMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drama.BaseMessage
         * @static
         * @param {drama.IBaseMessage} message BaseMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BaseMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BaseMessage message from the specified reader or buffer.
         * @function decode
         * @memberof drama.BaseMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drama.BaseMessage} BaseMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BaseMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.drama.BaseMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.command = reader.string();
                        break;
                    }
                case 2: {
                        message.data = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BaseMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drama.BaseMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drama.BaseMessage} BaseMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BaseMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BaseMessage message.
         * @function verify
         * @memberof drama.BaseMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BaseMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.command != null && message.hasOwnProperty("command"))
                if (!$util.isString(message.command))
                    return "command: string expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!$util.isString(message.data))
                    return "data: string expected";
            return null;
        };

        /**
         * Creates a BaseMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drama.BaseMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drama.BaseMessage} BaseMessage
         */
        BaseMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.drama.BaseMessage)
                return object;
            var message = new $root.drama.BaseMessage();
            if (object.command != null)
                message.command = String(object.command);
            if (object.data != null)
                message.data = String(object.data);
            return message;
        };

        /**
         * Creates a plain object from a BaseMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drama.BaseMessage
         * @static
         * @param {drama.BaseMessage} message BaseMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BaseMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.command = "";
                object.data = "";
            }
            if (message.command != null && message.hasOwnProperty("command"))
                object.command = message.command;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = message.data;
            return object;
        };

        /**
         * Converts this BaseMessage to JSON.
         * @function toJSON
         * @memberof drama.BaseMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BaseMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BaseMessage
         * @function getTypeUrl
         * @memberof drama.BaseMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BaseMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/drama.BaseMessage";
        };

        return BaseMessage;
    })();

    drama.Character = (function() {

        /**
         * Properties of a Character.
         * @memberof drama
         * @interface ICharacter
         * @property {string|null} [id] Character id
         * @property {string|null} [name] Character name
         * @property {string|null} [avatar] Character avatar
         * @property {string|null} [description] Character description
         * @property {string|null} [author] Character author
         */

        /**
         * Constructs a new Character.
         * @memberof drama
         * @classdesc Represents a Character.
         * @implements ICharacter
         * @constructor
         * @param {drama.ICharacter=} [properties] Properties to set
         */
        function Character(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Character id.
         * @member {string} id
         * @memberof drama.Character
         * @instance
         */
        Character.prototype.id = "";

        /**
         * Character name.
         * @member {string} name
         * @memberof drama.Character
         * @instance
         */
        Character.prototype.name = "";

        /**
         * Character avatar.
         * @member {string} avatar
         * @memberof drama.Character
         * @instance
         */
        Character.prototype.avatar = "";

        /**
         * Character description.
         * @member {string} description
         * @memberof drama.Character
         * @instance
         */
        Character.prototype.description = "";

        /**
         * Character author.
         * @member {string} author
         * @memberof drama.Character
         * @instance
         */
        Character.prototype.author = "";

        /**
         * Creates a new Character instance using the specified properties.
         * @function create
         * @memberof drama.Character
         * @static
         * @param {drama.ICharacter=} [properties] Properties to set
         * @returns {drama.Character} Character instance
         */
        Character.create = function create(properties) {
            return new Character(properties);
        };

        /**
         * Encodes the specified Character message. Does not implicitly {@link drama.Character.verify|verify} messages.
         * @function encode
         * @memberof drama.Character
         * @static
         * @param {drama.ICharacter} message Character message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Character.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatar);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
            if (message.author != null && Object.hasOwnProperty.call(message, "author"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.author);
            return writer;
        };

        /**
         * Encodes the specified Character message, length delimited. Does not implicitly {@link drama.Character.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drama.Character
         * @static
         * @param {drama.ICharacter} message Character message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Character.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Character message from the specified reader or buffer.
         * @function decode
         * @memberof drama.Character
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drama.Character} Character
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Character.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.drama.Character();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.avatar = reader.string();
                        break;
                    }
                case 4: {
                        message.description = reader.string();
                        break;
                    }
                case 5: {
                        message.author = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Character message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drama.Character
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drama.Character} Character
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Character.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Character message.
         * @function verify
         * @memberof drama.Character
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Character.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.author != null && message.hasOwnProperty("author"))
                if (!$util.isString(message.author))
                    return "author: string expected";
            return null;
        };

        /**
         * Creates a Character message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drama.Character
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drama.Character} Character
         */
        Character.fromObject = function fromObject(object) {
            if (object instanceof $root.drama.Character)
                return object;
            var message = new $root.drama.Character();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.description != null)
                message.description = String(object.description);
            if (object.author != null)
                message.author = String(object.author);
            return message;
        };

        /**
         * Creates a plain object from a Character message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drama.Character
         * @static
         * @param {drama.Character} message Character
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Character.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.avatar = "";
                object.description = "";
                object.author = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.author != null && message.hasOwnProperty("author"))
                object.author = message.author;
            return object;
        };

        /**
         * Converts this Character to JSON.
         * @function toJSON
         * @memberof drama.Character
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Character.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Character
         * @function getTypeUrl
         * @memberof drama.Character
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Character.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/drama.Character";
        };

        return Character;
    })();

    drama.Thread = (function() {

        /**
         * Properties of a Thread.
         * @memberof drama
         * @interface IThread
         * @property {string|null} [id] Thread id
         * @property {string|null} [content] Thread content
         * @property {string|null} [authorId] Thread authorId
         * @property {number|null} [votes] Thread votes
         * @property {number|Long|null} [timestamp] Thread timestamp
         */

        /**
         * Constructs a new Thread.
         * @memberof drama
         * @classdesc Represents a Thread.
         * @implements IThread
         * @constructor
         * @param {drama.IThread=} [properties] Properties to set
         */
        function Thread(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Thread id.
         * @member {string} id
         * @memberof drama.Thread
         * @instance
         */
        Thread.prototype.id = "";

        /**
         * Thread content.
         * @member {string} content
         * @memberof drama.Thread
         * @instance
         */
        Thread.prototype.content = "";

        /**
         * Thread authorId.
         * @member {string} authorId
         * @memberof drama.Thread
         * @instance
         */
        Thread.prototype.authorId = "";

        /**
         * Thread votes.
         * @member {number} votes
         * @memberof drama.Thread
         * @instance
         */
        Thread.prototype.votes = 0;

        /**
         * Thread timestamp.
         * @member {number|Long} timestamp
         * @memberof drama.Thread
         * @instance
         */
        Thread.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Thread instance using the specified properties.
         * @function create
         * @memberof drama.Thread
         * @static
         * @param {drama.IThread=} [properties] Properties to set
         * @returns {drama.Thread} Thread instance
         */
        Thread.create = function create(properties) {
            return new Thread(properties);
        };

        /**
         * Encodes the specified Thread message. Does not implicitly {@link drama.Thread.verify|verify} messages.
         * @function encode
         * @memberof drama.Thread
         * @static
         * @param {drama.IThread} message Thread message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Thread.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.content);
            if (message.authorId != null && Object.hasOwnProperty.call(message, "authorId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.authorId);
            if (message.votes != null && Object.hasOwnProperty.call(message, "votes"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.votes);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified Thread message, length delimited. Does not implicitly {@link drama.Thread.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drama.Thread
         * @static
         * @param {drama.IThread} message Thread message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Thread.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Thread message from the specified reader or buffer.
         * @function decode
         * @memberof drama.Thread
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drama.Thread} Thread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Thread.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.drama.Thread();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.content = reader.string();
                        break;
                    }
                case 3: {
                        message.authorId = reader.string();
                        break;
                    }
                case 4: {
                        message.votes = reader.int32();
                        break;
                    }
                case 5: {
                        message.timestamp = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Thread message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drama.Thread
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drama.Thread} Thread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Thread.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Thread message.
         * @function verify
         * @memberof drama.Thread
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Thread.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            if (message.authorId != null && message.hasOwnProperty("authorId"))
                if (!$util.isString(message.authorId))
                    return "authorId: string expected";
            if (message.votes != null && message.hasOwnProperty("votes"))
                if (!$util.isInteger(message.votes))
                    return "votes: integer expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a Thread message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drama.Thread
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drama.Thread} Thread
         */
        Thread.fromObject = function fromObject(object) {
            if (object instanceof $root.drama.Thread)
                return object;
            var message = new $root.drama.Thread();
            if (object.id != null)
                message.id = String(object.id);
            if (object.content != null)
                message.content = String(object.content);
            if (object.authorId != null)
                message.authorId = String(object.authorId);
            if (object.votes != null)
                message.votes = object.votes | 0;
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Thread message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drama.Thread
         * @static
         * @param {drama.Thread} message Thread
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Thread.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.content = "";
                object.authorId = "";
                object.votes = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.authorId != null && message.hasOwnProperty("authorId"))
                object.authorId = message.authorId;
            if (message.votes != null && message.hasOwnProperty("votes"))
                object.votes = message.votes;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            return object;
        };

        /**
         * Converts this Thread to JSON.
         * @function toJSON
         * @memberof drama.Thread
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Thread.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Thread
         * @function getTypeUrl
         * @memberof drama.Thread
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Thread.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/drama.Thread";
        };

        return Thread;
    })();

    drama.Message = (function() {

        /**
         * Properties of a Message.
         * @memberof drama
         * @interface IMessage
         * @property {string|null} [id] Message id
         * @property {string|null} [content] Message content
         * @property {string|null} [authorId] Message authorId
         * @property {number|Long|null} [timestamp] Message timestamp
         */

        /**
         * Constructs a new Message.
         * @memberof drama
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {drama.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Message id.
         * @member {string} id
         * @memberof drama.Message
         * @instance
         */
        Message.prototype.id = "";

        /**
         * Message content.
         * @member {string} content
         * @memberof drama.Message
         * @instance
         */
        Message.prototype.content = "";

        /**
         * Message authorId.
         * @member {string} authorId
         * @memberof drama.Message
         * @instance
         */
        Message.prototype.authorId = "";

        /**
         * Message timestamp.
         * @member {number|Long} timestamp
         * @memberof drama.Message
         * @instance
         */
        Message.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof drama.Message
         * @static
         * @param {drama.IMessage=} [properties] Properties to set
         * @returns {drama.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link drama.Message.verify|verify} messages.
         * @function encode
         * @memberof drama.Message
         * @static
         * @param {drama.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.content);
            if (message.authorId != null && Object.hasOwnProperty.call(message, "authorId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.authorId);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link drama.Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drama.Message
         * @static
         * @param {drama.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof drama.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drama.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.drama.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.content = reader.string();
                        break;
                    }
                case 3: {
                        message.authorId = reader.string();
                        break;
                    }
                case 4: {
                        message.timestamp = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drama.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drama.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Message message.
         * @function verify
         * @memberof drama.Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            if (message.authorId != null && message.hasOwnProperty("authorId"))
                if (!$util.isString(message.authorId))
                    return "authorId: string expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drama.Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drama.Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.drama.Message)
                return object;
            var message = new $root.drama.Message();
            if (object.id != null)
                message.id = String(object.id);
            if (object.content != null)
                message.content = String(object.content);
            if (object.authorId != null)
                message.authorId = String(object.authorId);
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drama.Message
         * @static
         * @param {drama.Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.content = "";
                object.authorId = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.authorId != null && message.hasOwnProperty("authorId"))
                object.authorId = message.authorId;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            return object;
        };

        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof drama.Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Message
         * @function getTypeUrl
         * @memberof drama.Message
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Message.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/drama.Message";
        };

        return Message;
    })();

    drama.GetCharactersResponse = (function() {

        /**
         * Properties of a GetCharactersResponse.
         * @memberof drama
         * @interface IGetCharactersResponse
         * @property {Array.<drama.ICharacter>|null} [characters] GetCharactersResponse characters
         */

        /**
         * Constructs a new GetCharactersResponse.
         * @memberof drama
         * @classdesc Represents a GetCharactersResponse.
         * @implements IGetCharactersResponse
         * @constructor
         * @param {drama.IGetCharactersResponse=} [properties] Properties to set
         */
        function GetCharactersResponse(properties) {
            this.characters = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetCharactersResponse characters.
         * @member {Array.<drama.ICharacter>} characters
         * @memberof drama.GetCharactersResponse
         * @instance
         */
        GetCharactersResponse.prototype.characters = $util.emptyArray;

        /**
         * Creates a new GetCharactersResponse instance using the specified properties.
         * @function create
         * @memberof drama.GetCharactersResponse
         * @static
         * @param {drama.IGetCharactersResponse=} [properties] Properties to set
         * @returns {drama.GetCharactersResponse} GetCharactersResponse instance
         */
        GetCharactersResponse.create = function create(properties) {
            return new GetCharactersResponse(properties);
        };

        /**
         * Encodes the specified GetCharactersResponse message. Does not implicitly {@link drama.GetCharactersResponse.verify|verify} messages.
         * @function encode
         * @memberof drama.GetCharactersResponse
         * @static
         * @param {drama.IGetCharactersResponse} message GetCharactersResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetCharactersResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.characters != null && message.characters.length)
                for (var i = 0; i < message.characters.length; ++i)
                    $root.drama.Character.encode(message.characters[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetCharactersResponse message, length delimited. Does not implicitly {@link drama.GetCharactersResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drama.GetCharactersResponse
         * @static
         * @param {drama.IGetCharactersResponse} message GetCharactersResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetCharactersResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetCharactersResponse message from the specified reader or buffer.
         * @function decode
         * @memberof drama.GetCharactersResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drama.GetCharactersResponse} GetCharactersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetCharactersResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.drama.GetCharactersResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.characters && message.characters.length))
                            message.characters = [];
                        message.characters.push($root.drama.Character.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetCharactersResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drama.GetCharactersResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drama.GetCharactersResponse} GetCharactersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetCharactersResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetCharactersResponse message.
         * @function verify
         * @memberof drama.GetCharactersResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetCharactersResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.characters != null && message.hasOwnProperty("characters")) {
                if (!Array.isArray(message.characters))
                    return "characters: array expected";
                for (var i = 0; i < message.characters.length; ++i) {
                    var error = $root.drama.Character.verify(message.characters[i]);
                    if (error)
                        return "characters." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GetCharactersResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drama.GetCharactersResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drama.GetCharactersResponse} GetCharactersResponse
         */
        GetCharactersResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.drama.GetCharactersResponse)
                return object;
            var message = new $root.drama.GetCharactersResponse();
            if (object.characters) {
                if (!Array.isArray(object.characters))
                    throw TypeError(".drama.GetCharactersResponse.characters: array expected");
                message.characters = [];
                for (var i = 0; i < object.characters.length; ++i) {
                    if (typeof object.characters[i] !== "object")
                        throw TypeError(".drama.GetCharactersResponse.characters: object expected");
                    message.characters[i] = $root.drama.Character.fromObject(object.characters[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GetCharactersResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drama.GetCharactersResponse
         * @static
         * @param {drama.GetCharactersResponse} message GetCharactersResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetCharactersResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.characters = [];
            if (message.characters && message.characters.length) {
                object.characters = [];
                for (var j = 0; j < message.characters.length; ++j)
                    object.characters[j] = $root.drama.Character.toObject(message.characters[j], options);
            }
            return object;
        };

        /**
         * Converts this GetCharactersResponse to JSON.
         * @function toJSON
         * @memberof drama.GetCharactersResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetCharactersResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetCharactersResponse
         * @function getTypeUrl
         * @memberof drama.GetCharactersResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetCharactersResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/drama.GetCharactersResponse";
        };

        return GetCharactersResponse;
    })();

    drama.GetThreadFeedResponse = (function() {

        /**
         * Properties of a GetThreadFeedResponse.
         * @memberof drama
         * @interface IGetThreadFeedResponse
         * @property {Array.<drama.IThread>|null} [threads] GetThreadFeedResponse threads
         */

        /**
         * Constructs a new GetThreadFeedResponse.
         * @memberof drama
         * @classdesc Represents a GetThreadFeedResponse.
         * @implements IGetThreadFeedResponse
         * @constructor
         * @param {drama.IGetThreadFeedResponse=} [properties] Properties to set
         */
        function GetThreadFeedResponse(properties) {
            this.threads = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetThreadFeedResponse threads.
         * @member {Array.<drama.IThread>} threads
         * @memberof drama.GetThreadFeedResponse
         * @instance
         */
        GetThreadFeedResponse.prototype.threads = $util.emptyArray;

        /**
         * Creates a new GetThreadFeedResponse instance using the specified properties.
         * @function create
         * @memberof drama.GetThreadFeedResponse
         * @static
         * @param {drama.IGetThreadFeedResponse=} [properties] Properties to set
         * @returns {drama.GetThreadFeedResponse} GetThreadFeedResponse instance
         */
        GetThreadFeedResponse.create = function create(properties) {
            return new GetThreadFeedResponse(properties);
        };

        /**
         * Encodes the specified GetThreadFeedResponse message. Does not implicitly {@link drama.GetThreadFeedResponse.verify|verify} messages.
         * @function encode
         * @memberof drama.GetThreadFeedResponse
         * @static
         * @param {drama.IGetThreadFeedResponse} message GetThreadFeedResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetThreadFeedResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.threads != null && message.threads.length)
                for (var i = 0; i < message.threads.length; ++i)
                    $root.drama.Thread.encode(message.threads[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetThreadFeedResponse message, length delimited. Does not implicitly {@link drama.GetThreadFeedResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drama.GetThreadFeedResponse
         * @static
         * @param {drama.IGetThreadFeedResponse} message GetThreadFeedResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetThreadFeedResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetThreadFeedResponse message from the specified reader or buffer.
         * @function decode
         * @memberof drama.GetThreadFeedResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drama.GetThreadFeedResponse} GetThreadFeedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetThreadFeedResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.drama.GetThreadFeedResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.threads && message.threads.length))
                            message.threads = [];
                        message.threads.push($root.drama.Thread.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetThreadFeedResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drama.GetThreadFeedResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drama.GetThreadFeedResponse} GetThreadFeedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetThreadFeedResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetThreadFeedResponse message.
         * @function verify
         * @memberof drama.GetThreadFeedResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetThreadFeedResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.threads != null && message.hasOwnProperty("threads")) {
                if (!Array.isArray(message.threads))
                    return "threads: array expected";
                for (var i = 0; i < message.threads.length; ++i) {
                    var error = $root.drama.Thread.verify(message.threads[i]);
                    if (error)
                        return "threads." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GetThreadFeedResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drama.GetThreadFeedResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drama.GetThreadFeedResponse} GetThreadFeedResponse
         */
        GetThreadFeedResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.drama.GetThreadFeedResponse)
                return object;
            var message = new $root.drama.GetThreadFeedResponse();
            if (object.threads) {
                if (!Array.isArray(object.threads))
                    throw TypeError(".drama.GetThreadFeedResponse.threads: array expected");
                message.threads = [];
                for (var i = 0; i < object.threads.length; ++i) {
                    if (typeof object.threads[i] !== "object")
                        throw TypeError(".drama.GetThreadFeedResponse.threads: object expected");
                    message.threads[i] = $root.drama.Thread.fromObject(object.threads[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GetThreadFeedResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drama.GetThreadFeedResponse
         * @static
         * @param {drama.GetThreadFeedResponse} message GetThreadFeedResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetThreadFeedResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.threads = [];
            if (message.threads && message.threads.length) {
                object.threads = [];
                for (var j = 0; j < message.threads.length; ++j)
                    object.threads[j] = $root.drama.Thread.toObject(message.threads[j], options);
            }
            return object;
        };

        /**
         * Converts this GetThreadFeedResponse to JSON.
         * @function toJSON
         * @memberof drama.GetThreadFeedResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetThreadFeedResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetThreadFeedResponse
         * @function getTypeUrl
         * @memberof drama.GetThreadFeedResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetThreadFeedResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/drama.GetThreadFeedResponse";
        };

        return GetThreadFeedResponse;
    })();

    drama.GetRecentMessagesResponse = (function() {

        /**
         * Properties of a GetRecentMessagesResponse.
         * @memberof drama
         * @interface IGetRecentMessagesResponse
         * @property {Array.<drama.IMessage>|null} [messages] GetRecentMessagesResponse messages
         */

        /**
         * Constructs a new GetRecentMessagesResponse.
         * @memberof drama
         * @classdesc Represents a GetRecentMessagesResponse.
         * @implements IGetRecentMessagesResponse
         * @constructor
         * @param {drama.IGetRecentMessagesResponse=} [properties] Properties to set
         */
        function GetRecentMessagesResponse(properties) {
            this.messages = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetRecentMessagesResponse messages.
         * @member {Array.<drama.IMessage>} messages
         * @memberof drama.GetRecentMessagesResponse
         * @instance
         */
        GetRecentMessagesResponse.prototype.messages = $util.emptyArray;

        /**
         * Creates a new GetRecentMessagesResponse instance using the specified properties.
         * @function create
         * @memberof drama.GetRecentMessagesResponse
         * @static
         * @param {drama.IGetRecentMessagesResponse=} [properties] Properties to set
         * @returns {drama.GetRecentMessagesResponse} GetRecentMessagesResponse instance
         */
        GetRecentMessagesResponse.create = function create(properties) {
            return new GetRecentMessagesResponse(properties);
        };

        /**
         * Encodes the specified GetRecentMessagesResponse message. Does not implicitly {@link drama.GetRecentMessagesResponse.verify|verify} messages.
         * @function encode
         * @memberof drama.GetRecentMessagesResponse
         * @static
         * @param {drama.IGetRecentMessagesResponse} message GetRecentMessagesResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetRecentMessagesResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.messages != null && message.messages.length)
                for (var i = 0; i < message.messages.length; ++i)
                    $root.drama.Message.encode(message.messages[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetRecentMessagesResponse message, length delimited. Does not implicitly {@link drama.GetRecentMessagesResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drama.GetRecentMessagesResponse
         * @static
         * @param {drama.IGetRecentMessagesResponse} message GetRecentMessagesResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetRecentMessagesResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetRecentMessagesResponse message from the specified reader or buffer.
         * @function decode
         * @memberof drama.GetRecentMessagesResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drama.GetRecentMessagesResponse} GetRecentMessagesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetRecentMessagesResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.drama.GetRecentMessagesResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.messages && message.messages.length))
                            message.messages = [];
                        message.messages.push($root.drama.Message.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetRecentMessagesResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drama.GetRecentMessagesResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drama.GetRecentMessagesResponse} GetRecentMessagesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetRecentMessagesResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetRecentMessagesResponse message.
         * @function verify
         * @memberof drama.GetRecentMessagesResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetRecentMessagesResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.messages != null && message.hasOwnProperty("messages")) {
                if (!Array.isArray(message.messages))
                    return "messages: array expected";
                for (var i = 0; i < message.messages.length; ++i) {
                    var error = $root.drama.Message.verify(message.messages[i]);
                    if (error)
                        return "messages." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GetRecentMessagesResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drama.GetRecentMessagesResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drama.GetRecentMessagesResponse} GetRecentMessagesResponse
         */
        GetRecentMessagesResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.drama.GetRecentMessagesResponse)
                return object;
            var message = new $root.drama.GetRecentMessagesResponse();
            if (object.messages) {
                if (!Array.isArray(object.messages))
                    throw TypeError(".drama.GetRecentMessagesResponse.messages: array expected");
                message.messages = [];
                for (var i = 0; i < object.messages.length; ++i) {
                    if (typeof object.messages[i] !== "object")
                        throw TypeError(".drama.GetRecentMessagesResponse.messages: object expected");
                    message.messages[i] = $root.drama.Message.fromObject(object.messages[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GetRecentMessagesResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drama.GetRecentMessagesResponse
         * @static
         * @param {drama.GetRecentMessagesResponse} message GetRecentMessagesResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetRecentMessagesResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.messages = [];
            if (message.messages && message.messages.length) {
                object.messages = [];
                for (var j = 0; j < message.messages.length; ++j)
                    object.messages[j] = $root.drama.Message.toObject(message.messages[j], options);
            }
            return object;
        };

        /**
         * Converts this GetRecentMessagesResponse to JSON.
         * @function toJSON
         * @memberof drama.GetRecentMessagesResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetRecentMessagesResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetRecentMessagesResponse
         * @function getTypeUrl
         * @memberof drama.GetRecentMessagesResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetRecentMessagesResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/drama.GetRecentMessagesResponse";
        };

        return GetRecentMessagesResponse;
    })();

    drama.VoteThreadRequest = (function() {

        /**
         * Properties of a VoteThreadRequest.
         * @memberof drama
         * @interface IVoteThreadRequest
         * @property {string|null} [threadId] VoteThreadRequest threadId
         * @property {boolean|null} [isUpvote] VoteThreadRequest isUpvote
         */

        /**
         * Constructs a new VoteThreadRequest.
         * @memberof drama
         * @classdesc Represents a VoteThreadRequest.
         * @implements IVoteThreadRequest
         * @constructor
         * @param {drama.IVoteThreadRequest=} [properties] Properties to set
         */
        function VoteThreadRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VoteThreadRequest threadId.
         * @member {string} threadId
         * @memberof drama.VoteThreadRequest
         * @instance
         */
        VoteThreadRequest.prototype.threadId = "";

        /**
         * VoteThreadRequest isUpvote.
         * @member {boolean} isUpvote
         * @memberof drama.VoteThreadRequest
         * @instance
         */
        VoteThreadRequest.prototype.isUpvote = false;

        /**
         * Creates a new VoteThreadRequest instance using the specified properties.
         * @function create
         * @memberof drama.VoteThreadRequest
         * @static
         * @param {drama.IVoteThreadRequest=} [properties] Properties to set
         * @returns {drama.VoteThreadRequest} VoteThreadRequest instance
         */
        VoteThreadRequest.create = function create(properties) {
            return new VoteThreadRequest(properties);
        };

        /**
         * Encodes the specified VoteThreadRequest message. Does not implicitly {@link drama.VoteThreadRequest.verify|verify} messages.
         * @function encode
         * @memberof drama.VoteThreadRequest
         * @static
         * @param {drama.IVoteThreadRequest} message VoteThreadRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VoteThreadRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.threadId != null && Object.hasOwnProperty.call(message, "threadId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.threadId);
            if (message.isUpvote != null && Object.hasOwnProperty.call(message, "isUpvote"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isUpvote);
            return writer;
        };

        /**
         * Encodes the specified VoteThreadRequest message, length delimited. Does not implicitly {@link drama.VoteThreadRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drama.VoteThreadRequest
         * @static
         * @param {drama.IVoteThreadRequest} message VoteThreadRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VoteThreadRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VoteThreadRequest message from the specified reader or buffer.
         * @function decode
         * @memberof drama.VoteThreadRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drama.VoteThreadRequest} VoteThreadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VoteThreadRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.drama.VoteThreadRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.threadId = reader.string();
                        break;
                    }
                case 2: {
                        message.isUpvote = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a VoteThreadRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drama.VoteThreadRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drama.VoteThreadRequest} VoteThreadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VoteThreadRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VoteThreadRequest message.
         * @function verify
         * @memberof drama.VoteThreadRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VoteThreadRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.threadId != null && message.hasOwnProperty("threadId"))
                if (!$util.isString(message.threadId))
                    return "threadId: string expected";
            if (message.isUpvote != null && message.hasOwnProperty("isUpvote"))
                if (typeof message.isUpvote !== "boolean")
                    return "isUpvote: boolean expected";
            return null;
        };

        /**
         * Creates a VoteThreadRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drama.VoteThreadRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drama.VoteThreadRequest} VoteThreadRequest
         */
        VoteThreadRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.drama.VoteThreadRequest)
                return object;
            var message = new $root.drama.VoteThreadRequest();
            if (object.threadId != null)
                message.threadId = String(object.threadId);
            if (object.isUpvote != null)
                message.isUpvote = Boolean(object.isUpvote);
            return message;
        };

        /**
         * Creates a plain object from a VoteThreadRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drama.VoteThreadRequest
         * @static
         * @param {drama.VoteThreadRequest} message VoteThreadRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VoteThreadRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.threadId = "";
                object.isUpvote = false;
            }
            if (message.threadId != null && message.hasOwnProperty("threadId"))
                object.threadId = message.threadId;
            if (message.isUpvote != null && message.hasOwnProperty("isUpvote"))
                object.isUpvote = message.isUpvote;
            return object;
        };

        /**
         * Converts this VoteThreadRequest to JSON.
         * @function toJSON
         * @memberof drama.VoteThreadRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VoteThreadRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for VoteThreadRequest
         * @function getTypeUrl
         * @memberof drama.VoteThreadRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        VoteThreadRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/drama.VoteThreadRequest";
        };

        return VoteThreadRequest;
    })();

    drama.VoteThreadResponse = (function() {

        /**
         * Properties of a VoteThreadResponse.
         * @memberof drama
         * @interface IVoteThreadResponse
         * @property {string|null} [threadId] VoteThreadResponse threadId
         * @property {number|null} [newVoteCount] VoteThreadResponse newVoteCount
         */

        /**
         * Constructs a new VoteThreadResponse.
         * @memberof drama
         * @classdesc Represents a VoteThreadResponse.
         * @implements IVoteThreadResponse
         * @constructor
         * @param {drama.IVoteThreadResponse=} [properties] Properties to set
         */
        function VoteThreadResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VoteThreadResponse threadId.
         * @member {string} threadId
         * @memberof drama.VoteThreadResponse
         * @instance
         */
        VoteThreadResponse.prototype.threadId = "";

        /**
         * VoteThreadResponse newVoteCount.
         * @member {number} newVoteCount
         * @memberof drama.VoteThreadResponse
         * @instance
         */
        VoteThreadResponse.prototype.newVoteCount = 0;

        /**
         * Creates a new VoteThreadResponse instance using the specified properties.
         * @function create
         * @memberof drama.VoteThreadResponse
         * @static
         * @param {drama.IVoteThreadResponse=} [properties] Properties to set
         * @returns {drama.VoteThreadResponse} VoteThreadResponse instance
         */
        VoteThreadResponse.create = function create(properties) {
            return new VoteThreadResponse(properties);
        };

        /**
         * Encodes the specified VoteThreadResponse message. Does not implicitly {@link drama.VoteThreadResponse.verify|verify} messages.
         * @function encode
         * @memberof drama.VoteThreadResponse
         * @static
         * @param {drama.IVoteThreadResponse} message VoteThreadResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VoteThreadResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.threadId != null && Object.hasOwnProperty.call(message, "threadId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.threadId);
            if (message.newVoteCount != null && Object.hasOwnProperty.call(message, "newVoteCount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.newVoteCount);
            return writer;
        };

        /**
         * Encodes the specified VoteThreadResponse message, length delimited. Does not implicitly {@link drama.VoteThreadResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drama.VoteThreadResponse
         * @static
         * @param {drama.IVoteThreadResponse} message VoteThreadResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VoteThreadResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VoteThreadResponse message from the specified reader or buffer.
         * @function decode
         * @memberof drama.VoteThreadResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drama.VoteThreadResponse} VoteThreadResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VoteThreadResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.drama.VoteThreadResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.threadId = reader.string();
                        break;
                    }
                case 2: {
                        message.newVoteCount = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a VoteThreadResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drama.VoteThreadResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drama.VoteThreadResponse} VoteThreadResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VoteThreadResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VoteThreadResponse message.
         * @function verify
         * @memberof drama.VoteThreadResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VoteThreadResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.threadId != null && message.hasOwnProperty("threadId"))
                if (!$util.isString(message.threadId))
                    return "threadId: string expected";
            if (message.newVoteCount != null && message.hasOwnProperty("newVoteCount"))
                if (!$util.isInteger(message.newVoteCount))
                    return "newVoteCount: integer expected";
            return null;
        };

        /**
         * Creates a VoteThreadResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drama.VoteThreadResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drama.VoteThreadResponse} VoteThreadResponse
         */
        VoteThreadResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.drama.VoteThreadResponse)
                return object;
            var message = new $root.drama.VoteThreadResponse();
            if (object.threadId != null)
                message.threadId = String(object.threadId);
            if (object.newVoteCount != null)
                message.newVoteCount = object.newVoteCount | 0;
            return message;
        };

        /**
         * Creates a plain object from a VoteThreadResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drama.VoteThreadResponse
         * @static
         * @param {drama.VoteThreadResponse} message VoteThreadResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VoteThreadResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.threadId = "";
                object.newVoteCount = 0;
            }
            if (message.threadId != null && message.hasOwnProperty("threadId"))
                object.threadId = message.threadId;
            if (message.newVoteCount != null && message.hasOwnProperty("newVoteCount"))
                object.newVoteCount = message.newVoteCount;
            return object;
        };

        /**
         * Converts this VoteThreadResponse to JSON.
         * @function toJSON
         * @memberof drama.VoteThreadResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VoteThreadResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for VoteThreadResponse
         * @function getTypeUrl
         * @memberof drama.VoteThreadResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        VoteThreadResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/drama.VoteThreadResponse";
        };

        return VoteThreadResponse;
    })();

    return drama;
})();

module.exports = $root;
