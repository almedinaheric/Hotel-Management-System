using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eRezervacija.Repository.Migrations
{
    /// <inheritdoc />
    public partial class rasporedsobaudbcontextopet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RasporedSobe",
                table: "RasporedSobe");

            migrationBuilder.RenameTable(
                name: "RasporedSobe",
                newName: "RasporedSoba");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RasporedSoba",
                table: "RasporedSoba",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RasporedSoba",
                table: "RasporedSoba");

            migrationBuilder.RenameTable(
                name: "RasporedSoba",
                newName: "RasporedSobe");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RasporedSobe",
                table: "RasporedSobe",
                column: "Id");
        }
    }
}
