using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Webot.Data.Core;
using Webot.Model.Entities;

namespace Webot.Data.Configuretions
{
    public sealed class UserConfiguration : EntityTypeConfiguration<User>
    {
        public override void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);

            builder.Property(u => u.Name).HasMaxLength(200);
            builder.Property(u => u.Account).HasMaxLength(100).IsRequired();
            builder.Property(u => u.Password).HasMaxLength(100).IsRequired();
        }
    }
}
