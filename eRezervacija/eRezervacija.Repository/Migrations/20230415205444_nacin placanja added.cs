using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eRezervacija.Repository.Migrations
{
    /// <inheritdoc />
    public partial class nacinplacanjaadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NacinPlacanjaId",
                table: "Rezervacije",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "NaciniPlacanja",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NaciniPlacanja", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacije_NacinPlacanjaId",
                table: "Rezervacije",
                column: "NacinPlacanjaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_NaciniPlacanja_NacinPlacanjaId",
                table: "Rezervacije",
                column: "NacinPlacanjaId",
                principalTable: "NaciniPlacanja",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_NaciniPlacanja_NacinPlacanjaId",
                table: "Rezervacije");

            migrationBuilder.DropTable(
                name: "NaciniPlacanja");

            migrationBuilder.DropIndex(
                name: "IX_Rezervacije_NacinPlacanjaId",
                table: "Rezervacije");

            migrationBuilder.DropColumn(
                name: "NacinPlacanjaId",
                table: "Rezervacije");
        }
    }
}
