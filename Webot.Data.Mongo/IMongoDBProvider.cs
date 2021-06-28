using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Webot.Data.Mongo
{
    public interface IMongoDBProvider
    {
        IMongoDatabase GetMongoDatabase();
    }
}
