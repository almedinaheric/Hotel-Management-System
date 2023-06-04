using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Core
{
	public class Transakcija
	{
		[Key]
		public int Id { get; set; }
		public int RezervacijaId { get; set; }
		public int HotelId { get; set; }
		public string BrojRacuna { get; set; }
		public int? KreditnaKarticaId { get; set; }
		public DateTime DatumUplate { get; set; }
		public float Cijena { get; set; }
		public bool Gotovina => KreditnaKarticaId == null;
	}
}
