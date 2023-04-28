using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eRezervacija.Repository.Migrations
{
    /// <inheritdoc />
    public partial class zvjezdiceUdaljenost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BrojZvjezdica",
                table: "Hoteli",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "UdaljenostOdCentraGrada",
                table: "Hoteli",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BrojZvjezdica",
                table: "Hoteli");

            migrationBuilder.DropColumn(
                name: "UdaljenostOdCentraGrada",
                table: "Hoteli");
        }
    }
}
