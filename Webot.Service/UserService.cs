using System.Threading.Tasks;
using Webot.Data.Mongo.Documents;
using Webot.Data.Mongo.Repository;

namespace Webot.Service
{
    public class UserService: IUserService
    {
        private IUserDocRepository UserDocRepository;

        public UserService(IUserDocRepository userDocRepository)
        {
            UserDocRepository = userDocRepository;
        }

        public async Task<UserDoc> CreateUser(UserDoc user)
        {
            return await UserDocRepository.InsertAsync(user);
        }
    }
}
