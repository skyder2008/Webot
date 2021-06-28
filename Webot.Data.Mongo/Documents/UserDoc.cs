using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Webot.Data.Mongo.Documents
{
    public class UserDoc : MongoDocBase
    {
        public string Name { get; set; }
        public DateTime? Birthday { get; set; }
        public string  Account { get; set; }
    }
}
