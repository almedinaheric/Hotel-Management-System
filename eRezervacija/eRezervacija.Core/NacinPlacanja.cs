using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Core
{
	public class NacinPlacanja
	{
		[Key]
		public int Id { get; set; }
		public string Opis { get; set; }
	}
}
