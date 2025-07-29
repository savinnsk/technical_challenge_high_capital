
using Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Mapping
{
    public class ChatbotEntityMap : IEntityTypeConfiguration<ChatbotEntity>
    {
        public void Configure(EntityTypeBuilder<ChatbotEntity> builder)
        {
            builder.ToTable("Chatbots");
            builder.HasKey(p => p.Id);
            builder.Property(u => u.Name).IsRequired();
            builder.Property(u => u.Context).IsRequired();
            builder.Property(u => u.UserId).IsRequired();
        }
        
    }
}