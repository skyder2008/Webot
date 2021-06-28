using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using Webot.Data.Core;

namespace Webot.Data.Mongo
{
    public abstract class MongoDocBase : IRecord<string>
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string RecordCreatedUser { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime RecordCreatedTime { get; set; }

        public string RecordLastUpdatedUser { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime? RecordUpdatedTime { get; set; }
        public bool IsDeleted { get; set; }
        public int RecordVersion { get; set; }
    }
}
