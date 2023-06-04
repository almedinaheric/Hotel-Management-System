namespace eRezervacija.API.ViewModels
{
    public class RezervacijaAddVM
    {
        public int GostId { get; set; }
        //public DateTime DatumRezervacije { get; set; }
        public DateTime DatumCheckIn { get; set; }
        public DateTime DatumCheckOut { get; set; }
        public int BrojGostiju { get; set; }
        public int BrojOdraslih { get; set; }
        public int BrojDjece { get; set; }
        public int NacinPlacanjaId { get; set; }
        public float Cijena { get; set; }
		public List<KombinacijaSoba> kombinacije { get; set; }
	}
}
