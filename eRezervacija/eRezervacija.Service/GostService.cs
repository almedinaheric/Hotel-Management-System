﻿using eRezervacija.Core;
using eRezervacija.Repository;
using eRezervacija.Repository.Repositories;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace eRezervacija.Service
{
	public interface IGostService
	{
		void Add(Gost obj);
		IEnumerable<Gost> GetAll();
		Gost GetByKorisnikID(int id);
		void Update (Gost obj);
	}
	public class GostService : IGostService
	{
		//IRepository<Gost> gostRepository;
		IGostRepository gostRepository;
		public GostService(IGostRepository gostRepository)
		{
			this.gostRepository = gostRepository;
		}
		public void Add(Gost obj)
		{
			gostRepository.Add(obj);
		}

		public IEnumerable<Gost> GetAll()
		{
			return gostRepository.GetAll();
		}

		public Gost GetByKorisnikID(int id)
		{
			return gostRepository.GetById(id);
		}

        public void Update(Gost obj)
        {
			gostRepository.Update(obj);
        }
    }
}
