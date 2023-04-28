using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Core
{
	public class FAQ
	{
		[Key]
		public int Id { get; set; }

		[ForeignKey("GostId")]
		public Gost gost { get; set; }
		public int GostId { get;set; }
		
		public string TekstPitanja { get; set; }
		public string? OdgovorPitanja { get; set; }
		public DateTime? DatumOdgovoreno { get; set; }
		public bool Odgovoreno { get; set; }
	}
}
