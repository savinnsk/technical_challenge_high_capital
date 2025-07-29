using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class addChatbotAndMessageTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("7ab2c11a-f815-42ae-9feb-1743cc3ebed4"));

            migrationBuilder.CreateTable(
                name: "Chatbots",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Context = table.Column<string>(type: "TEXT", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chatbots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Chatbots_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ChatbotId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Role = table.Column<string>(type: "TEXT", nullable: false),
                    Content = table.Column<string>(type: "TEXT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_Chatbots_ChatbotId",
                        column: x => x.ChatbotId,
                        principalTable: "Chatbots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreateAt", "Email", "Name", "Password", "UpdatedAt" },
                values: new object[] { new Guid("bffb2f8a-47cb-4e1f-984f-1debb386688d"), new DateTime(2025, 7, 29, 10, 33, 0, 253, DateTimeKind.Local).AddTicks(8980), "adm@mail.com", "Adm", "adm123", new DateTime(2025, 7, 29, 10, 33, 0, 253, DateTimeKind.Local).AddTicks(8994) });

            migrationBuilder.CreateIndex(
                name: "IX_Chatbots_UserId",
                table: "Chatbots",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ChatbotId",
                table: "Messages",
                column: "ChatbotId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Chatbots");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("bffb2f8a-47cb-4e1f-984f-1debb386688d"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreateAt", "Email", "Name", "Password", "UpdatedAt" },
                values: new object[] { new Guid("7ab2c11a-f815-42ae-9feb-1743cc3ebed4"), new DateTime(2025, 7, 28, 16, 49, 18, 933, DateTimeKind.Local).AddTicks(5047), "adm@mail.com", "Adm", "adm123", new DateTime(2025, 7, 28, 16, 49, 18, 933, DateTimeKind.Local).AddTicks(5061) });
        }
    }
}
