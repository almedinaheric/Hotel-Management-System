using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eRezervacija.Repository.Migrations
{
    /// <inheritdoc />
    public partial class tokendoradjen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "twoFCode",
                table: "AutentifikacijaTokeni",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "twoFJelOtkljucano",
                table: "AutentifikacijaTokeni",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "twoFCode",
                table: "AutentifikacijaTokeni");

            migrationBuilder.DropColumn(
                name: "twoFJelOtkljucano",
                table: "AutentifikacijaTokeni");
        }
    }
}
