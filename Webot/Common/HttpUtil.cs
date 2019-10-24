using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using System.Xml.Serialization;

namespace Webot.Common
{
    public static class HttpUtil
    {
        public static async Task<string> GetAsync(string url, IDictionary<string, string> paramDic = null)
        {
            Guid requestId = Guid.Empty;
            string paramStr = SerializeDictionary(paramDic);
            if (!String.IsNullOrEmpty(paramStr))
            {
                url += "?" + paramStr;
            }
            using (var client = GetHttpClient())
            {
                var request = new HttpRequestMessage
                {
                    RequestUri = new Uri(url),
                    Method = HttpMethod.Get,
                };

                var response = await client.SendAsync(request);
                var responseContent = response.Content.ReadAsStringAsync().Result;

                return responseContent;
            }
        }

        public static async Task<string> PostAsync(string url, IDictionary<string, string> paramDic = null,
                    string postContent = null)
        {
            Guid requestId = Guid.Empty;
            string paramStr = SerializeDictionary(paramDic);
            if (!String.IsNullOrEmpty(paramStr))
            {
                url += "?" + paramStr;
            }
            using (var client = GetHttpClient())
            {
                var request = new HttpRequestMessage
                {
                    RequestUri = new Uri(url),
                    Method = HttpMethod.Post,
                };
                request.Headers.Add("ContentType", "application/json; charset=UTF-8");
                if (!String.IsNullOrEmpty(postContent))
                {
                    request.Content = new StringContent(postContent, Encoding.UTF8);
                }

                var response = await client.SendAsync(request);
                var responseContent = await response.Content.ReadAsStringAsync();
                return responseContent;
            }
        }

        public static string SerializeDictionary(IDictionary<string, string> dic)
        {
            string str = null;
            if (dic != null && dic.Count > 0)
            {
                var parameters = new List<string>();
                foreach (var item in dic)
                {
                    parameters.Add(item.Key + "=" + HttpUtility.UrlEncode(item.Value, Encoding.UTF8));
                }
                str = string.Join("&", parameters.ToArray());
            }
            return str;
        }

        private static HttpClient GetHttpClient(int? timeOutSeconds = null)
        {
            var client = new HttpClient();
            // 没有设置超时时间，则用默认超时时间
            client.Timeout = new TimeSpan(0, 0, timeOutSeconds.HasValue ? timeOutSeconds.Value : 30);
            return client;
        }
    }
}
