using Azure.Core;
using eRezervacija.Core;
using eRezervacija.Core.ViewModels;
using eRezervacija.Repository;
using eRezervacija.Repository.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;

namespace eRezervacija.Service
{
	public interface IHotelService
	{
		void Add(Hotel obj);
		void Update(Hotel obj);
		void Remove(Hotel obj);
		IEnumerable<Hotel> GetAll();
		Hotel GetByHotelID(int id);
		IEnumerable<Hotel> GetByVlasnikId(int id);
		IQueryable<HotelSearchResult> Search(string grad, DateTime datumCheckIn, DateTime datumCheckOut, int brojGostiju, int brojSoba, int pageNumber = 1, int pageSize = 5, int[]? zvjezdice =null, int[]? udaljenost=null, int[]? ocjena=null);
		void RemoveByHotelId(int id);
		List<Hotel> GetUnlistedHotels();
		Hotel ListHotel(int id);
	}

	public class HotelService : IHotelService
	{
		IHotelRepository hotelRepository;

		public HotelService(IHotelRepository hotelRepository)
		{
			this.hotelRepository = hotelRepository;
		}

		public void Add(Hotel obj)
		{
			hotelRepository.Add(obj);
		}

		//vraca sve verifikovane hotele -- trenutno ne postoji getall za SVE hotele koje imamo
		public IEnumerable<Hotel> GetAll()
		{
			return hotelRepository.GetAll().Where(h => h.Unlisted == false).ToList();
		}

		public Hotel GetByHotelID(int id)
		{
			return hotelRepository.GetAll().Where(x => x.Id == id).FirstOrDefault();
		}

		public IQueryable<HotelSearchResult> Search(string grad, DateTime datumCheckIn, DateTime datumCheckOut, int brojGostiju, int brojSoba,
			int pageNumber = 1, int pageSize = 5, [FromQuery] int[] zvjezdice = null, [FromQuery] int[] udaljenost = null, [FromQuery] int[] ocjena = null)
		{
			// get svih podataka
			var data = hotelRepository.GetForSearch();
			
			// filter po gradu
			data = data.Where(h => h.grad.Name.Contains(grad));

            //filter po broju zvjezdica
            if (zvjezdice != null && zvjezdice.Length > 0)
            {
                data = data.Where(h => zvjezdice.Contains(h.BrojZvjezdica));
            }
			
            //filter po udaljenosti od centra grada
			if(udaljenost!=null && udaljenost.Length > 0)
			{
				foreach(var u in udaljenost)
				{
                    data = data.Where(x => x.UdaljenostOdCentraGrada <= u);
				}
            }
			
            //filter po prosjecnoj ocjeni
			if(ocjena!=null && ocjena.Length > 0)
			{
				foreach(var o in ocjena)
				{
					data = data.Where(x => x.ProsjecnaOcjena >= o);
				}
			}

            // konverzija u return value i vracanje rezultata kontroleru
            var returnList = new List<HotelSearchResult>();
			foreach (var item in data)
			{
				var newItem = new HotelSearchResult()
				{
					Id=item.Id,
					Naziv=item.Naziv,
					Opis=item.Opis,
					Slika=item.slika,
					BrojZvjezdica=item.BrojZvjezdica,
					UdaljenostOdCentraGrada=item.UdaljenostOdCentraGrada,
					ProsjecnaOcjena=item.ProsjecnaOcjena,
					// booking odmah racuna nisam siguran kako da te kalkulacije odmah uradimo
					Cijena=0,
				};
				returnList.Add(newItem);
			}
			return returnList.AsQueryable();
		}


		public IEnumerable<Hotel> GetByVlasnikId(int vlasnikId)
		{
			return hotelRepository.GetAll().Where(x => x.VlasnikID == vlasnikId);
		}

		public List<Hotel> GetUnlistedHotels()
		{
			return hotelRepository.GetAll().Where(h => h.Unlisted == true).ToList();
		}

		public Hotel ListHotel(int id)
		{
			var temp = hotelRepository.Find(id);
			temp.Unlisted = false;
			hotelRepository.Update(temp);
			return temp;
		}

		public void Remove(Hotel obj)
		{
			hotelRepository.Remove(obj);
		}

		public void Update(Hotel obj)
		{
			hotelRepository.Update(obj);
		}

        public void RemoveByHotelId(int id)
        {
			hotelRepository.RemoveById(id);
        }
    }
}

