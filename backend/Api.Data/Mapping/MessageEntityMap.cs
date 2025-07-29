
using Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Mapping
{
    public class MessageEntityMap : IEntityTypeConfiguration<MessageEntity>
    {
        public void Configure(EntityTypeBuilder<MessageEntity> builder)
        {

            builder.ToTable("Messages");
            builder.HasKey(p => p.Id);
            builder.Property(u => u.ChatbotId).IsRequired();
            builder.Property(u => u.Content).IsRequired();
            builder.Property(u => u.Role).IsRequired();
        }
        
    }
}