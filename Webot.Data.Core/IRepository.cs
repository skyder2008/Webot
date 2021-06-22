using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Webot.Data.Core
{
    public interface IRepository<TEntity, TId>
        where TEntity : Record<TId>
        where TId : IComparable
    {
        IQueryable<TEntity> All();
        IQueryable<TEntity> Filter(Expression<Func<TEntity, bool>> predicate);
        bool Contains(Expression<Func<TEntity, bool>> predicate);
        TEntity Find(params object[] keys);
        TEntity Insert(TEntity entity);
        bool Delete(long id);
        TEntity Update(TEntity entity);
        TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate);
    }
}
