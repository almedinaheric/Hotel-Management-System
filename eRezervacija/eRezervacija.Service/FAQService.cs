using eRezervacija.Core;
using eRezervacija.Core.ViewModels;
using eRezervacija.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Service
{
	public interface IFAQService
	{
		FAQ Add(FAQAddVM pitanje);
		void Update(FAQ pitanje);
		void Delete(int id);
		FAQ Find(int id);
		List<FAQ> GetByGostId(int gostId);
		List<FAQ> GetNeodgovorenaPitanja();

	}
	public class FAQService : IFAQService
	{
		IRepository<FAQ> FAQRepository;
		public FAQService(IRepository<FAQ> faqRepository)
		{
			FAQRepository = faqRepository;
		}

		public FAQ Add(FAQAddVM pitanje)
		{
			var newPitanje = new FAQ()
			{
				GostId = pitanje.GostID,
				TekstPitanja = pitanje.TekstPitanja,
				Odgovoreno = false
			};
			FAQRepository.Add(newPitanje);
			return newPitanje;
		}

		public void Delete(int id)
		{
			var pitanje = FAQRepository.Find(id);
			FAQRepository.Remove(pitanje);
		}

		public FAQ Find(int id)
		{
			return FAQRepository.Find(id);
		}

		public List<FAQ> GetByGostId(int gostId)
		{
			return FAQRepository.GetAll().Where(faq => faq.GostId == gostId).ToList();
		}

		public List<FAQ> GetNeodgovorenaPitanja()
		{
			return FAQRepository.GetAll().Where(faq => faq.Odgovoreno == false).ToList();
		}

		public void Update(FAQ pitanje)
		{
			FAQRepository.Update(pitanje);
		}
	}
}
