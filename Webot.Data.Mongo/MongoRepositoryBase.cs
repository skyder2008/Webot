using MongoDB.Driver;
using System.Threading.Tasks;

namespace Webot.Data.Mongo
{
    public abstract class MongoRepositoryBase<TMongoDoc> : IMongoRepository<TMongoDoc>
        where TMongoDoc : MongoDocBase
    {
        protected IMongoCollection<TMongoDoc> MongoCollection { private set; get; }

        public MongoRepositoryBase(IMongoDBProvider dbProvider)
        {
            MongoCollection = dbProvider.GetMongoDatabase().GetCollection<TMongoDoc>(typeof(TMongoDoc).Name);
        }

        public async Task<TMongoDoc> InsertAsync(TMongoDoc entity)
        {
            await MongoCollection.InsertOneAsync(entity);
            return entity;
        }
    }
}
