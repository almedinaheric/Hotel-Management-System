using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eRezervacija.Repository.Migrations
{
    /// <inheritdoc />
    public partial class gradDrzavaIDIspravka : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_NaciniPlacanja_NacinPlacanjaId",
                table: "Rezervacije");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NaciniPlacanja",
                table: "NaciniPlacanja");

            migrationBuilder.RenameTable(
                name: "NaciniPlacanja",
                newName: "NacinPlacanja");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NacinPlacanja",
                table: "NacinPlacanja",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_NacinPlacanja_NacinPlacanjaId",
                table: "Rezervacije",
                column: "NacinPlacanjaId",
                principalTable: "NacinPlacanja",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_NacinPlacanja_NacinPlacanjaId",
                table: "Rezervacije");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NacinPlacanja",
                table: "NacinPlacanja");

            migrationBuilder.RenameTable(
                name: "NacinPlacanja",
                newName: "NaciniPlacanja");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NaciniPlacanja",
                table: "NaciniPlacanja",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_NaciniPlacanja_NacinPlacanjaId",
                table: "Rezervacije",
                column: "NacinPlacanjaId",
                principalTable: "NaciniPlacanja",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
