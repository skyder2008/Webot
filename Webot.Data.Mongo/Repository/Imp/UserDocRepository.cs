using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Webot.Data.Mongo.Documents;

namespace Webot.Data.Mongo.Repository.Imp
{
    public class UserDocRepository : MongoRepositoryBase<UserDoc>, IUserDocRepository
    {
        public UserDocRepository(IMongoDBProvider dbProvider) 
            : base(dbProvider)
        {
        }
    }
}
