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

        public static long ToUnixEpochDate(DateTime date)
        {
            return (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);
        }
    }
}
