using System;

namespace Webot.Data.Core
{
    public abstract class Record<TId>
        where TId : struct
    {
        public TId Id { get; set; }
    }

    public abstract class EntityBase : Record<long>
    {
        public DateTime RecordCreatedTime { get; set; }
        public long RecordCreatorId { get; set; }
        public DateTime? RecordUpdatedTime { get; set; }
        public long? RecordUpdaterId { get; set; }
        public bool IsInactive { get; set; }
        public int RecordVersion { get; set; }
    }
}
