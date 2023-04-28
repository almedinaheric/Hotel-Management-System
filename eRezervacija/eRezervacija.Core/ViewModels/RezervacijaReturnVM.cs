using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Core.ViewModels
{
	public class RezervacijaReturnVM
	{
		public string NazivHotela { get; set; }
		public string[] Sobe { get; set; }
		public string DatumRezervacije { get; set; }
		public string DatumCheckIn { get; set; }
		public string DatumCheckOut { get; set; }
		public int BrojGostiju{ get; set; }
		public int BrojDjece { get; set; }
		public float Cijena { get; set; }
	}
}
