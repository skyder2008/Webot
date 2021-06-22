using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Webot.Data.Core
{
    public abstract class Record<TId>
        where TId : IComparable
    {
        public virtual TId Id { get; set; }
        public virtual DateTime RecordCreatedTime { get; set; }
        public virtual TId RecordCreatorId { get; set; }
        public virtual DateTime? RecordUpdatedTime { get; set; }
        public virtual TId? RecordUpdaterId { get; set; }
        public virtual bool IsDeleted { get; set; }
        public virtual int RecordVersion { get; set; }
    }

    //public abstract class EntityBase : Record<long>
    //{
    //}

    //public abstract class MongoEntityBase : Record<string>
    //{
    //    [BsonId]
    //    [BsonRepresentation(BsonType.ObjectId)]
    //    public override string Id { get; set; }
    //    [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
    //    public override DateTime RecordCreatedTime { get; set; }
    //    [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
    //    public override DateTime? RecordUpdatedTime { get; set; }
    //}
}
