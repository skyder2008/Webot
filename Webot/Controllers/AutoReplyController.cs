using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Webot.Services;

namespace Webot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoReplyController : ControllerBase
    {
        private ReplyService replyService;

        public AutoReplyController()
        {
            replyService = new ReplyService();
        }

        [HttpGet]
        public async Task<string> GetReply(string message)
        {
            return await replyService.GetReply(message);
        }
    }
}