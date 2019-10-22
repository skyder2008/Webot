using System;

namespace Webot.Common
{
    public static class TimeUtil
    {
        public static long GetTimeStamp(DateTime dateTime)
        {
            return new DateTimeOffset(dateTime).ToUnixTimeMilliseconds();
        }

        public static long GetCurrentTimeStamp()
        {
            return GetTimeStamp(DateTime.UtcNow);
        }
    }
}
