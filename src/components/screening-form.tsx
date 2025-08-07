
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { generateScreeningRecommendation } from "@/ai/flows/generate-screening-recommendation";
import type { ScreeningResult, Student, Screening } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { getStudents, getStudentsByClass, addScreening } from "@/lib/firebase-services";


const screeningFormSchema = z.object({
  class: z.string().min(1, { message: "Silakan pilih kelas." }),
  studentId: z.string().min(1, { message: "Silakan pilih seorang siswa." }),
  height: z.coerce.number().positive({ message: "Tinggi badan harus positif." }),
  weight: z.coerce.number().positive({ message: "Berat badan harus positif." }),
  visionProblem: z.string({ required_error: "Pilihan ini wajib diisi." }),
  hearingProblem: z.string({ required_error: "Pilihan ini wajib diisi." }),
  dentalIssues: z.array(z.string()),
  otherComplaints: z.string().optional(),
  feelsSad: z.string({ required_error: "Pilihan ini wajib diisi." }),
  feelsAnxious: z.string({ required_error: "Pilihan ini wajib diisi." }),
  feelsUnmotivated: z.string({ required_error: "Pilihan ini wajib diisi." }),
  feelsLonely: z.string({ required_error: "Pilihan ini wajib diisi." }),
  breakfastFrequency: z.string().min(1, { message: "Wajib diisi." }),
  waterConsumption: z.string().min(1, { message: "Wajib diisi." }),
  fruitVegConsumption: z.string().min(1, { message: "Wajib diisi." }),
  snackHabits: z.string().min(1, { message: "Wajib diisi." }),
  sleepDuration: z.string().min(1, { message: "Wajib diisi." }),
  screenTime: z.string().min(1, { message: "Wajib diisi." }),
  physicalActivity: z.string().min(1, { message: "Wajib diisi." }),
  smoking: z.string().optional(),
  alcohol: z.string().optional(),
  violence: z.string().optional(),
  selfHarm: z.string().optional(),
  bullying: z.string().optional(),
});

export type ScreeningFormValues = z.infer<typeof screeningFormSchema>;

interface ScreeningFormProps {
  setResult: (result: ScreeningResult) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  loading: boolean;
  error: string | null;
}

export function ScreeningForm({ setResult, setLoading, setError, loading, error }: ScreeningFormProps) {
  const { toast } = useToast();
  const [bmi, setBmi] = useState<number | null>(null);

  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [studentsInClass, setStudentsInClass] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const form = useForm<ScreeningFormValues>({
    resolver: zodResolver(screeningFormSchema),
    defaultValues: {
      dentalIssues: [],
      class: '',
      studentId: '',
    },
  });

  const height = form.watch("height");
  const weight = form.watch("weight");
  const studentClass = form.watch("class");

  const fetchStudentsData = useCallback(async () => {
    try {
      const students = await getStudents();
      setAllStudents(students);
    } catch (error) {
      console.error("Failed to fetch students", error);
      toast({ title: "Gagal memuat data siswa", variant: "destructive" });
    }
  }, [toast]);

  useEffect(() => {
    fetchStudentsData();
  }, [fetchStudentsData]);

  const classNames = useMemo(() => {
    return [...new Set(allStudents.map(s => s.class))].sort();
  }, [allStudents]);

  useEffect(() => {
      const fetchStudentsInClass = async () => {
        if (studentClass) {
            setLoadingStudents(true);
            form.setValue('studentId', '');
            try {
              const students = await getStudentsByClass(studentClass);
              setStudentsInClass(students);
            } catch (error) {
               console.error("Failed to fetch students in class", error);
               toast({ title: "Gagal memuat siswa di kelas", variant: "destructive" });
            } finally {
              setLoadingStudents(false);
            }
        } else {
            setStudentsInClass([]);
        }
      }
      fetchStudentsInClass();
  }, [studentClass, form, toast]);


  useEffect(() => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(calculatedBmi.toFixed(1)));
    } else {
      setBmi(null);
    }
  }, [height, weight]);

  async function onSubmit(data: ScreeningFormValues) {
    try {
      setLoading(true);
      setError(null);
      const student = studentsInClass.find(s => s.id.toString() === data.studentId);
      if (!student) {
        throw new Error("Siswa tidak ditemukan");
      }
      
      const result = await generateScreeningRecommendation({ studentData: JSON.stringify({...data, studentName: student.name}) });

      const screeningDataToSave: Omit<Screening, 'id'> = {
        studentId: student.id,
        studentName: student.name,
        studentClass: student.class,
        screeningDate: new Date().toISOString(),
        ...result,
      };

      await addScreening(screeningDataToSave);
      
      setResult(result);
      toast({
        title: "Skrining Berhasil Disimpan",
        description: `Hasil skrining untuk ${student.name} telah disimpan.`,
      });


    } catch (e) {
      console.error(e);
      setError("Gagal membuat atau menyimpan rekomendasi skrining. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && (
            <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        <h2 className="text-xl font-semibold border-b pb-2">1. Profil Siswa</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Kelas</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {classNames.map(className => (
                            <SelectItem key={className} value={className}>
                                {className}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Siswa</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={!studentClass || loadingStudents}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={loadingStudents ? "Memuat..." : "Pilih siswa"} />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {studentsInClass.map((student) => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                        {student.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <h2 className="text-xl font-semibold border-b pb-2">2. Skrining Kesehatan Fisik</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tinggi Badan (cm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 165" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Berat Badan (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 55" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>BMI</FormLabel>
            <FormControl>
              <Input readOnly value={bmi ? bmi : "Masukkan tinggi & berat badan"} />
            </FormControl>
          </FormItem>
        </div>
        <FormField control={form.control} name="visionProblem" render={({field}) => (
            <FormItem><FormLabel>Apakah Anda kesulitan membaca tulisan di papan tulis?</FormLabel>
            <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="ya" /></FormControl><FormLabel className="font-normal">Ya</FormLabel></FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="tidak" /></FormControl><FormLabel className="font-normal">Tidak</FormLabel></FormItem>
            </RadioGroup></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="hearingProblem" render={({field}) => (
            <FormItem><FormLabel>Apakah Anda sering merasa kesulitan mendengar penjelasan guru di kelas?</FormLabel>
            <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="ya" /></FormControl><FormLabel className="font-normal">Ya</FormLabel></FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="tidak" /></FormControl><FormLabel className="font-normal">Tidak</FormLabel></FormItem>
            </RadioGroup></FormControl><FormMessage /></FormItem>
        )} />
        <FormField
            control={form.control}
            name="dentalIssues"
            render={() => (
                <FormItem>
                <FormLabel>Apakah Anda memiliki keluhan gigi dan mulut berikut?</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { id: "gigi-berlubang", label: "Gigi Berlubang" },
                        { id: "gusi-berdarah", label: "Gusi Berdarah" },
                        { id: "sariawan", label: "Sariawan" },
                        { id: "bau-mulut", label: "Bau Mulut" },
                    ].map((item) => (
                        <FormField
                        key={item.id}
                        control={form.control}
                        name="dentalIssues"
                        render={({ field }) => (
                            <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                    return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id));
                                }}
                                />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                        )}
                        />
                    ))}
                </div>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField control={form.control} name="otherComplaints" render={({ field }) => (<FormItem><FormLabel>Keluhan Fisik Lainnya</FormLabel><FormControl><Textarea placeholder="Contoh: sering pusing, mual, lemas, sakit perut, dll." {...field} /></FormControl><FormMessage /></FormItem>)} />
        
        <h2 className="text-xl font-semibold border-b pb-2">3. Skrining Kesehatan Mental & Emosional</h2>
        <FormField control={form.control} name="feelsSad" render={({field}) => (
            <FormItem><FormLabel>Apakah Anda sering merasa sedih tanpa alasan?</FormLabel>
            <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="ya" /></FormControl><FormLabel className="font-normal">Ya</FormLabel></FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="tidak" /></FormControl><FormLabel className="font-normal">Tidak</FormLabel></FormItem>
            </RadioGroup></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="feelsAnxious" render={({field}) => (
            <FormItem><FormLabel>Apakah Anda merasa cemas berlebihan?</FormLabel>
            <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="ya" /></FormControl><FormLabel className="font-normal">Ya</FormLabel></FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="tidak" /></FormControl><FormLabel className="font-normal">Tidak</FormLabel></FormItem>
            </RadioGroup></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="feelsUnmotivated" render={({field}) => (
            <FormItem><FormLabel>Apakah Anda merasa tidak semangat pergi ke sekolah?</FormLabel>
            <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="ya" /></FormControl><FormLabel className="font-normal">Ya</FormLabel></FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="tidak" /></FormControl><FormLabel className="font-normal">Tidak</FormLabel></FormItem>
            </RadioGroup></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="feelsLonely" render={({field}) => (
            <FormItem><FormLabel>Apakah Anda merasa kesepian?</FormLabel>
            <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="ya" /></FormControl><FormLabel className="font-normal">Ya</FormLabel></FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="tidak" /></FormControl><FormLabel className="font-normal">Tidak</FormLabel></FormItem>
            </RadioGroup></FormControl><FormMessage /></FormItem>
        )} />

        <h2 className="text-xl font-semibold border-b pb-2">4. Skrining Pola Hidup dan Kebiasaan Sehat</h2>
        <FormField control={form.control} name="breakfastFrequency" render={({field}) => (
            <FormItem><FormLabel>Seberapa sering Anda sarapan dalam seminggu?</FormLabel><FormControl><Input placeholder="Contoh: 5 kali" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="waterConsumption" render={({field}) => (
            <FormItem><FormLabel>Berapa gelas air putih yang Anda minum per hari?</FormLabel><FormControl><Input placeholder="Contoh: 8 gelas" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="fruitVegConsumption" render={({field}) => (
            <FormItem><FormLabel>Seberapa sering Anda makan sayur dan buah per hari?</FormLabel><FormControl><Input placeholder="Contoh: 2 kali" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="snackHabits" render={({field}) => (
            <FormItem><FormLabel>Jelaskan kebiasaan jajan Anda (makanan ringan, minuman manis).</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="sleepDuration" render={({field}) => (
            <FormItem><FormLabel>Berapa jam rata-rata Anda tidur setiap malam?</FormLabel><FormControl><Input placeholder="Contoh: 7 jam" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="screenTime" render={({field}) => (
            <FormItem><FormLabel>Berapa lama waktu layar Anda (HP/TV/Komputer) per hari?</FormLabel><FormControl><Input placeholder="Contoh: 4 jam" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="physicalActivity" render={({field}) => (
            <FormItem><FormLabel>Berapa kali Anda berolahraga dalam seminggu?</FormLabel><FormControl><Input placeholder="Contoh: 3 kali" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <h2 className="text-xl font-semibold border-b pb-2">5. Skrining Perilaku Berisiko (Opsional)</h2>
        <FormDescription>Pertanyaan sensitif sebaiknya diberikan dengan bahasa netral dan dijaga kerahasiaannya.</FormDescription>
        <FormField control={form.control} name="smoking" render={({field}) => (
            <FormItem><FormLabel>Apakah Anda pernah merokok?</FormLabel>
            <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="pernah" /></FormControl><FormLabel className="font-normal">Pernah</FormLabel></FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="tidak-pernah" /></FormControl><FormLabel className="font-normal">Tidak Pernah</FormLabel></FormItem>
            </RadioGroup></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="alcohol" render={({field}) => (
            <FormItem><FormLabel>Apakah Anda pernah mengonsumsi alkohol?</FormLabel>
            <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="pernah" /></FormControl><FormLabel className="font-normal">Pernah</FormLabel></FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="tidak-pernah" /></FormControl><FormLabel className="font-normal">Tidak Pernah</FormLabel></FormItem>
            </RadioGroup></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="violence" render={({field}) => (
            <FormItem><FormLabel>Apakah Anda pernah mengalami kekerasan di rumah/sekolah?</FormLabel>
            <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="pernah" /></FormControl><FormLabel className="font-normal">Pernah</FormLabel></FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="tidak-pernah" /></FormControl><FormLabel className="font-normal">Tidak Pernah</FormLabel></FormItem>
            </RadioGroup></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="selfHarm" render={({field}) => (
            <FormItem><FormLabel>Apakah Anda pernah merasa ingin melukai diri sendiri?</FormLabel>
            <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="pernah" /></FormControl><FormLabel className="font-normal">Pernah</FormLabel></FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="tidak-pernah" /></FormControl><FormLabel className="font-normal">Tidak Pernah</FormLabel></FormItem>
            </RadioGroup></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="bullying" render={({field}) => (
            <FormItem><FormLabel>Apakah Anda pernah menjadi korban perundungan (bullying)?</FormLabel>
            <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="pernah" /></FormControl><FormLabel className="font-normal">Pernah</FormLabel></FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="tidak-pernah" /></FormControl><FormLabel className="font-normal">Tidak Pernah</FormLabel></FormItem>
            </RadioGroup></FormControl><FormMessage /></FormItem>
        )} />


        <Button type="submit" disabled={loading}>{loading ? 'Menganalisis...' : 'Simpan & Lihat Hasil Skrining'}</Button>
      </form>
    </Form>
  );
}
