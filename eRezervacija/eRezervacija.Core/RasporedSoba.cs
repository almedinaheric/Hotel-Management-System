using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Core
{
	public class RasporedSoba
	{
		[Key]
        public int Id { get; set; }
		public int SobaId { get; set; }
		public DateTime Datum { get; set; }
		public bool Rezervisana { get; set; }
    }
}
