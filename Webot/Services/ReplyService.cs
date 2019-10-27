using System.Threading.Tasks;

namespace Webot.Services
{
    public class ReplyService
    {
        public async Task<string> GetReply(string msg)
        {
            return await Task.FromResult<string>($"消息回复：{msg}");
        }
    }
}
