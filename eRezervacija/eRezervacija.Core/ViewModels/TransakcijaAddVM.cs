using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Core.ViewModels
{
	public class TransakcijaAddVM
	{
		public int RezervacijaId { get; set; }
		public int HotelId { get; set; }
		public string BrojRacuna { get; set; }
		public int? KreditnaKarticaId { get; set; }
		public float Cijena { get; set; }
	}
}
