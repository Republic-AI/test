import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace drama. */
export namespace drama {

    /** Properties of a BaseMessage. */
    interface IBaseMessage {

        /** BaseMessage command */
        command?: (string|null);

        /** BaseMessage data */
        data?: (string|null);
    }

    /** Represents a BaseMessage. */
    class BaseMessage implements IBaseMessage {

        /**
         * Constructs a new BaseMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: drama.IBaseMessage);

        /** BaseMessage command. */
        public command: string;

        /** BaseMessage data. */
        public data: string;

        /**
         * Creates a new BaseMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BaseMessage instance
         */
        public static create(properties?: drama.IBaseMessage): drama.BaseMessage;

        /**
         * Encodes the specified BaseMessage message. Does not implicitly {@link drama.BaseMessage.verify|verify} messages.
         * @param message BaseMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drama.IBaseMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BaseMessage message, length delimited. Does not implicitly {@link drama.BaseMessage.verify|verify} messages.
         * @param message BaseMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drama.IBaseMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BaseMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BaseMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drama.BaseMessage;

        /**
         * Decodes a BaseMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BaseMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drama.BaseMessage;

        /**
         * Verifies a BaseMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BaseMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BaseMessage
         */
        public static fromObject(object: { [k: string]: any }): drama.BaseMessage;

        /**
         * Creates a plain object from a BaseMessage message. Also converts values to other types if specified.
         * @param message BaseMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drama.BaseMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BaseMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BaseMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Character. */
    interface ICharacter {

        /** Character id */
        id?: (string|null);

        /** Character name */
        name?: (string|null);

        /** Character avatar */
        avatar?: (string|null);

        /** Character description */
        description?: (string|null);

        /** Character author */
        author?: (string|null);
    }

    /** Represents a Character. */
    class Character implements ICharacter {

        /**
         * Constructs a new Character.
         * @param [properties] Properties to set
         */
        constructor(properties?: drama.ICharacter);

        /** Character id. */
        public id: string;

        /** Character name. */
        public name: string;

        /** Character avatar. */
        public avatar: string;

        /** Character description. */
        public description: string;

        /** Character author. */
        public author: string;

        /**
         * Creates a new Character instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Character instance
         */
        public static create(properties?: drama.ICharacter): drama.Character;

        /**
         * Encodes the specified Character message. Does not implicitly {@link drama.Character.verify|verify} messages.
         * @param message Character message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drama.ICharacter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Character message, length delimited. Does not implicitly {@link drama.Character.verify|verify} messages.
         * @param message Character message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drama.ICharacter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Character message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Character
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drama.Character;

        /**
         * Decodes a Character message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Character
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drama.Character;

        /**
         * Verifies a Character message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Character message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Character
         */
        public static fromObject(object: { [k: string]: any }): drama.Character;

        /**
         * Creates a plain object from a Character message. Also converts values to other types if specified.
         * @param message Character
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drama.Character, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Character to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Character
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Thread. */
    interface IThread {

        /** Thread id */
        id?: (string|null);

        /** Thread content */
        content?: (string|null);

        /** Thread authorId */
        authorId?: (string|null);

        /** Thread votes */
        votes?: (number|null);

        /** Thread timestamp */
        timestamp?: (number|Long|null);
    }

    /** Represents a Thread. */
    class Thread implements IThread {

        /**
         * Constructs a new Thread.
         * @param [properties] Properties to set
         */
        constructor(properties?: drama.IThread);

        /** Thread id. */
        public id: string;

        /** Thread content. */
        public content: string;

        /** Thread authorId. */
        public authorId: string;

        /** Thread votes. */
        public votes: number;

        /** Thread timestamp. */
        public timestamp: (number|Long);

        /**
         * Creates a new Thread instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Thread instance
         */
        public static create(properties?: drama.IThread): drama.Thread;

        /**
         * Encodes the specified Thread message. Does not implicitly {@link drama.Thread.verify|verify} messages.
         * @param message Thread message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drama.IThread, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Thread message, length delimited. Does not implicitly {@link drama.Thread.verify|verify} messages.
         * @param message Thread message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drama.IThread, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Thread message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Thread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drama.Thread;

        /**
         * Decodes a Thread message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Thread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drama.Thread;

        /**
         * Verifies a Thread message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Thread message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Thread
         */
        public static fromObject(object: { [k: string]: any }): drama.Thread;

        /**
         * Creates a plain object from a Thread message. Also converts values to other types if specified.
         * @param message Thread
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drama.Thread, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Thread to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Thread
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Message. */
    interface IMessage {

        /** Message id */
        id?: (string|null);

        /** Message content */
        content?: (string|null);

        /** Message authorId */
        authorId?: (string|null);

        /** Message timestamp */
        timestamp?: (number|Long|null);
    }

    /** Represents a Message. */
    class Message implements IMessage {

        /**
         * Constructs a new Message.
         * @param [properties] Properties to set
         */
        constructor(properties?: drama.IMessage);

        /** Message id. */
        public id: string;

        /** Message content. */
        public content: string;

        /** Message authorId. */
        public authorId: string;

        /** Message timestamp. */
        public timestamp: (number|Long);

        /**
         * Creates a new Message instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Message instance
         */
        public static create(properties?: drama.IMessage): drama.Message;

        /**
         * Encodes the specified Message message. Does not implicitly {@link drama.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drama.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link drama.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drama.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drama.Message;

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drama.Message;

        /**
         * Verifies a Message message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Message
         */
        public static fromObject(object: { [k: string]: any }): drama.Message;

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @param message Message
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drama.Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Message to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Message
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetCharactersResponse. */
    interface IGetCharactersResponse {

        /** GetCharactersResponse characters */
        characters?: (drama.ICharacter[]|null);
    }

    /** Represents a GetCharactersResponse. */
    class GetCharactersResponse implements IGetCharactersResponse {

        /**
         * Constructs a new GetCharactersResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: drama.IGetCharactersResponse);

        /** GetCharactersResponse characters. */
        public characters: drama.ICharacter[];

        /**
         * Creates a new GetCharactersResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetCharactersResponse instance
         */
        public static create(properties?: drama.IGetCharactersResponse): drama.GetCharactersResponse;

        /**
         * Encodes the specified GetCharactersResponse message. Does not implicitly {@link drama.GetCharactersResponse.verify|verify} messages.
         * @param message GetCharactersResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drama.IGetCharactersResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetCharactersResponse message, length delimited. Does not implicitly {@link drama.GetCharactersResponse.verify|verify} messages.
         * @param message GetCharactersResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drama.IGetCharactersResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetCharactersResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetCharactersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drama.GetCharactersResponse;

        /**
         * Decodes a GetCharactersResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetCharactersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drama.GetCharactersResponse;

        /**
         * Verifies a GetCharactersResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetCharactersResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetCharactersResponse
         */
        public static fromObject(object: { [k: string]: any }): drama.GetCharactersResponse;

        /**
         * Creates a plain object from a GetCharactersResponse message. Also converts values to other types if specified.
         * @param message GetCharactersResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drama.GetCharactersResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetCharactersResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetCharactersResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetThreadFeedResponse. */
    interface IGetThreadFeedResponse {

        /** GetThreadFeedResponse threads */
        threads?: (drama.IThread[]|null);
    }

    /** Represents a GetThreadFeedResponse. */
    class GetThreadFeedResponse implements IGetThreadFeedResponse {

        /**
         * Constructs a new GetThreadFeedResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: drama.IGetThreadFeedResponse);

        /** GetThreadFeedResponse threads. */
        public threads: drama.IThread[];

        /**
         * Creates a new GetThreadFeedResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetThreadFeedResponse instance
         */
        public static create(properties?: drama.IGetThreadFeedResponse): drama.GetThreadFeedResponse;

        /**
         * Encodes the specified GetThreadFeedResponse message. Does not implicitly {@link drama.GetThreadFeedResponse.verify|verify} messages.
         * @param message GetThreadFeedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drama.IGetThreadFeedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetThreadFeedResponse message, length delimited. Does not implicitly {@link drama.GetThreadFeedResponse.verify|verify} messages.
         * @param message GetThreadFeedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drama.IGetThreadFeedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetThreadFeedResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetThreadFeedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drama.GetThreadFeedResponse;

        /**
         * Decodes a GetThreadFeedResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetThreadFeedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drama.GetThreadFeedResponse;

        /**
         * Verifies a GetThreadFeedResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetThreadFeedResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetThreadFeedResponse
         */
        public static fromObject(object: { [k: string]: any }): drama.GetThreadFeedResponse;

        /**
         * Creates a plain object from a GetThreadFeedResponse message. Also converts values to other types if specified.
         * @param message GetThreadFeedResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drama.GetThreadFeedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetThreadFeedResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetThreadFeedResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetRecentMessagesResponse. */
    interface IGetRecentMessagesResponse {

        /** GetRecentMessagesResponse messages */
        messages?: (drama.IMessage[]|null);
    }

    /** Represents a GetRecentMessagesResponse. */
    class GetRecentMessagesResponse implements IGetRecentMessagesResponse {

        /**
         * Constructs a new GetRecentMessagesResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: drama.IGetRecentMessagesResponse);

        /** GetRecentMessagesResponse messages. */
        public messages: drama.IMessage[];

        /**
         * Creates a new GetRecentMessagesResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetRecentMessagesResponse instance
         */
        public static create(properties?: drama.IGetRecentMessagesResponse): drama.GetRecentMessagesResponse;

        /**
         * Encodes the specified GetRecentMessagesResponse message. Does not implicitly {@link drama.GetRecentMessagesResponse.verify|verify} messages.
         * @param message GetRecentMessagesResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drama.IGetRecentMessagesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetRecentMessagesResponse message, length delimited. Does not implicitly {@link drama.GetRecentMessagesResponse.verify|verify} messages.
         * @param message GetRecentMessagesResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drama.IGetRecentMessagesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetRecentMessagesResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetRecentMessagesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drama.GetRecentMessagesResponse;

        /**
         * Decodes a GetRecentMessagesResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetRecentMessagesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drama.GetRecentMessagesResponse;

        /**
         * Verifies a GetRecentMessagesResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetRecentMessagesResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetRecentMessagesResponse
         */
        public static fromObject(object: { [k: string]: any }): drama.GetRecentMessagesResponse;

        /**
         * Creates a plain object from a GetRecentMessagesResponse message. Also converts values to other types if specified.
         * @param message GetRecentMessagesResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drama.GetRecentMessagesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetRecentMessagesResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetRecentMessagesResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a VoteThreadRequest. */
    interface IVoteThreadRequest {

        /** VoteThreadRequest threadId */
        threadId?: (string|null);

        /** VoteThreadRequest isUpvote */
        isUpvote?: (boolean|null);
    }

    /** Represents a VoteThreadRequest. */
    class VoteThreadRequest implements IVoteThreadRequest {

        /**
         * Constructs a new VoteThreadRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: drama.IVoteThreadRequest);

        /** VoteThreadRequest threadId. */
        public threadId: string;

        /** VoteThreadRequest isUpvote. */
        public isUpvote: boolean;

        /**
         * Creates a new VoteThreadRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VoteThreadRequest instance
         */
        public static create(properties?: drama.IVoteThreadRequest): drama.VoteThreadRequest;

        /**
         * Encodes the specified VoteThreadRequest message. Does not implicitly {@link drama.VoteThreadRequest.verify|verify} messages.
         * @param message VoteThreadRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drama.IVoteThreadRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VoteThreadRequest message, length delimited. Does not implicitly {@link drama.VoteThreadRequest.verify|verify} messages.
         * @param message VoteThreadRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drama.IVoteThreadRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VoteThreadRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VoteThreadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drama.VoteThreadRequest;

        /**
         * Decodes a VoteThreadRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VoteThreadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drama.VoteThreadRequest;

        /**
         * Verifies a VoteThreadRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VoteThreadRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VoteThreadRequest
         */
        public static fromObject(object: { [k: string]: any }): drama.VoteThreadRequest;

        /**
         * Creates a plain object from a VoteThreadRequest message. Also converts values to other types if specified.
         * @param message VoteThreadRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drama.VoteThreadRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VoteThreadRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for VoteThreadRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a VoteThreadResponse. */
    interface IVoteThreadResponse {

        /** VoteThreadResponse threadId */
        threadId?: (string|null);

        /** VoteThreadResponse newVoteCount */
        newVoteCount?: (number|null);
    }

    /** Represents a VoteThreadResponse. */
    class VoteThreadResponse implements IVoteThreadResponse {

        /**
         * Constructs a new VoteThreadResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: drama.IVoteThreadResponse);

        /** VoteThreadResponse threadId. */
        public threadId: string;

        /** VoteThreadResponse newVoteCount. */
        public newVoteCount: number;

        /**
         * Creates a new VoteThreadResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VoteThreadResponse instance
         */
        public static create(properties?: drama.IVoteThreadResponse): drama.VoteThreadResponse;

        /**
         * Encodes the specified VoteThreadResponse message. Does not implicitly {@link drama.VoteThreadResponse.verify|verify} messages.
         * @param message VoteThreadResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drama.IVoteThreadResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VoteThreadResponse message, length delimited. Does not implicitly {@link drama.VoteThreadResponse.verify|verify} messages.
         * @param message VoteThreadResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drama.IVoteThreadResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VoteThreadResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VoteThreadResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drama.VoteThreadResponse;

        /**
         * Decodes a VoteThreadResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VoteThreadResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drama.VoteThreadResponse;

        /**
         * Verifies a VoteThreadResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VoteThreadResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VoteThreadResponse
         */
        public static fromObject(object: { [k: string]: any }): drama.VoteThreadResponse;

        /**
         * Creates a plain object from a VoteThreadResponse message. Also converts values to other types if specified.
         * @param message VoteThreadResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drama.VoteThreadResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VoteThreadResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for VoteThreadResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
