using System;

namespace eRezervacija.API.Helpers
{
	public class Password
	{
        public static string GenerateRandomPassword()
        {
            int passwordLength = 12; // adjust the password length as needed
            string allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=[{]};:<>|./?";
            char[] chars = new char[passwordLength];
            Random rand = new Random();

            for (int i = 0; i < passwordLength; i++)
            {
                chars[i] = allowedChars[rand.Next(0, allowedChars.Length)];
            }

            string password = new string(chars);

            return password;
        }
    }
}

