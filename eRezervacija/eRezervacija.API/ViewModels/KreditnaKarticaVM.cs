using System.ComponentModel.DataAnnotations;

namespace eRezervacija.API.ViewModels
{
    public class KreditnaKarticaVM
    {
        public string BrojKartice { get; set; }
        public string CVV { get; set; }
        public string DatumIsteka { get; set; }
    }
}
