using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eRezervacija.Repository.Migrations
{
    /// <inheritdoc />
    public partial class isAktiviranpropertyadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isAktiviran",
                table: "Korisnici",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isAktiviran",
                table: "Korisnici");
        }
    }
}
