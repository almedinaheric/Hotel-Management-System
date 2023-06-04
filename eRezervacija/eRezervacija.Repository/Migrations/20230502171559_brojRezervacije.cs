using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eRezervacija.Repository.Migrations
{
    /// <inheritdoc />
    public partial class brojRezervacije : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HotelPitanja");

            migrationBuilder.AddColumn<Guid>(
                name: "BrojRezervacije",
                table: "Rezervacije",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BrojRezervacije",
                table: "Rezervacije");

            migrationBuilder.CreateTable(
                name: "HotelPitanja",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GostId = table.Column<int>(type: "int", nullable: false),
                    HotelId = table.Column<int>(type: "int", nullable: false),
                    DatumOdgovoreno = table.Column<DateTime>(type: "datetime2", nullable: true),
                    OdgovorPitanja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Odgovoreno = table.Column<bool>(type: "bit", nullable: false),
                    TekstPitanja = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HotelPitanja", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HotelPitanja_Gosti_GostId",
                        column: x => x.GostId,
                        principalTable: "Gosti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HotelPitanja_Hoteli_HotelId",
                        column: x => x.HotelId,
                        principalTable: "Hoteli",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HotelPitanja_GostId",
                table: "HotelPitanja",
                column: "GostId");

            migrationBuilder.CreateIndex(
                name: "IX_HotelPitanja_HotelId",
                table: "HotelPitanja",
                column: "HotelId");
        }
    }
}
