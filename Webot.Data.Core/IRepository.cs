using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Webot.Data.Core
{
    public interface IRepository<TEntity, TId>
        where TEntity : IRecord<TId>
        where TId : IComparable
    {
        Task<TEntity> InsertAsync(TEntity entity);
    }
}
