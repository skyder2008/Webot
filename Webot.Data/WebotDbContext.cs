using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Webot.Data.Core;

namespace Webot.Data
{
    public class WebotDbContext: DbContext
    {
        public WebotDbContext(DbContextOptions<WebotDbContext> options)
            :base(options)
        { 
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var configTypes = Assembly.GetExecutingAssembly().GetTypes()
                .Where(t => t.GetInterface(typeof(IEntityTypeConfiguration<>).FullName) != null);

            foreach (var type in configTypes)
            {
                dynamic instance = Activator.CreateInstance(type);
                modelBuilder.ApplyConfiguration(instance);
            }
        }
    }
}
