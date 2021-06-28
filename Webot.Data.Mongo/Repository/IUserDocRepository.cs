using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Webot.Data.Mongo.Documents;

namespace Webot.Data.Mongo.Repository
{
    public interface IUserDocRepository : IMongoRepository<UserDoc>
    {
    }
}
