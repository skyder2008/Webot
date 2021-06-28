using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using Webot.Infrastructure.Settings;

namespace Webot.Data.Mongo.MongoDBProviders
{
    public class DefaultMongoDBProvider : IMongoDBProvider
    {
        private IMongoDatabase _dbInstance;
        private MongoSetting _setting;

        private object _lock = new object();

        public DefaultMongoDBProvider(IOptions<MongoSetting> setting)
        {
            _setting = setting.Value;
        }
        public IMongoDatabase GetMongoDatabase()
        {
            if (_setting == null)
            {
                throw new Exception();
            }
            if (_dbInstance == null)
            {
                lock (_lock)
                {
                    if (_dbInstance == null)
                    {
                        var client = new MongoClient(_setting.ConnectionString);
                        _dbInstance = client.GetDatabase(_setting.DatabaseName);
                    }
                }
            }
            return _dbInstance;
        }
    }
}
