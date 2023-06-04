﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using eRezervacija.Repository;

#nullable disable

namespace eRezervacija.Repository.Migrations
{
    [DbContext(typeof(eRezervacijaDbContext))]
    [Migration("20230502171559_brojRezervacije")]
    partial class brojRezervacije
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("eRezervacija.Core.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("KorisnikID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KorisnikID");

                    b.ToTable("Admini");
                });

            modelBuilder.Entity("eRezervacija.Core.Autentikacija.AutentifikacijaToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("KorisnikID")
                        .HasColumnType("int");

                    b.Property<string>("Vrijednost")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ipAdresa")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("KorisnikID");

                    b.ToTable("AutentifikacijaTokeni");
                });

            modelBuilder.Entity("eRezervacija.Core.Drzava", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Drzave");
                });

            modelBuilder.Entity("eRezervacija.Core.FAQ", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("DatumOdgovoreno")
                        .HasColumnType("datetime2");

                    b.Property<int>("GostId")
                        .HasColumnType("int");

                    b.Property<string>("OdgovorPitanja")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Odgovoreno")
                        .HasColumnType("bit");

                    b.Property<string>("TekstPitanja")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GostId");

                    b.ToTable("Pitanja");
                });

            modelBuilder.Entity("eRezervacija.Core.Gost", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("KorisnikID")
                        .HasColumnType("int");

                    b.Property<int?>("KreditnaKarticaID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KorisnikID");

                    b.HasIndex("KreditnaKarticaID");

                    b.ToTable("Gosti");
                });

            modelBuilder.Entity("eRezervacija.Core.Grad", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BrojHotelaUGradu")
                        .HasColumnType("int");

                    b.Property<int>("DrzavaID")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostanskiBroj")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("slika")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("Id");

                    b.HasIndex("DrzavaID");

                    b.ToTable("Gradovi");
                });

            modelBuilder.Entity("eRezervacija.Core.Hotel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("BrojDvokrevetnihSoba")
                        .HasColumnType("int");

                    b.Property<int>("BrojJednokrevetnihSoba")
                        .HasColumnType("int");

                    b.Property<int>("BrojSpratova")
                        .HasColumnType("int");

                    b.Property<string>("BrojTelefona")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("BrojTrokrevetnihSoba")
                        .HasColumnType("int");

                    b.Property<int>("BrojZvjezdica")
                        .HasColumnType("int");

                    b.Property<string>("EmailHotela")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GradID")
                        .HasColumnType("int");

                    b.Property<int>("HotelDetaljiID")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("ProsjecnaOcjena")
                        .HasColumnType("real");

                    b.Property<float>("UdaljenostOdCentraGrada")
                        .HasColumnType("real");

                    b.Property<int>("UkupanBrojSoba")
                        .HasColumnType("int");

                    b.Property<bool>("Unlisted")
                        .HasColumnType("bit");

                    b.Property<int>("VlasnikID")
                        .HasColumnType("int");

                    b.Property<string>("VrijemeCheckIna")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VrijemeCheckOuta")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("slika")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("Id");

                    b.HasIndex("GradID");

                    b.HasIndex("HotelDetaljiID");

                    b.HasIndex("VlasnikID");

                    b.ToTable("Hoteli");
                });

            modelBuilder.Entity("eRezervacija.Core.HotelDetalji", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Bazen")
                        .HasColumnType("bit");

                    b.Property<bool>("Kafic")
                        .HasColumnType("bit");

                    b.Property<bool>("KonferencijskaSala")
                        .HasColumnType("bit");

                    b.Property<bool>("Restoran")
                        .HasColumnType("bit");

                    b.Property<bool>("Sauna")
                        .HasColumnType("bit");

                    b.Property<bool>("Spa")
                        .HasColumnType("bit");

                    b.Property<bool>("Teretana")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("DetaljiHotela");
                });

            modelBuilder.Entity("eRezervacija.Core.Korisnik", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Broj_telefona")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DatumKreiranja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DatumPromjene")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Datum_rodjenja")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Spol")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Uloga")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Korisnici");
                });

            modelBuilder.Entity("eRezervacija.Core.KreditnaKartica", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BrojKartice")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CVV")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DatumIsteka")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("KreditneKartice");
                });

            modelBuilder.Entity("eRezervacija.Core.NacinPlacanja", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("NacinPlacanja");
                });

            modelBuilder.Entity("eRezervacija.Core.Parking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("HotelID")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("HotelID");

                    b.ToTable("Parkinzi");
                });

            modelBuilder.Entity("eRezervacija.Core.ParkingMjesto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ParkingID")
                        .HasColumnType("int");

                    b.Property<int>("Sprat")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ParkingID");

                    b.ToTable("ParkingMjesta");
                });

            modelBuilder.Entity("eRezervacija.Core.PlanOtkazivanja", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("HotelID")
                        .HasColumnType("int");

                    b.Property<int>("OtkazivanjeBesplatnoDo")
                        .HasColumnType("int");

                    b.Property<float>("PostotakCijene")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("HotelID");

                    b.ToTable("PlanoviOtkazivanja");
                });

            modelBuilder.Entity("eRezervacija.Core.RasporedSoba", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Datum")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Rezervisana")
                        .HasColumnType("bit");

                    b.Property<int>("SobaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("RasporedSoba");
                });

            modelBuilder.Entity("eRezervacija.Core.Recenzija", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("GostId")
                        .HasColumnType("int");

                    b.Property<int>("HotelId")
                        .HasColumnType("int");

                    b.Property<string>("Komentar")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Ocjena")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GostId");

                    b.HasIndex("HotelId");

                    b.ToTable("Recenzije");
                });

            modelBuilder.Entity("eRezervacija.Core.Rezervacija", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BrojDjece")
                        .HasColumnType("int");

                    b.Property<int>("BrojGostiju")
                        .HasColumnType("int");

                    b.Property<int>("BrojOdraslih")
                        .HasColumnType("int");

                    b.Property<Guid>("BrojRezervacije")
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("Cijena")
                        .HasColumnType("real");

                    b.Property<DateTime>("DatumCheckIn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DatumCheckOut")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DatumRezervacije")
                        .HasColumnType("datetime2");

                    b.Property<int>("GostId")
                        .HasColumnType("int");

                    b.Property<int?>("NacinPlacanjaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GostId");

                    b.HasIndex("NacinPlacanjaId");

                    b.ToTable("Rezervacije");
                });

            modelBuilder.Entity("eRezervacija.Core.RezervacijaSoba", b =>
                {
                    b.Property<int>("RezervacijaID")
                        .HasColumnType("int");

                    b.Property<int>("SobaID")
                        .HasColumnType("int");

                    b.HasKey("RezervacijaID", "SobaID");

                    b.HasIndex("SobaID");

                    b.ToTable("RezervacijaSobe");
                });

            modelBuilder.Entity("eRezervacija.Core.Slika", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("HotelID")
                        .HasColumnType("int");

                    b.Property<byte[]>("SlikaByteArray")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("SobaID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SobaID");

                    b.ToTable("Slike");
                });

            modelBuilder.Entity("eRezervacija.Core.Soba", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BrojBracnihKreveta")
                        .HasColumnType("int");

                    b.Property<int>("BrojKreveta")
                        .HasColumnType("int");

                    b.Property<int>("BrojKrevetaNaSprat")
                        .HasColumnType("int");

                    b.Property<int>("BrojKrevetaZaJednuOsobu")
                        .HasColumnType("int");

                    b.Property<int>("HotelID")
                        .HasColumnType("int");

                    b.Property<int>("Kapacitet")
                        .HasColumnType("int");

                    b.Property<bool>("MogucnostDodavanjaDjecijegKreveta")
                        .HasColumnType("bit");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SobaDetaljiID")
                        .HasColumnType("int");

                    b.Property<float>("UkupnaCijena")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("HotelID");

                    b.HasIndex("SobaDetaljiID");

                    b.ToTable("Sobe");
                });

            modelBuilder.Entity("eRezervacija.Core.SobaDetalji", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Balkon")
                        .HasColumnType("bit");

                    b.Property<bool>("DodatniJastuci")
                        .HasColumnType("bit");

                    b.Property<bool>("DozvoljenoPusenje")
                        .HasColumnType("bit");

                    b.Property<bool>("Fen")
                        .HasColumnType("bit");

                    b.Property<bool>("Grijanje")
                        .HasColumnType("bit");

                    b.Property<bool>("KafeAparat")
                        .HasColumnType("bit");

                    b.Property<bool>("Klima")
                        .HasColumnType("bit");

                    b.Property<bool>("KucniLjubimci")
                        .HasColumnType("bit");

                    b.Property<bool>("Kuhalo")
                        .HasColumnType("bit");

                    b.Property<bool>("Kuhinja")
                        .HasColumnType("bit");

                    b.Property<bool>("Kupatilo")
                        .HasColumnType("bit");

                    b.Property<bool>("Mikrovalna")
                        .HasColumnType("bit");

                    b.Property<bool>("OcistitiPrijeOdlaska")
                        .HasColumnType("bit");

                    b.Property<bool>("Pegla")
                        .HasColumnType("bit");

                    b.Property<bool>("PrilagodjenoZaDjecu")
                        .HasColumnType("bit");

                    b.Property<bool>("Tv")
                        .HasColumnType("bit");

                    b.Property<bool>("WiFi")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("DetaljiSoba");
                });

            modelBuilder.Entity("eRezervacija.Core.Vlasnik", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BrojBankovnogRacuna")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BrojLicneKarte")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("KorisnikID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KorisnikID");

                    b.ToTable("Vlasnici");
                });

            modelBuilder.Entity("eRezervacija.Core.Admin", b =>
                {
                    b.HasOne("eRezervacija.Core.Korisnik", "korisnik")
                        .WithMany()
                        .HasForeignKey("KorisnikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("korisnik");
                });

            modelBuilder.Entity("eRezervacija.Core.Autentikacija.AutentifikacijaToken", b =>
                {
                    b.HasOne("eRezervacija.Core.Korisnik", "korisnik")
                        .WithMany()
                        .HasForeignKey("KorisnikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("korisnik");
                });

            modelBuilder.Entity("eRezervacija.Core.FAQ", b =>
                {
                    b.HasOne("eRezervacija.Core.Gost", "gost")
                        .WithMany()
                        .HasForeignKey("GostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("gost");
                });

            modelBuilder.Entity("eRezervacija.Core.Gost", b =>
                {
                    b.HasOne("eRezervacija.Core.Korisnik", "korisnik")
                        .WithMany()
                        .HasForeignKey("KorisnikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("eRezervacija.Core.KreditnaKartica", "kartica")
                        .WithMany()
                        .HasForeignKey("KreditnaKarticaID");

                    b.Navigation("kartica");

                    b.Navigation("korisnik");
                });

            modelBuilder.Entity("eRezervacija.Core.Grad", b =>
                {
                    b.HasOne("eRezervacija.Core.Drzava", "drzava")
                        .WithMany()
                        .HasForeignKey("DrzavaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("drzava");
                });

            modelBuilder.Entity("eRezervacija.Core.Hotel", b =>
                {
                    b.HasOne("eRezervacija.Core.Grad", "grad")
                        .WithMany()
                        .HasForeignKey("GradID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("eRezervacija.Core.HotelDetalji", "hoteldetalji")
                        .WithMany()
                        .HasForeignKey("HotelDetaljiID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("eRezervacija.Core.Vlasnik", "vlasnik")
                        .WithMany()
                        .HasForeignKey("VlasnikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("grad");

                    b.Navigation("hoteldetalji");

                    b.Navigation("vlasnik");
                });

            modelBuilder.Entity("eRezervacija.Core.Parking", b =>
                {
                    b.HasOne("eRezervacija.Core.Hotel", "hotel")
                        .WithMany()
                        .HasForeignKey("HotelID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("hotel");
                });

            modelBuilder.Entity("eRezervacija.Core.ParkingMjesto", b =>
                {
                    b.HasOne("eRezervacija.Core.Parking", "parking")
                        .WithMany()
                        .HasForeignKey("ParkingID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("parking");
                });

            modelBuilder.Entity("eRezervacija.Core.PlanOtkazivanja", b =>
                {
                    b.HasOne("eRezervacija.Core.Hotel", "hotel")
                        .WithMany()
                        .HasForeignKey("HotelID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("hotel");
                });

            modelBuilder.Entity("eRezervacija.Core.Recenzija", b =>
                {
                    b.HasOne("eRezervacija.Core.Gost", "gost")
                        .WithMany()
                        .HasForeignKey("GostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("eRezervacija.Core.Hotel", "hotel")
                        .WithMany()
                        .HasForeignKey("HotelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("gost");

                    b.Navigation("hotel");
                });

            modelBuilder.Entity("eRezervacija.Core.Rezervacija", b =>
                {
                    b.HasOne("eRezervacija.Core.Gost", "gost")
                        .WithMany()
                        .HasForeignKey("GostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("eRezervacija.Core.NacinPlacanja", "nacinPlacanja")
                        .WithMany()
                        .HasForeignKey("NacinPlacanjaId");

                    b.Navigation("gost");

                    b.Navigation("nacinPlacanja");
                });

            modelBuilder.Entity("eRezervacija.Core.RezervacijaSoba", b =>
                {
                    b.HasOne("eRezervacija.Core.Rezervacija", "rezervacija")
                        .WithMany()
                        .HasForeignKey("RezervacijaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("eRezervacija.Core.Soba", "soba")
                        .WithMany()
                        .HasForeignKey("SobaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("rezervacija");

                    b.Navigation("soba");
                });

            modelBuilder.Entity("eRezervacija.Core.Slika", b =>
                {
                    b.HasOne("eRezervacija.Core.Soba", "soba")
                        .WithMany()
                        .HasForeignKey("SobaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("soba");
                });

            modelBuilder.Entity("eRezervacija.Core.Soba", b =>
                {
                    b.HasOne("eRezervacija.Core.Hotel", "hotel")
                        .WithMany()
                        .HasForeignKey("HotelID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("eRezervacija.Core.SobaDetalji", "sobaDetalji")
                        .WithMany()
                        .HasForeignKey("SobaDetaljiID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("hotel");

                    b.Navigation("sobaDetalji");
                });

            modelBuilder.Entity("eRezervacija.Core.Vlasnik", b =>
                {
                    b.HasOne("eRezervacija.Core.Korisnik", "korisnik")
                        .WithMany()
                        .HasForeignKey("KorisnikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("korisnik");
                });
#pragma warning restore 612, 618
        }
    }
}
