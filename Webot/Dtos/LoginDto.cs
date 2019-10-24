using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webot.Dtos
{
    public class QRLoginDto
    {
        public string Code { get; set; }
        public string Uuid { get; set; }
    }

    public class AuthInfoDto
    {
        public string Skey { get; set; }
        public string Wxsid { get; set; }
        public string Wxuin { get; set; }
        public string PassTicket { get; set; }
    }
}
