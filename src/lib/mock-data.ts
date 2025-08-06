import type { Student, Visit, Medication, Screening } from './types';

export const students: Student[] = [
  {
    "id": 1,
    "name": "ABIDZAR RIZKY RAMADHAN",
    "class": "7A",
    "absenceNumber": 1,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 2,
    "name": "ADAM FURYANIAWAN PUTRA",
    "class": "7A",
    "absenceNumber": 2,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 3,
    "name": "AGUNG WIBOWO",
    "class": "7A",
    "absenceNumber": 3,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 4,
    "name": "AHMAD EDI SAPUTRA",
    "class": "7A",
    "absenceNumber": 4,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 5,
    "name": "AHMAD LIMAS SEPTIAN",
    "class": "7A",
    "absenceNumber": 5,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 6,
    "name": "AKHMAD RIKI",
    "class": "7A",
    "absenceNumber": 6,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 7,
    "name": "AL BANIE HASYIM WANGITAMA",
    "class": "7A",
    "absenceNumber": 7,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 8,
    "name": "ANDINI REKA MASHOR",
    "class": "7A",
    "absenceNumber": 8,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 9,
    "name": "ANGEL TALITHA PUTRI",
    "class": "7A",
    "absenceNumber": 9,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 10,
    "name": "BAGUS",
    "class": "7A",
    "absenceNumber": 10,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 11,
    "name": "CHARLY YUDISTA",
    "class": "7A",
    "absenceNumber": 11,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 12,
    "name": "DANU WIJAYA",
    "class": "7A",
    "absenceNumber": 12,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 13,
    "name": "DESTRINA SAHILA HISAM",
    "class": "7A",
    "absenceNumber": 13,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 14,
    "name": "DWI AYU APRILIA",
    "class": "7A",
    "absenceNumber": 14,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 15,
    "name": "ICA DUWI AYU LESTARI",
    "class": "7A",
    "absenceNumber": 15,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 16,
    "name": "JASMINE SYAFA NURCHOLISYA",
    "class": "7A",
    "absenceNumber": 16,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 17,
    "name": "JESSICA ARFALIYAN",
    "class": "7A",
    "absenceNumber": 17,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 18,
    "name": "M. AFDLOLUL UMAM",
    "class": "7A",
    "absenceNumber": 18,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 19,
    "name": "MEGA UTAMI",
    "class": "7A",
    "absenceNumber": 19,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 20,
    "name": "MOH ARKAN GANENDRA",
    "class": "7A",
    "absenceNumber": 20,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 21,
    "name": "MOHAMAD RONI",
    "class": "7A",
    "absenceNumber": 21,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 22,
    "name": "MOHAMMAD SEMI SAPUTRA",
    "class": "7A",
    "absenceNumber": 22,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 23,
    "name": "MUHAMMAD RAFA JANUARTA",
    "class": "7A",
    "absenceNumber": 23,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 24,
    "name": "MUHAMMAD SUSANTO",
    "class": "7A",
    "absenceNumber": 24,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 25,
    "name": "NAJWA LUTVI RAHMADANI",
    "class": "7A",
    "absenceNumber": 25,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 26,
    "name": "OKTA VIONA PUTRI",
    "class": "7A",
    "absenceNumber": 26,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 27,
    "name": "REGA SETYA WALUYA",
    "class": "7A",
    "absenceNumber": 27,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 28,
    "name": "REGINA DWI KIRANI",
    "class": "7A",
    "absenceNumber": 28,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 29,
    "name": "RIZKI GILANG PRADANA",
    "class": "7A",
    "absenceNumber": 29,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 30,
    "name": "SAYYID MUHAMMAD HUSEIN",
    "class": "7A",
    "absenceNumber": 30,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 31,
    "name": "SITI SYAFA KAISA AQILA",
    "class": "7A",
    "absenceNumber": 31,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 32,
    "name": "SULASTRI",
    "class": "7A",
    "absenceNumber": 32,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 33,
    "name": "TADKIROTUR ROHMAH",
    "class": "7A",
    "absenceNumber": 33,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 34,
    "name": "AFIQA DWI CAHYANI",
    "class": "7B",
    "absenceNumber": 1,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 35,
    "name": "ALDI CAHYA SAPUTRA",
    "class": "7B",
    "absenceNumber": 2,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 36,
    "name": "ALVINO JOLVI SAPUTRA",
    "class": "7B",
    "absenceNumber": 3,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 37,
    "name": "ANINDA FARA OKTAVIANA YUDANTO",
    "class": "7B",
    "absenceNumber": 4,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 38,
    "name": "ANISA AISYATUN NABILA",
    "class": "7B",
    "absenceNumber": 5,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 39,
    "name": "ANUGRAH DIKKY SAPUTRA",
    "class": "7B",
    "absenceNumber": 6,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 40,
    "name": "AUREL ADELIO KURNIAWAN",
    "class": "7B",
    "absenceNumber": 7,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 41,
    "name": "AZRIL PUTRA JOSI PRATAMA",
    "class": "7B",
    "absenceNumber": 8,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 42,
    "name": "CHANTIKA PUTRI AGATHA",
    "class": "7B",
    "absenceNumber": 9,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 43,
    "name": "CIKA OKTAVIA PUTRI NAISYA",
    "class": "7B",
    "absenceNumber": 10,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 44,
    "name": "DENTHA RAFISQY ALGHIFARIE",
    "class": "7B",
    "absenceNumber": 11,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 45,
    "name": "DHANIEL PRATAMA",
    "class": "7B",
    "absenceNumber": 12,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 46,
    "name": "DINDA LATIFA PUTRI",
    "class": "7B",
    "absenceNumber": 13,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 47,
    "name": "EGA PRATAMA",
    "class": "7B",
    "absenceNumber": 14,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 48,
    "name": "FEBBY SALVA QUROTU'AIN",
    "class": "7B",
    "absenceNumber": 15,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 49,
    "name": "FERI TRIYONO",
    "class": "7B",
    "absenceNumber": 16,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 50,
    "name": "HABIBI NUR MAULANA",
    "class": "7B",
    "absenceNumber": 17,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 51,
    "name": "LUKMAN NUR HAKIM",
    "class": "7B",
    "absenceNumber": 18,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 52,
    "name": "MOHAMMAD ALFIANSYAH",
    "class": "7B",
    "absenceNumber": 19,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 53,
    "name": "MOHAMMAD FARHAN ISLAMI DINO",
    "class": "7B",
    "absenceNumber": 20,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 54,
    "name": "MOHAMMAD JAINURI HAIRULLOH",
    "class": "7B",
    "absenceNumber": 21,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 55,
    "name": "MOHAMMAD YANI",
    "class": "7B",
    "absenceNumber": 22,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 56,
    "name": "MUHAMMAD ISMUL AZHAM",
    "class": "7B",
    "absenceNumber": 23,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 57,
    "name": "MUHAMMAD RANGGA SAPUTRA",
    "class": "7B",
    "absenceNumber": 24,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 58,
    "name": "NADATUSSITA PUTRI MAULIDA",
    "class": "7B",
    "absenceNumber": 25,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 59,
    "name": "NAFIDATUS SUBIKHA",
    "class": "7B",
    "absenceNumber": 26,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 60,
    "name": "NANDA SAPUTRA",
    "class": "7B",
    "absenceNumber": 27,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 61,
    "name": "NOVIETA PUTRI MUSTIKA",
    "class": "7B",
    "absenceNumber": 28,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 62,
    "name": "NOVIVAL DWIJAYANTI",
    "class": "7B",
    "absenceNumber": 29,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 63,
    "name": "PINKKY FINEZA PUSPA",
    "class": "7B",
    "absenceNumber": 30,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 64,
    "name": "RISMA DWI RAHAYU",
    "class": "7B",
    "absenceNumber": 31,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 65,
    "name": "SALSABILA AULIA RAHMI",
    "class": "7B",
    "absenceNumber": 32,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 66,
    "name": "ZEZE ESTIMATE ADYA QOSIM",
    "class": "7B",
    "absenceNumber": 33,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 67,
    "name": "ABDUL RO'UF",
    "class": "7C",
    "absenceNumber": 1,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 68,
    "name": "ADIT SETIAWAN",
    "class": "7C",
    "absenceNumber": 2,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 69,
    "name": "AGUS DWI CAHYONO",
    "class": "7C",
    "absenceNumber": 3,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 70,
    "name": "AHMAD RAFAEL",
    "class": "7C",
    "absenceNumber": 4,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 71,
    "name": "AINUL KHOIRUL ANAM",
    "class": "7C",
    "absenceNumber": 5,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 72,
    "name": "AMORA OKTA VIOLA",
    "class": "7C",
    "absenceNumber": 6,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 73,
    "name": "ANANDA GLADISTY FEROLITA",
    "class": "7C",
    "absenceNumber": 7,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 74,
    "name": "APRILIYA NURUL HIDAYANTI",
    "class": "7C",
    "absenceNumber": 8,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 75,
    "name": "AZKANIA PUTRI PRAWIRA NEGARA",
    "class": "7C",
    "absenceNumber": 9,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 76,
    "name": "DAVIAN EKA PUTRA",
    "class": "7C",
    "absenceNumber": 10,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 77,
    "name": "DINI KAFANILLAH",
    "class": "7C",
    "absenceNumber": 11,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 78,
    "name": "EKA TALITA SAFITRI",
    "class": "7C",
    "absenceNumber": 12,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 79,
    "name": "HORIDATUL HALIMAH",
    "class": "7C",
    "absenceNumber": 13,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 80,
    "name": "IRVAN MAULANA",
    "class": "7C",
    "absenceNumber": 14,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 81,
    "name": "JIHAN AULIA RAMADHANI",
    "class": "7C",
    "absenceNumber": 15,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 82,
    "name": "KHAYIRA ZAHRA NAILA",
    "class": "7C",
    "absenceNumber": 16,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 83,
    "name": "LAYLIYATUZZAKIYAH",
    "class": "7C",
    "absenceNumber": 17,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 84,
    "name": "MILATUL MUSTAKIMAH",
    "class": "7C",
    "absenceNumber": 18,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 85,
    "name": "MOH. ALIFIANU ZAHRONI",
    "class": "7C",
    "absenceNumber": 19,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 86,
    "name": "MOH. DAFA NAUFAL FIRDAUS",
    "class": "7C",
    "absenceNumber": 20,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 87,
    "name": "MOHAMAD HAYKAL MICHO PRANATA",
    "class": "7C",
    "absenceNumber": 21,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 88,
    "name": "MUHAMAD AKBAR",
    "class": "7C",
    "absenceNumber": 22,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 89,
    "name": "MUHAMMAD ARYA DWI HARTAWAN",
    "class": "7C",
    "absenceNumber": 23,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 90,
    "name": "MUHAMMAD FARDHAN PUTRA",
    "class": "7C",
    "absenceNumber": 24,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 91,
    "name": "NINDY ALINKA RAHAYU",
    "class": "7C",
    "absenceNumber": 25,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 92,
    "name": "ROBBI MAULANA",
    "class": "7C",
    "absenceNumber": 26,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 93,
    "name": "ROBET",
    "class": "7C",
    "absenceNumber": 27,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 94,
    "name": "SYAFIRA QURROTA AINI",
    "class": "7C",
    "absenceNumber": 28,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 95,
    "name": "SYAHRUL HIDAYATUL AKMAL",
    "class": "7C",
    "absenceNumber": 29,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 96,
    "name": "ZAHRA JULIA RAMADANI",
    "class": "7C",
    "absenceNumber": 30,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 97,
    "name": "ZENITA AULIA DEWI",
    "class": "7C",
    "absenceNumber": 31,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 98,
    "name": "ZIVANNI AULIA FAYZZA",
    "class": "7C",
    "absenceNumber": 32,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 99,
    "name": "AHMAD RIZKY FEBRIAN",
    "class": "7D",
    "absenceNumber": 1,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 100,
    "name": "ALDI RAMADANI",
    "class": "7D",
    "absenceNumber": 2,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 101,
    "name": "ALFI MAGHFIROH",
    "class": "7D",
    "absenceNumber": 3,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 102,
    "name": "AQILA YASMIN",
    "class": "7D",
    "absenceNumber": 4,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 103,
    "name": "ATMAJA RAIHAN",
    "class": "7D",
    "absenceNumber": 5,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 104,
    "name": "AYU NINGSIH",
    "class": "7D",
    "absenceNumber": 6,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 105,
    "name": "BILQIS FARIHA NABILA",
    "class": "7D",
    "absenceNumber": 7,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 106,
    "name": "CINCIN GERHANA ENJELIA",
    "class": "7D",
    "absenceNumber": 8,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 107,
    "name": "DAYANA FARISTA DWI PRATAMA",
    "class": "7D",
    "absenceNumber": 9,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 108,
    "name": "DITA MAHARANI",
    "class": "7D",
    "absenceNumber": 10,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 109,
    "name": "ERGYANO NANDA ANDIAN",
    "class": "7D",
    "absenceNumber": 11,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 110,
    "name": "GLADIS TIRTA ARUM",
    "class": "7D",
    "absenceNumber": 12,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 111,
    "name": "IKLIMAH",
    "class": "7D",
    "absenceNumber": 13,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 112,
    "name": "JESIKA MAULIDIYAH",
    "class": "7D",
    "absenceNumber": 14,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 113,
    "name": "JUNITA VEMMY ANZAHIRA",
    "class": "7D",
    "absenceNumber": 15,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 114,
    "name": "KENZIE GHAISAN",
    "class": "7D",
    "absenceNumber": 16,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 115,
    "name": "M. ALBI AR-ROYAN",
    "class": "7D",
    "absenceNumber": 17,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 116,
    "name": "MIRABELLE VITA KURNIAWAN",
    "class": "7D",
    "absenceNumber": 18,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 117,
    "name": "MOCH. ERVITO PARAMADITIA",
    "class": "7D",
    "absenceNumber": 19,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 118,
    "name": "MUHAMMAD ALI SAPAAT",
    "class": "7D",
    "absenceNumber": 20,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 119,
    "name": "MUHAMMAD RIFKI ROMADHON",
    "class": "7D",
    "absenceNumber": 21,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 120,
    "name": "NEYSTA KURNIAWAN",
    "class": "7D",
    "absenceNumber": 22,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 121,
    "name": "PENTI OKTAPIANI",
    "class": "7D",
    "absenceNumber": 23,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 122,
    "name": "PUTRI WULANDARI",
    "class": "7D",
    "absenceNumber": 24,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 123,
    "name": "QUANESYA HAZWA OKTA PRIYADI",
    "class": "7D",
    "absenceNumber": 25,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 124,
    "name": "REZA RIZKI MAULANA",
    "class": "7D",
    "absenceNumber": 26,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 125,
    "name": "RIFQI AJI PRATAMA",
    "class": "7D",
    "absenceNumber": 27,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 126,
    "name": "RIZQY ADITTIYA",
    "class": "7D",
    "absenceNumber": 28,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 127,
    "name": "ROHMAN AFANDI",
    "class": "7D",
    "absenceNumber": 29,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 128,
    "name": "SEPTIYANA FITRIYANI",
    "class": "7D",
    "absenceNumber": 30,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 129,
    "name": "SYIVIANA OCAINI PUTRI OLYVIA",
    "class": "7D",
    "absenceNumber": 31,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 130,
    "name": "WAHYU MEI ADI PUTRA",
    "class": "7D",
    "absenceNumber": 32,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 131,
    "name": "ABDUL MUBAROK",
    "class": "7E",
    "absenceNumber": 1,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 132,
    "name": "ACHMAD NABIL FADILLA",
    "class": "7E",
    "absenceNumber": 2,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 133,
    "name": "ADISTYA MELINDA PUTRI",
    "class": "7E",
    "absenceNumber": 3,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 134,
    "name": "ADITIYA RAMADANI",
    "class": "7E",
    "absenceNumber": 4,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 135,
    "name": "AHMAD HAIKAL",
    "class": "7E",
    "absenceNumber": 5,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 136,
    "name": "AHMAD RIFKI FIRMANSYAH",
    "class": "7E",
    "absenceNumber": 6,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 137,
    "name": "ALICIA KALANY",
    "class": "7E",
    "absenceNumber": 7,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 138,
    "name": "ALMALIA ALFIATUS AZAHRA",
    "class": "7E",
    "absenceNumber": 8,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 139,
    "name": "ALVIN ZIDNA FAQIH",
    "class": "7E",
    "absenceNumber": 9,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 140,
    "name": "AURA ZAHROTUS SYIFA",
    "class": "7E",
    "absenceNumber": 10,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 141,
    "name": "BUNGA BERLIAN ANASTASYA",
    "class": "7E",
    "absenceNumber": 11,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 142,
    "name": "CITRA AMANDA PUTRI",
    "class": "7E",
    "absenceNumber": 12,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 143,
    "name": "FILA ANINDITA",
    "class": "7E",
    "absenceNumber": 13,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 144,
    "name": "IBNU AHMAD",
    "class": "7E",
    "absenceNumber": 14,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 145,
    "name": "IMEL PUTRI CAHYANI",
    "class": "7E",
    "absenceNumber": 15,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 146,
    "name": "JIVAN FERDIANSYAH",
    "class": "7E",
    "absenceNumber": 16,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 147,
    "name": "KEYSA AULIA",
    "class": "7E",
    "absenceNumber": 17,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 148,
    "name": "KRISDIYAWAN",
    "class": "7E",
    "absenceNumber": 18,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 149,
    "name": "M. DANIEL APRIANSYAH",
    "class": "7E",
    "absenceNumber": 19,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 150,
    "name": "MOCH. FERDYANSYA",
    "class": "7E",
    "absenceNumber": 20,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 151,
    "name": "MOHAMMAD TA'IM",
    "class": "7E",
    "absenceNumber": 21,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 152,
    "name": "MUHAMMAD RIZKI EKA SAPUTRA",
    "class": "7E",
    "absenceNumber": 22,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 153,
    "name": "NAIRA ZAHWA AULIA",
    "class": "7E",
    "absenceNumber": 23,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 154,
    "name": "PUTRA",
    "class": "7E",
    "absenceNumber": 24,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 155,
    "name": "RIKKA ALIYA DHIYA",
    "class": "7E",
    "absenceNumber": 25,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 156,
    "name": "SAYU ANDINI",
    "class": "7E",
    "absenceNumber": 26,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 157,
    "name": "SLAMET RAFFI ACHMAD",
    "class": "7E",
    "absenceNumber": 27,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 158,
    "name": "YASMIN FAKHIRA ISMI JUBAIDA",
    "class": "7E",
    "absenceNumber": 28,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 159,
    "name": "YASMIN NOVITA SARI",
    "class": "7E",
    "absenceNumber": 29,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 160,
    "name": "YUSUF MAHARDIKA",
    "class": "7E",
    "absenceNumber": 30,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 161,
    "name": "ZAHWA BINTANG TRYSTAN",
    "class": "7E",
    "absenceNumber": 31,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 162,
    "name": "ZIDNA ILMA ELHANISA",
    "class": "7E",
    "absenceNumber": 32,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 163,
    "name": "AHMAD GHANI ROLI PRATAMA",
    "class": "7F",
    "absenceNumber": 1,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 164,
    "name": "AHMAD RAIS DZAKI SOFWAN ALI KHAN",
    "class": "7F",
    "absenceNumber": 2,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 165,
    "name": "ALDIS SRIWANGI",
    "class": "7F",
    "absenceNumber": 3,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 166,
    "name": "ALISA RAHMADANI",
    "class": "7F",
    "absenceNumber": 4,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 167,
    "name": "BELICIA CHIKA SALSABILA",
    "class": "7F",
    "absenceNumber": 5,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 168,
    "name": "CAHYA GITA RAMADHAN",
    "class": "7F",
    "absenceNumber": 6,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 169,
    "name": "DANANG ENGGAR PRASETYO",
    "class": "7F",
    "absenceNumber": 7,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 170,
    "name": "DIKO DESTA SAPUTRA",
    "class": "7F",
    "absenceNumber": 8,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 171,
    "name": "DWI IMANIATI OKTAVIA",
    "class": "7F",
    "absenceNumber": 9,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 172,
    "name": "GUSTA RAMADANI",
    "class": "7F",
    "absenceNumber": 10,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 173,
    "name": "HAFIZHAH GUSTIN DYANIS",
    "class": "7F",
    "absenceNumber": 11,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 174,
    "name": "HAIKAL SAHTI GIO SAPUTRA",
    "class": "7F",
    "absenceNumber": 12,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 175,
    "name": "LANGGENG ARGA MAULANA",
    "class": "7F",
    "absenceNumber": 13,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 176,
    "name": "LISTHA SYARIHADITS SYAHILLA",
    "class": "7F",
    "absenceNumber": 14,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 177,
    "name": "MOH. FAUZIL ALI",
    "class": "7F",
    "absenceNumber": 15,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 178,
    "name": "MOHAMAD AZRIEL AL AYUBBI",
    "class": "7F",
    "absenceNumber": 16,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 179,
    "name": "MONICA CECILIA DEALOVA",
    "class": "7F",
    "absenceNumber": 17,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 180,
    "name": "MUHAMAD RIZKI",
    "class": "7F",
    "absenceNumber": 18,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 181,
    "name": "MUHAMMAD ARI DIKO PRATAMA",
    "class": "7F",
    "absenceNumber": 19,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 182,
    "name": "MUHAMMAD HAFI ALKAUTSAR",
    "class": "7F",
    "absenceNumber": 20,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 183,
    "name": "NABILATUN HUSNA",
    "class": "7F",
    "absenceNumber": 21,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 184,
    "name": "NUR MAULIDIYAH",
    "class": "7F",
    "absenceNumber": 22,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 185,
    "name": "NURUL QOMARIYAH",
    "class": "7F",
    "absenceNumber": 23,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 186,
    "name": "PUTRI DWI LARASATI",
    "class": "7F",
    "absenceNumber": 24,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 187,
    "name": "RAFI ANDIKA PRAKASA",
    "class": "7F",
    "absenceNumber": 25,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 188,
    "name": "RISKY NUR AINI",
    "class": "7F",
    "absenceNumber": 26,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 189,
    "name": "SEFTI RUKHOYATUL BARIR",
    "class": "7F",
    "absenceNumber": 27,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 190,
    "name": "SYAINA AMIRA RAHMADANI",
    "class": "7F",
    "absenceNumber": 28,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 191,
    "name": "WAHYU EKO SATRIO",
    "class": "7F",
    "absenceNumber": 29,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 192,
    "name": "WULAN FRISSA",
    "class": "7F",
    "absenceNumber": 30,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 193,
    "name": "ZAHRA LINTANG CRYSIAN",
    "class": "7F",
    "absenceNumber": 31,
    "school": "SMP Negeri 2 Glagah"
  },
  {
    "id": 194,
    "name": "ZAKY SETYAWAN PRATAMA",
    "class": "7F",
    "absenceNumber": 32,
    "school": "SMP Negeri 2 Glagah"
  }
];

export const uksVisits: Visit[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Ahmad Budi Santoso',
    studentClass: '9A',
    reason: 'Sakit Kepala',
    entryTime: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    exitTime: new Date(new Date().setHours(new Date().getHours() - 23)).toISOString(),
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Citra Dewi Lestari',
    studentClass: '8B',
    reason: 'Sakit Perut',
    entryTime: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    exitTime: new Date(new Date().setHours(new Date().getHours() - 47)).toISOString(),
  },
  {
    id: 3,
    studentId: 4,
    studentName: 'Fitriana Indah Sari',
    studentClass: '9B',
    reason: 'Luka Ringan',
    entryTime: new Date().toISOString(),
    exitTime: null,
  },
  {
    id: 4,
    studentId: 3,
    studentName: 'Eko Fajar Nugroho',
    studentClass: '7C',
    reason: 'Pusing',
    entryTime: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    exitTime: new Date(new Date().setHours(new Date().getHours() - 70)).toISOString(),
  },
  {
    id: 5,
    studentId: 5,
    studentName: 'Gilang Ramadhan',
    studentClass: '8A',
    reason: 'Demam',
    entryTime: new Date().toISOString(),
    exitTime: null,
  },
];

export const medications: Medication[] = [
    { id: 1, name: 'Paracetamol', stock: 50 },
    { id: 2, name: 'Antasida', stock: 30 },
    { id: 3, name: 'Plester', stock: 100 },
    { id: 4, name: 'Kain Kasa Antiseptik', stock: 80 },
    { id: 5, name: 'Ibuprofen', stock: 45 },
];

export const healthScreeningData: Screening[] = [
    { studentId: 1, studentName: 'Ahmad Budi Santoso', symptoms: 'Sakit kepala dan kelelahan' },
    { studentId: 2, studentName: 'Citra Dewi Lestari', symptoms: 'Kram perut' },
    { studentId: 3, studentName: 'Eko Fajar Nugroho', symptoms: 'Pusing dan mual' },
    { studentId: 4, studentName: 'Fitriana Indah Sari', symptoms: 'Lutut tergores' },
    { studentId: 5, studentName: 'Gilang Ramadhan', symptoms: 'Suhu badan tinggi dan sakit kepala' },
];
