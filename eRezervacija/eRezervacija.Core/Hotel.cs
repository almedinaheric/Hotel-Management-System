﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace eRezervacija.Core
{
	public class Hotel
	{
		[Key]
		public int Id { get; set; }
		public string Naziv { get; set; }
		public string Opis { get; set; }
		public string Adresa { get; set; }
		[ForeignKey("VlasnikID")]
		public Vlasnik vlasnik { get; set; }
		public int VlasnikID { get; set; }
		[ForeignKey("HotelDetaljiID")]
		public HotelDetalji hoteldetalji { get; set; }
		public int HotelDetaljiID{ get; set; }
		public string EmailHotela { get; set; }
		public string BrojTelefona { get; set; }
        public byte[]? slika { get; set; }
        [ForeignKey("GradID")]
		public Grad grad { get; set; }
		public int GradID { get; set; }
		public int UkupanBrojSoba { get; set; }
		public int BrojJednokrevetnihSoba { get; set; }
		public int BrojDvokrevetnihSoba { get; set; }
		public int BrojTrokrevetnihSoba { get; set; }
		public int BrojSpratova { get; set; }
		public string VrijemeCheckIna { get; set; }
		public string VrijemeCheckOuta{ get; set; }
		public bool Unlisted { get; set; }
		public int BrojZvjezdica { get; set; }
        public float UdaljenostOdCentraGrada { get; set; }
        public float ProsjecnaOcjena { get; set; }
    }
}
