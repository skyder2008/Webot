using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Webot.Data.Core;

namespace Webot.Data.Mongo
{
    public interface IMongoRepository<TMongoDoc>: IRepository<TMongoDoc, string>
        where TMongoDoc: MongoDocBase
    {
    }
}
