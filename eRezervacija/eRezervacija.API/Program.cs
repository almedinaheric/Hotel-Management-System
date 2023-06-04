using eRezervacija.Core;
using eRezervacija.Repository;
using eRezervacija.Repository.Repositories;
using eRezervacija.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var config = new ConfigurationBuilder()
	.AddJsonFile("appsettings.json", false)
	.Build();

builder.Services.AddDbContext<eRezervacijaDbContext>(options =>
	options.UseSqlServer(config.GetConnectionString("eRezervacijaDB")));
//Ovdje se konfigurisu veze interfacea sa njihovim klasama, sto se tice servisa
//te znaci kad se zahtijeva tip IStudentService da se instancira StudentService, npr
//builder.Services.AddTransient<IStudentService, StudentService>(); 
builder.Services.AddScoped<IKorisnikService, KorisnikService>();
builder.Services.AddScoped<IGostService, GostService>();
builder.Services.AddScoped<IGostRepository, GostRepository>(); //custom repository
builder.Services.AddScoped<ISobaRepository, SobaRepository>(); //custom repository
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IAuthTokenService, AuthTokenService>();
builder.Services.AddScoped<IVlasnikService, VlasnikService>();
builder.Services.AddScoped<IGradService, GradService>();
builder.Services.AddScoped<IDrzavaService, DrzavaService>();
builder.Services.AddScoped<IHotelService, HotelService>();
builder.Services.AddScoped<IHotelRepository, HotelRepository>(); //custom repository
builder.Services.AddScoped<IHotelDetaljiService, HotelDetaljiService>();
builder.Services.AddScoped<IKarticaService, KarticaService>();
builder.Services.AddScoped<IRecenzijaService, RecenzijaService>();
builder.Services.AddScoped<IRecenzijaRepository, RecenzijaRepository>(); //custom repository 
builder.Services.AddScoped<IRezervacijaService, RezervacijaService>();
builder.Services.AddScoped<IRezervacijaSobaService, RezervacijaSobaService>();
builder.Services.AddScoped<IRezervacija_SobaRepository, Rezervacija_SobaRepository>(); //custom repository
builder.Services.AddScoped<ISobaService,SobaService>();
builder.Services.AddScoped<ISobaDetaljiService, SobaDetaljiService>();
builder.Services.AddScoped<ISlikaService, SlikaService>();
builder.Services.AddScoped<IFAQService,FAQService>();
builder.Services.AddScoped<IRasporedSobaService,RasporedSobaService>();
builder.Services.AddScoped<IHotelPitanjaService, HotelPitanjaService>();
builder.Services.AddScoped<ITransakcijaService, TransakcijaService>();
builder.Services.AddScoped<ITokenRepository, TokenRepository>(); //custom repository
builder.Services.AddScoped<INacinPlacanjaService, NacinPlacanjaService>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}
app.UseCors(
	options => options
		.SetIsOriginAllowed(x => _ = true)
		.AllowAnyMethod()
		.AllowAnyHeader()
		.AllowCredentials()
); //This needs to set everything allowed

app.UseAuthorization();

app.MapControllers();

app.Run();