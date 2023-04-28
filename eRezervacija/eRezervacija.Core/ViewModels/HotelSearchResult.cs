using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Core.ViewModels
{
	public class HotelSearchResult
	{
		public int Id { get; set; }
		public string Naziv { get; set; }
		public string Opis { get; set; }
		public byte[]? Slika { get; set; }
		public int BrojZvjezdica { get; set; }
		public float UdaljenostOdCentraGrada { get; set; }
		public float Cijena { get; set; }
        public float ProsjecnaOcjena { get; set; }

        //public int UkupanBrojSoba { get; set; }
        //public int BrojJednokrevetnihSoba { get; set; }
        //public int BrojDvokrevetnihSoba { get; set; }
        //public int BrojTrokrevetnihSoba { get; set; }
    }
}
