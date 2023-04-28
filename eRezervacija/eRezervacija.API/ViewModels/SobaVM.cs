using System;
using eRezervacija.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace eRezervacija.API.ViewModels
{
	public class SobaVM
	{
        public string Naziv { get; set; }
        public string Opis { get; set; }
        public int HotelID { get; set; }
        public int SobaDetaljiID { get; set; }
        public int Kapacitet { get; set; }
        public int BrojKreveta { get; set; }
        public int BrojKrevetaZaJednuOsobu { get; set; }
        public int BrojKrevetaNaSprat { get; set; }
        public int BrojBracnihKreveta { get; set; }
        public bool MogucnostDodavanjaDjecijegKreveta { get; set; }
        public float UkupnaCijena { get; set; }
    }
}

