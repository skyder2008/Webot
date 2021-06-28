using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Webot.Data.Core
{
    public interface IRecord<TId>
        where TId : IComparable
    {
        TId Id { get; set; }
        bool IsDeleted { get; set; }
        int RecordVersion { get; set; }
    }
}
