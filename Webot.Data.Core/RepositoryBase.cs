using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Webot.Data.Core
{
    public abstract class RepositoryBase<TEntity> : IRepository<TEntity>
        where TEntity : EntityBase
    {
        protected readonly DbContext Context;

        public RepositoryBase(DbContext context)
        {
            Context = context;
        }

        public IQueryable<TEntity> All()
        {
            return Context.Set<TEntity>().AsQueryable();
        }

        public bool Contains(Expression<Func<TEntity, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Delete(long id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TEntity> Filter(Expression<Func<TEntity, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public TEntity Find(params object[] keys)
        {
            throw new NotImplementedException();
        }

        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public TEntity Insert(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public TEntity Update(TEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
