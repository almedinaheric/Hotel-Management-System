using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eRezervacija.Repository.Migrations
{
    /// <inheritdoc />
    public partial class nullablenacinplacanja : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_NacinPlacanja_NacinPlacanjaId",
                table: "Rezervacije");

            migrationBuilder.DropColumn(
                name: "NacinPlacanja",
                table: "Rezervacije");

            migrationBuilder.AlterColumn<int>(
                name: "NacinPlacanjaId",
                table: "Rezervacije",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_NacinPlacanja_NacinPlacanjaId",
                table: "Rezervacije",
                column: "NacinPlacanjaId",
                principalTable: "NacinPlacanja",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_NacinPlacanja_NacinPlacanjaId",
                table: "Rezervacije");

            migrationBuilder.AlterColumn<int>(
                name: "NacinPlacanjaId",
                table: "Rezervacije",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NacinPlacanja",
                table: "Rezervacije",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_NacinPlacanja_NacinPlacanjaId",
                table: "Rezervacije",
                column: "NacinPlacanjaId",
                principalTable: "NacinPlacanja",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
