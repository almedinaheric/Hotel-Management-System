using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eRezervacija.Repository.Migrations
{
    /// <inheritdoc />
    public partial class hotelipitanjaopet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RasporedSoba");

            migrationBuilder.CreateTable(
                name: "HotelPitanja",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GostId = table.Column<int>(type: "int", nullable: false),
                    HotelId = table.Column<int>(type: "int", nullable: false),
                    TekstPitanja = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OdgovorPitanja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DatumOdgovoreno = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Odgovoreno = table.Column<bool>(type: "bit", nullable: false)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HotelPitanja");

            migrationBuilder.CreateTable(
                name: "RasporedSoba",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Datum = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Rezervisana = table.Column<bool>(type: "bit", nullable: false),
                    SobaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RasporedSoba", x => x.Id);
                });
        }
    }
}
